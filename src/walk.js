import { vtreeRender } from './renderer'
import { pocus, dataMap } from 'hookuspocus/src/core'
import { on, onStateChanged } from 'hookuspocus/src/on'
import { useEffect } from 'hookuspocus/src/use_effect'

// memo store, this basically to imitate React.memo
// without using useCallback all over the place to
// handle efficient rendering, rather that we store
// the current state of of rendering and flag the
// context which is dirty on subsequent lifeCycle
const fnMap = new (WeakMap || Map)()
const memoMap = new (WeakMap || Map)()

const rootVtree = []
// flush root vtree when we dont want it anymore
const flush = () => rootVtree.splice(0, 1)

const cleanup = ({ e = [] }) => Array.from(e, run => run())

onStateChanged(context => {
  const [rootContext] = dataMap.get(...rootVtree) || []
  const fn = fnMap.get(context)
  // run side effects
  cleanup(fn)
  // flag context dirty
  fnMap.set(context, {
    ...fn,
    s: false
  })
  // get root props
  const { p } = memoMap.get(rootContext)
  // generate an efficient new vtree
  const vtree = pocus([p], rootContext)
  // emit changes to render so patching can be done
  vtreeRender(vtree)
})

// effect interceptor
const onEffect = cb =>
  on(useEffect, (data, effect) => {
    const [context] = dataMap.get(data.context)
    effect().then(clean => {
      if (clean && typeof clean === 'function') {
        cb(clean, context)
      }
    })
  })

onEffect((effect, context) => {
  const fn = fnMap.get(context) || {}
  const { e } = fn || []
  fnMap.set(context, {
    ...fn,
    e: e.concat(effect)
  })
})

function getContexFromMemo (context, key) {
  if (!memoMap.has(context)) {
    return (key !== undefined && context.bind({})) || context
  }
  const memo = memoMap.get(context) || {}
  if (key !== undefined) {
    return (memo[key] && memo[key].c) || context.bind({})
  }
  return context
}

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
function createContext ({ elementName, attributes }) {
  if (!rootVtree.length) { rootVtree.push(elementName) }

  // If keyed attributes exist unbind the elementName and map it to the key.
  // This should address function hooks thats go through Array mapping or
  // use elsewhere** (not tested yet for reusable hooks)

  const fn = getContexFromMemo(elementName, attributes.key)

  let node = null

  const { s, n, p } = fnMap.get(fn) || {}

  // return memoize node if status is pristine and props unchanged
  if (s && isEqual(p, attributes)) {
    node = n
  } else {
    node = pocus([attributes], fn)
  }

  // map the status/attributes where we will be able to retrive on subsequent runs
  fnMap.set(fn, {
    s: true,
    n: node,
    p: attributes
  })

  // use memoMap as way to retrive created unbind context
  let store = memoMap.get(elementName) || {}
  const st = {
    c: fn,
    p: attributes
  }
  if (attributes.key !== undefined) {
    store[attributes.key] = st
  } else {
    store = st
  }
  memoMap.set(elementName, store)
  return node
}

// simple compare for objects
const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

function walk (node) {
  const { elementName, children } = node
  if (typeof elementName === 'function') {
    return createContext(node)
  }
  if (children && children.length) {
    return {
      ...node,
      children: Array.from(children, walk)
    }
  }
  return node
}

export {
  walk as default,
  flush
}
