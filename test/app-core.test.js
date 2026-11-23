const test = require('node:test')
const assert = require('node:assert/strict')

const GhostCore = require('../app-core.js')

test('migrateNotes preserves legacy fields and adds stable unique IDs', () => {
  const legacy = [
    { zh: '車站', jp: '駅', kana: 'えき', known: 2, custom: 'keep-me' },
    { zh: '車站', jp: '駅', kana: 'えき', known: 0 },
  ]

  const first = GhostCore.migrateNotes(legacy)
  const second = GhostCore.migrateNotes(legacy)

  assert.equal(first.length, 2)
  assert.equal(first[0].custom, 'keep-me')
  assert.equal(first[0].known, 2)
  assert.match(first[0].id, /^note-/)
  assert.notEqual(first[0].id, first[1].id)
  assert.deepEqual(first.map((note) => note.id), second.map((note) => note.id))
  assert.equal(Object.hasOwn(legacy[0], 'id'), false)
})

test('migrateNotes keeps an existing ID and resolves collisions without data loss', () => {
  const migrated = GhostCore.migrateNotes([
    { id: 'my-note', zh: '早餐', jp: '朝食' },
    { id: 'my-note', zh: '午餐', jp: '昼食' },
  ])

  assert.equal(migrated[0].id, 'my-note')
  assert.notEqual(migrated[1].id, 'my-note')
  assert.equal(migrated[1].zh, '午餐')
})

test('migrateNotes reserves established IDs before generating fallbacks', () => {
  const legacy = { zh: '早餐', jp: '朝食' }
  const fallback = `note-${GhostCore.hashText(['早餐', '朝食', '', ''].join('\u001f'))}`
  const migrated = GhostCore.migrateNotes([legacy, { id: fallback, zh: '保留身分', jp: '保持' }])
  assert.notEqual(migrated[0].id, fallback)
  assert.equal(migrated[1].id, fallback)
})

test('loadMigratedNotes keeps read data when migration write-back fails', () => {
  const original = [{ zh: '早餐', jp: '朝食', custom: 'keep' }]
  let reported = null
  const storage = {
    getItem: () => JSON.stringify(original),
    setItem: () => { throw new Error('quota') },
  }
  const loaded = GhostCore.loadMigratedNotes(storage, 'notes', (error) => { reported = error })
  assert.equal(loaded.length, 1)
  assert.equal(loaded[0].custom, 'keep')
  assert.match(loaded[0].id, /^note-/)
  assert.equal(reported.message, 'quota')
})

test('migrateNotes fails closed for non-array storage data', () => {
  assert.deepEqual(GhostCore.migrateNotes(null), [])
  assert.deepEqual(GhostCore.migrateNotes({ zh: '不是陣列' }), [])
})

test('mergeNoteUpdate preserves stable identity and review history', () => {
  const existing = {
    id: 'note-stable', zh: '早餐', jp: '朝食', known: 3, missed: 1,
    streak: 2, nextReview: '2026-11-30', lastReview: '2026-11-22',
  }

  const updated = GhostCore.mergeNoteUpdate(existing, { jp: '朝ごはん', kana: 'あさごはん' })

  assert.equal(updated.id, 'note-stable')
  assert.equal(updated.jp, '朝ごはん')
  assert.equal(updated.known, 3)
  assert.equal(updated.nextReview, '2026-11-30')
})

const vocabulary = [
  { zh: '車站', jp: '駅', kana: 'えき', type: '名詞' },
  { zh: '電車', jp: '電車', kana: 'でんしゃ', type: '名詞' },
  { zh: '吃', jp: '食べる', kana: 'たべる', type: '動詞' },
  { zh: '喝', jp: '飲む', kana: 'のむ', type: '動詞' },
  { zh: '安全', jp: '安全', kana: 'あんぜん', type: 'な形容詞' },
  { zh: '方便', jp: '便利', kana: 'べんり', type: 'な形容詞' },
]

test('withVocabularyIds gives words deterministic IDs independent of array position', () => {
  const original = GhostCore.withVocabularyIds(vocabulary)
  const reversed = GhostCore.withVocabularyIds([...vocabulary].reverse())
  const byJapanese = new Map(reversed.map((word) => [word.jp, word.id]))

  assert.equal(new Set(original.map((word) => word.id)).size, vocabulary.length)
  for (const word of original) assert.equal(word.id, byJapanese.get(word.jp))
})

test('migrateDailyState converts legacy indexes to stable IDs and drops invalid indexes', () => {
  const words = GhostCore.withVocabularyIds(vocabulary)
  const migrated = GhostCore.migrateDailyState({
    days: [{ date: '2026-11-20', ids: [0, 2, 99] }],
  }, words)

  assert.equal(migrated.version, 2)
  assert.deepEqual(migrated.days[0].shown, [words[0].id, words[2].id])
  assert.deepEqual(migrated.days[0].accepted, [])
  assert.deepEqual(migrated.days[0].completed, [])
  assert.deepEqual(migrated.days[0].history, [words[0].id, words[2].id])
})

