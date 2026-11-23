(function initGhostCore(root, factory) {
  const api = factory()
  if (typeof module === 'object' && module.exports) module.exports = api
  if (root) root.GhostCore = api
})(typeof globalThis !== 'undefined' ? globalThis : this, function createGhostCore() {
  function hashText(value) {
    let hash = 2166136261
    for (const char of String(value)) {
      hash ^= char.codePointAt(0)
      hash = Math.imul(hash, 16777619)
    }
    return (hash >>> 0).toString(36)
  }

  function noteFingerprint(note) {
    return [note.zh, note.jp, note.kana, note.createdAt].map((part) => String(part || '').trim()).join('\u001f')
  }

  function uniqueId(preferred, fallback, used) {
    const base = String(preferred || fallback).trim() || 'note'
    if (!used.has(base)) {
      used.add(base)
      return base
    }
    let suffix = 2
    while (used.has(`${base}-${suffix}`)) suffix += 1
    const id = `${base}-${suffix}`
    used.add(id)
    return id
  }

  function migrateNotes(value) {
    if (!Array.isArray(value)) return []
    const reserved = new Set(value
      .filter((note) => note && typeof note === 'object' && typeof note.id === 'string' && note.id.trim())
      .map((note) => note.id.trim()))
    const used = new Set()
    return value.map((note) => {
      const source = note && typeof note === 'object' ? note : {}
      const fallback = `note-${hashText(noteFingerprint(source))}`
      if (typeof source.id === 'string' && source.id.trim()) {
        return { ...source, id: uniqueId(source.id, fallback, used) }
      }
      let candidate = fallback
      let suffix = 2
      while (reserved.has(candidate) || used.has(candidate)) candidate = `${fallback}-${suffix++}`
      used.add(candidate)
      return { ...source, id: candidate }
    })
  }

  function loadMigratedNotes(storage, key, onMigrationWriteError) {
    let raw
    try {
      raw = JSON.parse(storage.getItem(key)) || []
    } catch {
      return []
    }
    const migrated = migrateNotes(raw)
    if (JSON.stringify(raw) !== JSON.stringify(migrated)) {
      try {
        storage.setItem(key, JSON.stringify(migrated))
      } catch (error) {
        if (typeof onMigrationWriteError === 'function') onMigrationWriteError(error)
      }
    }
    return migrated
  }

  function mergeNoteUpdate(existing, fields) {
    return { ...(existing && typeof existing === 'object' ? existing : {}), ...(fields && typeof fields === 'object' ? fields : {}) }
  }

  function withVocabularyIds(value) {
    if (!Array.isArray(value)) return []
    const used = new Set()
    return value.map((word) => {
      const source = word && typeof word === 'object' ? word : {}
      const fingerprint = [source.jp, source.kana, source.zh, source.type].map((part) => String(part || '').trim()).join('\u001f')
      return { ...source, id: uniqueId(source.id, `word-${hashText(fingerprint)}`, used) }
    })
  }

  function validIds(value, knownIds) {
    if (!Array.isArray(value)) return []
    return [...new Set(value.filter((id) => typeof id === 'string' && knownIds.has(id)))]
  }

  function migrateDailyState(value, vocabulary) {
    const words = withVocabularyIds(vocabulary)
    const knownIds = new Set(words.map((word) => word.id))
    const sourceIndexIds = new Map(words
      .filter((word) => Number.isInteger(word.sourceIndex) && word.sourceIndex >= 0)
      .map((word) => [word.sourceIndex, word.id]))
    const sourceDays = value && Array.isArray(value.days) ? value.days : []
    const days = sourceDays
      .filter((day) => day && typeof day.date === 'string')
      .map((day) => {
        const legacyShown = Array.isArray(day.ids)
          ? day.ids
            .filter((index) => Number.isInteger(index) && index >= 0)
            .map((index) => sourceIndexIds.size ? sourceIndexIds.get(index) : words[index]?.id)
            .filter(Boolean)
          : []
        const shown = validIds(Array.isArray(day.shown) ? day.shown : legacyShown, knownIds)
        return {
          date: day.date,
          shown,
          history: validIds(Array.isArray(day.history) ? day.history : shown, knownIds),
          accepted: validIds(day.accepted, knownIds),
          completed: validIds(day.completed, knownIds),
        }
      })
    return { version: 2, days }
  }

  function dayDifference(later, earlier) {
    const laterTime = Date.parse(`${later}T12:00:00Z`)
    const earlierTime = Date.parse(`${earlier}T12:00:00Z`)
    if (!Number.isFinite(laterTime) || !Number.isFinite(earlierTime)) return Infinity
    return Math.floor((laterTime - earlierTime) / 86400000)
  }

  function recentCompletedIds(state, today, cooldownDays) {
    const recent = new Set()
    for (const day of state.days) {
      const age = dayDifference(today, day.date)
      if (age >= 0 && age < cooldownDays) for (const id of day.completed) recent.add(id)
    }
    return recent
  }

  function pickIds(pool, count, random) {
    return pool
      .map((word, index) => ({ word, index, score: Number(random()) || 0 }))
      .sort((a, b) => a.score - b.score || a.index - b.index)
      .slice(0, count)
      .map(({ word }) => word.id)
  }

  function ensureDailySelection(value, vocabulary, today, random = Math.random, cooldownDays = 14) {
    const words = withVocabularyIds(vocabulary)
    const state = migrateDailyState(value, words)
    let day = state.days.find((item) => item.date === today)
    if (!day) {
      day = { date: today, shown: [], history: [], accepted: [], completed: [] }
      state.days.push(day)
    }
    const recent = recentCompletedIds(state, today, cooldownDays)
    const needed = Math.max(0, Math.min(3, words.length) - day.shown.length)
    const pool = words.filter((word) => !recent.has(word.id) && !day.shown.includes(word.id))
    day.shown = [...day.shown, ...pickIds(pool, needed, random)]
    day.history = [...new Set([...day.history, ...day.shown])]
    return state
  }

  function swapDailySelection(value, vocabulary, today, random = Math.random, cooldownDays = 14) {
    const words = withVocabularyIds(vocabulary)
    const state = ensureDailySelection(value, words, today, random, cooldownDays)
    const day = state.days.find((item) => item.date === today)
    const recent = recentCompletedIds(state, today, cooldownDays)
    const target = Math.min(3, words.filter((word) => !recent.has(word.id)).length)
    const unseen = words.filter((word) => !recent.has(word.id) && !day.history.includes(word.id))
    const next = pickIds(unseen, target, random)
    if (next.length < target) {
      const reusable = words.filter((word) => !recent.has(word.id) && !next.includes(word.id))
      next.push(...pickIds(reusable, target - next.length, random))
    }
    if (next.length) day.shown = next
    day.history = [...new Set([...day.history, ...day.shown])]
    return state
  }

  function updateDailyIds(value, today, field, ids) {
    const state = value && Array.isArray(value.days)
      ? { version: 2, days: value.days.map((day) => ({ ...day, shown: [...day.shown], history: [...day.history], accepted: [...day.accepted], completed: [...day.completed] })) }
      : { version: 2, days: [] }
    const day = state.days.find((item) => item.date === today)
    if (!day) return state
    day[field] = [...new Set([...day[field], ...ids.filter((id) => day.shown.includes(id))])]
    return state
  }

  function acceptDailyWords(value, today, ids) {
    return updateDailyIds(value, today, 'accepted', ids)
  }

  function acceptDailyAfterAdd(value, today, id, succeeded) {
    return succeeded ? acceptDailyWords(value, today, [id]) : value
  }

  function createUpdateReloadGate() {
    let accepted = false
    return {
      accept() { accepted = true },
      shouldReload() {
        if (!accepted) return false
        accepted = false
        return true
      },
    }
  }

  function completeDailyWords(value, today, ids) {
    return updateDailyIds(value, today, 'completed', ids)
  }

  const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60, 120]

  function addDays(day, days) {
    const time = Date.parse(`${day}T12:00:00Z`)
    if (!Number.isFinite(time)) return day
    return new Date(time + days * 86400000).toISOString().slice(0, 10)
  }

  function scheduleReview(note, remembered, today) {
    const next = { ...note }
    next[remembered ? 'known' : 'missed'] = Number(next[remembered ? 'known' : 'missed'] || 0) + 1
    next.streak = remembered ? Number(next.streak || 0) + 1 : 0
    const days = remembered ? REVIEW_INTERVALS[Math.min(next.streak - 1, REVIEW_INTERVALS.length - 1)] : 0
    next.nextReview = addDays(today, days)
    next.lastReview = today
    return next
  }

  function createReviewSession(value, mode, today, maxForgotRepeats = 2) {
    const notes = migrateNotes(value)
    const ids = notes
      .filter((note) => mode !== 'due' || !note.nextReview || note.nextReview <= today)
      .map((note) => note.id)
    return {
      mode,
      today,
      currentId: ids.shift() || null,
      queue: ids,
      revealed: false,
      graded: false,
      forgotRepeats: {},
      maxForgotRepeats,
    }
  }

  function revealReviewCard(session) {
    if (!session.currentId || session.graded) return { ...session }
    return { ...session, revealed: true }
  }

  function gradeReview(session, value, remembered, today) {
    const notes = migrateNotes(value)
    if (!session.currentId || !session.revealed || session.graded) {
      return { notes, session: { ...session }, undo: null }
    }
    const index = notes.findIndex((note) => note.id === session.currentId)
    if (index < 0) return { notes, session: nextReviewCard(session, notes), undo: null }
    const undo = {
      note: { ...notes[index] },
      session: {
        ...session,
        queue: [...session.queue],
        forgotRepeats: { ...session.forgotRepeats },
      },
    }
    notes[index] = scheduleReview(notes[index], remembered, today)
    const nextSession = {
      ...session,
      queue: [...session.queue],
      forgotRepeats: { ...session.forgotRepeats },
      graded: true,
    }
    if (!remembered) {
      const count = Number(nextSession.forgotRepeats[session.currentId] || 0) + 1
      nextSession.forgotRepeats[session.currentId] = count
      if (count <= nextSession.maxForgotRepeats) nextSession.queue.push(session.currentId)
    }
    return { notes, session: nextSession, undo }
  }

  function nextReviewCard(session, value) {
    const knownIds = new Set(migrateNotes(value).map((note) => note.id))
    const queue = [...session.queue]
    let currentId = null
    while (queue.length && !currentId) {
      const candidate = queue.shift()
      if (knownIds.has(candidate)) currentId = candidate
    }
    return { ...session, currentId, queue, revealed: false, graded: false }
  }

  function undoReviewGrade(value, session, undo) {
    const notes = migrateNotes(value)
    if (!undo?.note || !undo?.session) return { notes, session: { ...session } }
    const index = notes.findIndex((note) => note.id === undo.note.id)
    if (index >= 0) {
      const schedulingFields = ['known', 'missed', 'streak', 'nextReview', 'lastReview']
      const restored = { ...notes[index] }
      for (const field of schedulingFields) {
        if (Object.hasOwn(undo.note, field)) restored[field] = undo.note[field]
        else delete restored[field]
      }
      notes[index] = restored
    }
    return {
      notes,
      session: {
        ...undo.session,
        queue: [...undo.session.queue],
        forgotRepeats: { ...undo.session.forgotRepeats },
      },
    }
  }

  return {
    hashText,
    migrateNotes,
    loadMigratedNotes,
    mergeNoteUpdate,
    withVocabularyIds,
    migrateDailyState,
    ensureDailySelection,
    swapDailySelection,
    acceptDailyWords,
    acceptDailyAfterAdd,
    completeDailyWords,
    createUpdateReloadGate,
    scheduleReview,
    createReviewSession,
    revealReviewCard,
    gradeReview,
    nextReviewCard,
    undoReviewGrade,
  }
})
