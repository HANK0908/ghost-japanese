const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

function loadServiceWorker(overrides = {}) {
  const handlers = {}
  const calls = { added: [], deleted: [], claimed: 0, skipped: 0, opened: [] }
  const cache = { addAll: async (assets) => { calls.added = assets }, match: async () => 'cached-response' }
  const context = {
    URL,
    Promise,
    location: { origin: 'https://example.test' },
    fetch: async () => 'network-response',
    caches: {
      open: async (key) => { calls.opened.push(key); return cache },
      keys: async () => ['ghost-notebook-old', 'unrelated-cache'],
      delete: async (key) => { calls.deleted.push(key); return true },
      match: async () => 'cached-response',
    },
    self: {
      addEventListener: (name, handler) => { handlers[name] = handler },
      skipWaiting: () => { calls.skipped += 1 },
      clients: { claim: async () => { calls.claimed += 1 } },
    },
    ...overrides,
  }
  vm.runInNewContext(fs.readFileSync('sw.js', 'utf8'), context, { filename: 'sw.js' })
  return { handlers, calls, context }
}

async function dispatchExtendable(handler, event = {}) {
  let work
  handler({ ...event, waitUntil: (promise) => { work = promise } })
  await work
}

test('service worker precaches every V5.2 application module', async () => {
  const { handlers, calls } = loadServiceWorker()
  await dispatchExtendable(handlers.install)

  assert.deepEqual(Array.from(calls.added), [
    './', './index.html', './app-core.js', './kanji-data.js',
    './app-core.js?v=5.2.1', './kanji-data.js?v=5.2.1',
    './manifest.webmanifest', './icon-192.png', './icon-512.png',
  ])
})

test('HTML compatibility loader and service worker use the same versioned module URLs', async () => {
  const html = fs.readFileSync('index.html', 'utf8')
  const { handlers, calls } = loadServiceWorker()
  await dispatchExtendable(handlers.install)

  assert.equal(html.includes('app-core.js?v=5.2.1'), true)
  assert.equal(html.includes('kanji-data.js?v=5.2.1'), true)
  assert.equal(calls.opened[0], 'ghost-notebook-v526-reviewed-drill')
  assert.equal(calls.added.includes('./app-core.js?v=5.2.1'), true)
  assert.equal(calls.added.includes('./kanji-data.js?v=5.2.1'), true)
})

test('activation removes only obsolete ghost caches and claims clients', async () => {
  const { handlers, calls } = loadServiceWorker()
  await dispatchExtendable(handlers.activate)

  assert.deepEqual(calls.deleted, ['ghost-notebook-old'])
  assert.equal(calls.claimed, 1)
})

test('same-origin navigation is network first and falls back to cache', async () => {
  const { handlers } = loadServiceWorker({ fetch: async () => { throw new Error('offline') } })
  let response
  handlers.fetch({
    request: { method: 'GET', url: 'https://example.test/app/', mode: 'navigate' },
    respondWith: (promise) => { response = promise },
  })

  assert.equal(await response, 'cached-response')
})

test('SKIP_WAITING message activates an approved update', () => {
  const { handlers, calls } = loadServiceWorker()
  handlers.message({ data: { type: 'SKIP_WAITING' } })
  assert.equal(calls.skipped, 1)
})
