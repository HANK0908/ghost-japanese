const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const html = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8')

test('kanji progress can be exported and restored independently of private notes', () => {
  assert.match(html, /function exportKanjiProgress\(\)/)
  assert.match(html, /function importKanjiProgress\(event\)/)
  assert.match(html, /ghost-kanji-progress-v1/)
  assert.match(html, /data\.checkedIds\.every\(id=>typeof id==='string'&&validIds\.has\(id\)\)/)
  assert.match(html, /const merged=\{\.\.\.kanjiChecked\}/)
  assert.match(html, /localStorage\.setItem\(KANJI_CHECK_KEY,JSON\.stringify\(merged\)\)/)
})

test('kanji UI preserves page navigation and unique progress import control', () => {
  for (const id of ['kanjiPager','kanjiPagerBottom','kanjiCheckedFilter','kanjiPageSize','kanjiProgressImport']) {
    const matches = html.match(new RegExp('id="'+id+'"','g')) || []
    assert.equal(matches.length, 1, id+' must be unique')
  }
  assert.match(html, /#\$\{String\(ordinal\)\.padStart\(3,'0'\)\}/)
})

test('kanji search and classification reset pagination to the first page', () => {
  for (const id of ['kanjiSearch', 'kanjiType', 'kanjiMatch', 'kanjiReadingType']) {
    assert.match(html, new RegExp('id="'+id+'"[^>]+(?:oninput|onchange)="kanjiPage=1;renderKanji\\(\\)"'))
  }
})

test('marking a card preserves scroll and focus when no status filter is active', () => {
  assert.match(html, /if\(document\.getElementById\('kanjiCheckedFilter'\)\.value\)\{renderKanji\(\);return\}/)
  assert.match(html, /input\.parentNode\.lastChild\.textContent=/)
  assert.match(html, /data-lesson-id="\$\{esc\(n\.id\)\}"/)
  assert.match(html, /if\(!KANJI_LESSONS\.some\(item=>item\.id===id\)\)/)
})


test('default practice can exclude all unreviewed lessons', () => {
  assert.match(html, /function startKanjiDrill\(verifiedOnly=false\)/)
  assert.match(html, /verifiedOnly\?KANJI_LESSONS\.filter\(n=>n\.reviewStatus==='reviewed'\):KANJI_LESSONS/)
  assert.match(html, /onclick="startKanjiDrill\(true\)"/)
  assert.match(html, /含待查詞：隨機 50 題/)
})