test('migrateDailyState resolves legacy IDs against original library indexes', () => {
  const eligible = GhostCore.withVocabularyIds([
    { sourceIndex: 0, zh: '車站', jp: '駅', kana: 'えき', type: '名詞' },
    { sourceIndex: 2, zh: '吃', jp: '食べる', kana: 'たべる', type: '動詞' },
  ])
  const migrated = GhostCore.migrateDailyState({
    days: [{ date: '2026-11-20', ids: [2, 1] }],
  }, eligible)

  assert.deepEqual(migrated.days[0].shown, [eligible[1].id])
})

test('migrateDailyState ignores malformed legacy indexes without throwing', () => {
  const words = GhostCore.withVocabularyIds(vocabulary)
  const hostile = { toString: 1 }
  const migrated = GhostCore.migrateDailyState({ days: [{ date: '2026-11-20', ids: [[0], hostile, -1, 1] }] }, words)
  assert.deepEqual(migrated.days[0].shown, [words[1].id])
})

test('ensureDailySelection fills a partially migrated day to three cards', () => {
  const words = GhostCore.withVocabularyIds(vocabulary)
  const state = GhostCore.ensureDailySelection({ days: [{ date: '2026-11-22', shown: [words[0].id] }] }, words, '2026-11-22', () => 0)
  assert.equal(state.days[0].shown.length, 3)
  assert.equal(new Set(state.days[0].shown).size, 3)
})

test('daily swap uses unseen remainder before recycling and still fills three cards', () => {
  const words = GhostCore.withVocabularyIds(vocabulary.slice(0, 5))
  let state = GhostCore.ensureDailySelection({ days: [] }, words, '2026-11-22', () => 0)
  const unseen = words.map((word) => word.id).filter((id) => !state.days[0].shown.includes(id))
  state = GhostCore.swapDailySelection(state, words, '2026-11-22', () => 0)
  assert.equal(state.days[0].shown.length, 3)
  assert.equal(unseen.every((id) => state.days[0].shown.includes(id)), true)
})

test('swapping daily words changes the group without completing or permanently exhausting words', () => {
  const words = GhostCore.withVocabularyIds(vocabulary)
  let state = GhostCore.ensureDailySelection({ days: [] }, words, '2026-11-22', () => 0)
  const first = state.days[0].shown

  state = GhostCore.swapDailySelection(state, words, '2026-11-22', () => 0)
  const second = state.days[0].shown
  assert.equal(second.length, 3)
  assert.deepEqual(second.filter((id) => first.includes(id)), [])
  assert.deepEqual(state.days[0].completed, [])

  state = GhostCore.swapDailySelection(state, words, '2026-11-22', () => 0)
  assert.equal(state.days[0].shown.length, 3)
  assert.deepEqual(state.days[0].completed, [])
})

test('accepted and completed daily words are separate states', () => {
  const words = GhostCore.withVocabularyIds(vocabulary)
  let state = GhostCore.ensureDailySelection({ days: [] }, words, '2026-11-22', () => 0)
  const [acceptedId, completedId] = state.days[0].shown

  state = GhostCore.acceptDailyWords(state, '2026-11-22', [acceptedId])
  state = GhostCore.completeDailyWords(state, '2026-11-22', [completedId])

  assert.deepEqual(state.days[0].accepted, [acceptedId])
  assert.deepEqual(state.days[0].completed, [completedId])
})

test('daily acceptance changes only after the note add succeeds', () => {
  const words = GhostCore.withVocabularyIds(vocabulary)
  const state = GhostCore.ensureDailySelection({ days: [] }, words, '2026-11-22', () => 0)
  const id = state.days[0].shown[0]

  assert.deepEqual(GhostCore.acceptDailyAfterAdd(state, '2026-11-22', id, false), state)
  assert.deepEqual(
    GhostCore.acceptDailyAfterAdd(state, '2026-11-22', id, true).days[0].accepted,
    [id],
  )
})

test('update reload gate opens only after this page accepts the waiting worker', () => {
  const gate = GhostCore.createUpdateReloadGate()
  assert.equal(gate.shouldReload(), false)
  gate.accept()
  assert.equal(gate.shouldReload(), true)
  assert.equal(gate.shouldReload(), false)
})

