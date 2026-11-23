(function initKanjiData(root, factory) {
  const api = factory()
  if (typeof module === 'object' && module.exports) module.exports = api
  if (root) Object.assign(root, api)
})(typeof globalThis !== 'undefined' ? globalThis : this, function createKanjiData() {
  const SOURCE = [
    { name: 'JMdict', url: 'https://www.edrdg.org/jmdict/j_jmdict.html' },
    { name: '教育部重編國語辭典修訂本', url: 'https://dict.revised.moe.edu.tw/' },
  ]
  const lesson = (id, written, meaningZhTw, reading, partOfSpeech, meaningRelation, readingType, reviewStatus = 'reviewed', note = '') => ({
    id, written, reading, meaningZhTw, partOfSpeech, meaningRelation, readingType, reviewStatus, sources: SOURCE, note,
  })

  const ORIGINAL_KANJI_LESSONS = [
    lesson('denwa','電話','電話','でんわ','名詞','similar','on'),
    lesson('gakkou','学校','學校','がっこう','名詞','similar','on'),
    lesson('gakusei','学生','學生','がくせい','名詞','similar','on'),
    lesson('sensei','先生','老師；對教師、醫師等的敬稱','せんせい','名詞','different','on','reviewed','中文「先生」通常指男性稱謂，日文主要指老師或專業人士。'),
    lesson('ryouri','料理','料理；烹調','りょうり','名詞','similar','on'),
    lesson('densha','電車','電車；都市軌道列車','でんしゃ','名詞','partial','on'),
    lesson('eki','駅','車站','えき','名詞','different','on'),
    lesson('iriguchi','入口','入口','いりぐち','名詞','similar','kun'),
    lesson('deguchi','出口','出口','でぐち','名詞','similar','kun'),
    lesson('yoyaku','予約','預約','よやく','名詞','similar','on'),
    lesson('muryou','無料','免費','むりょう','名詞','different','on'),
    lesson('yuuryou','有料','收費；需付費','ゆうりょう','名詞','different','on'),
    lesson('onsen','温泉','溫泉','おんせん','名詞','similar','on'),
    lesson('byouin','病院','醫院','びょういん','名詞','partial','on'),
    lesson('kusuri','薬','藥；藥物','くすり','名詞','similar','kun'),
    lesson('jikan','時間','時間；時數','じかん','名詞','similar','on'),
    lesson('kyou','今日','今天','きょう','名詞','different','special'),
    lesson('ashita','明日','明天','あした','名詞','different','special'),
    lesson('kinou','昨日','昨天','きのう','名詞','different','special'),
    lesson('tomodachi','友達','朋友','ともだち','名詞','different','mixed'),
    lesson('kazoku','家族','家人；家庭成員','かぞく','名詞','partial','on'),
    lesson('kaisha','会社','公司','かいしゃ','名詞','different','on','reviewed','中文「會社」多指社團或祭祀組織，日文会社是公司。'),
    lesson('shigoto','仕事','工作；職業；任務','しごと','名詞','partial','mixed'),
    lesson('tegami','手紙','信件','てがみ','名詞','different','kun'),
    lesson('kitte','切手','郵票','きって','名詞','different','kun'),
    lesson('shinbun','新聞','報紙','しんぶん','名詞','partial','on','reviewed','中文「新聞」偏向 news；日文新聞通常是 newspaper。'),
    lesson('benkyou','勉強','學習；用功','べんきょう','名詞','different','on'),
    lesson('yakusoku','約束','約定；承諾','やくそく','名詞','different','on'),
    lesson('daijoubu','大丈夫','沒問題；不要緊','だいじょうぶ','な形容詞','different','on'),
    lesson('jouzu','上手','擅長；高明','じょうず','な形容詞','different','on'),
    lesson('heta','下手','不擅長；笨拙','へた','な形容詞','different','special'),
    lesson('benri','便利','方便','べんり','な形容詞','similar','on'),
    lesson('shinsetsu','親切','親切；熱心友善','しんせつ','な形容詞','partial','on'),
    lesson('genki','元気','有精神；健康','げんき','な形容詞','different','on'),
    lesson('kantan','簡単','簡單','かんたん','な形容詞','similar','on'),
    lesson('anzen','安全','安全','あんぜん','な形容詞','similar','on'),
    lesson('anshin','安心','放心；安心','あんしん','名詞','similar','on'),
    lesson('taberu','食べる','吃','たべる','動詞','similar','kun'),
    lesson('nomu','飲む','喝','のむ','動詞','similar','kun'),
    lesson('miru','見る','看；觀看','みる','動詞','similar','kun'),
    lesson('kiku','聞く','聽；詢問','きく','動詞','partial','kun'),
    lesson('kau','買う','買','かう','動詞','similar','kun'),
    lesson('iku','行く','去；前往','いく','動詞','partial','kun'),
    lesson('kaeru','帰る','回去；回家','かえる','動詞','partial','kun'),
    lesson('hataraku','働く','工作；勞動','はたらく','動詞','partial','kun'),
    lesson('yasumu','休む','休息；請假','やすむ','動詞','partial','kun'),
    lesson('hajimeru','始める','開始（他動詞）','はじめる','動詞','partial','kun'),
    lesson('owaru','終わる','結束（自動詞）','おわる','動詞','partial','kun'),
    lesson('sassoku','早速','立刻；馬上','さっそく','副詞','different','on'),
    lesson('zenzen','全然','完全；全然（現代口語也可搭配肯定）','ぜんぜん','副詞','partial','on','needs-review','肯定搭配的語感會隨語境與世代而變，例句需逐筆校對。'),
  ]

  // LOCAL PREVIEW ONLY: meanings and learning labels are not fully approved.
  const STAGING_ADDITIONS = [
  {
    "id": "candidate-ghost-candidate-0004",
    "written": "大学",
    "reading": "だいがく",
    "meaningZhTw": "大學",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1413240",
    "jmdictEntryIds": [
      "1413240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0005",
    "written": "教室",
    "reading": "きょうしつ",
    "meaningZhTw": "教室",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1237150",
    "jmdictEntryIds": [
      "1237150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0007",
    "written": "試験",
    "reading": "しけん",
    "meaningZhTw": "考試",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1312350",
    "jmdictEntryIds": [
      "1312350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0008",
    "written": "宿題",
    "reading": "しゅくだい",
    "meaningZhTw": "作業",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1337270",
    "jmdictEntryIds": [
      "1337270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0010",
    "written": "答え",
    "reading": "こたえ",
    "meaningZhTw": "答案",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1449530",
    "jmdictEntryIds": [
      "1449530"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0011",
    "written": "日本語",
    "reading": "にほんご",
    "meaningZhTw": "日語",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1464530",
    "jmdictEntryIds": [
      "1464530"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0012",
    "written": "英語",
    "reading": "えいご",
    "meaningZhTw": "英語",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1174420",
    "jmdictEntryIds": [
      "1174420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0013",
    "written": "漢字",
    "reading": "かんじ",
    "meaningZhTw": "漢字",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1213170",
    "jmdictEntryIds": [
      "1213170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0014",
    "written": "言葉",
    "reading": "ことば",
    "meaningZhTw": "詞語、語言",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1264540",
    "jmdictEntryIds": [
      "1264540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0015",
    "written": "意味",
    "reading": "いみ",
    "meaningZhTw": "意思、意義",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1156800",
    "jmdictEntryIds": [
      "1156800"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0016",
    "written": "名前",
    "reading": "なまえ",
    "meaningZhTw": "名字",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1531710",
    "jmdictEntryIds": [
      "1531710"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0018",
    "written": "父",
    "reading": "ちち",
    "meaningZhTw": "父親（稱自己的父親）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1497610",
    "jmdictEntryIds": [
      "1497610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0019",
    "written": "母",
    "reading": "はは",
    "meaningZhTw": "母親（稱自己的母親）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1514990",
    "jmdictEntryIds": [
      "1514990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0020",
    "written": "兄",
    "reading": "あに",
    "meaningZhTw": "哥哥（稱自己的哥哥）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1249900",
    "jmdictEntryIds": [
      "1249900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0021",
    "written": "姉",
    "reading": "あね",
    "meaningZhTw": "姊姊（稱自己的姊姊）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1307630",
    "jmdictEntryIds": [
      "1307630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0022",
    "written": "弟",
    "reading": "おとうと",
    "meaningZhTw": "弟弟",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1581930",
    "jmdictEntryIds": [
      "1581930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0023",
    "written": "妹",
    "reading": "いもうと",
    "meaningZhTw": "妹妹",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1524590",
    "jmdictEntryIds": [
      "1524590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0025",
    "written": "子供",
    "reading": "こども",
    "meaningZhTw": "小孩",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1307850",
    "jmdictEntryIds": [
      "1307850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0026",
    "written": "大人",
    "reading": "おとな",
    "meaningZhTw": "成年人、大人",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1414170",
    "jmdictEntryIds": [
      "1414170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0027",
    "written": "部屋",
    "reading": "へや",
    "meaningZhTw": "房間",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1499320",
    "jmdictEntryIds": [
      "1499320"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0028",
    "written": "玄関",
    "reading": "げんかん",
    "meaningZhTw": "玄關",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1263400",
    "jmdictEntryIds": [
      "1263400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0029",
    "written": "台所",
    "reading": "だいどころ",
    "meaningZhTw": "廚房",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1412640",
    "jmdictEntryIds": [
      "1412640"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0032",
    "written": "携帯電話",
    "reading": "けいたいでんわ",
    "meaningZhTw": "手機",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1250690",
    "jmdictEntryIds": [
      "1250690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0033",
    "written": "写真",
    "reading": "しゃしん",
    "meaningZhTw": "照片",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1321900",
    "jmdictEntryIds": [
      "1321900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0034",
    "written": "音楽",
    "reading": "おんがく",
    "meaningZhTw": "音樂",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1183720",
    "jmdictEntryIds": [
      "1183720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0035",
    "written": "映画",
    "reading": "えいが",
    "meaningZhTw": "電影",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1173720",
    "jmdictEntryIds": [
      "1173720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0037",
    "written": "天気",
    "reading": "てんき",
    "meaningZhTw": "天氣",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1438690",
    "jmdictEntryIds": [
      "1438690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0038",
    "written": "雨",
    "reading": "あめ",
    "meaningZhTw": "雨",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1171900",
    "jmdictEntryIds": [
      "1171900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0039",
    "written": "雪",
    "reading": "ゆき",
    "meaningZhTw": "雪",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1386500",
    "jmdictEntryIds": [
      "1386500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0040",
    "written": "風",
    "reading": "かぜ",
    "meaningZhTw": "風",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1499720",
    "jmdictEntryIds": [
      "1499720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0044",
    "written": "毎日",
    "reading": "まいにち",
    "meaningZhTw": "每天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1524720",
    "jmdictEntryIds": [
      "1524720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0045",
    "written": "今週",
    "reading": "こんしゅう",
    "meaningZhTw": "本週",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1289220",
    "jmdictEntryIds": [
      "1289220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0046",
    "written": "来週",
    "reading": "らいしゅう",
    "meaningZhTw": "下週",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1548010",
    "jmdictEntryIds": [
      "1548010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0047",
    "written": "先週",
    "reading": "せんしゅう",
    "meaningZhTw": "上週",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1387870",
    "jmdictEntryIds": [
      "1387870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0048",
    "written": "今年",
    "reading": "ことし",
    "meaningZhTw": "今年",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1579130",
    "jmdictEntryIds": [
      "1579130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0049",
    "written": "来年",
    "reading": "らいねん",
    "meaningZhTw": "明年",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1548220",
    "jmdictEntryIds": [
      "1548220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0051",
    "written": "午前",
    "reading": "ごぜん",
    "meaningZhTw": "上午",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1269060",
    "jmdictEntryIds": [
      "1269060"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0052",
    "written": "午後",
    "reading": "ごご",
    "meaningZhTw": "下午",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1268990",
    "jmdictEntryIds": [
      "1268990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0053",
    "written": "朝",
    "reading": "あさ",
    "meaningZhTw": "早上、早晨",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1428280",
    "jmdictEntryIds": [
      "1428280"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0054",
    "written": "昼",
    "reading": "ひる",
    "meaningZhTw": "白天；中午",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1426250",
    "jmdictEntryIds": [
      "1426250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0055",
    "written": "夜",
    "reading": "よる",
    "meaningZhTw": "夜晚",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1536350",
    "jmdictEntryIds": [
      "1536350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0058",
    "written": "地下鉄",
    "reading": "ちかてつ",
    "meaningZhTw": "地下鐵、捷運",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1420900",
    "jmdictEntryIds": [
      "1420900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0059",
    "written": "新幹線",
    "reading": "しんかんせん",
    "meaningZhTw": "新幹線",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1361590",
    "jmdictEntryIds": [
      "1361590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0060",
    "written": "空港",
    "reading": "くうこう",
    "meaningZhTw": "機場",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1245570",
    "jmdictEntryIds": [
      "1245570"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0061",
    "written": "飛行機",
    "reading": "ひこうき",
    "meaningZhTw": "飛機",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1485470",
    "jmdictEntryIds": [
      "1485470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0062",
    "written": "自転車",
    "reading": "じてんしゃ",
    "meaningZhTw": "腳踏車",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1318290",
    "jmdictEntryIds": [
      "1318290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0063",
    "written": "自動車",
    "reading": "じどうしゃ",
    "meaningZhTw": "汽車",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1318400",
    "jmdictEntryIds": [
      "1318400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0064",
    "written": "道路",
    "reading": "どうろ",
    "meaningZhTw": "道路",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1454290",
    "jmdictEntryIds": [
      "1454290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0065",
    "written": "交差点",
    "reading": "こうさてん",
    "meaningZhTw": "十字路口",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1592970",
    "jmdictEntryIds": [
      "1592970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0066",
    "written": "信号",
    "reading": "しんごう",
    "meaningZhTw": "交通號誌、信號",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1359240",
    "jmdictEntryIds": [
      "1359240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0067",
    "written": "切符",
    "reading": "きっぷ",
    "meaningZhTw": "票券（常指車票）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1385170",
    "jmdictEntryIds": [
      "1385170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0068",
    "written": "乗車券",
    "reading": "じょうしゃけん",
    "meaningZhTw": "乘車券",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1355290",
    "jmdictEntryIds": [
      "1355290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0069",
    "written": "運賃",
    "reading": "うんちん",
    "meaningZhTw": "交通票價、車資；運費",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1172820",
    "jmdictEntryIds": [
      "1172820"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0072",
    "written": "地図",
    "reading": "ちず",
    "meaningZhTw": "地圖",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1421290",
    "jmdictEntryIds": [
      "1421290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0073",
    "written": "旅行",
    "reading": "りょこう",
    "meaningZhTw": "旅行",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1553170",
    "jmdictEntryIds": [
      "1553170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0076",
    "written": "荷物",
    "reading": "にもつ",
    "meaningZhTw": "行李、物品",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1195430",
    "jmdictEntryIds": [
      "1195430"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0077",
    "written": "住所",
    "reading": "じゅうしょ",
    "meaningZhTw": "地址",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1334080",
    "jmdictEntryIds": [
      "1334080"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0078",
    "written": "観光",
    "reading": "かんこう",
    "meaningZhTw": "觀光",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1214840",
    "jmdictEntryIds": [
      "1214840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0080",
    "written": "食事",
    "reading": "しょくじ",
    "meaningZhTw": "用餐、餐食",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1358490",
    "jmdictEntryIds": [
      "1358490"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0081",
    "written": "朝食",
    "reading": "ちょうしょく",
    "meaningZhTw": "早餐",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1428390",
    "jmdictEntryIds": [
      "1428390"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0082",
    "written": "昼食",
    "reading": "ちゅうしょく",
    "meaningZhTw": "午餐",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1602330",
    "jmdictEntryIds": [
      "1602330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0083",
    "written": "夕食",
    "reading": "ゆうしょく",
    "meaningZhTw": "晚餐",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1542730",
    "jmdictEntryIds": [
      "1542730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0085",
    "written": "野菜",
    "reading": "やさい",
    "meaningZhTw": "蔬菜",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1537370",
    "jmdictEntryIds": [
      "1537370"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0086",
    "written": "果物",
    "reading": "くだもの",
    "meaningZhTw": "水果",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1193060",
    "jmdictEntryIds": [
      "1193060"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0087",
    "written": "牛肉",
    "reading": "ぎゅうにく",
    "meaningZhTw": "牛肉",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1231580",
    "jmdictEntryIds": [
      "1231580"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0088",
    "written": "豚肉",
    "reading": "ぶたにく",
    "meaningZhTw": "豬肉",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1457440",
    "jmdictEntryIds": [
      "1457440"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0089",
    "written": "鶏肉",
    "reading": "とりにく",
    "meaningZhTw": "雞肉",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1253020",
    "jmdictEntryIds": [
      "1253020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0090",
    "written": "魚",
    "reading": "さかな",
    "meaningZhTw": "魚",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1578010",
    "jmdictEntryIds": [
      "1578010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0091",
    "written": "水",
    "reading": "みず",
    "meaningZhTw": "水",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1371260",
    "jmdictEntryIds": [
      "1371260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0092",
    "written": "お茶",
    "reading": "おちゃ",
    "meaningZhTw": "茶",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1002430",
    "jmdictEntryIds": [
      "1002430"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0093",
    "written": "飲み物",
    "reading": "のみもの",
    "meaningZhTw": "飲料",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1600430",
    "jmdictEntryIds": [
      "1600430"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0094",
    "written": "食べ物",
    "reading": "たべもの",
    "meaningZhTw": "食物",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1358340",
    "jmdictEntryIds": [
      "1358340"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0095",
    "written": "注文",
    "reading": "ちゅうもん",
    "meaningZhTw": "點餐、訂購",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1426650",
    "jmdictEntryIds": [
      "1426650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0097",
    "written": "値段",
    "reading": "ねだん",
    "meaningZhTw": "價格",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1600160",
    "jmdictEntryIds": [
      "1600160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0098",
    "written": "買い物",
    "reading": "かいもの",
    "meaningZhTw": "購物",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1589730",
    "jmdictEntryIds": [
      "1589730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0099",
    "written": "商品",
    "reading": "しょうひん",
    "meaningZhTw": "商品",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1347310",
    "jmdictEntryIds": [
      "1347310"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0100",
    "written": "店員",
    "reading": "てんいん",
    "meaningZhTw": "店員",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1440670",
    "jmdictEntryIds": [
      "1440670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0101",
    "written": "現金",
    "reading": "げんきん",
    "meaningZhTw": "現金",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1263550",
    "jmdictEntryIds": [
      "1263550"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0102",
    "written": "財布",
    "reading": "さいふ",
    "meaningZhTw": "錢包",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1296970",
    "jmdictEntryIds": [
      "1296970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0104",
    "written": "医者",
    "reading": "いしゃ",
    "meaningZhTw": "醫生",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1159980",
    "jmdictEntryIds": [
      "1159980"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0106",
    "written": "頭",
    "reading": "あたま",
    "meaningZhTw": "頭",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1582310",
    "jmdictEntryIds": [
      "1582310"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0107",
    "written": "体",
    "reading": "からだ",
    "meaningZhTw": "身體",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1409140",
    "jmdictEntryIds": [
      "1409140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0108",
    "written": "熱",
    "reading": "ねつ",
    "meaningZhTw": "熱度；發燒時的體溫",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1467710",
    "jmdictEntryIds": [
      "1467710"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0111",
    "written": "社員",
    "reading": "しゃいん",
    "meaningZhTw": "職員、公司員工",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1322670",
    "jmdictEntryIds": [
      "1322670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0112",
    "written": "会議",
    "reading": "かいぎ",
    "meaningZhTw": "會議",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1198360",
    "jmdictEntryIds": [
      "1198360"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0113",
    "written": "休み",
    "reading": "やすみ",
    "meaningZhTw": "休息、假日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1227500",
    "jmdictEntryIds": [
      "1227500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0114",
    "written": "給料",
    "reading": "きゅうりょう",
    "meaningZhTw": "薪水",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1230360",
    "jmdictEntryIds": [
      "1230360"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0116",
    "written": "連絡",
    "reading": "れんらく",
    "meaningZhTw": "聯絡",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1559900",
    "jmdictEntryIds": [
      "1559900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0117",
    "written": "返事",
    "reading": "へんじ",
    "meaningZhTw": "回覆、答覆",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1512220",
    "jmdictEntryIds": [
      "1512220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0118",
    "written": "相談",
    "reading": "そうだん",
    "meaningZhTw": "商量、諮詢",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1401210",
    "jmdictEntryIds": [
      "1401210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0120",
    "written": "家",
    "reading": "いえ",
    "meaningZhTw": "家",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1191730",
    "jmdictEntryIds": [
      "1191730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0121",
    "written": "家庭",
    "reading": "かてい",
    "meaningZhTw": "家庭",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1192280",
    "jmdictEntryIds": [
      "1192280"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0122",
    "written": "家事",
    "reading": "かじ",
    "meaningZhTw": "家務",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1191980",
    "jmdictEntryIds": [
      "1191980"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0123",
    "written": "家賃",
    "reading": "やちん",
    "meaningZhTw": "房租",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1192270",
    "jmdictEntryIds": [
      "1192270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0124",
    "written": "住宅",
    "reading": "じゅうたく",
    "meaningZhTw": "住宅",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1334150",
    "jmdictEntryIds": [
      "1334150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0125",
    "written": "住民",
    "reading": "じゅうみん",
    "meaningZhTw": "居民",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1334210",
    "jmdictEntryIds": [
      "1334210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0126",
    "written": "住む",
    "reading": "すむ",
    "meaningZhTw": "居住",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1334040",
    "jmdictEntryIds": [
      "1334040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0127",
    "written": "引っ越し",
    "reading": "ひっこし",
    "meaningZhTw": "搬家",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1601880",
    "jmdictEntryIds": [
      "1601880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0128",
    "written": "引っ越す",
    "reading": "ひっこす",
    "meaningZhTw": "搬家",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1169340",
    "jmdictEntryIds": [
      "1169340"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0129",
    "written": "建物",
    "reading": "たてもの",
    "meaningZhTw": "建築物",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1257540",
    "jmdictEntryIds": [
      "1257540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0130",
    "written": "建てる",
    "reading": "たてる",
    "meaningZhTw": "建造",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1257330",
    "jmdictEntryIds": [
      "1257330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0131",
    "written": "庭",
    "reading": "にわ",
    "meaningZhTw": "庭院",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1436130",
    "jmdictEntryIds": [
      "1436130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0132",
    "written": "屋根",
    "reading": "やね",
    "meaningZhTw": "屋頂",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1182700",
    "jmdictEntryIds": [
      "1182700"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0133",
    "written": "窓",
    "reading": "まど",
    "meaningZhTw": "窗戶",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1401400",
    "jmdictEntryIds": [
      "1401400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0134",
    "written": "扉",
    "reading": "とびら",
    "meaningZhTw": "門扉",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1483380",
    "jmdictEntryIds": [
      "1483380"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0135",
    "written": "鍵",
    "reading": "かぎ",
    "meaningZhTw": "鑰匙",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1260490",
    "jmdictEntryIds": [
      "1260490"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0136",
    "written": "階段",
    "reading": "かいだん",
    "meaningZhTw": "樓梯",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1203090",
    "jmdictEntryIds": [
      "1203090"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0137",
    "written": "廊下",
    "reading": "ろうか",
    "meaningZhTw": "走廊",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1560670",
    "jmdictEntryIds": [
      "1560670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0139",
    "written": "天井",
    "reading": "てんじょう",
    "meaningZhTw": "天花板",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1438340",
    "jmdictEntryIds": [
      "1438340"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0140",
    "written": "壁",
    "reading": "かべ",
    "meaningZhTw": "牆壁",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1509290",
    "jmdictEntryIds": [
      "1509290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0141",
    "written": "家具",
    "reading": "かぐ",
    "meaningZhTw": "家具",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1191870",
    "jmdictEntryIds": [
      "1191870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0142",
    "written": "机",
    "reading": "つくえ",
    "meaningZhTw": "桌子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1220210",
    "jmdictEntryIds": [
      "1220210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0143",
    "written": "椅子",
    "reading": "いす",
    "meaningZhTw": "椅子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1157070",
    "jmdictEntryIds": [
      "1157070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0144",
    "written": "本棚",
    "reading": "ほんだな",
    "meaningZhTw": "書架",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1522980",
    "jmdictEntryIds": [
      "1522980"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0145",
    "written": "棚",
    "reading": "たな",
    "meaningZhTw": "架子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1416700",
    "jmdictEntryIds": [
      "1416700"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0146",
    "written": "寝室",
    "reading": "しんしつ",
    "meaningZhTw": "臥室",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1360140",
    "jmdictEntryIds": [
      "1360140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0147",
    "written": "居間",
    "reading": "いま",
    "meaningZhTw": "客廳",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1231720",
    "jmdictEntryIds": [
      "1231720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0148",
    "written": "浴室",
    "reading": "よくしつ",
    "meaningZhTw": "浴室",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1547460",
    "jmdictEntryIds": [
      "1547460"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0149",
    "written": "洗面所",
    "reading": "せんめんじょ",
    "meaningZhTw": "盥洗室",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1391070",
    "jmdictEntryIds": [
      "1391070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0150",
    "written": "洗濯",
    "reading": "せんたく",
    "meaningZhTw": "洗衣",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1390980",
    "jmdictEntryIds": [
      "1390980"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0151",
    "written": "洗濯機",
    "reading": "せんたくき",
    "meaningZhTw": "洗衣機",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1390990",
    "jmdictEntryIds": [
      "1390990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0152",
    "written": "掃除",
    "reading": "そうじ",
    "meaningZhTw": "打掃",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1399790",
    "jmdictEntryIds": [
      "1399790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0153",
    "written": "掃除機",
    "reading": "そうじき",
    "meaningZhTw": "吸塵器",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1596390",
    "jmdictEntryIds": [
      "1596390"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0154",
    "written": "冷蔵庫",
    "reading": "れいぞうこ",
    "meaningZhTw": "冰箱",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1557110",
    "jmdictEntryIds": [
      "1557110"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0155",
    "written": "炊飯器",
    "reading": "すいはんき",
    "meaningZhTw": "電子鍋",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1372360",
    "jmdictEntryIds": [
      "1372360"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0156",
    "written": "電気",
    "reading": "でんき",
    "meaningZhTw": "電力、電燈",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1443000",
    "jmdictEntryIds": [
      "1443000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0157",
    "written": "電灯",
    "reading": "でんとう",
    "meaningZhTw": "電燈",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1443660",
    "jmdictEntryIds": [
      "1443660"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0158",
    "written": "電池",
    "reading": "でんち",
    "meaningZhTw": "電池",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1443620",
    "jmdictEntryIds": [
      "1443620"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0159",
    "written": "電源",
    "reading": "でんげん",
    "meaningZhTw": "電源",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1443220",
    "jmdictEntryIds": [
      "1443220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0160",
    "written": "暖房",
    "reading": "だんぼう",
    "meaningZhTw": "暖氣",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1419860",
    "jmdictEntryIds": [
      "1419860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0161",
    "written": "冷房",
    "reading": "れいぼう",
    "meaningZhTw": "冷氣",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1557290",
    "jmdictEntryIds": [
      "1557290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0162",
    "written": "空調",
    "reading": "くうちょう",
    "meaningZhTw": "空調",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1245860",
    "jmdictEntryIds": [
      "1245860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0163",
    "written": "扇風機",
    "reading": "せんぷうき",
    "meaningZhTw": "電風扇",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1390760",
    "jmdictEntryIds": [
      "1390760"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0164",
    "written": "石鹸",
    "reading": "せっけん",
    "meaningZhTw": "肥皂",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1382590",
    "jmdictEntryIds": [
      "1382590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0166",
    "written": "鏡",
    "reading": "かがみ",
    "meaningZhTw": "鏡子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1238550,2017840",
    "jmdictEntryIds": [
      "1238550",
      "2017840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0167",
    "written": "布団",
    "reading": "ふとん",
    "meaningZhTw": "日式寢具",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1496890",
    "jmdictEntryIds": [
      "1496890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0168",
    "written": "枕",
    "reading": "まくら",
    "meaningZhTw": "枕頭",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1524860",
    "jmdictEntryIds": [
      "1524860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0169",
    "written": "毛布",
    "reading": "もうふ",
    "meaningZhTw": "毛毯",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1533950",
    "jmdictEntryIds": [
      "1533950"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0170",
    "written": "寝る",
    "reading": "ねる",
    "meaningZhTw": "睡覺；躺下",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1360010",
    "jmdictEntryIds": [
      "1360010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0173",
    "written": "眠る",
    "reading": "ねむる",
    "meaningZhTw": "睡眠",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1529390",
    "jmdictEntryIds": [
      "1529390"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0174",
    "written": "眠い",
    "reading": "ねむい",
    "meaningZhTw": "想睡的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1529330",
    "jmdictEntryIds": [
      "1529330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0175",
    "written": "生活",
    "reading": "せいかつ",
    "meaningZhTw": "生活",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1378860",
    "jmdictEntryIds": [
      "1378860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0176",
    "written": "暮らす",
    "reading": "くらす",
    "meaningZhTw": "過日子",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1514940",
    "jmdictEntryIds": [
      "1514940"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0177",
    "written": "日常",
    "reading": "にちじょう",
    "meaningZhTw": "日常",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1464180",
    "jmdictEntryIds": [
      "1464180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0178",
    "written": "習慣",
    "reading": "しゅうかん",
    "meaningZhTw": "習慣",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1333090",
    "jmdictEntryIds": [
      "1333090"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0179",
    "written": "毎朝",
    "reading": "まいあさ",
    "meaningZhTw": "每天早上",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1524700",
    "jmdictEntryIds": [
      "1524700"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0180",
    "written": "毎晩",
    "reading": "まいばん",
    "meaningZhTw": "每天晚上",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1524730",
    "jmdictEntryIds": [
      "1524730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0181",
    "written": "週末",
    "reading": "しゅうまつ",
    "meaningZhTw": "週末",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1333520",
    "jmdictEntryIds": [
      "1333520"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0182",
    "written": "平日",
    "reading": "へいじつ",
    "meaningZhTw": "平日",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1507720",
    "jmdictEntryIds": [
      "1507720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0183",
    "written": "休日",
    "reading": "きゅうじつ",
    "meaningZhTw": "假日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1228040",
    "jmdictEntryIds": [
      "1228040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0184",
    "written": "祝日",
    "reading": "しゅくじつ",
    "meaningZhTw": "國定假日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1337500",
    "jmdictEntryIds": [
      "1337500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0185",
    "written": "連休",
    "reading": "れんきゅう",
    "meaningZhTw": "連假",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1559380",
    "jmdictEntryIds": [
      "1559380"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0186",
    "written": "予定",
    "reading": "よてい",
    "meaningZhTw": "預定、計畫",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1543240",
    "jmdictEntryIds": [
      "1543240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0187",
    "written": "計画",
    "reading": "けいかく",
    "meaningZhTw": "計畫",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1252090",
    "jmdictEntryIds": [
      "1252090"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0188",
    "written": "準備",
    "reading": "じゅんび",
    "meaningZhTw": "準備",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1341670",
    "jmdictEntryIds": [
      "1341670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0189",
    "written": "片付ける",
    "reading": "かたづける",
    "meaningZhTw": "收拾",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1511790",
    "jmdictEntryIds": [
      "1511790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0190",
    "written": "捨てる",
    "reading": "すてる",
    "meaningZhTw": "丟棄",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1322320",
    "jmdictEntryIds": [
      "1322320"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0191",
    "written": "拾う",
    "reading": "ひろう",
    "meaningZhTw": "撿起",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1332570",
    "jmdictEntryIds": [
      "1332570"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0192",
    "written": "置く",
    "reading": "おく",
    "meaningZhTw": "放置",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1421850",
    "jmdictEntryIds": [
      "1421850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0193",
    "written": "探す",
    "reading": "さがす",
    "meaningZhTw": "尋找",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1593670",
    "jmdictEntryIds": [
      "1593670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0194",
    "written": "見つける",
    "reading": "みつける",
    "meaningZhTw": "找到",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1604570",
    "jmdictEntryIds": [
      "1604570"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0195",
    "written": "忘れる",
    "reading": "わすれる",
    "meaningZhTw": "忘記",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1519210",
    "jmdictEntryIds": [
      "1519210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0196",
    "written": "覚える",
    "reading": "おぼえる",
    "meaningZhTw": "記住",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1206050",
    "jmdictEntryIds": [
      "1206050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0197",
    "written": "思い出す",
    "reading": "おもいだす",
    "meaningZhTw": "想起",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1309260",
    "jmdictEntryIds": [
      "1309260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0198",
    "written": "必要",
    "reading": "ひつよう",
    "meaningZhTw": "必要",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1487660",
    "jmdictEntryIds": [
      "1487660"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0199",
    "written": "大切",
    "reading": "たいせつ",
    "meaningZhTw": "重要、珍貴",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1414340",
    "jmdictEntryIds": [
      "1414340"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0201",
    "written": "不便",
    "reading": "ふべん",
    "meaningZhTw": "不方便",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1494860",
    "jmdictEntryIds": [
      "1494860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0203",
    "written": "難しい",
    "reading": "むずかしい",
    "meaningZhTw": "困難的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1460850",
    "jmdictEntryIds": [
      "1460850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0204",
    "written": "人",
    "reading": "ひと",
    "meaningZhTw": "人",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1580640",
    "jmdictEntryIds": [
      "1580640"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0205",
    "written": "男性",
    "reading": "だんせい",
    "meaningZhTw": "男性",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1420160",
    "jmdictEntryIds": [
      "1420160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0206",
    "written": "女性",
    "reading": "じょせい",
    "meaningZhTw": "女性",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1345250",
    "jmdictEntryIds": [
      "1345250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0207",
    "written": "男の子",
    "reading": "おとこのこ",
    "meaningZhTw": "男孩",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1420010",
    "jmdictEntryIds": [
      "1420010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0208",
    "written": "女の子",
    "reading": "おんなのこ",
    "meaningZhTw": "女孩",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1344970",
    "jmdictEntryIds": [
      "1344970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0209",
    "written": "赤ちゃん",
    "reading": "あかちゃん",
    "meaningZhTw": "嬰兒",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1383260",
    "jmdictEntryIds": [
      "1383260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0210",
    "written": "夫",
    "reading": "おっと",
    "meaningZhTw": "丈夫",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1496480",
    "jmdictEntryIds": [
      "1496480"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0211",
    "written": "妻",
    "reading": "つま",
    "meaningZhTw": "妻子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1294330,2746070,2852371",
    "jmdictEntryIds": [
      "1294330",
      "2746070",
      "2852371"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0212",
    "written": "夫婦",
    "reading": "ふうふ",
    "meaningZhTw": "夫妻",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1583640",
    "jmdictEntryIds": [
      "1583640"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0213",
    "written": "両親",
    "reading": "りょうしん",
    "meaningZhTw": "父母",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1602710",
    "jmdictEntryIds": [
      "1602710"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0215",
    "written": "祖父",
    "reading": "そふ",
    "meaningZhTw": "祖父、外祖父",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1396840",
    "jmdictEntryIds": [
      "1396840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0216",
    "written": "祖母",
    "reading": "そぼ",
    "meaningZhTw": "祖母、外祖母",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1396860",
    "jmdictEntryIds": [
      "1396860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0217",
    "written": "孫",
    "reading": "まご",
    "meaningZhTw": "孫子女",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1406230",
    "jmdictEntryIds": [
      "1406230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0218",
    "written": "親戚",
    "reading": "しんせき",
    "meaningZhTw": "親戚",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1365230",
    "jmdictEntryIds": [
      "1365230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0220",
    "written": "恋人",
    "reading": "こいびと",
    "meaningZhTw": "戀人",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1558920",
    "jmdictEntryIds": [
      "1558920"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0221",
    "written": "彼氏",
    "reading": "かれし",
    "meaningZhTw": "男朋友",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1483140",
    "jmdictEntryIds": [
      "1483140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0223",
    "written": "結婚",
    "reading": "けっこん",
    "meaningZhTw": "結婚",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1254790",
    "jmdictEntryIds": [
      "1254790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0224",
    "written": "離婚",
    "reading": "りこん",
    "meaningZhTw": "離婚",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1550880",
    "jmdictEntryIds": [
      "1550880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0225",
    "written": "誕生日",
    "reading": "たんじょうび",
    "meaningZhTw": "生日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1419110",
    "jmdictEntryIds": [
      "1419110"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0226",
    "written": "年齢",
    "reading": "ねんれい",
    "meaningZhTw": "年齡",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1600240",
    "jmdictEntryIds": [
      "1600240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0227",
    "written": "年上",
    "reading": "としうえ",
    "meaningZhTw": "年紀較大",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1468870",
    "jmdictEntryIds": [
      "1468870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0228",
    "written": "年下",
    "reading": "としした",
    "meaningZhTw": "年紀較小",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1468230",
    "jmdictEntryIds": [
      "1468230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0229",
    "written": "同級生",
    "reading": "どうきゅうせい",
    "meaningZhTw": "同學",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1452120",
    "jmdictEntryIds": [
      "1452120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0230",
    "written": "同僚",
    "reading": "どうりょう",
    "meaningZhTw": "同事",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1453580",
    "jmdictEntryIds": [
      "1453580"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0231",
    "written": "上司",
    "reading": "じょうし",
    "meaningZhTw": "上司",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1353260",
    "jmdictEntryIds": [
      "1353260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0232",
    "written": "部下",
    "reading": "ぶか",
    "meaningZhTw": "下屬",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1499350",
    "jmdictEntryIds": [
      "1499350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0233",
    "written": "先輩",
    "reading": "せんぱい",
    "meaningZhTw": "前輩",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1388410",
    "jmdictEntryIds": [
      "1388410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0234",
    "written": "後輩",
    "reading": "こうはい",
    "meaningZhTw": "後輩",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1270010",
    "jmdictEntryIds": [
      "1270010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0235",
    "written": "隣人",
    "reading": "りんじん",
    "meaningZhTw": "鄰居",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1555850",
    "jmdictEntryIds": [
      "1555850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0236",
    "written": "近所",
    "reading": "きんじょ",
    "meaningZhTw": "附近",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1242350",
    "jmdictEntryIds": [
      "1242350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0237",
    "written": "客",
    "reading": "きゃく",
    "meaningZhTw": "客人",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1226630",
    "jmdictEntryIds": [
      "1226630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0238",
    "written": "お客様",
    "reading": "おきゃくさま",
    "meaningZhTw": "客人（敬稱）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1001770",
    "jmdictEntryIds": [
      "1001770"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0239",
    "written": "知り合い",
    "reading": "しりあい",
    "meaningZhTw": "熟人",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1595070",
    "jmdictEntryIds": [
      "1595070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0240",
    "written": "仲間",
    "reading": "なかま",
    "meaningZhTw": "夥伴",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1425790",
    "jmdictEntryIds": [
      "1425790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0241",
    "written": "友人",
    "reading": "ゆうじん",
    "meaningZhTw": "朋友",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1540150",
    "jmdictEntryIds": [
      "1540150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0242",
    "written": "相手",
    "reading": "あいて",
    "meaningZhTw": "對方",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1401000",
    "jmdictEntryIds": [
      "1401000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0243",
    "written": "自分",
    "reading": "じぶん",
    "meaningZhTw": "自己",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1318610",
    "jmdictEntryIds": [
      "1318610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0244",
    "written": "皆",
    "reading": "みんな",
    "meaningZhTw": "大家、全體",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1202150",
    "jmdictEntryIds": [
      "1202150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0245",
    "written": "皆さん",
    "reading": "みなさん",
    "meaningZhTw": "各位",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1202170",
    "jmdictEntryIds": [
      "1202170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0246",
    "written": "誰",
    "reading": "だれ",
    "meaningZhTw": "誰",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1416830",
    "jmdictEntryIds": [
      "1416830"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0247",
    "written": "何",
    "reading": "なに",
    "meaningZhTw": "什麼",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1577100",
    "jmdictEntryIds": [
      "1577100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0249",
    "written": "一人",
    "reading": "ひとり",
    "meaningZhTw": "一個人",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1576150",
    "jmdictEntryIds": [
      "1576150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0250",
    "written": "二人",
    "reading": "ふたり",
    "meaningZhTw": "兩個人",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1582670",
    "jmdictEntryIds": [
      "1582670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0251",
    "written": "大勢",
    "reading": "おおぜい",
    "meaningZhTw": "許多人",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1414220",
    "jmdictEntryIds": [
      "1414220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0252",
    "written": "紹介",
    "reading": "しょうかい",
    "meaningZhTw": "介紹",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1351430",
    "jmdictEntryIds": [
      "1351430"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0253",
    "written": "自己紹介",
    "reading": "じこしょうかい",
    "meaningZhTw": "自我介紹",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1317650",
    "jmdictEntryIds": [
      "1317650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0254",
    "written": "挨拶",
    "reading": "あいさつ",
    "meaningZhTw": "問候",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1151120",
    "jmdictEntryIds": [
      "1151120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0255",
    "written": "会う",
    "reading": "あう",
    "meaningZhTw": "見面",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1198180",
    "jmdictEntryIds": [
      "1198180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0256",
    "written": "話す",
    "reading": "はなす",
    "meaningZhTw": "說話",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1562350",
    "jmdictEntryIds": [
      "1562350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0258",
    "written": "伝える",
    "reading": "つたえる",
    "meaningZhTw": "傳達",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1441870",
    "jmdictEntryIds": [
      "1441870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0259",
    "written": "教える",
    "reading": "おしえる",
    "meaningZhTw": "教導",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1236900",
    "jmdictEntryIds": [
      "1236900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0260",
    "written": "頼む",
    "reading": "たのむ",
    "meaningZhTw": "拜託",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1548370",
    "jmdictEntryIds": [
      "1548370"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0261",
    "written": "お願い",
    "reading": "おねがい",
    "meaningZhTw": "請求、拜託",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2036870",
    "jmdictEntryIds": [
      "2036870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0262",
    "written": "返信",
    "reading": "へんしん",
    "meaningZhTw": "回信",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1512240",
    "jmdictEntryIds": [
      "1512240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0263",
    "written": "招待",
    "reading": "しょうたい",
    "meaningZhTw": "招待",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1349610",
    "jmdictEntryIds": [
      "1349610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0264",
    "written": "参加",
    "reading": "さんか",
    "meaningZhTw": "參加",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1302090",
    "jmdictEntryIds": [
      "1302090"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0265",
    "written": "出席",
    "reading": "しゅっせき",
    "meaningZhTw": "出席",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1339460",
    "jmdictEntryIds": [
      "1339460"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0266",
    "written": "欠席",
    "reading": "けっせき",
    "meaningZhTw": "缺席",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1254020",
    "jmdictEntryIds": [
      "1254020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0267",
    "written": "感謝",
    "reading": "かんしゃ",
    "meaningZhTw": "感謝",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1212380",
    "jmdictEntryIds": [
      "1212380"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0268",
    "written": "謝る",
    "reading": "あやまる",
    "meaningZhTw": "道歉",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1323010",
    "jmdictEntryIds": [
      "1323010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0269",
    "written": "許す",
    "reading": "ゆるす",
    "meaningZhTw": "原諒、允許",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1232870",
    "jmdictEntryIds": [
      "1232870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0270",
    "written": "手伝う",
    "reading": "てつだう",
    "meaningZhTw": "幫忙",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1328190",
    "jmdictEntryIds": [
      "1328190"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0271",
    "written": "助ける",
    "reading": "たすける",
    "meaningZhTw": "幫助",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1344410",
    "jmdictEntryIds": [
      "1344410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0272",
    "written": "応援",
    "reading": "おうえん",
    "meaningZhTw": "聲援、支持",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1179840",
    "jmdictEntryIds": [
      "1179840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0273",
    "written": "心配",
    "reading": "しんぱい",
    "meaningZhTw": "擔心",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1360930",
    "jmdictEntryIds": [
      "1360930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0275",
    "written": "信頼",
    "reading": "しんらい",
    "meaningZhTw": "信任",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1359730",
    "jmdictEntryIds": [
      "1359730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0276",
    "written": "尊敬",
    "reading": "そんけい",
    "meaningZhTw": "尊敬",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1406400",
    "jmdictEntryIds": [
      "1406400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0277",
    "written": "反対",
    "reading": "はんたい",
    "meaningZhTw": "反對",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1480670",
    "jmdictEntryIds": [
      "1480670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0278",
    "written": "賛成",
    "reading": "さんせい",
    "meaningZhTw": "贊成",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1304200",
    "jmdictEntryIds": [
      "1304200"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0279",
    "written": "意見",
    "reading": "いけん",
    "meaningZhTw": "意見",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1156530",
    "jmdictEntryIds": [
      "1156530"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0280",
    "written": "理由",
    "reading": "りゆう",
    "meaningZhTw": "理由",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1550140",
    "jmdictEntryIds": [
      "1550140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0281",
    "written": "説明",
    "reading": "せつめい",
    "meaningZhTw": "說明",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1386460",
    "jmdictEntryIds": [
      "1386460"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0282",
    "written": "理解",
    "reading": "りかい",
    "meaningZhTw": "理解",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1549910",
    "jmdictEntryIds": [
      "1549910"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0283",
    "written": "誤解",
    "reading": "ごかい",
    "meaningZhTw": "誤解",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1271310",
    "jmdictEntryIds": [
      "1271310"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0284",
    "written": "気持ち",
    "reading": "きもち",
    "meaningZhTw": "心情",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1591430",
    "jmdictEntryIds": [
      "1591430"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0285",
    "written": "気分",
    "reading": "きぶん",
    "meaningZhTw": "心情、情緒",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1222590",
    "jmdictEntryIds": [
      "1222590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0286",
    "written": "感情",
    "reading": "かんじょう",
    "meaningZhTw": "感情",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1212410",
    "jmdictEntryIds": [
      "1212410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0287",
    "written": "嬉しい",
    "reading": "うれしい",
    "meaningZhTw": "高興的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1219510",
    "jmdictEntryIds": [
      "1219510"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0288",
    "written": "悲しい",
    "reading": "かなしい",
    "meaningZhTw": "難過的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1483190",
    "jmdictEntryIds": [
      "1483190"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0289",
    "written": "楽しい",
    "reading": "たのしい",
    "meaningZhTw": "開心的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1207240",
    "jmdictEntryIds": [
      "1207240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0290",
    "written": "寂しい",
    "reading": "さびしい",
    "meaningZhTw": "寂寞的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1579720",
    "jmdictEntryIds": [
      "1579720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0291",
    "written": "怖い",
    "reading": "こわい",
    "meaningZhTw": "可怕的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1593480",
    "jmdictEntryIds": [
      "1593480"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0292",
    "written": "恥ずかしい",
    "reading": "はずかしい",
    "meaningZhTw": "害羞的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1421630",
    "jmdictEntryIds": [
      "1421630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0293",
    "written": "優しい",
    "reading": "やさしい",
    "meaningZhTw": "溫柔的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1539040",
    "jmdictEntryIds": [
      "1539040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0294",
    "written": "厳しい",
    "reading": "きびしい",
    "meaningZhTw": "嚴格的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1262530",
    "jmdictEntryIds": [
      "1262530"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0297",
    "written": "今",
    "reading": "いま",
    "meaningZhTw": "現在",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1288850",
    "jmdictEntryIds": [
      "1288850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0298",
    "written": "昔",
    "reading": "むかし",
    "meaningZhTw": "從前",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1382370",
    "jmdictEntryIds": [
      "1382370"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0299",
    "written": "未来",
    "reading": "みらい",
    "meaningZhTw": "未來",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1528060",
    "jmdictEntryIds": [
      "1528060"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0300",
    "written": "過去",
    "reading": "かこ",
    "meaningZhTw": "過去",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1196030",
    "jmdictEntryIds": [
      "1196030"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0301",
    "written": "現在",
    "reading": "げんざい",
    "meaningZhTw": "現在",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1263650",
    "jmdictEntryIds": [
      "1263650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0302",
    "written": "最近",
    "reading": "さいきん",
    "meaningZhTw": "最近",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1293780",
    "jmdictEntryIds": [
      "1293780"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0303",
    "written": "先日",
    "reading": "せんじつ",
    "meaningZhTw": "前幾天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1388300",
    "jmdictEntryIds": [
      "1388300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0304",
    "written": "今朝",
    "reading": "けさ",
    "meaningZhTw": "今天早上",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1579100",
    "jmdictEntryIds": [
      "1579100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0305",
    "written": "今晩",
    "reading": "こんばん",
    "meaningZhTw": "今晚",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1289470",
    "jmdictEntryIds": [
      "1289470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0306",
    "written": "今夜",
    "reading": "こんや",
    "meaningZhTw": "今晚",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1289520",
    "jmdictEntryIds": [
      "1289520"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0307",
    "written": "明後日",
    "reading": "あさって",
    "meaningZhTw": "後天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1584640",
    "jmdictEntryIds": [
      "1584640"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0308",
    "written": "一昨日",
    "reading": "おととい",
    "meaningZhTw": "前天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1576050",
    "jmdictEntryIds": [
      "1576050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0309",
    "written": "毎週",
    "reading": "まいしゅう",
    "meaningZhTw": "每週",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1524690",
    "jmdictEntryIds": [
      "1524690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0310",
    "written": "毎月",
    "reading": "まいつき",
    "meaningZhTw": "每個月",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1584350",
    "jmdictEntryIds": [
      "1584350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0311",
    "written": "毎年",
    "reading": "まいとし",
    "meaningZhTw": "每年",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1584360",
    "jmdictEntryIds": [
      "1584360"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0312",
    "written": "先月",
    "reading": "せんげつ",
    "meaningZhTw": "上個月",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1387500",
    "jmdictEntryIds": [
      "1387500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0313",
    "written": "今月",
    "reading": "こんげつ",
    "meaningZhTw": "這個月",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1289100",
    "jmdictEntryIds": [
      "1289100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0314",
    "written": "来月",
    "reading": "らいげつ",
    "meaningZhTw": "下個月",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1547900",
    "jmdictEntryIds": [
      "1547900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0315",
    "written": "去年",
    "reading": "きょねん",
    "meaningZhTw": "去年",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1231690",
    "jmdictEntryIds": [
      "1231690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0316",
    "written": "一昨年",
    "reading": "おととし",
    "meaningZhTw": "前年",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1576060",
    "jmdictEntryIds": [
      "1576060"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0317",
    "written": "再来年",
    "reading": "さらいねん",
    "meaningZhTw": "後年",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1293660",
    "jmdictEntryIds": [
      "1293660"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0318",
    "written": "月曜日",
    "reading": "げつようび",
    "meaningZhTw": "星期一",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1255890",
    "jmdictEntryIds": [
      "1255890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0319",
    "written": "火曜日",
    "reading": "かようび",
    "meaningZhTw": "星期二",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1194290",
    "jmdictEntryIds": [
      "1194290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0320",
    "written": "水曜日",
    "reading": "すいようび",
    "meaningZhTw": "星期三",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1372190",
    "jmdictEntryIds": [
      "1372190"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0321",
    "written": "木曜日",
    "reading": "もくようび",
    "meaningZhTw": "星期四",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1534890",
    "jmdictEntryIds": [
      "1534890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0322",
    "written": "金曜日",
    "reading": "きんようび",
    "meaningZhTw": "星期五",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1243320",
    "jmdictEntryIds": [
      "1243320"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0323",
    "written": "土曜日",
    "reading": "どようび",
    "meaningZhTw": "星期六",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1445590",
    "jmdictEntryIds": [
      "1445590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0324",
    "written": "日曜日",
    "reading": "にちようび",
    "meaningZhTw": "星期日",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1464900",
    "jmdictEntryIds": [
      "1464900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0325",
    "written": "曜日",
    "reading": "ようび",
    "meaningZhTw": "星期幾",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1545770",
    "jmdictEntryIds": [
      "1545770"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0327",
    "written": "二月",
    "reading": "にがつ",
    "meaningZhTw": "二月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1461560",
    "jmdictEntryIds": [
      "1461560"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0328",
    "written": "三月",
    "reading": "さんがつ",
    "meaningZhTw": "三月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1300250",
    "jmdictEntryIds": [
      "1300250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0329",
    "written": "四月",
    "reading": "しがつ",
    "meaningZhTw": "四月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1307180",
    "jmdictEntryIds": [
      "1307180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0330",
    "written": "五月",
    "reading": "ごがつ",
    "meaningZhTw": "五月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1268170",
    "jmdictEntryIds": [
      "1268170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0331",
    "written": "六月",
    "reading": "ろくがつ",
    "meaningZhTw": "六月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1561330",
    "jmdictEntryIds": [
      "1561330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0333",
    "written": "八月",
    "reading": "はちがつ",
    "meaningZhTw": "八月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1476730",
    "jmdictEntryIds": [
      "1476730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0335",
    "written": "十月",
    "reading": "じゅうがつ",
    "meaningZhTw": "十月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1334570",
    "jmdictEntryIds": [
      "1334570"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0336",
    "written": "十一月",
    "reading": "じゅういちがつ",
    "meaningZhTw": "十一月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1334480",
    "jmdictEntryIds": [
      "1334480"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0337",
    "written": "十二月",
    "reading": "じゅうにがつ",
    "meaningZhTw": "十二月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1334910",
    "jmdictEntryIds": [
      "1334910"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0338",
    "written": "春",
    "reading": "はる",
    "meaningZhTw": "春天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1341000",
    "jmdictEntryIds": [
      "1341000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0339",
    "written": "夏",
    "reading": "なつ",
    "meaningZhTw": "夏天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1191320",
    "jmdictEntryIds": [
      "1191320"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0340",
    "written": "秋",
    "reading": "あき",
    "meaningZhTw": "秋天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1332650",
    "jmdictEntryIds": [
      "1332650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0341",
    "written": "冬",
    "reading": "ふゆ",
    "meaningZhTw": "冬天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1446070",
    "jmdictEntryIds": [
      "1446070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0342",
    "written": "季節",
    "reading": "きせつ",
    "meaningZhTw": "季節",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1222840",
    "jmdictEntryIds": [
      "1222840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0343",
    "written": "四季",
    "reading": "しき",
    "meaningZhTw": "四季",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1307130",
    "jmdictEntryIds": [
      "1307130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0344",
    "written": "正月",
    "reading": "しょうがつ",
    "meaningZhTw": "新年期間、正月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1377030",
    "jmdictEntryIds": [
      "1377030"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0345",
    "written": "年末",
    "reading": "ねんまつ",
    "meaningZhTw": "年底",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1469210",
    "jmdictEntryIds": [
      "1469210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0346",
    "written": "年始",
    "reading": "ねんし",
    "meaningZhTw": "年初",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1468730",
    "jmdictEntryIds": [
      "1468730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0348",
    "written": "二日",
    "reading": "ふつか",
    "meaningZhTw": "每月二日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1462900",
    "jmdictEntryIds": [
      "1462900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0349",
    "written": "三日",
    "reading": "みっか",
    "meaningZhTw": "每月三日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1301330",
    "jmdictEntryIds": [
      "1301330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0350",
    "written": "四日",
    "reading": "よっか",
    "meaningZhTw": "每月四日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1307320",
    "jmdictEntryIds": [
      "1307320"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0351",
    "written": "五日",
    "reading": "いつか",
    "meaningZhTw": "每月五日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1268570",
    "jmdictEntryIds": [
      "1268570"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0352",
    "written": "六日",
    "reading": "むいか",
    "meaningZhTw": "每月六日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1561470",
    "jmdictEntryIds": [
      "1561470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0353",
    "written": "七日",
    "reading": "なのか",
    "meaningZhTw": "每月七日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1579630",
    "jmdictEntryIds": [
      "1579630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0354",
    "written": "八日",
    "reading": "ようか",
    "meaningZhTw": "每月八日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1476920",
    "jmdictEntryIds": [
      "1476920"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0355",
    "written": "九日",
    "reading": "ここのか",
    "meaningZhTw": "每月九日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1243850",
    "jmdictEntryIds": [
      "1243850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0356",
    "written": "十日",
    "reading": "とおか",
    "meaningZhTw": "每月十日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1335000",
    "jmdictEntryIds": [
      "1335000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0358",
    "written": "一週間",
    "reading": "いっしゅうかん",
    "meaningZhTw": "一週（七天）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1163270",
    "jmdictEntryIds": [
      "1163270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0359",
    "written": "一か月",
    "reading": "いっかげつ",
    "meaningZhTw": "一個月",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1587410",
    "jmdictEntryIds": [
      "1587410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0360",
    "written": "一年",
    "reading": "いちねん",
    "meaningZhTw": "一年",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1576280",
    "jmdictEntryIds": [
      "1576280"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0361",
    "written": "一時間",
    "reading": "いちじかん",
    "meaningZhTw": "一小時",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1162940",
    "jmdictEntryIds": [
      "1162940"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0362",
    "written": "一分",
    "reading": "いっぷん",
    "meaningZhTw": "一分鐘",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1166290",
    "jmdictEntryIds": [
      "1166290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0363",
    "written": "一秒",
    "reading": "いちびょう",
    "meaningZhTw": "一秒鐘",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1166120",
    "jmdictEntryIds": [
      "1166120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0364",
    "written": "半分",
    "reading": "はんぶん",
    "meaningZhTw": "一半",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1479890",
    "jmdictEntryIds": [
      "1479890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0365",
    "written": "半日",
    "reading": "はんにち",
    "meaningZhTw": "半天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1583180",
    "jmdictEntryIds": [
      "1583180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0366",
    "written": "一日中",
    "reading": "いちにちじゅう",
    "meaningZhTw": "整天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1165500",
    "jmdictEntryIds": [
      "1165500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0367",
    "written": "早朝",
    "reading": "そうちょう",
    "meaningZhTw": "清晨",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1400330",
    "jmdictEntryIds": [
      "1400330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0368",
    "written": "夕方",
    "reading": "ゆうがた",
    "meaningZhTw": "傍晚",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1542790",
    "jmdictEntryIds": [
      "1542790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0369",
    "written": "深夜",
    "reading": "しんや",
    "meaningZhTw": "深夜",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1362810",
    "jmdictEntryIds": [
      "1362810"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0370",
    "written": "真夜中",
    "reading": "まよなか",
    "meaningZhTw": "半夜",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1364380",
    "jmdictEntryIds": [
      "1364380"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0371",
    "written": "夜中",
    "reading": "よなか",
    "meaningZhTw": "夜裡",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1536930",
    "jmdictEntryIds": [
      "1536930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0372",
    "written": "昼間",
    "reading": "ひるま",
    "meaningZhTw": "白天",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1581710",
    "jmdictEntryIds": [
      "1581710"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0373",
    "written": "時刻",
    "reading": "じこく",
    "meaningZhTw": "時刻",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1316220",
    "jmdictEntryIds": [
      "1316220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0374",
    "written": "時計",
    "reading": "とけい",
    "meaningZhTw": "時鐘、手錶",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1316140",
    "jmdictEntryIds": [
      "1316140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0375",
    "written": "目覚まし時計",
    "reading": "めざましどけい",
    "meaningZhTw": "鬧鐘",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1604940",
    "jmdictEntryIds": [
      "1604940"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0376",
    "written": "日付",
    "reading": "ひづけ",
    "meaningZhTw": "日期",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1464340",
    "jmdictEntryIds": [
      "1464340"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0377",
    "written": "期間",
    "reading": "きかん",
    "meaningZhTw": "期間",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1220550",
    "jmdictEntryIds": [
      "1220550"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0378",
    "written": "期限",
    "reading": "きげん",
    "meaningZhTw": "期限",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1220560",
    "jmdictEntryIds": [
      "1220560"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0379",
    "written": "締め切り",
    "reading": "しめきり",
    "meaningZhTw": "截止期限",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1594590",
    "jmdictEntryIds": [
      "1594590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0380",
    "written": "順番",
    "reading": "じゅんばん",
    "meaningZhTw": "順序",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1342390",
    "jmdictEntryIds": [
      "1342390"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0381",
    "written": "最初",
    "reading": "さいしょ",
    "meaningZhTw": "最初",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1293990",
    "jmdictEntryIds": [
      "1293990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0382",
    "written": "最後",
    "reading": "さいご",
    "meaningZhTw": "最後",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1293810",
    "jmdictEntryIds": [
      "1293810"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0383",
    "written": "途中",
    "reading": "とちゅう",
    "meaningZhTw": "途中",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1582200",
    "jmdictEntryIds": [
      "1582200"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0384",
    "written": "以前",
    "reading": "いぜん",
    "meaningZhTw": "以前",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1155150",
    "jmdictEntryIds": [
      "1155150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0385",
    "written": "以後",
    "reading": "いご",
    "meaningZhTw": "以後",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1155100",
    "jmdictEntryIds": [
      "1155100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0386",
    "written": "以降",
    "reading": "いこう",
    "meaningZhTw": "以後",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1155110",
    "jmdictEntryIds": [
      "1155110"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0387",
    "written": "前半",
    "reading": "ぜんはん",
    "meaningZhTw": "前半",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1581140",
    "jmdictEntryIds": [
      "1581140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0388",
    "written": "後半",
    "reading": "こうはん",
    "meaningZhTw": "後半",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1270040",
    "jmdictEntryIds": [
      "1270040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0389",
    "written": "早い",
    "reading": "はやい",
    "meaningZhTw": "早的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1404975",
    "jmdictEntryIds": [
      "1404975"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0390",
    "written": "遅い",
    "reading": "おそい",
    "meaningZhTw": "晚的、慢的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1421970",
    "jmdictEntryIds": [
      "1421970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0391",
    "written": "急ぐ",
    "reading": "いそぐ",
    "meaningZhTw": "趕快",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1228650",
    "jmdictEntryIds": [
      "1228650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0392",
    "written": "待つ",
    "reading": "まつ",
    "meaningZhTw": "等待",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1410590",
    "jmdictEntryIds": [
      "1410590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0393",
    "written": "間に合う",
    "reading": "まにあう",
    "meaningZhTw": "來得及",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1215260",
    "jmdictEntryIds": [
      "1215260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0394",
    "written": "遅れる",
    "reading": "おくれる",
    "meaningZhTw": "遲到、延誤",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1589040",
    "jmdictEntryIds": [
      "1589040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0395",
    "written": "乗る",
    "reading": "のる",
    "meaningZhTw": "搭乘",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1355120",
    "jmdictEntryIds": [
      "1355120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0396",
    "written": "降りる",
    "reading": "おりる",
    "meaningZhTw": "下車",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1589500",
    "jmdictEntryIds": [
      "1589500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0397",
    "written": "乗り換える",
    "reading": "のりかえる",
    "meaningZhTw": "轉乘",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1600470",
    "jmdictEntryIds": [
      "1600470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0398",
    "written": "乗り換え",
    "reading": "のりかえ",
    "meaningZhTw": "轉乘",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1600460",
    "jmdictEntryIds": [
      "1600460"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0399",
    "written": "出発",
    "reading": "しゅっぱつ",
    "meaningZhTw": "出發",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1340000",
    "jmdictEntryIds": [
      "1340000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0400",
    "written": "到着",
    "reading": "とうちゃく",
    "meaningZhTw": "抵達",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1449870",
    "jmdictEntryIds": [
      "1449870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0401",
    "written": "発車",
    "reading": "はっしゃ",
    "meaningZhTw": "發車",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1477500",
    "jmdictEntryIds": [
      "1477500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0402",
    "written": "停車",
    "reading": "ていしゃ",
    "meaningZhTw": "停車",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1434960",
    "jmdictEntryIds": [
      "1434960"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0403",
    "written": "通過",
    "reading": "つうか",
    "meaningZhTw": "通過",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1433070",
    "jmdictEntryIds": [
      "1433070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0404",
    "written": "運転",
    "reading": "うんてん",
    "meaningZhTw": "駕駛",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1172830",
    "jmdictEntryIds": [
      "1172830"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0405",
    "written": "運転手",
    "reading": "うんてんしゅ",
    "meaningZhTw": "司機",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1172870",
    "jmdictEntryIds": [
      "1172870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0406",
    "written": "車",
    "reading": "くるま",
    "meaningZhTw": "汽車、車輛",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1323080",
    "jmdictEntryIds": [
      "1323080"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0407",
    "written": "列車",
    "reading": "れっしゃ",
    "meaningZhTw": "列車",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1558370",
    "jmdictEntryIds": [
      "1558370"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0408",
    "written": "普通列車",
    "reading": "ふつうれっしゃ",
    "meaningZhTw": "普通列車",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1497290",
    "jmdictEntryIds": [
      "1497290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0409",
    "written": "急行",
    "reading": "きゅうこう",
    "meaningZhTw": "急行列車",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1228690",
    "jmdictEntryIds": [
      "1228690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0411",
    "written": "快速",
    "reading": "かいそく",
    "meaningZhTw": "快速列車",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1200080",
    "jmdictEntryIds": [
      "1200080"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0412",
    "written": "各駅停車",
    "reading": "かくえきていしゃ",
    "meaningZhTw": "各站停車",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1204900",
    "jmdictEntryIds": [
      "1204900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0413",
    "written": "終電",
    "reading": "しゅうでん",
    "meaningZhTw": "末班電車",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1332960",
    "jmdictEntryIds": [
      "1332960"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0414",
    "written": "始発",
    "reading": "しはつ",
    "meaningZhTw": "首班車",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1307610",
    "jmdictEntryIds": [
      "1307610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0415",
    "written": "終点",
    "reading": "しゅうてん",
    "meaningZhTw": "終點",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1332950",
    "jmdictEntryIds": [
      "1332950"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0416",
    "written": "始発駅",
    "reading": "しはつえき",
    "meaningZhTw": "起點站",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1936290",
    "jmdictEntryIds": [
      "1936290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0417",
    "written": "改札口",
    "reading": "かいさつぐち",
    "meaningZhTw": "驗票閘口",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1200850",
    "jmdictEntryIds": [
      "1200850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0418",
    "written": "改札",
    "reading": "かいさつ",
    "meaningZhTw": "驗票",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1200840",
    "jmdictEntryIds": [
      "1200840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0419",
    "written": "番線",
    "reading": "ばんせん",
    "meaningZhTw": "月台線號",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1482330",
    "jmdictEntryIds": [
      "1482330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0420",
    "written": "車両",
    "reading": "しゃりょう",
    "meaningZhTw": "車廂、車輛",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1323250",
    "jmdictEntryIds": [
      "1323250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0421",
    "written": "座席",
    "reading": "ざせき",
    "meaningZhTw": "座位",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1291880",
    "jmdictEntryIds": [
      "1291880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0422",
    "written": "指定席",
    "reading": "していせき",
    "meaningZhTw": "指定座位",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1309930",
    "jmdictEntryIds": [
      "1309930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0423",
    "written": "自由席",
    "reading": "じゆうせき",
    "meaningZhTw": "自由座",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1318790",
    "jmdictEntryIds": [
      "1318790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0424",
    "written": "優先席",
    "reading": "ゆうせんせき",
    "meaningZhTw": "博愛座",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1947880",
    "jmdictEntryIds": [
      "1947880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0425",
    "written": "満席",
    "reading": "まんせき",
    "meaningZhTw": "座位已滿",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1526850",
    "jmdictEntryIds": [
      "1526850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0426",
    "written": "空席",
    "reading": "くうせき",
    "meaningZhTw": "空位",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1245690",
    "jmdictEntryIds": [
      "1245690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0427",
    "written": "混雑",
    "reading": "こんざつ",
    "meaningZhTw": "擁擠",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1290390",
    "jmdictEntryIds": [
      "1290390"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0428",
    "written": "渋滞",
    "reading": "じゅうたい",
    "meaningZhTw": "塞車",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1335570",
    "jmdictEntryIds": [
      "1335570"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0429",
    "written": "事故",
    "reading": "じこ",
    "meaningZhTw": "事故",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1313850",
    "jmdictEntryIds": [
      "1313850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0430",
    "written": "交通事故",
    "reading": "こうつうじこ",
    "meaningZhTw": "交通事故",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1272350",
    "jmdictEntryIds": [
      "1272350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0431",
    "written": "遅延",
    "reading": "ちえん",
    "meaningZhTw": "延誤",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1422030",
    "jmdictEntryIds": [
      "1422030"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0432",
    "written": "運休",
    "reading": "うんきゅう",
    "meaningZhTw": "停駛",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1172730",
    "jmdictEntryIds": [
      "1172730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0433",
    "written": "路線",
    "reading": "ろせん",
    "meaningZhTw": "路線",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1560040",
    "jmdictEntryIds": [
      "1560040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0434",
    "written": "線路",
    "reading": "せんろ",
    "meaningZhTw": "鐵軌",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1391880",
    "jmdictEntryIds": [
      "1391880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0435",
    "written": "鉄道",
    "reading": "てつどう",
    "meaningZhTw": "鐵路",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1437960",
    "jmdictEntryIds": [
      "1437960"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0436",
    "written": "駅前",
    "reading": "えきまえ",
    "meaningZhTw": "車站前",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1175170",
    "jmdictEntryIds": [
      "1175170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0437",
    "written": "駅員",
    "reading": "えきいん",
    "meaningZhTw": "站務員",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1175150",
    "jmdictEntryIds": [
      "1175150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0439",
    "written": "乗客",
    "reading": "じょうきゃく",
    "meaningZhTw": "乘客",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1580490",
    "jmdictEntryIds": [
      "1580490"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0440",
    "written": "通勤",
    "reading": "つうきん",
    "meaningZhTw": "通勤",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1433140",
    "jmdictEntryIds": [
      "1433140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0441",
    "written": "通学",
    "reading": "つうがく",
    "meaningZhTw": "通學",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1433090",
    "jmdictEntryIds": [
      "1433090"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0444",
    "written": "片道",
    "reading": "かたみち",
    "meaningZhTw": "單程",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1511760",
    "jmdictEntryIds": [
      "1511760"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0445",
    "written": "往復",
    "reading": "おうふく",
    "meaningZhTw": "往返",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1179760",
    "jmdictEntryIds": [
      "1179760"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0446",
    "written": "徒歩",
    "reading": "とほ",
    "meaningZhTw": "步行",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1444510",
    "jmdictEntryIds": [
      "1444510"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0447",
    "written": "歩く",
    "reading": "あるく",
    "meaningZhTw": "走路",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1514320",
    "jmdictEntryIds": [
      "1514320"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0448",
    "written": "走る",
    "reading": "はしる",
    "meaningZhTw": "跑步",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1402540",
    "jmdictEntryIds": [
      "1402540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0449",
    "written": "曲がる",
    "reading": "まがる",
    "meaningZhTw": "轉彎",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1239730",
    "jmdictEntryIds": [
      "1239730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0450",
    "written": "渡る",
    "reading": "わたる",
    "meaningZhTw": "穿越",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1444680",
    "jmdictEntryIds": [
      "1444680"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0451",
    "written": "進む",
    "reading": "すすむ",
    "meaningZhTw": "前進",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1365980",
    "jmdictEntryIds": [
      "1365980"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0452",
    "written": "戻る",
    "reading": "もどる",
    "meaningZhTw": "返回",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1535880",
    "jmdictEntryIds": [
      "1535880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0453",
    "written": "着く",
    "reading": "つく",
    "meaningZhTw": "抵達",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1422970",
    "jmdictEntryIds": [
      "1422970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0454",
    "written": "向かう",
    "reading": "むかう",
    "meaningZhTw": "前往",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1604800",
    "jmdictEntryIds": [
      "1604800"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0455",
    "written": "通る",
    "reading": "とおる",
    "meaningZhTw": "經過",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1433030",
    "jmdictEntryIds": [
      "1433030"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0456",
    "written": "通り",
    "reading": "とおり",
    "meaningZhTw": "街道；通過方式（依語境）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1432920",
    "jmdictEntryIds": [
      "1432920"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0457",
    "written": "横断歩道",
    "reading": "おうだんほどう",
    "meaningZhTw": "行人穿越道",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1180910",
    "jmdictEntryIds": [
      "1180910"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0458",
    "written": "歩道",
    "reading": "ほどう",
    "meaningZhTw": "人行道",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1514420",
    "jmdictEntryIds": [
      "1514420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0459",
    "written": "車道",
    "reading": "しゃどう",
    "meaningZhTw": "車道",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1323210",
    "jmdictEntryIds": [
      "1323210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0460",
    "written": "橋",
    "reading": "はし",
    "meaningZhTw": "橋",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1237410",
    "jmdictEntryIds": [
      "1237410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0461",
    "written": "角",
    "reading": "かど",
    "meaningZhTw": "轉角",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1206110",
    "jmdictEntryIds": [
      "1206110"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0462",
    "written": "右",
    "reading": "みぎ",
    "meaningZhTw": "右邊",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1171010",
    "jmdictEntryIds": [
      "1171010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0463",
    "written": "左",
    "reading": "ひだり",
    "meaningZhTw": "左邊",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1290800",
    "jmdictEntryIds": [
      "1290800"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0464",
    "written": "前",
    "reading": "まえ",
    "meaningZhTw": "前面",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1392580",
    "jmdictEntryIds": [
      "1392580"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0465",
    "written": "後ろ",
    "reading": "うしろ",
    "meaningZhTw": "後面",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1269410",
    "jmdictEntryIds": [
      "1269410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0466",
    "written": "隣",
    "reading": "となり",
    "meaningZhTw": "旁邊",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1555830",
    "jmdictEntryIds": [
      "1555830"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0467",
    "written": "近く",
    "reading": "ちかく",
    "meaningZhTw": "附近",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1242160",
    "jmdictEntryIds": [
      "1242160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0468",
    "written": "遠く",
    "reading": "とおく",
    "meaningZhTw": "遠處",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1177820",
    "jmdictEntryIds": [
      "1177820"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0469",
    "written": "方向",
    "reading": "ほうこう",
    "meaningZhTw": "方向",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1516990",
    "jmdictEntryIds": [
      "1516990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0470",
    "written": "距離",
    "reading": "きょり",
    "meaningZhTw": "距離",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1232920",
    "jmdictEntryIds": [
      "1232920"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0471",
    "written": "場所",
    "reading": "ばしょ",
    "meaningZhTw": "場所",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1355850",
    "jmdictEntryIds": [
      "1355850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0472",
    "written": "目的地",
    "reading": "もくてきち",
    "meaningZhTw": "目的地",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1535580",
    "jmdictEntryIds": [
      "1535580"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0473",
    "written": "案内",
    "reading": "あんない",
    "meaningZhTw": "引導、指引；介紹、導覽",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1154860",
    "jmdictEntryIds": [
      "1154860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0474",
    "written": "案内所",
    "reading": "あんないじょ",
    "meaningZhTw": "詢問處",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1154880",
    "jmdictEntryIds": [
      "1154880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0475",
    "written": "観光案内所",
    "reading": "かんこうあんないじょ",
    "meaningZhTw": "旅遊服務中心",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1782610",
    "jmdictEntryIds": [
      "1782610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0476",
    "written": "駐車場",
    "reading": "ちゅうしゃじょう",
    "meaningZhTw": "停車場",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1426920",
    "jmdictEntryIds": [
      "1426920"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0477",
    "written": "駐輪場",
    "reading": "ちゅうりんじょう",
    "meaningZhTw": "腳踏車停車場",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1427000",
    "jmdictEntryIds": [
      "1427000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0478",
    "written": "駐車",
    "reading": "ちゅうしゃ",
    "meaningZhTw": "停車",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1426910",
    "jmdictEntryIds": [
      "1426910"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0479",
    "written": "車庫",
    "reading": "しゃこ",
    "meaningZhTw": "車庫",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1323120",
    "jmdictEntryIds": [
      "1323120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0480",
    "written": "免許",
    "reading": "めんきょ",
    "meaningZhTw": "執照",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1533130",
    "jmdictEntryIds": [
      "1533130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0481",
    "written": "運転免許",
    "reading": "うんてんめんきょ",
    "meaningZhTw": "駕照",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1172900",
    "jmdictEntryIds": [
      "1172900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0482",
    "written": "速度",
    "reading": "そくど",
    "meaningZhTw": "速度",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1405050",
    "jmdictEntryIds": [
      "1405050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0483",
    "written": "制限速度",
    "reading": "せいげんそくど",
    "meaningZhTw": "速限",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1374740",
    "jmdictEntryIds": [
      "1374740"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0484",
    "written": "高速道路",
    "reading": "こうそくどうろ",
    "meaningZhTw": "高速公路",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1283720",
    "jmdictEntryIds": [
      "1283720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0485",
    "written": "一般道",
    "reading": "いっぱんどう",
    "meaningZhTw": "一般道路",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2710860",
    "jmdictEntryIds": [
      "2710860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0486",
    "written": "有料道路",
    "reading": "ゆうりょうどうろ",
    "meaningZhTw": "收費道路",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1541700",
    "jmdictEntryIds": [
      "1541700"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0487",
    "written": "料金所",
    "reading": "りょうきんじょ",
    "meaningZhTw": "收費站",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1554290",
    "jmdictEntryIds": [
      "1554290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0488",
    "written": "旅",
    "reading": "たび",
    "meaningZhTw": "旅行",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1553120",
    "jmdictEntryIds": [
      "1553120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0489",
    "written": "旅先",
    "reading": "たびさき",
    "meaningZhTw": "旅行目的地",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1553220",
    "jmdictEntryIds": [
      "1553220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0490",
    "written": "旅費",
    "reading": "りょひ",
    "meaningZhTw": "旅費",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1553250",
    "jmdictEntryIds": [
      "1553250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0491",
    "written": "旅行者",
    "reading": "りょこうしゃ",
    "meaningZhTw": "旅客",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1553180",
    "jmdictEntryIds": [
      "1553180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0492",
    "written": "旅行会社",
    "reading": "りょこうがいしゃ",
    "meaningZhTw": "旅行社",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2027300",
    "jmdictEntryIds": [
      "2027300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0493",
    "written": "国内旅行",
    "reading": "こくないりょこう",
    "meaningZhTw": "國內旅行",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2146540",
    "jmdictEntryIds": [
      "2146540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0494",
    "written": "海外旅行",
    "reading": "かいがいりょこう",
    "meaningZhTw": "海外旅行",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1772620",
    "jmdictEntryIds": [
      "1772620"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0495",
    "written": "海外",
    "reading": "かいがい",
    "meaningZhTw": "海外",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1201260",
    "jmdictEntryIds": [
      "1201260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0496",
    "written": "国内",
    "reading": "こくない",
    "meaningZhTw": "國內",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1286930",
    "jmdictEntryIds": [
      "1286930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0497",
    "written": "外国",
    "reading": "がいこく",
    "meaningZhTw": "外國",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1203620",
    "jmdictEntryIds": [
      "1203620"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0498",
    "written": "外国人",
    "reading": "がいこくじん",
    "meaningZhTw": "外國人",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1203650",
    "jmdictEntryIds": [
      "1203650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0506",
    "written": "観光客",
    "reading": "かんこうきゃく",
    "meaningZhTw": "觀光客",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1214870",
    "jmdictEntryIds": [
      "1214870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0507",
    "written": "名所",
    "reading": "めいしょ",
    "meaningZhTw": "名勝",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1531600",
    "jmdictEntryIds": [
      "1531600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0508",
    "written": "観光地",
    "reading": "かんこうち",
    "meaningZhTw": "觀光景點",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1214890",
    "jmdictEntryIds": [
      "1214890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0509",
    "written": "景色",
    "reading": "けしき",
    "meaningZhTw": "景色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1250870",
    "jmdictEntryIds": [
      "1250870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0510",
    "written": "風景",
    "reading": "ふうけい",
    "meaningZhTw": "風景",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1499830",
    "jmdictEntryIds": [
      "1499830"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0511",
    "written": "自然",
    "reading": "しぜん",
    "meaningZhTw": "自然",
    "partOfSpeech": "動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1318090",
    "jmdictEntryIds": [
      "1318090"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0512",
    "written": "文化",
    "reading": "ぶんか",
    "meaningZhTw": "文化",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1505120",
    "jmdictEntryIds": [
      "1505120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0513",
    "written": "歴史",
    "reading": "れきし",
    "meaningZhTw": "歷史",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1558050",
    "jmdictEntryIds": [
      "1558050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0514",
    "written": "神社",
    "reading": "じんじゃ",
    "meaningZhTw": "神社",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1364670",
    "jmdictEntryIds": [
      "1364670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0515",
    "written": "寺",
    "reading": "てら",
    "meaningZhTw": "寺廟",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1315240",
    "jmdictEntryIds": [
      "1315240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0516",
    "written": "寺院",
    "reading": "じいん",
    "meaningZhTw": "寺院",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1315250",
    "jmdictEntryIds": [
      "1315250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0517",
    "written": "お寺",
    "reading": "おてら",
    "meaningZhTw": "寺廟",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2271230",
    "jmdictEntryIds": [
      "2271230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0518",
    "written": "城",
    "reading": "しろ",
    "meaningZhTw": "城堡、城郭",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1355710",
    "jmdictEntryIds": [
      "1355710"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0519",
    "written": "公園",
    "reading": "こうえん",
    "meaningZhTw": "公園",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1273270",
    "jmdictEntryIds": [
      "1273270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0520",
    "written": "遊園地",
    "reading": "ゆうえんち",
    "meaningZhTw": "遊樂園",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1542170",
    "jmdictEntryIds": [
      "1542170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0521",
    "written": "動物園",
    "reading": "どうぶつえん",
    "meaningZhTw": "動物園",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1451490",
    "jmdictEntryIds": [
      "1451490"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0522",
    "written": "水族館",
    "reading": "すいぞくかん",
    "meaningZhTw": "水族館",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1371820",
    "jmdictEntryIds": [
      "1371820"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0523",
    "written": "博物館",
    "reading": "はくぶつかん",
    "meaningZhTw": "博物館",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1474720",
    "jmdictEntryIds": [
      "1474720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0524",
    "written": "美術館",
    "reading": "びじゅつかん",
    "meaningZhTw": "美術館",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1486460",
    "jmdictEntryIds": [
      "1486460"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0525",
    "written": "展望台",
    "reading": "てんぼうだい",
    "meaningZhTw": "觀景台",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1440650",
    "jmdictEntryIds": [
      "1440650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0526",
    "written": "展望",
    "reading": "てんぼう",
    "meaningZhTw": "眺望",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1440640",
    "jmdictEntryIds": [
      "1440640"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0528",
    "written": "撮影",
    "reading": "さつえい",
    "meaningZhTw": "攝影",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1298800",
    "jmdictEntryIds": [
      "1298800"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0529",
    "written": "撮る",
    "reading": "とる",
    "meaningZhTw": "拍攝",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1298790",
    "jmdictEntryIds": [
      "1298790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0530",
    "written": "宿泊",
    "reading": "しゅくはく",
    "meaningZhTw": "住宿、過夜",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1337300",
    "jmdictEntryIds": [
      "1337300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0531",
    "written": "宿泊先",
    "reading": "しゅくはくさき",
    "meaningZhTw": "住宿地點",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1337310",
    "jmdictEntryIds": [
      "1337310"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0533",
    "written": "宿泊施設",
    "reading": "しゅくはくしせつ",
    "meaningZhTw": "住宿設施",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2795570",
    "jmdictEntryIds": [
      "2795570"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0534",
    "written": "民宿",
    "reading": "みんしゅく",
    "meaningZhTw": "民宿",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1528950",
    "jmdictEntryIds": [
      "1528950"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0535",
    "written": "客室",
    "reading": "きゃくしつ",
    "meaningZhTw": "客房",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1226730",
    "jmdictEntryIds": [
      "1226730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0537",
    "written": "受付係",
    "reading": "うけつけがかり",
    "meaningZhTw": "接待人員",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1330030",
    "jmdictEntryIds": [
      "1330030"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0538",
    "written": "予約番号",
    "reading": "よやくばんごう",
    "meaningZhTw": "預約號碼",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2033660",
    "jmdictEntryIds": [
      "2033660"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0539",
    "written": "確認",
    "reading": "かくにん",
    "meaningZhTw": "確認",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1205900",
    "jmdictEntryIds": [
      "1205900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0540",
    "written": "変更",
    "reading": "へんこう",
    "meaningZhTw": "變更",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1511040",
    "jmdictEntryIds": [
      "1511040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0541",
    "written": "取消",
    "reading": "とりけし",
    "meaningZhTw": "取消",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1599050",
    "jmdictEntryIds": [
      "1599050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0542",
    "written": "取り消す",
    "reading": "とりけす",
    "meaningZhTw": "取消",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1326790",
    "jmdictEntryIds": [
      "1326790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0543",
    "written": "宿泊料金",
    "reading": "しゅくはくりょうきん",
    "meaningZhTw": "住宿費用",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2147900",
    "jmdictEntryIds": [
      "2147900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0544",
    "written": "一泊",
    "reading": "いっぱく",
    "meaningZhTw": "住一晚",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1165700",
    "jmdictEntryIds": [
      "1165700"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0545",
    "written": "連泊",
    "reading": "れんぱく",
    "meaningZhTw": "連住多晚",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2827506",
    "jmdictEntryIds": [
      "2827506"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0546",
    "written": "素泊まり",
    "reading": "すどまり",
    "meaningZhTw": "不附餐住宿",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1854140",
    "jmdictEntryIds": [
      "1854140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0548",
    "written": "禁煙",
    "reading": "きんえん",
    "meaningZhTw": "禁菸",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1241490",
    "jmdictEntryIds": [
      "1241490"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0549",
    "written": "喫煙",
    "reading": "きつえん",
    "meaningZhTw": "吸菸",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1226390",
    "jmdictEntryIds": [
      "1226390"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0550",
    "written": "禁煙室",
    "reading": "きんえんしつ",
    "meaningZhTw": "禁菸房",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2837160",
    "jmdictEntryIds": [
      "2837160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0551",
    "written": "喫煙室",
    "reading": "きつえんしつ",
    "meaningZhTw": "吸菸室",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1715160",
    "jmdictEntryIds": [
      "1715160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0552",
    "written": "喫煙所",
    "reading": "きつえんじょ",
    "meaningZhTw": "吸菸區",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1932960",
    "jmdictEntryIds": [
      "1932960"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0553",
    "written": "部屋番号",
    "reading": "へやばんごう",
    "meaningZhTw": "房號",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2661270",
    "jmdictEntryIds": [
      "2661270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0555",
    "written": "預ける",
    "reading": "あずける",
    "meaningZhTw": "寄放",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1544990",
    "jmdictEntryIds": [
      "1544990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0556",
    "written": "受け取る",
    "reading": "うけとる",
    "meaningZhTw": "領取",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1329650",
    "jmdictEntryIds": [
      "1329650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0557",
    "written": "忘れ物",
    "reading": "わすれもの",
    "meaningZhTw": "忘帶的東西",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1519230",
    "jmdictEntryIds": [
      "1519230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0558",
    "written": "落とし物",
    "reading": "おとしもの",
    "meaningZhTw": "失物",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1589250",
    "jmdictEntryIds": [
      "1589250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0559",
    "written": "紛失",
    "reading": "ふんしつ",
    "meaningZhTw": "遺失",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1505050",
    "jmdictEntryIds": [
      "1505050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0560",
    "written": "遺失物",
    "reading": "いしつぶつ",
    "meaningZhTw": "遺失物",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1159330",
    "jmdictEntryIds": [
      "1159330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0561",
    "written": "荷造り",
    "reading": "にづくり",
    "meaningZhTw": "打包行李",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1195270",
    "jmdictEntryIds": [
      "1195270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0562",
    "written": "手荷物",
    "reading": "てにもつ",
    "meaningZhTw": "隨身行李",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1327360",
    "jmdictEntryIds": [
      "1327360"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0563",
    "written": "機内持ち込み",
    "reading": "きないもちこみ",
    "meaningZhTw": "隨身帶上飛機",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2153200",
    "jmdictEntryIds": [
      "2153200"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0565",
    "written": "出国",
    "reading": "しゅっこく",
    "meaningZhTw": "出境",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1580020",
    "jmdictEntryIds": [
      "1580020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0566",
    "written": "入国",
    "reading": "にゅうこく",
    "meaningZhTw": "入境",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1466130",
    "jmdictEntryIds": [
      "1466130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0567",
    "written": "出入国",
    "reading": "しゅつにゅうこく",
    "meaningZhTw": "出入境",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1339930",
    "jmdictEntryIds": [
      "1339930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0568",
    "written": "入国審査",
    "reading": "にゅうこくしんさ",
    "meaningZhTw": "入境審查",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2620540",
    "jmdictEntryIds": [
      "2620540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0569",
    "written": "税関",
    "reading": "ぜいかん",
    "meaningZhTw": "海關",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1382090",
    "jmdictEntryIds": [
      "1382090"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0570",
    "written": "検査",
    "reading": "けんさ",
    "meaningZhTw": "檢查",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1257890",
    "jmdictEntryIds": [
      "1257890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0571",
    "written": "保安検査",
    "reading": "ほあんけんさ",
    "meaningZhTw": "安全檢查",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2869439",
    "jmdictEntryIds": [
      "2869439"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0572",
    "written": "搭乗",
    "reading": "とうじょう",
    "meaningZhTw": "登機",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1447400",
    "jmdictEntryIds": [
      "1447400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0573",
    "written": "搭乗口",
    "reading": "とうじょうぐち",
    "meaningZhTw": "登機門",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2786690",
    "jmdictEntryIds": [
      "2786690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0574",
    "written": "搭乗券",
    "reading": "とうじょうけん",
    "meaningZhTw": "登機證",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1447420",
    "jmdictEntryIds": [
      "1447420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0575",
    "written": "航空券",
    "reading": "こうくうけん",
    "meaningZhTw": "機票",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1281330",
    "jmdictEntryIds": [
      "1281330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0576",
    "written": "航空会社",
    "reading": "こうくうがいしゃ",
    "meaningZhTw": "航空公司",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1281300",
    "jmdictEntryIds": [
      "1281300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0577",
    "written": "便名",
    "reading": "びんめい",
    "meaningZhTw": "班機編號",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2826937",
    "jmdictEntryIds": [
      "2826937"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0578",
    "written": "出発便",
    "reading": "しゅっぱつびん",
    "meaningZhTw": "出發航班",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2649630",
    "jmdictEntryIds": [
      "2649630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0580",
    "written": "国際線",
    "reading": "こくさいせん",
    "meaningZhTw": "國際線",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1935600",
    "jmdictEntryIds": [
      "1935600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0581",
    "written": "国内線",
    "reading": "こくないせん",
    "meaningZhTw": "國內線",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1935660",
    "jmdictEntryIds": [
      "1935660"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0583",
    "written": "免税",
    "reading": "めんぜい",
    "meaningZhTw": "免稅",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1533230",
    "jmdictEntryIds": [
      "1533230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0584",
    "written": "免税店",
    "reading": "めんぜいてん",
    "meaningZhTw": "免稅商店",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1823120",
    "jmdictEntryIds": [
      "1823120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0585",
    "written": "両替",
    "reading": "りょうがえ",
    "meaningZhTw": "換匯",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1553820",
    "jmdictEntryIds": [
      "1553820"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0586",
    "written": "外貨",
    "reading": "がいか",
    "meaningZhTw": "外幣",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1203410",
    "jmdictEntryIds": [
      "1203410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0587",
    "written": "為替",
    "reading": "かわせ",
    "meaningZhTw": "匯兌、匯率",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1157330",
    "jmdictEntryIds": [
      "1157330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0588",
    "written": "旅券",
    "reading": "りょけん",
    "meaningZhTw": "護照",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1553160",
    "jmdictEntryIds": [
      "1553160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0589",
    "written": "身分証明書",
    "reading": "みぶんしょうめいしょ",
    "meaningZhTw": "身分證明文件",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1365820",
    "jmdictEntryIds": [
      "1365820"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0590",
    "written": "ご飯",
    "reading": "ごはん",
    "meaningZhTw": "飯、餐食",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1270590",
    "jmdictEntryIds": [
      "1270590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0591",
    "written": "白米",
    "reading": "はくまい",
    "meaningZhTw": "白米",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1475370",
    "jmdictEntryIds": [
      "1475370"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0592",
    "written": "玄米",
    "reading": "げんまい",
    "meaningZhTw": "糙米",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1263470",
    "jmdictEntryIds": [
      "1263470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0593",
    "written": "米",
    "reading": "こめ",
    "meaningZhTw": "米",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1508750",
    "jmdictEntryIds": [
      "1508750"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0594",
    "written": "お米",
    "reading": "おこめ",
    "meaningZhTw": "米",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2423250",
    "jmdictEntryIds": [
      "2423250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0595",
    "written": "弁当",
    "reading": "べんとう",
    "meaningZhTw": "便當",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1513060",
    "jmdictEntryIds": [
      "1513060"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0596",
    "written": "定食",
    "reading": "ていしょく",
    "meaningZhTw": "定食、套餐",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1435650",
    "jmdictEntryIds": [
      "1435650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0597",
    "written": "和食",
    "reading": "わしょく",
    "meaningZhTw": "日式料理",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1562130",
    "jmdictEntryIds": [
      "1562130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0598",
    "written": "洋食",
    "reading": "ようしょく",
    "meaningZhTw": "西式料理",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1546000",
    "jmdictEntryIds": [
      "1546000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0599",
    "written": "中華料理",
    "reading": "ちゅうかりょうり",
    "meaningZhTw": "中華料理",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1423600",
    "jmdictEntryIds": [
      "1423600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0600",
    "written": "家庭料理",
    "reading": "かていりょうり",
    "meaningZhTw": "家常菜",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1931170",
    "jmdictEntryIds": [
      "1931170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0601",
    "written": "手料理",
    "reading": "てりょうり",
    "meaningZhTw": "親手做的料理",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1328420",
    "jmdictEntryIds": [
      "1328420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0602",
    "written": "寿司",
    "reading": "すし",
    "meaningZhTw": "壽司",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1595650",
    "jmdictEntryIds": [
      "1595650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0603",
    "written": "刺身",
    "reading": "さしみ",
    "meaningZhTw": "生魚片",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1306570",
    "jmdictEntryIds": [
      "1306570"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0604",
    "written": "天ぷら",
    "reading": "てんぷら",
    "meaningZhTw": "天婦羅",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1440590",
    "jmdictEntryIds": [
      "1440590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0605",
    "written": "焼き魚",
    "reading": "やきざかな",
    "meaningZhTw": "烤魚",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1350490",
    "jmdictEntryIds": [
      "1350490"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0606",
    "written": "焼き肉",
    "reading": "やきにく",
    "meaningZhTw": "燒肉",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1605420",
    "jmdictEntryIds": [
      "1605420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0607",
    "written": "焼き鳥",
    "reading": "やきとり",
    "meaningZhTw": "烤雞肉串",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1605410",
    "jmdictEntryIds": [
      "1605410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0608",
    "written": "焼きそば",
    "reading": "やきそば",
    "meaningZhTw": "日式炒麵",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1350450",
    "jmdictEntryIds": [
      "1350450"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0609",
    "written": "焼き飯",
    "reading": "やきめし",
    "meaningZhTw": "炒飯",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1742840",
    "jmdictEntryIds": [
      "1742840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0610",
    "written": "親子丼",
    "reading": "おやこどん",
    "meaningZhTw": "親子丼",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1365180",
    "jmdictEntryIds": [
      "1365180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0611",
    "written": "牛丼",
    "reading": "ぎゅうどん",
    "meaningZhTw": "牛丼",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1845250",
    "jmdictEntryIds": [
      "1845250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0612",
    "written": "天丼",
    "reading": "てんどん",
    "meaningZhTw": "天婦羅蓋飯",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1440520",
    "jmdictEntryIds": [
      "1440520"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0613",
    "written": "海鮮丼",
    "reading": "かいせんどん",
    "meaningZhTw": "海鮮蓋飯",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2861513",
    "jmdictEntryIds": [
      "2861513"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0614",
    "written": "丼物",
    "reading": "どんぶりもの",
    "meaningZhTw": "蓋飯類料理",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1563000",
    "jmdictEntryIds": [
      "1563000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0615",
    "written": "味噌汁",
    "reading": "みそしる",
    "meaningZhTw": "味噌湯",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1527050",
    "jmdictEntryIds": [
      "1527050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0616",
    "written": "味噌",
    "reading": "みそ",
    "meaningZhTw": "味噌",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1527040",
    "jmdictEntryIds": [
      "1527040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0617",
    "written": "醤油",
    "reading": "しょうゆ",
    "meaningZhTw": "醬油",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1595020",
    "jmdictEntryIds": [
      "1595020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0618",
    "written": "塩",
    "reading": "しお",
    "meaningZhTw": "鹽",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1576630",
    "jmdictEntryIds": [
      "1576630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0619",
    "written": "砂糖",
    "reading": "さとう",
    "meaningZhTw": "砂糖",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1291600",
    "jmdictEntryIds": [
      "1291600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0620",
    "written": "酢",
    "reading": "す",
    "meaningZhTw": "醋",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1370270",
    "jmdictEntryIds": [
      "1370270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0621",
    "written": "油",
    "reading": "あぶら",
    "meaningZhTw": "油",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1538590",
    "jmdictEntryIds": [
      "1538590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0622",
    "written": "胡椒",
    "reading": "こしょう",
    "meaningZhTw": "胡椒",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1267600",
    "jmdictEntryIds": [
      "1267600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0623",
    "written": "調味料",
    "reading": "ちょうみりょう",
    "meaningZhTw": "調味料",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1429290",
    "jmdictEntryIds": [
      "1429290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0624",
    "written": "香辛料",
    "reading": "こうしんりょう",
    "meaningZhTw": "香辛料",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1283050",
    "jmdictEntryIds": [
      "1283050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0625",
    "written": "出汁",
    "reading": "だし",
    "meaningZhTw": "日式高湯、熬煮的湯底",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1339160",
    "jmdictEntryIds": [
      "1339160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0627",
    "written": "卵",
    "reading": "たまご",
    "meaningZhTw": "蛋",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1549140",
    "jmdictEntryIds": [
      "1549140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0628",
    "written": "卵焼き",
    "reading": "たまごやき",
    "meaningZhTw": "玉子燒",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1597170",
    "jmdictEntryIds": [
      "1597170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0629",
    "written": "目玉焼き",
    "reading": "めだまやき",
    "meaningZhTw": "荷包蛋",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1535380",
    "jmdictEntryIds": [
      "1535380"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0630",
    "written": "ゆで卵",
    "reading": "ゆでたまご",
    "meaningZhTw": "水煮蛋",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1762410",
    "jmdictEntryIds": [
      "1762410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0631",
    "written": "豆腐",
    "reading": "とうふ",
    "meaningZhTw": "豆腐",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1450070",
    "jmdictEntryIds": [
      "1450070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0632",
    "written": "納豆",
    "reading": "なっとう",
    "meaningZhTw": "納豆",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1470070",
    "jmdictEntryIds": [
      "1470070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0633",
    "written": "豆",
    "reading": "まめ",
    "meaningZhTw": "豆類",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1450030",
    "jmdictEntryIds": [
      "1450030"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0634",
    "written": "大豆",
    "reading": "だいず",
    "meaningZhTw": "黃豆",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1414680",
    "jmdictEntryIds": [
      "1414680"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0635",
    "written": "小麦",
    "reading": "こむぎ",
    "meaningZhTw": "小麥",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1348630",
    "jmdictEntryIds": [
      "1348630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0636",
    "written": "小麦粉",
    "reading": "こむぎこ",
    "meaningZhTw": "麵粉",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1348650",
    "jmdictEntryIds": [
      "1348650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0637",
    "written": "麺",
    "reading": "めん",
    "meaningZhTw": "麵條",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1533610",
    "jmdictEntryIds": [
      "1533610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0638",
    "written": "麺類",
    "reading": "めんるい",
    "meaningZhTw": "麵類",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1533620",
    "jmdictEntryIds": [
      "1533620"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0639",
    "written": "蕎麦",
    "reading": "そば",
    "meaningZhTw": "蕎麥；蕎麥麵",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1238460",
    "jmdictEntryIds": [
      "1238460"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0640",
    "written": "素麺",
    "reading": "そうめん",
    "meaningZhTw": "素麵",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1397410",
    "jmdictEntryIds": [
      "1397410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0641",
    "written": "冷麺",
    "reading": "れいめん",
    "meaningZhTw": "冷麵",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1955250",
    "jmdictEntryIds": [
      "1955250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0642",
    "written": "野菜炒め",
    "reading": "やさいいため",
    "meaningZhTw": "炒蔬菜",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1947720",
    "jmdictEntryIds": [
      "1947720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0643",
    "written": "漬物",
    "reading": "つけもの",
    "meaningZhTw": "醃漬物",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1433700",
    "jmdictEntryIds": [
      "1433700"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0644",
    "written": "梅干し",
    "reading": "うめぼし",
    "meaningZhTw": "梅乾",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1473500",
    "jmdictEntryIds": [
      "1473500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0645",
    "written": "海苔",
    "reading": "のり",
    "meaningZhTw": "海苔",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1201620",
    "jmdictEntryIds": [
      "1201620"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0646",
    "written": "昆布",
    "reading": "こんぶ",
    "meaningZhTw": "昆布",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1579150",
    "jmdictEntryIds": [
      "1579150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0649",
    "written": "椎茸",
    "reading": "しいたけ",
    "meaningZhTw": "香菇",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1432250",
    "jmdictEntryIds": [
      "1432250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0650",
    "written": "大根",
    "reading": "だいこん",
    "meaningZhTw": "白蘿蔔",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1413730",
    "jmdictEntryIds": [
      "1413730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0653",
    "written": "葱",
    "reading": "ねぎ",
    "meaningZhTw": "蔥",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1467630",
    "jmdictEntryIds": [
      "1467630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0654",
    "written": "白菜",
    "reading": "はくさい",
    "meaningZhTw": "大白菜",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1475170",
    "jmdictEntryIds": [
      "1475170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0656",
    "written": "生姜",
    "reading": "しょうが",
    "meaningZhTw": "薑",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1379620",
    "jmdictEntryIds": [
      "1379620"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0658",
    "written": "茄子",
    "reading": "なす",
    "meaningZhTw": "茄子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1195240",
    "jmdictEntryIds": [
      "1195240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0663",
    "written": "葡萄",
    "reading": "ぶどう",
    "meaningZhTw": "葡萄",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1499230",
    "jmdictEntryIds": [
      "1499230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0664",
    "written": "桃",
    "reading": "もも",
    "meaningZhTw": "桃子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1448290",
    "jmdictEntryIds": [
      "1448290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0665",
    "written": "梨",
    "reading": "なし",
    "meaningZhTw": "梨子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1549860",
    "jmdictEntryIds": [
      "1549860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0666",
    "written": "柿",
    "reading": "かき",
    "meaningZhTw": "柿子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1204810",
    "jmdictEntryIds": [
      "1204810"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0667",
    "written": "西瓜",
    "reading": "すいか",
    "meaningZhTw": "西瓜",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1380890",
    "jmdictEntryIds": [
      "1380890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0668",
    "written": "果汁",
    "reading": "かじゅう",
    "meaningZhTw": "果汁",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1192990",
    "jmdictEntryIds": [
      "1192990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0669",
    "written": "牛乳",
    "reading": "ぎゅうにゅう",
    "meaningZhTw": "牛奶",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1231590",
    "jmdictEntryIds": [
      "1231590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0670",
    "written": "乳製品",
    "reading": "にゅうせいひん",
    "meaningZhTw": "乳製品",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1465260",
    "jmdictEntryIds": [
      "1465260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0671",
    "written": "飲料",
    "reading": "いんりょう",
    "meaningZhTw": "飲料",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1169990",
    "jmdictEntryIds": [
      "1169990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0672",
    "written": "緑茶",
    "reading": "りょくちゃ",
    "meaningZhTw": "綠茶",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1644870",
    "jmdictEntryIds": [
      "1644870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0673",
    "written": "紅茶",
    "reading": "こうちゃ",
    "meaningZhTw": "紅茶",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1280770",
    "jmdictEntryIds": [
      "1280770"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0674",
    "written": "麦茶",
    "reading": "むぎちゃ",
    "meaningZhTw": "麥茶",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1476230",
    "jmdictEntryIds": [
      "1476230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0675",
    "written": "抹茶",
    "reading": "まっちゃ",
    "meaningZhTw": "抹茶",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1525220",
    "jmdictEntryIds": [
      "1525220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0676",
    "written": "氷",
    "reading": "こおり",
    "meaningZhTw": "冰塊",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1488840",
    "jmdictEntryIds": [
      "1488840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0677",
    "written": "氷水",
    "reading": "こおりみず",
    "meaningZhTw": "冰水",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1583420",
    "jmdictEntryIds": [
      "1583420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0678",
    "written": "冷水",
    "reading": "れいすい",
    "meaningZhTw": "冷水",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1557020",
    "jmdictEntryIds": [
      "1557020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0679",
    "written": "お湯",
    "reading": "おゆ",
    "meaningZhTw": "熱水",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1002510",
    "jmdictEntryIds": [
      "1002510"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0684",
    "written": "作る",
    "reading": "つくる",
    "meaningZhTw": "製作、烹調",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1597890",
    "jmdictEntryIds": [
      "1597890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0685",
    "written": "焼く",
    "reading": "やく",
    "meaningZhTw": "烤、煎",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1350600",
    "jmdictEntryIds": [
      "1350600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0686",
    "written": "煮る",
    "reading": "にる",
    "meaningZhTw": "煮",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1322540",
    "jmdictEntryIds": [
      "1322540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0687",
    "written": "茹でる",
    "reading": "ゆでる",
    "meaningZhTw": "水煮",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1571470",
    "jmdictEntryIds": [
      "1571470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0688",
    "written": "蒸す",
    "reading": "むす",
    "meaningZhTw": "蒸",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1356900",
    "jmdictEntryIds": [
      "1356900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0689",
    "written": "炒める",
    "reading": "いためる",
    "meaningZhTw": "炒",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1568920",
    "jmdictEntryIds": [
      "1568920"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0690",
    "written": "揚げる",
    "reading": "あげる",
    "meaningZhTw": "油炸",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2864817",
    "jmdictEntryIds": [
      "2864817"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0691",
    "written": "切る",
    "reading": "きる",
    "meaningZhTw": "切",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1384830",
    "jmdictEntryIds": [
      "1384830"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0692",
    "written": "混ぜる",
    "reading": "まぜる",
    "meaningZhTw": "混合",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1290310",
    "jmdictEntryIds": [
      "1290310"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0693",
    "written": "温める",
    "reading": "あたためる",
    "meaningZhTw": "加熱",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1586440",
    "jmdictEntryIds": [
      "1586440"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0694",
    "written": "冷やす",
    "reading": "ひやす",
    "meaningZhTw": "冰鎮",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1556770",
    "jmdictEntryIds": [
      "1556770"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0695",
    "written": "冷ます",
    "reading": "さます",
    "meaningZhTw": "放涼",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1556740",
    "jmdictEntryIds": [
      "1556740"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0696",
    "written": "味",
    "reading": "あじ",
    "meaningZhTw": "味道",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1526960",
    "jmdictEntryIds": [
      "1526960"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0697",
    "written": "味見",
    "reading": "あじみ",
    "meaningZhTw": "試吃味道",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1722300",
    "jmdictEntryIds": [
      "1722300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0698",
    "written": "美味しい",
    "reading": "おいしい",
    "meaningZhTw": "好吃的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1486650",
    "jmdictEntryIds": [
      "1486650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0699",
    "written": "不味い",
    "reading": "まずい",
    "meaningZhTw": "難吃的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1495000",
    "jmdictEntryIds": [
      "1495000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0700",
    "written": "甘い",
    "reading": "あまい",
    "meaningZhTw": "甜的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1213400",
    "jmdictEntryIds": [
      "1213400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0701",
    "written": "辛い",
    "reading": "からい",
    "meaningZhTw": "辣的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1365850",
    "jmdictEntryIds": [
      "1365850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0702",
    "written": "苦い",
    "reading": "にがい",
    "meaningZhTw": "苦的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1244310",
    "jmdictEntryIds": [
      "1244310"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0703",
    "written": "酸っぱい",
    "reading": "すっぱい",
    "meaningZhTw": "酸的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1304280",
    "jmdictEntryIds": [
      "1304280"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0704",
    "written": "塩辛い",
    "reading": "しおからい",
    "meaningZhTw": "鹹的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1609860",
    "jmdictEntryIds": [
      "1609860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0705",
    "written": "濃い",
    "reading": "こい",
    "meaningZhTw": "濃的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1469890",
    "jmdictEntryIds": [
      "1469890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0706",
    "written": "薄い",
    "reading": "うすい",
    "meaningZhTw": "淡的、薄的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1475480",
    "jmdictEntryIds": [
      "1475480"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0707",
    "written": "熱い",
    "reading": "あつい",
    "meaningZhTw": "燙的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1467720",
    "jmdictEntryIds": [
      "1467720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0708",
    "written": "冷たい",
    "reading": "つめたい",
    "meaningZhTw": "冰冷的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1556730",
    "jmdictEntryIds": [
      "1556730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0709",
    "written": "温かい",
    "reading": "あたたかい",
    "meaningZhTw": "溫暖的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1586420",
    "jmdictEntryIds": [
      "1586420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0710",
    "written": "柔らかい",
    "reading": "やわらかい",
    "meaningZhTw": "柔軟的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1605630",
    "jmdictEntryIds": [
      "1605630"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0711",
    "written": "硬い",
    "reading": "かたい",
    "meaningZhTw": "硬的",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1257110",
    "jmdictEntryIds": [
      "1257110"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0712",
    "written": "新鮮",
    "reading": "しんせん",
    "meaningZhTw": "新鮮",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1362100",
    "jmdictEntryIds": [
      "1362100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0713",
    "written": "満腹",
    "reading": "まんぷく",
    "meaningZhTw": "吃飽",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1526890",
    "jmdictEntryIds": [
      "1526890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0714",
    "written": "空腹",
    "reading": "くうふく",
    "meaningZhTw": "空腹",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1246000",
    "jmdictEntryIds": [
      "1246000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0715",
    "written": "食欲",
    "reading": "しょくよく",
    "meaningZhTw": "食慾",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1358660",
    "jmdictEntryIds": [
      "1358660"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0716",
    "written": "食材",
    "reading": "しょくざい",
    "meaningZhTw": "食材",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1983500",
    "jmdictEntryIds": [
      "1983500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0717",
    "written": "材料",
    "reading": "ざいりょう",
    "meaningZhTw": "材料",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1296670",
    "jmdictEntryIds": [
      "1296670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0718",
    "written": "献立",
    "reading": "こんだて",
    "meaningZhTw": "菜色安排",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1258500",
    "jmdictEntryIds": [
      "1258500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0719",
    "written": "調理",
    "reading": "ちょうり",
    "meaningZhTw": "烹調",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1429310",
    "jmdictEntryIds": [
      "1429310"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0720",
    "written": "調理法",
    "reading": "ちょうりほう",
    "meaningZhTw": "烹調方式",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1942760",
    "jmdictEntryIds": [
      "1942760"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0721",
    "written": "食器",
    "reading": "しょっき",
    "meaningZhTw": "餐具",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1358430",
    "jmdictEntryIds": [
      "1358430"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0722",
    "written": "箸",
    "reading": "はし",
    "meaningZhTw": "筷子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1476410",
    "jmdictEntryIds": [
      "1476410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0723",
    "written": "茶碗",
    "reading": "ちゃわん",
    "meaningZhTw": "飯碗",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1597530",
    "jmdictEntryIds": [
      "1597530"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0724",
    "written": "皿",
    "reading": "さら",
    "meaningZhTw": "盤子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1299680",
    "jmdictEntryIds": [
      "1299680"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0725",
    "written": "小皿",
    "reading": "こざら",
    "meaningZhTw": "小盤子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1348150",
    "jmdictEntryIds": [
      "1348150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0726",
    "written": "大皿",
    "reading": "おおざら",
    "meaningZhTw": "大盤子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1413850",
    "jmdictEntryIds": [
      "1413850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0727",
    "written": "丼",
    "reading": "どんぶり",
    "meaningZhTw": "大碗、蓋飯",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1562970",
    "jmdictEntryIds": [
      "1562970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0728",
    "written": "湯呑み",
    "reading": "ゆのみ",
    "meaningZhTw": "茶杯",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1612130",
    "jmdictEntryIds": [
      "1612130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0729",
    "written": "包丁",
    "reading": "ほうちょう",
    "meaningZhTw": "菜刀",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1515530",
    "jmdictEntryIds": [
      "1515530"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0730",
    "written": "鍋",
    "reading": "なべ",
    "meaningZhTw": "鍋子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1459720",
    "jmdictEntryIds": [
      "1459720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0731",
    "written": "鍋料理",
    "reading": "なべりょうり",
    "meaningZhTw": "火鍋料理",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2028280",
    "jmdictEntryIds": [
      "2028280"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0732",
    "written": "冷凍",
    "reading": "れいとう",
    "meaningZhTw": "冷凍",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1557170",
    "jmdictEntryIds": [
      "1557170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0733",
    "written": "冷蔵",
    "reading": "れいぞう",
    "meaningZhTw": "冷藏",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1557100",
    "jmdictEntryIds": [
      "1557100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0734",
    "written": "保存",
    "reading": "ほぞん",
    "meaningZhTw": "保存",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1513940",
    "jmdictEntryIds": [
      "1513940"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0738",
    "written": "売る",
    "reading": "うる",
    "meaningZhTw": "販售",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1473950",
    "jmdictEntryIds": [
      "1473950"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0739",
    "written": "払う",
    "reading": "はらう",
    "meaningZhTw": "付款",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1501620",
    "jmdictEntryIds": [
      "1501620"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0740",
    "written": "支払う",
    "reading": "しはらう",
    "meaningZhTw": "支付",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1310300",
    "jmdictEntryIds": [
      "1310300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0741",
    "written": "支払い",
    "reading": "しはらい",
    "meaningZhTw": "付款",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1594480",
    "jmdictEntryIds": [
      "1594480"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0742",
    "written": "購入",
    "reading": "こうにゅう",
    "meaningZhTw": "購買",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1282440",
    "jmdictEntryIds": [
      "1282440"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0743",
    "written": "販売",
    "reading": "はんばい",
    "meaningZhTw": "銷售",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1481800",
    "jmdictEntryIds": [
      "1481800"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0744",
    "written": "値引き",
    "reading": "ねびき",
    "meaningZhTw": "折價",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1600190",
    "jmdictEntryIds": [
      "1600190"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0745",
    "written": "割引",
    "reading": "わりびき",
    "meaningZhTw": "折扣",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1606950",
    "jmdictEntryIds": [
      "1606950"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0746",
    "written": "半額",
    "reading": "はんがく",
    "meaningZhTw": "半價",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1479050",
    "jmdictEntryIds": [
      "1479050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0747",
    "written": "定価",
    "reading": "ていか",
    "meaningZhTw": "定價",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1435410",
    "jmdictEntryIds": [
      "1435410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0748",
    "written": "価格",
    "reading": "かかく",
    "meaningZhTw": "價格",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1189500",
    "jmdictEntryIds": [
      "1189500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0749",
    "written": "料金",
    "reading": "りょうきん",
    "meaningZhTw": "費用",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1554280",
    "jmdictEntryIds": [
      "1554280"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0750",
    "written": "金額",
    "reading": "きんがく",
    "meaningZhTw": "金額",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1242700",
    "jmdictEntryIds": [
      "1242700"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0751",
    "written": "金銭",
    "reading": "きんせん",
    "meaningZhTw": "金錢",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1243020",
    "jmdictEntryIds": [
      "1243020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0752",
    "written": "お金",
    "reading": "おかね",
    "meaningZhTw": "錢",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1001820",
    "jmdictEntryIds": [
      "1001820"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0753",
    "written": "小銭",
    "reading": "こぜに",
    "meaningZhTw": "零錢",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1348470",
    "jmdictEntryIds": [
      "1348470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0754",
    "written": "硬貨",
    "reading": "こうか",
    "meaningZhTw": "硬幣",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1280530",
    "jmdictEntryIds": [
      "1280530"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0755",
    "written": "紙幣",
    "reading": "しへい",
    "meaningZhTw": "紙鈔",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1311600",
    "jmdictEntryIds": [
      "1311600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0756",
    "written": "お札",
    "reading": "おさつ",
    "meaningZhTw": "紙鈔",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1001920",
    "jmdictEntryIds": [
      "1001920"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0757",
    "written": "千円札",
    "reading": "せんえんさつ",
    "meaningZhTw": "千圓紙鈔",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1388790",
    "jmdictEntryIds": [
      "1388790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0758",
    "written": "一万円札",
    "reading": "いちまんえんさつ",
    "meaningZhTw": "一萬圓紙鈔",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2839963",
    "jmdictEntryIds": [
      "2839963"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0759",
    "written": "釣り銭",
    "reading": "つりせん",
    "meaningZhTw": "找零",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1598160",
    "jmdictEntryIds": [
      "1598160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0760",
    "written": "お釣り",
    "reading": "おつり",
    "meaningZhTw": "找零",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1270550",
    "jmdictEntryIds": [
      "1270550"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0761",
    "written": "領収書",
    "reading": "りょうしゅうしょ",
    "meaningZhTw": "收據",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1554760",
    "jmdictEntryIds": [
      "1554760"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0762",
    "written": "明細",
    "reading": "めいさい",
    "meaningZhTw": "明細",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1532440",
    "jmdictEntryIds": [
      "1532440"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0763",
    "written": "請求書",
    "reading": "せいきゅうしょ",
    "meaningZhTw": "帳單",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1381330",
    "jmdictEntryIds": [
      "1381330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0764",
    "written": "伝票",
    "reading": "でんぴょう",
    "meaningZhTw": "單據",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1442410",
    "jmdictEntryIds": [
      "1442410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0765",
    "written": "会員",
    "reading": "かいいん",
    "meaningZhTw": "會員",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1198230",
    "jmdictEntryIds": [
      "1198230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0766",
    "written": "会員証",
    "reading": "かいいんしょう",
    "meaningZhTw": "會員證",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1198260",
    "jmdictEntryIds": [
      "1198260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0767",
    "written": "会員登録",
    "reading": "かいいんとうろく",
    "meaningZhTw": "會員註冊",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2670480",
    "jmdictEntryIds": [
      "2670480"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0768",
    "written": "登録",
    "reading": "とうろく",
    "meaningZhTw": "註冊",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1444810",
    "jmdictEntryIds": [
      "1444810"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0769",
    "written": "特典",
    "reading": "とくてん",
    "meaningZhTw": "優惠",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1455220",
    "jmdictEntryIds": [
      "1455220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0770",
    "written": "特売",
    "reading": "とくばい",
    "meaningZhTw": "特價販售",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1455250",
    "jmdictEntryIds": [
      "1455250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0771",
    "written": "特価",
    "reading": "とっか",
    "meaningZhTw": "特價",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1661650",
    "jmdictEntryIds": [
      "1661650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0772",
    "written": "特別価格",
    "reading": "とくべつかかく",
    "meaningZhTw": "特別價格",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2847661",
    "jmdictEntryIds": [
      "2847661"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0773",
    "written": "安売り",
    "reading": "やすうり",
    "meaningZhTw": "廉價出售",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1154220",
    "jmdictEntryIds": [
      "1154220"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0774",
    "written": "売り場",
    "reading": "うりば",
    "meaningZhTw": "賣場",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1588550",
    "jmdictEntryIds": [
      "1588550"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0775",
    "written": "売店",
    "reading": "ばいてん",
    "meaningZhTw": "小賣店",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1474040",
    "jmdictEntryIds": [
      "1474040"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0776",
    "written": "商店",
    "reading": "しょうてん",
    "meaningZhTw": "商店",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1347180",
    "jmdictEntryIds": [
      "1347180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0777",
    "written": "商店街",
    "reading": "しょうてんがい",
    "meaningZhTw": "商店街",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1347190",
    "jmdictEntryIds": [
      "1347190"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0778",
    "written": "市場",
    "reading": "いちば",
    "meaningZhTw": "市場",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1308300",
    "jmdictEntryIds": [
      "1308300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0779",
    "written": "百貨店",
    "reading": "ひゃっかてん",
    "meaningZhTw": "百貨公司",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1488090",
    "jmdictEntryIds": [
      "1488090"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0780",
    "written": "専門店",
    "reading": "せんもんてん",
    "meaningZhTw": "專賣店",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1389930",
    "jmdictEntryIds": [
      "1389930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0781",
    "written": "本屋",
    "reading": "ほんや",
    "meaningZhTw": "書店",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1522240",
    "jmdictEntryIds": [
      "1522240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0782",
    "written": "書店",
    "reading": "しょてん",
    "meaningZhTw": "書店",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1344120",
    "jmdictEntryIds": [
      "1344120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0785",
    "written": "衣料品",
    "reading": "いりょうひん",
    "meaningZhTw": "服飾商品",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2144400",
    "jmdictEntryIds": [
      "2144400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0786",
    "written": "日用品",
    "reading": "にちようひん",
    "meaningZhTw": "日用品",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1464910",
    "jmdictEntryIds": [
      "1464910"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0787",
    "written": "雑貨",
    "reading": "ざっか",
    "meaningZhTw": "雜貨",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1299290",
    "jmdictEntryIds": [
      "1299290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0788",
    "written": "食品",
    "reading": "しょくひん",
    "meaningZhTw": "食品",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1358600",
    "jmdictEntryIds": [
      "1358600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0789",
    "written": "食料品",
    "reading": "しょくりょうひん",
    "meaningZhTw": "食品雜貨",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1358680",
    "jmdictEntryIds": [
      "1358680"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0790",
    "written": "青果",
    "reading": "せいか",
    "meaningZhTw": "蔬菜與水果",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1381430",
    "jmdictEntryIds": [
      "1381430"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0791",
    "written": "鮮魚",
    "reading": "せんぎょ",
    "meaningZhTw": "鮮魚",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1392510",
    "jmdictEntryIds": [
      "1392510"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0792",
    "written": "精肉",
    "reading": "せいにく",
    "meaningZhTw": "生鮮肉品",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1380130",
    "jmdictEntryIds": [
      "1380130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0793",
    "written": "惣菜",
    "reading": "そうざい",
    "meaningZhTw": "熟食、配菜",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1399580",
    "jmdictEntryIds": [
      "1399580"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0794",
    "written": "菓子",
    "reading": "かし",
    "meaningZhTw": "點心、糕餅",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1195670",
    "jmdictEntryIds": [
      "1195670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0795",
    "written": "和菓子",
    "reading": "わがし",
    "meaningZhTw": "日式甜點",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1562020",
    "jmdictEntryIds": [
      "1562020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0796",
    "written": "洋菓子",
    "reading": "ようがし",
    "meaningZhTw": "西式甜點",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1545870",
    "jmdictEntryIds": [
      "1545870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0797",
    "written": "土産",
    "reading": "みやげ",
    "meaningZhTw": "伴手禮",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1445360",
    "jmdictEntryIds": [
      "1445360"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0798",
    "written": "お土産",
    "reading": "おみやげ",
    "meaningZhTw": "伴手禮",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1002500",
    "jmdictEntryIds": [
      "1002500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0799",
    "written": "贈り物",
    "reading": "おくりもの",
    "meaningZhTw": "禮物",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1589030",
    "jmdictEntryIds": [
      "1589030"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0800",
    "written": "贈る",
    "reading": "おくる",
    "meaningZhTw": "贈送",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1403550",
    "jmdictEntryIds": [
      "1403550"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0801",
    "written": "選ぶ",
    "reading": "えらぶ",
    "meaningZhTw": "挑選",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1588730",
    "jmdictEntryIds": [
      "1588730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0802",
    "written": "比べる",
    "reading": "くらべる",
    "meaningZhTw": "比較",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1483540",
    "jmdictEntryIds": [
      "1483540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0803",
    "written": "試す",
    "reading": "ためす",
    "meaningZhTw": "試試看",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1312260",
    "jmdictEntryIds": [
      "1312260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0804",
    "written": "試着",
    "reading": "しちゃく",
    "meaningZhTw": "試穿",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1312500",
    "jmdictEntryIds": [
      "1312500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0805",
    "written": "試着室",
    "reading": "しちゃくしつ",
    "meaningZhTw": "試衣間",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1312510",
    "jmdictEntryIds": [
      "1312510"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0806",
    "written": "大きさ",
    "reading": "おおきさ",
    "meaningZhTw": "大小、尺寸",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1412910",
    "jmdictEntryIds": [
      "1412910"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0807",
    "written": "色",
    "reading": "いろ",
    "meaningZhTw": "顏色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1357600",
    "jmdictEntryIds": [
      "1357600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0808",
    "written": "赤",
    "reading": "あか",
    "meaningZhTw": "紅色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2013900",
    "jmdictEntryIds": [
      "2013900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0810",
    "written": "白",
    "reading": "しろ",
    "meaningZhTw": "白色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1474900",
    "jmdictEntryIds": [
      "1474900"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0811",
    "written": "黒",
    "reading": "くろ",
    "meaningZhTw": "黑色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1287410",
    "jmdictEntryIds": [
      "1287410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0812",
    "written": "黄色",
    "reading": "きいろ",
    "meaningZhTw": "黃色",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1576760",
    "jmdictEntryIds": [
      "1576760"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0813",
    "written": "緑",
    "reading": "みどり",
    "meaningZhTw": "綠色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1555300",
    "jmdictEntryIds": [
      "1555300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0814",
    "written": "紫",
    "reading": "むらさき",
    "meaningZhTw": "紫色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1311640",
    "jmdictEntryIds": [
      "1311640"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0815",
    "written": "茶色",
    "reading": "ちゃいろ",
    "meaningZhTw": "棕色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1422720",
    "jmdictEntryIds": [
      "1422720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0816",
    "written": "灰色",
    "reading": "はいいろ",
    "meaningZhTw": "灰色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1201970",
    "jmdictEntryIds": [
      "1201970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0817",
    "written": "金色",
    "reading": "きんいろ",
    "meaningZhTw": "金色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1578120",
    "jmdictEntryIds": [
      "1578120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0818",
    "written": "銀色",
    "reading": "ぎんいろ",
    "meaningZhTw": "銀色",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1243560",
    "jmdictEntryIds": [
      "1243560"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0819",
    "written": "服",
    "reading": "ふく",
    "meaningZhTw": "衣服",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1500940",
    "jmdictEntryIds": [
      "1500940"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0820",
    "written": "洋服",
    "reading": "ようふく",
    "meaningZhTw": "西式服裝",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1546020",
    "jmdictEntryIds": [
      "1546020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0821",
    "written": "和服",
    "reading": "わふく",
    "meaningZhTw": "和服",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1562190",
    "jmdictEntryIds": [
      "1562190"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0822",
    "written": "着物",
    "reading": "きもの",
    "meaningZhTw": "和服",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1423240",
    "jmdictEntryIds": [
      "1423240"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0823",
    "written": "上着",
    "reading": "うわぎ",
    "meaningZhTw": "外套",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1580340",
    "jmdictEntryIds": [
      "1580340"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0824",
    "written": "下着",
    "reading": "したぎ",
    "meaningZhTw": "內衣褲",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1185930",
    "jmdictEntryIds": [
      "1185930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0825",
    "written": "靴",
    "reading": "くつ",
    "meaningZhTw": "鞋子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1246700",
    "jmdictEntryIds": [
      "1246700"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0826",
    "written": "靴下",
    "reading": "くつした",
    "meaningZhTw": "襪子",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1246740",
    "jmdictEntryIds": [
      "1246740"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0827",
    "written": "帽子",
    "reading": "ぼうし",
    "meaningZhTw": "帽子",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1519170",
    "jmdictEntryIds": [
      "1519170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0829",
    "written": "眼鏡",
    "reading": "めがね",
    "meaningZhTw": "眼鏡",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1577670",
    "jmdictEntryIds": [
      "1577670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0830",
    "written": "傘",
    "reading": "かさ",
    "meaningZhTw": "雨傘",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1301940",
    "jmdictEntryIds": [
      "1301940"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0831",
    "written": "鞄",
    "reading": "かばん",
    "meaningZhTw": "包包",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1208910",
    "jmdictEntryIds": [
      "1208910"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0832",
    "written": "腕時計",
    "reading": "うでどけい",
    "meaningZhTw": "手錶",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1562870",
    "jmdictEntryIds": [
      "1562870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0833",
    "written": "指輪",
    "reading": "ゆびわ",
    "meaningZhTw": "戒指",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1310050",
    "jmdictEntryIds": [
      "1310050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0834",
    "written": "首飾り",
    "reading": "くびかざり",
    "meaningZhTw": "項鍊",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1329280",
    "jmdictEntryIds": [
      "1329280"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0835",
    "written": "在庫",
    "reading": "ざいこ",
    "meaningZhTw": "庫存",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1296470",
    "jmdictEntryIds": [
      "1296470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0836",
    "written": "品切れ",
    "reading": "しなぎれ",
    "meaningZhTw": "缺貨",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1490640",
    "jmdictEntryIds": [
      "1490640"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0837",
    "written": "売り切れ",
    "reading": "うりきれ",
    "meaningZhTw": "售罄",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1473870",
    "jmdictEntryIds": [
      "1473870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0838",
    "written": "入荷",
    "reading": "にゅうか",
    "meaningZhTw": "到貨",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1465780",
    "jmdictEntryIds": [
      "1465780"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0839",
    "written": "返品",
    "reading": "へんぴん",
    "meaningZhTw": "退貨（退回商品）",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1512300",
    "jmdictEntryIds": [
      "1512300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0840",
    "written": "交換",
    "reading": "こうかん",
    "meaningZhTw": "交換",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1271750",
    "jmdictEntryIds": [
      "1271750"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0841",
    "written": "保証",
    "reading": "ほしょう",
    "meaningZhTw": "保證；保固（商品情境）",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1603500",
    "jmdictEntryIds": [
      "1603500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0842",
    "written": "保証書",
    "reading": "ほしょうしょ",
    "meaningZhTw": "保證書",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1748130",
    "jmdictEntryIds": [
      "1748130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0843",
    "written": "故障",
    "reading": "こしょう",
    "meaningZhTw": "故障",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1267180",
    "jmdictEntryIds": [
      "1267180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0844",
    "written": "修理",
    "reading": "しゅうり",
    "meaningZhTw": "修理",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1332400",
    "jmdictEntryIds": [
      "1332400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0847",
    "written": "税金",
    "reading": "ぜいきん",
    "meaningZhTw": "稅金",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1382100",
    "jmdictEntryIds": [
      "1382100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0848",
    "written": "消費税",
    "reading": "しょうひぜい",
    "meaningZhTw": "消費稅",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1350320",
    "jmdictEntryIds": [
      "1350320"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0849",
    "written": "税込み",
    "reading": "ぜいこみ",
    "meaningZhTw": "含稅",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1596250",
    "jmdictEntryIds": [
      "1596250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0850",
    "written": "税抜き",
    "reading": "ぜいぬき",
    "meaningZhTw": "未稅",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2105350",
    "jmdictEntryIds": [
      "2105350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0851",
    "written": "小学校",
    "reading": "しょうがっこう",
    "meaningZhTw": "小學",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1347870",
    "jmdictEntryIds": [
      "1347870"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0852",
    "written": "中学校",
    "reading": "ちゅうがっこう",
    "meaningZhTw": "國中",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1423650",
    "jmdictEntryIds": [
      "1423650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0853",
    "written": "高校",
    "reading": "こうこう",
    "meaningZhTw": "高中",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1283500",
    "jmdictEntryIds": [
      "1283500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0854",
    "written": "高等学校",
    "reading": "こうとうがっこう",
    "meaningZhTw": "高級中學",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1283860",
    "jmdictEntryIds": [
      "1283860"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0855",
    "written": "専門学校",
    "reading": "せんもんがっこう",
    "meaningZhTw": "專門學校",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1703820",
    "jmdictEntryIds": [
      "1703820"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0856",
    "written": "大学院",
    "reading": "だいがくいん",
    "meaningZhTw": "研究所",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1413250",
    "jmdictEntryIds": [
      "1413250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0857",
    "written": "大学生",
    "reading": "だいがくせい",
    "meaningZhTw": "大學生",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1413260",
    "jmdictEntryIds": [
      "1413260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0858",
    "written": "留学生",
    "reading": "りゅうがくせい",
    "meaningZhTw": "留學生",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1552750",
    "jmdictEntryIds": [
      "1552750"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0859",
    "written": "留学",
    "reading": "りゅうがく",
    "meaningZhTw": "留學",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1552740",
    "jmdictEntryIds": [
      "1552740"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0860",
    "written": "入学",
    "reading": "にゅうがく",
    "meaningZhTw": "入學",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1465850",
    "jmdictEntryIds": [
      "1465850"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0861",
    "written": "卒業",
    "reading": "そつぎょう",
    "meaningZhTw": "畢業",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1405890",
    "jmdictEntryIds": [
      "1405890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0862",
    "written": "進学",
    "reading": "しんがく",
    "meaningZhTw": "升學",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1366010",
    "jmdictEntryIds": [
      "1366010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0863",
    "written": "転校",
    "reading": "てんこう",
    "meaningZhTw": "轉學",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1441140",
    "jmdictEntryIds": [
      "1441140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0864",
    "written": "転入",
    "reading": "てんにゅう",
    "meaningZhTw": "遷入、轉入（學校或住址）",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1441300",
    "jmdictEntryIds": [
      "1441300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0865",
    "written": "入試",
    "reading": "にゅうし",
    "meaningZhTw": "入學考試",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1466200",
    "jmdictEntryIds": [
      "1466200"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0866",
    "written": "受験",
    "reading": "じゅけん",
    "meaningZhTw": "應考",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1329740",
    "jmdictEntryIds": [
      "1329740"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0867",
    "written": "合格",
    "reading": "ごうかく",
    "meaningZhTw": "及格、錄取",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1284600",
    "jmdictEntryIds": [
      "1284600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0868",
    "written": "不合格",
    "reading": "ふごうかく",
    "meaningZhTw": "不及格",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1492400",
    "jmdictEntryIds": [
      "1492400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0869",
    "written": "成績",
    "reading": "せいせき",
    "meaningZhTw": "成績",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1375760",
    "jmdictEntryIds": [
      "1375760"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0870",
    "written": "点数",
    "reading": "てんすう",
    "meaningZhTw": "分數",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1441660",
    "jmdictEntryIds": [
      "1441660"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0871",
    "written": "満点",
    "reading": "まんてん",
    "meaningZhTw": "滿分",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1604340",
    "jmdictEntryIds": [
      "1604340"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0872",
    "written": "授業",
    "reading": "じゅぎょう",
    "meaningZhTw": "課程、上課",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1330290",
    "jmdictEntryIds": [
      "1330290"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0873",
    "written": "講義",
    "reading": "こうぎ",
    "meaningZhTw": "講課",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1282260",
    "jmdictEntryIds": [
      "1282260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0874",
    "written": "講師",
    "reading": "こうし",
    "meaningZhTw": "講師",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1282280",
    "jmdictEntryIds": [
      "1282280"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0876",
    "written": "教師",
    "reading": "きょうし",
    "meaningZhTw": "教師",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1237130",
    "jmdictEntryIds": [
      "1237130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0877",
    "written": "生徒",
    "reading": "せいと",
    "meaningZhTw": "學生（通常指中學及以下、補習班等）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1379380",
    "jmdictEntryIds": [
      "1379380"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0878",
    "written": "児童",
    "reading": "じどう",
    "meaningZhTw": "兒童、學童",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1315060",
    "jmdictEntryIds": [
      "1315060"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0879",
    "written": "教科書",
    "reading": "きょうかしょ",
    "meaningZhTw": "教科書",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1237020",
    "jmdictEntryIds": [
      "1237020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0880",
    "written": "参考書",
    "reading": "さんこうしょ",
    "meaningZhTw": "參考書",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1302300",
    "jmdictEntryIds": [
      "1302300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0881",
    "written": "辞書",
    "reading": "じしょ",
    "meaningZhTw": "字典",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1318970",
    "jmdictEntryIds": [
      "1318970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0882",
    "written": "辞典",
    "reading": "じてん",
    "meaningZhTw": "詞典",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1595270",
    "jmdictEntryIds": [
      "1595270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0883",
    "written": "図書館",
    "reading": "としょかん",
    "meaningZhTw": "圖書館",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1370420",
    "jmdictEntryIds": [
      "1370420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0884",
    "written": "図書",
    "reading": "としょ",
    "meaningZhTw": "圖書",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1370410",
    "jmdictEntryIds": [
      "1370410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0886",
    "written": "読書",
    "reading": "どくしょ",
    "meaningZhTw": "閱讀",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1456420",
    "jmdictEntryIds": [
      "1456420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0887",
    "written": "読む",
    "reading": "よむ",
    "meaningZhTw": "閱讀",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1456360",
    "jmdictEntryIds": [
      "1456360"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0888",
    "written": "書く",
    "reading": "かく",
    "meaningZhTw": "寫",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1343950",
    "jmdictEntryIds": [
      "1343950"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0889",
    "written": "書類",
    "reading": "しょるい",
    "meaningZhTw": "文件",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1344200",
    "jmdictEntryIds": [
      "1344200"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0890",
    "written": "文章",
    "reading": "ぶんしょう",
    "meaningZhTw": "文章",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1505470",
    "jmdictEntryIds": [
      "1505470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0891",
    "written": "作文",
    "reading": "さくぶん",
    "meaningZhTw": "作文",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1297960",
    "jmdictEntryIds": [
      "1297960"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0892",
    "written": "文法",
    "reading": "ぶんぽう",
    "meaningZhTw": "文法",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1505600",
    "jmdictEntryIds": [
      "1505600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0893",
    "written": "単語",
    "reading": "たんご",
    "meaningZhTw": "單字",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1417330",
    "jmdictEntryIds": [
      "1417330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0894",
    "written": "語彙",
    "reading": "ごい",
    "meaningZhTw": "詞彙",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1271260",
    "jmdictEntryIds": [
      "1271260"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0895",
    "written": "発音",
    "reading": "はつおん",
    "meaningZhTw": "發音",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1477170",
    "jmdictEntryIds": [
      "1477170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0896",
    "written": "音読",
    "reading": "おんどく",
    "meaningZhTw": "朗讀",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1183990",
    "jmdictEntryIds": [
      "1183990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0897",
    "written": "朗読",
    "reading": "ろうどく",
    "meaningZhTw": "朗讀",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1560730",
    "jmdictEntryIds": [
      "1560730"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0898",
    "written": "会話",
    "reading": "かいわ",
    "meaningZhTw": "會話",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1198880",
    "jmdictEntryIds": [
      "1198880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0899",
    "written": "対話",
    "reading": "たいわ",
    "meaningZhTw": "對話",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1410300",
    "jmdictEntryIds": [
      "1410300"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0900",
    "written": "翻訳",
    "reading": "ほんやく",
    "meaningZhTw": "翻譯",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1523400",
    "jmdictEntryIds": [
      "1523400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0901",
    "written": "通訳",
    "reading": "つうやく",
    "meaningZhTw": "口譯",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1433560",
    "jmdictEntryIds": [
      "1433560"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0902",
    "written": "練習",
    "reading": "れんしゅう",
    "meaningZhTw": "練習",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1559160",
    "jmdictEntryIds": [
      "1559160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0903",
    "written": "復習",
    "reading": "ふくしゅう",
    "meaningZhTw": "複習",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1500800",
    "jmdictEntryIds": [
      "1500800"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0904",
    "written": "予習",
    "reading": "よしゅう",
    "meaningZhTw": "預習",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1543070",
    "jmdictEntryIds": [
      "1543070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0905",
    "written": "暗記",
    "reading": "あんき",
    "meaningZhTw": "背誦",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1586910",
    "jmdictEntryIds": [
      "1586910"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0906",
    "written": "記憶",
    "reading": "きおく",
    "meaningZhTw": "記憶",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1223150",
    "jmdictEntryIds": [
      "1223150"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0907",
    "written": "記録",
    "reading": "きろく",
    "meaningZhTw": "紀錄",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1223440",
    "jmdictEntryIds": [
      "1223440"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0908",
    "written": "問題",
    "reading": "もんだい",
    "meaningZhTw": "問題、題目",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1536010",
    "jmdictEntryIds": [
      "1536010"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0909",
    "written": "解答",
    "reading": "かいとう",
    "meaningZhTw": "解答",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1199160",
    "jmdictEntryIds": [
      "1199160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0910",
    "written": "正解",
    "reading": "せいかい",
    "meaningZhTw": "正確答案",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1376740",
    "jmdictEntryIds": [
      "1376740"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0911",
    "written": "間違い",
    "reading": "まちがい",
    "meaningZhTw": "錯誤",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1215320",
    "jmdictEntryIds": [
      "1215320"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0912",
    "written": "間違える",
    "reading": "まちがえる",
    "meaningZhTw": "弄錯",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1215330",
    "jmdictEntryIds": [
      "1215330"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0913",
    "written": "直す",
    "reading": "なおす",
    "meaningZhTw": "修正",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1599390",
    "jmdictEntryIds": [
      "1599390"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0914",
    "written": "調べる",
    "reading": "しらべる",
    "meaningZhTw": "查詢",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1429060",
    "jmdictEntryIds": [
      "1429060"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0915",
    "written": "学ぶ",
    "reading": "まなぶ",
    "meaningZhTw": "學習",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1206530",
    "jmdictEntryIds": [
      "1206530"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0916",
    "written": "習う",
    "reading": "ならう",
    "meaningZhTw": "學習",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1333070",
    "jmdictEntryIds": [
      "1333070"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0917",
    "written": "教わる",
    "reading": "おそわる",
    "meaningZhTw": "受教",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1236940",
    "jmdictEntryIds": [
      "1236940"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0918",
    "written": "分かる",
    "reading": "わかる",
    "meaningZhTw": "明白",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1606560",
    "jmdictEntryIds": [
      "1606560"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0919",
    "written": "知る",
    "reading": "しる",
    "meaningZhTw": "知道",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1420470",
    "jmdictEntryIds": [
      "1420470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0920",
    "written": "考える",
    "reading": "かんがえる",
    "meaningZhTw": "思考",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1281020",
    "jmdictEntryIds": [
      "1281020"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0921",
    "written": "思う",
    "reading": "おもう",
    "meaningZhTw": "想、認為",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1589350",
    "jmdictEntryIds": [
      "1589350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0922",
    "written": "決める",
    "reading": "きめる",
    "meaningZhTw": "決定",
    "partOfSpeech": "一段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1254180",
    "jmdictEntryIds": [
      "1254180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0923",
    "written": "決まる",
    "reading": "きまる",
    "meaningZhTw": "定下來",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1591420",
    "jmdictEntryIds": [
      "1591420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0924",
    "written": "職業",
    "reading": "しょくぎょう",
    "meaningZhTw": "職業",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1357510",
    "jmdictEntryIds": [
      "1357510"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0925",
    "written": "会社員",
    "reading": "かいしゃいん",
    "meaningZhTw": "公司職員",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1198560",
    "jmdictEntryIds": [
      "1198560"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0926",
    "written": "従業員",
    "reading": "じゅうぎょういん",
    "meaningZhTw": "從業人員",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1335250",
    "jmdictEntryIds": [
      "1335250"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0927",
    "written": "職員",
    "reading": "しょくいん",
    "meaningZhTw": "職員",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1357490",
    "jmdictEntryIds": [
      "1357490"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0928",
    "written": "職場",
    "reading": "しょくば",
    "meaningZhTw": "職場",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1357540",
    "jmdictEntryIds": [
      "1357540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0929",
    "written": "事務所",
    "reading": "じむしょ",
    "meaningZhTw": "辦公室",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1314400",
    "jmdictEntryIds": [
      "1314400"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0930",
    "written": "事務",
    "reading": "じむ",
    "meaningZhTw": "行政事務",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1314270",
    "jmdictEntryIds": [
      "1314270"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0932",
    "written": "営業所",
    "reading": "えいぎょうしょ",
    "meaningZhTw": "營業所",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1613520",
    "jmdictEntryIds": [
      "1613520"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0933",
    "written": "営業日",
    "reading": "えいぎょうび",
    "meaningZhTw": "營業日",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1981160",
    "jmdictEntryIds": [
      "1981160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0934",
    "written": "営業時間",
    "reading": "えいぎょうじかん",
    "meaningZhTw": "營業時間",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1173450",
    "jmdictEntryIds": [
      "1173450"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0935",
    "written": "打ち合わせ",
    "reading": "うちあわせ",
    "meaningZhTw": "事前商談、工作討論、會議",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1588140",
    "jmdictEntryIds": [
      "1588140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0936",
    "written": "面接",
    "reading": "めんせつ",
    "meaningZhTw": "面試",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1533510",
    "jmdictEntryIds": [
      "1533510"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0937",
    "written": "就職",
    "reading": "しゅうしょく",
    "meaningZhTw": "就業",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1331670",
    "jmdictEntryIds": [
      "1331670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0938",
    "written": "転職",
    "reading": "てんしょく",
    "meaningZhTw": "轉職",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1441210",
    "jmdictEntryIds": [
      "1441210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0939",
    "written": "退職",
    "reading": "たいしょく",
    "meaningZhTw": "離職、退休",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1411420",
    "jmdictEntryIds": [
      "1411420"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0940",
    "written": "出勤",
    "reading": "しゅっきん",
    "meaningZhTw": "上班",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1338600",
    "jmdictEntryIds": [
      "1338600"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0941",
    "written": "退勤",
    "reading": "たいきん",
    "meaningZhTw": "下班",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 2219610",
    "jmdictEntryIds": [
      "2219610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0942",
    "written": "残業",
    "reading": "ざんぎょう",
    "meaningZhTw": "加班",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1304560",
    "jmdictEntryIds": [
      "1304560"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0943",
    "written": "休憩",
    "reading": "きゅうけい",
    "meaningZhTw": "休息",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1227720",
    "jmdictEntryIds": [
      "1227720"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0944",
    "written": "休暇",
    "reading": "きゅうか",
    "meaningZhTw": "休假",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1227610",
    "jmdictEntryIds": [
      "1227610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0945",
    "written": "有給休暇",
    "reading": "ゆうきゅうきゅうか",
    "meaningZhTw": "有薪假",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1541210",
    "jmdictEntryIds": [
      "1541210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0946",
    "written": "給与",
    "reading": "きゅうよ",
    "meaningZhTw": "薪資",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1230350",
    "jmdictEntryIds": [
      "1230350"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0947",
    "written": "時給",
    "reading": "じきゅう",
    "meaningZhTw": "時薪",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1316100",
    "jmdictEntryIds": [
      "1316100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0948",
    "written": "月給",
    "reading": "げっきゅう",
    "meaningZhTw": "月薪",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1255560",
    "jmdictEntryIds": [
      "1255560"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0949",
    "written": "年収",
    "reading": "ねんしゅう",
    "meaningZhTw": "年收入",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1468830",
    "jmdictEntryIds": [
      "1468830"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0950",
    "written": "収入",
    "reading": "しゅうにゅう",
    "meaningZhTw": "收入",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1330790",
    "jmdictEntryIds": [
      "1330790"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0951",
    "written": "支出",
    "reading": "ししゅつ",
    "meaningZhTw": "支出",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1310180",
    "jmdictEntryIds": [
      "1310180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0952",
    "written": "経費",
    "reading": "けいひ",
    "meaningZhTw": "經費",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1251640",
    "jmdictEntryIds": [
      "1251640"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0953",
    "written": "予算",
    "reading": "よさん",
    "meaningZhTw": "預算",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1543000",
    "jmdictEntryIds": [
      "1543000"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0954",
    "written": "売上",
    "reading": "うりあげ",
    "meaningZhTw": "營業額",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1588500",
    "jmdictEntryIds": [
      "1588500"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0955",
    "written": "利益",
    "reading": "りえき",
    "meaningZhTw": "利潤",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1549470",
    "jmdictEntryIds": [
      "1549470"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0956",
    "written": "損失",
    "reading": "そんしつ",
    "meaningZhTw": "損失",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1406750",
    "jmdictEntryIds": [
      "1406750"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0957",
    "written": "契約",
    "reading": "けいやく",
    "meaningZhTw": "契約",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1250190",
    "jmdictEntryIds": [
      "1250190"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0958",
    "written": "契約書",
    "reading": "けいやくしょ",
    "meaningZhTw": "契約書",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1250210",
    "jmdictEntryIds": [
      "1250210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0959",
    "written": "申請",
    "reading": "しんせい",
    "meaningZhTw": "申請",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1363130",
    "jmdictEntryIds": [
      "1363130"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0960",
    "written": "申込",
    "reading": "もうしこみ",
    "meaningZhTw": "申請、報名（名詞）",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1605140",
    "jmdictEntryIds": [
      "1605140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0961",
    "written": "申し込む",
    "reading": "もうしこむ",
    "meaningZhTw": "報名",
    "partOfSpeech": "五段動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1362890",
    "jmdictEntryIds": [
      "1362890"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0962",
    "written": "提出",
    "reading": "ていしゅつ",
    "meaningZhTw": "提交",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1436410",
    "jmdictEntryIds": [
      "1436410"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0963",
    "written": "報告",
    "reading": "ほうこく",
    "meaningZhTw": "報告",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1515670",
    "jmdictEntryIds": [
      "1515670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0964",
    "written": "報告書",
    "reading": "ほうこくしょ",
    "meaningZhTw": "報告書",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1515690",
    "jmdictEntryIds": [
      "1515690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0965",
    "written": "資料",
    "reading": "しりょう",
    "meaningZhTw": "資料",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1312820",
    "jmdictEntryIds": [
      "1312820"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0966",
    "written": "情報",
    "reading": "じょうほう",
    "meaningZhTw": "資訊",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1356370",
    "jmdictEntryIds": [
      "1356370"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0967",
    "written": "管理",
    "reading": "かんり",
    "meaningZhTw": "管理",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1214200",
    "jmdictEntryIds": [
      "1214200"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0968",
    "written": "担当",
    "reading": "たんとう",
    "meaningZhTw": "負責",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1418160",
    "jmdictEntryIds": [
      "1418160"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0969",
    "written": "責任",
    "reading": "せきにん",
    "meaningZhTw": "責任",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1383180",
    "jmdictEntryIds": [
      "1383180"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0970",
    "written": "目標",
    "reading": "もくひょう",
    "meaningZhTw": "目標",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1535650",
    "jmdictEntryIds": [
      "1535650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0971",
    "written": "成果",
    "reading": "せいか",
    "meaningZhTw": "成果",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1375650",
    "jmdictEntryIds": [
      "1375650"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0972",
    "written": "成功",
    "reading": "せいこう",
    "meaningZhTw": "成功",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1375690",
    "jmdictEntryIds": [
      "1375690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0973",
    "written": "失敗",
    "reading": "しっぱい",
    "meaningZhTw": "失敗",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1320140",
    "jmdictEntryIds": [
      "1320140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0974",
    "written": "改善",
    "reading": "かいぜん",
    "meaningZhTw": "改善",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1200960",
    "jmdictEntryIds": [
      "1200960"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0975",
    "written": "解決",
    "reading": "かいけつ",
    "meaningZhTw": "解決",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1198960",
    "jmdictEntryIds": [
      "1198960"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0976",
    "written": "対応",
    "reading": "たいおう",
    "meaningZhTw": "應對、處理",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1409840",
    "jmdictEntryIds": [
      "1409840"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0977",
    "written": "処理",
    "reading": "しょり",
    "meaningZhTw": "處理",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1342510",
    "jmdictEntryIds": [
      "1342510"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0978",
    "written": "作業",
    "reading": "さぎょう",
    "meaningZhTw": "作業",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1297540",
    "jmdictEntryIds": [
      "1297540"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0979",
    "written": "製品",
    "reading": "せいひん",
    "meaningZhTw": "產品",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1380760",
    "jmdictEntryIds": [
      "1380760"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0980",
    "written": "開発",
    "reading": "かいはつ",
    "meaningZhTw": "開發",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1202880",
    "jmdictEntryIds": [
      "1202880"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0981",
    "written": "製造",
    "reading": "せいぞう",
    "meaningZhTw": "製造",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1380690",
    "jmdictEntryIds": [
      "1380690"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0982",
    "written": "生産",
    "reading": "せいさん",
    "meaningZhTw": "生產",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1378990",
    "jmdictEntryIds": [
      "1378990"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0983",
    "written": "品質",
    "reading": "ひんしつ",
    "meaningZhTw": "品質",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1490580",
    "jmdictEntryIds": [
      "1490580"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0984",
    "written": "検品",
    "reading": "けんぴん",
    "meaningZhTw": "驗貨",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1814610",
    "jmdictEntryIds": [
      "1814610"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0985",
    "written": "発送",
    "reading": "はっそう",
    "meaningZhTw": "寄送、出貨",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1477670",
    "jmdictEntryIds": [
      "1477670"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0986",
    "written": "配送",
    "reading": "はいそう",
    "meaningZhTw": "配送",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1473120",
    "jmdictEntryIds": [
      "1473120"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0987",
    "written": "配達",
    "reading": "はいたつ",
    "meaningZhTw": "送達",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1473140",
    "jmdictEntryIds": [
      "1473140"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0988",
    "written": "受注",
    "reading": "じゅちゅう",
    "meaningZhTw": "接到訂單",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1329970",
    "jmdictEntryIds": [
      "1329970"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0989",
    "written": "発注",
    "reading": "はっちゅう",
    "meaningZhTw": "下訂單、發包",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1477710",
    "jmdictEntryIds": [
      "1477710"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0990",
    "written": "納期",
    "reading": "のうき",
    "meaningZhTw": "交貨期限、交期",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1470050",
    "jmdictEntryIds": [
      "1470050"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0991",
    "written": "納品",
    "reading": "のうひん",
    "meaningZhTw": "交貨",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1470100",
    "jmdictEntryIds": [
      "1470100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0993",
    "written": "見積もり",
    "reading": "みつもり",
    "meaningZhTw": "估價",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1604590",
    "jmdictEntryIds": [
      "1604590"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0994",
    "written": "見積書",
    "reading": "みつもりしょ",
    "meaningZhTw": "估價單",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1259800",
    "jmdictEntryIds": [
      "1259800"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0995",
    "written": "健康",
    "reading": "けんこう",
    "meaningZhTw": "健康",
    "partOfSpeech": "い形容詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1256170",
    "jmdictEntryIds": [
      "1256170"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0996",
    "written": "病気",
    "reading": "びょうき",
    "meaningZhTw": "疾病、生病",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1490230",
    "jmdictEntryIds": [
      "1490230"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0997",
    "written": "患者",
    "reading": "かんじゃ",
    "meaningZhTw": "患者",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1212210",
    "jmdictEntryIds": [
      "1212210"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0998",
    "written": "医師",
    "reading": "いし",
    "meaningZhTw": "醫師",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1159930",
    "jmdictEntryIds": [
      "1159930"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-0999",
    "written": "看護師",
    "reading": "かんごし",
    "meaningZhTw": "護理師",
    "partOfSpeech": "名詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1928100",
    "jmdictEntryIds": [
      "1928100"
    ],
    "releaseStatus": "STAGING_ONLY"
  },
  {
    "id": "candidate-ghost-candidate-1000",
    "written": "診察",
    "reading": "しんさつ",
    "meaningZhTw": "診察",
    "partOfSpeech": "サ變動詞",
    "meaningRelation": "partial",
    "readingType": "special",
    "reviewStatus": "needs-review",
    "sources": [
      {
        "name": "JMdict",
        "url": "https://www.edrdg.org/jmdict/j_jmdict.html"
      }
    ],
    "note": "候選詞：繁中詞義及教學標籤尚未正式核准；JMdict ID: 1365460",
    "jmdictEntryIds": [
      "1365460"
    ],
    "releaseStatus": "STAGING_ONLY"
  }
]
  const KANJI_LESSONS = [...ORIGINAL_KANJI_LESSONS, ...STAGING_ADDITIONS]

  function filterKanjiLessons(lessons, filters = {}) {
    const query = String(filters.query || '').trim().toLocaleLowerCase('ja-JP')
    return lessons.filter((item) => {
      if (filters.partOfSpeech && item.partOfSpeech !== filters.partOfSpeech) return false
      if (filters.meaningRelation === 'pending' && item.reviewStatus === 'reviewed') return false
      if (filters.meaningRelation && filters.meaningRelation !== 'pending' && (item.reviewStatus !== 'reviewed' || item.meaningRelation !== filters.meaningRelation)) return false
      if (filters.readingType === 'pending' && item.reviewStatus === 'reviewed') return false
      if (filters.readingType && filters.readingType !== 'pending' && (item.reviewStatus !== 'reviewed' || item.readingType !== filters.readingType)) return false
      if (!query) return true
      return [item.written, item.reading, item.meaningZhTw, item.note]
        .join(' ')
        .toLocaleLowerCase('ja-JP')
        .includes(query)
    })
  }

  function kanjiLessonToNote(item) {
    return {
      zh: item.meaningZhTw,
      jp: item.written,
      kana: item.reading,
      ghost: '',
      story: '',
      type: item.partOfSpeech,
      known: 0,
      missed: 0,
      repeats: 5,
      sourceKind: 'kanji-learning',
      sourceId: `kanji:${item.id}`,
    }
  }

  function addKanjiLesson(notes, item) {
    const current = Array.isArray(notes) ? notes : []
    const note = kanjiLessonToNote(item)
    const duplicate = current.findIndex((existing) =>
      existing?.sourceId === note.sourceId
      || (existing?.jp === note.jp && existing?.kana === note.kana)
      || (existing?.zh === note.zh && existing?.jp === note.jp))
    if (duplicate >= 0) return { notes: current, added: false, index: duplicate }
    return { notes: [...current, note], added: true, index: current.length }
  }

  function findKanjiNoteIndexes(notes, sourceIds) {
    const allowed = new Set(Array.isArray(sourceIds) ? sourceIds : [])
    return (Array.isArray(notes) ? notes : [])
      .map((note, index) => ({ note, index }))
      .filter(({ note }) => note?.sourceKind === 'kanji-learning' && allowed.has(note.sourceId))
      .map(({ index }) => index)
  }

  function createKanjiDrill(lessons, random = Math.random, limit = 50) {
    const ids = [...new Set((Array.isArray(lessons) ? lessons : []).map((item) => item?.id).filter(Boolean))]
    for (let index = ids.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor((Number(random()) || 0) * (index + 1))
      ;[ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]]
    }
    const queue = ids.slice(0, Math.max(0, limit))
    return {
      currentId: queue.shift() || null,
      queue,
      revealed: false,
      graded: false,
      remembered: 0,
      forgotten: 0,
      forgotRepeats: {},
      maxForgotRepeats: 2,
    }
  }

  function revealKanjiDrill(session) {
    if (!session?.currentId || session.graded) return { ...session }
    return { ...session, revealed: true }
  }

  function gradeKanjiDrill(session, remembered) {
    if (!session?.currentId || !session.revealed || session.graded) return { ...session }
    const next = {
      ...session,
      queue: [...session.queue],
      forgotRepeats: { ...session.forgotRepeats },
      graded: true,
      remembered: session.remembered + (remembered ? 1 : 0),
      forgotten: session.forgotten + (remembered ? 0 : 1),
    }
    if (!remembered) {
      const count = Number(next.forgotRepeats[session.currentId] || 0) + 1
      next.forgotRepeats[session.currentId] = count
      if (count <= next.maxForgotRepeats) next.queue.unshift(session.currentId)
    }
    return next
  }

  function nextKanjiDrill(session) {
    if (!session) return session
    const queue = [...session.queue]
    return { ...session, currentId: queue.shift() || null, queue, revealed: false, graded: false }
  }

  return {
    KANJI_LESSONS,
    filterKanjiLessons,
    kanjiLessonToNote,
    addKanjiLesson,
    findKanjiNoteIndexes,
    createKanjiDrill,
    revealKanjiDrill,
    gradeKanjiDrill,
    nextKanjiDrill,
  }
})
