const test = require('node:test')
const assert = require('node:assert/strict')

const {
  KANJI_LESSONS,
  filterKanjiLessons,
  kanjiLessonToNote,
  addKanjiLesson,
  findKanjiNoteIndexes,
  createKanjiDrill,
  revealKanjiDrill,
  gradeKanjiDrill,
  nextKanjiDrill,
} = require('../kanji-data.js')

test('kanji data retains original 50 plus 905 preview lessons in the extensible schema', () => {
  assert.equal(KANJI_LESSONS.length, 955)
  assert.equal(new Set(KANJI_LESSONS.map((lesson) => lesson.id)).size, 955)
  for (const lesson of KANJI_LESSONS) {
    assert.equal(typeof lesson.written, 'string')
    assert.equal(typeof lesson.reading, 'string')
    assert.equal(typeof lesson.meaningZhTw, 'string')
    assert.match(lesson.partOfSpeech, /名詞|動詞|い形容詞|な形容詞|副詞/)
    assert.match(lesson.meaningRelation, /^(similar|different|partial)$/)
    assert.match(lesson.readingType, /^(on|kun|mixed|special)$/)
    assert.match(lesson.reviewStatus, /^(reviewed|needs-review)$/)
    assert.ok(Array.isArray(lesson.sources) && lesson.sources.length > 0)
  }
})

test('kanji corrections distinguish precise word classes and Chinese meaning relations', () => {
  const byWritten = new Map(KANJI_LESSONS.map((lesson) => [lesson.written, lesson]))

  assert.equal(byWritten.get('大丈夫').partOfSpeech, 'な形容詞')
  assert.equal(byWritten.get('大丈夫').meaningRelation, 'different')
  assert.equal(byWritten.get('新聞').meaningRelation, 'partial')
  assert.equal(byWritten.get('会社').meaningRelation, 'different')
  assert.equal(byWritten.get('今日').readingType, 'special')
})

test('kanji filters combine word class, meaning relation, reading type, and reading search', () => {
  const result = filterKanjiLessons(KANJI_LESSONS, {
    partOfSpeech: '名詞',
    meaningRelation: 'different',
    readingType: 'on',
    query: 'かいしゃ',
  })

  assert.deepEqual(result.map((lesson) => lesson.written), ['会社'])
  assert.deepEqual(
    filterKanjiLessons(KANJI_LESSONS, { query: '老師' }).map((lesson) => lesson.written),
    ['先生'],
  )
})

test('kanji lesson converts to the existing notebook JSON shape', () => {
  const note = kanjiLessonToNote(KANJI_LESSONS[0])

  assert.deepEqual(note, {
    zh: '電話',
    jp: '電話',
    kana: 'でんわ',
    ghost: '',
    story: '',
    type: '名詞',
    known: 0,
    missed: 0,
    repeats: 5,
    sourceKind: 'kanji-learning',
    sourceId: 'kanji:denwa',
  })
})

test('adding a kanji lesson preserves existing notes and rejects duplicates', () => {
  const existing = [{ id: 'old', zh: '早餐', jp: '朝食' }]
  const first = addKanjiLesson(existing, KANJI_LESSONS[0])
  const duplicate = addKanjiLesson(first.notes, KANJI_LESSONS[0])

  assert.equal(first.added, true)
  assert.equal(first.notes.length, 2)
  assert.equal(first.notes[0], existing[0])
  assert.equal(duplicate.added, false)
  assert.equal(duplicate.notes.length, 2)
})

test('continuous audio entry selects only notebook notes added from kanji learning', () => {
  const notes = [
    { jp: '朝食', sourceKind: 'manual' },
    { jp: '電話', sourceKind: 'kanji-learning', sourceId: 'kanji:denwa' },
    { jp: '学校', sourceKind: 'kanji-learning', sourceId: 'kanji:gakkou' },
  ]
  assert.deepEqual(findKanjiNoteIndexes(notes, ['kanji:gakkou', 'kanji:denwa']), [1, 2])
})

test('kanji drill shuffles without duplicates and caps future libraries at 50', () => {
  const lessons = Array.from({ length: 55 }, (_, index) => ({ id: `k${index}` }))
  const drill = createKanjiDrill(lessons, () => 0)

  assert.equal(drill.currentId !== null, true)
  assert.equal(1 + drill.queue.length, 50)
  assert.equal(new Set([drill.currentId, ...drill.queue]).size, 50)
  assert.equal(drill.revealed, false)
})

test('forgotten kanji returns first on the next question and repeats at most twice', () => {
  let drill = createKanjiDrill([{ id: 'a' }, { id: 'b' }, { id: 'c' }], () => 0)
  const first = drill.currentId

  drill = revealKanjiDrill(drill)
  drill = gradeKanjiDrill(drill, false)
  drill = nextKanjiDrill(drill)
  assert.equal(drill.currentId, first)

  for (let count = 0; count < 2; count += 1) {
    drill = revealKanjiDrill(drill)
    drill = gradeKanjiDrill(drill, false)
    drill = nextKanjiDrill(drill)
  }
  assert.notEqual(drill.currentId, first)
})

test('kanji drill requires reveal and explicit next between grades', () => {
  let drill = createKanjiDrill([{ id: 'a' }, { id: 'b' }], () => 0)
  const first = drill.currentId
  assert.equal(gradeKanjiDrill(drill, true).graded, false)

  drill = revealKanjiDrill(drill)
  drill = gradeKanjiDrill(drill, true)
  assert.equal(drill.currentId, first)
  assert.equal(drill.graded, true)

  drill = nextKanjiDrill(drill)
  assert.notEqual(drill.currentId, first)
  assert.equal(drill.revealed, false)
})