test('recently completed words observe the cooldown but return after it', () => {
  const words = GhostCore.withVocabularyIds(vocabulary)
  const completedId = words[0].id
  const prior = { version: 2, days: [{
    date: '2026-11-10', shown: [completedId], history: [completedId], accepted: [completedId], completed: [completedId],
  }] }

  const duringCooldown = GhostCore.ensureDailySelection(prior, words, '2026-11-22', () => 0, 14)
  assert.equal(duringCooldown.days.at(-1).shown.includes(completedId), false)

  const afterCooldown = GhostCore.ensureDailySelection(prior, words, '2026-11-30', () => 0, 14)
  assert.equal(afterCooldown.days.at(-1).shown.includes(completedId), true)
})

test('review scheduling keeps the 1, 3, 7, 14, 30, 60, 120 day intervals', () => {
  const intervals = [1, 3, 7, 14, 30, 60, 120, 120]
  let note = { id: 'n1', known: 0, missed: 0, streak: 0 }

  const dates = intervals.map(() => {
    note = GhostCore.scheduleReview(note, true, '2026-11-22')
    return note.nextReview
  })

  assert.deepEqual(dates, [
    '2026-11-23', '2026-11-25', '2026-11-29', '2026-12-06',
    '2026-12-22', '2027-01-21', '2027-03-22', '2027-03-22',
  ])
})

test('review requires reveal, grade, and next as separate card transitions', () => {
  const notes = GhostCore.migrateNotes([
    { id: 'a', zh: '甲', jp: 'あ', nextReview: '2026-11-22' },
    { id: 'b', zh: '乙', jp: 'い', nextReview: '2026-11-22' },
  ])
  let session = GhostCore.createReviewSession(notes, 'due', '2026-11-22')
  assert.equal(session.currentId, 'a')
  assert.equal(session.revealed, false)

  session = GhostCore.revealReviewCard(session)
  assert.equal(session.revealed, true)
  const graded = GhostCore.gradeReview(session, notes, true, '2026-11-22')
  assert.equal(graded.session.currentId, 'a')
  assert.equal(graded.session.graded, true)

  session = GhostCore.nextReviewCard(graded.session, graded.notes)
  assert.equal(session.currentId, 'b')
  assert.equal(session.revealed, false)
})

test('forgotten cards repeat at most twice in one review session', () => {
  let notes = GhostCore.migrateNotes([{ id: 'a', zh: '甲', jp: 'あ' }])
  let session = GhostCore.createReviewSession(notes, 'all', '2026-11-22', 2)

  for (let attempt = 0; attempt < 3; attempt += 1) {
    session = GhostCore.revealReviewCard(session)
    const graded = GhostCore.gradeReview(session, notes, false, '2026-11-22')
    notes = graded.notes
    session = GhostCore.nextReviewCard(graded.session, notes)
  }

  assert.equal(session.currentId, null)
  assert.equal(notes[0].missed, 3)
})

test('review queue skips a note deleted after the session starts', () => {
  const notes = GhostCore.migrateNotes([
    { id: 'a', zh: '甲', jp: 'あ' },
    { id: 'b', zh: '乙', jp: 'い' },
    { id: 'c', zh: '丙', jp: 'う' },
  ])
  let session = GhostCore.createReviewSession(notes, 'all', '2026-11-22')
  const remaining = notes.filter((note) => note.id !== 'b')
  session = GhostCore.nextReviewCard(session, remaining)

  assert.equal(session.currentId, 'c')
})

test('undo review restores scheduling counters and the queue snapshot', () => {
  const notes = GhostCore.migrateNotes([
    { id: 'a', zh: '甲', jp: 'あ', known: 4, missed: 1, streak: 2, nextReview: '2026-11-22' },
    { id: 'b', zh: '乙', jp: 'い' },
  ])
  const session = GhostCore.revealReviewCard(GhostCore.createReviewSession(notes, 'all', '2026-11-22'))
  const graded = GhostCore.gradeReview(session, notes, true, '2026-11-22')
  const restored = GhostCore.undoReviewGrade(graded.notes, graded.session, graded.undo)

  assert.deepEqual(restored.notes, notes)
  assert.deepEqual(restored.session, session)
})

test('undo review preserves text edits made after grading', () => {
  const notes = GhostCore.migrateNotes([{ id: 'a', zh: '原文', jp: '元', known: 1, streak: 1 }])
  const session = GhostCore.revealReviewCard(GhostCore.createReviewSession(notes, 'all', '2026-11-22'))
  const graded = GhostCore.gradeReview(session, notes, true, '2026-11-22')
  graded.notes[0].zh = '編輯後文字'
  const restored = GhostCore.undoReviewGrade(graded.notes, graded.session, graded.undo)
  assert.equal(restored.notes[0].zh, '編輯後文字')
  assert.equal(restored.notes[0].known, 1)
  assert.equal(restored.notes[0].streak, 1)
})
