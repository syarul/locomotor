import { vtreeRender } from './renderer'
import { pocus, dataMap } from 'hookuspocus/src/core'
import { on, onStateChanged } from 'hookuspocus/src/on'
import { useEffect } from 'hookuspocus/src/use_effect'

// memo store, this basically to imitate React.memo
// without using useCallback all over the place to
// handle efficient rendering, rather that we store
// the current state of of rendering and flag the 
// context which is dirty on subsequent lifeCycle
const memoMap = new (WeakMap || Map)()

const rootVtree = []
// flush root vtree when we dont want it anymore
const flush = () => rootVtree.splice(0, 1)

const cleanup = ({ e = [] }) => Array.from(e, run => run())

onStateChanged(context => {
  const [rootContext] = dataMap.get(...rootVtree) || []
  const memo = memoMap.get(context) || {}
  // run side effects
  cleanup(memo)
  memoMap.set(context, { 
    ...memo,
    e: [],   // clear side effects
    s: false // flag dirty status
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
  const memo = memoMap.get(context) || {}
  const { e } = memo || []
  memoMap.set(context, {
    ...memo,
    e: e.concat(effect)
  })
})

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
// from hookuspocus https://github.com/michael-klein/hookuspocus
function createContext ({ elementName, attributes }) {
  if (!rootVtree.length) { rootVtree.push(elementName) }
  const node = pocus([attributes], elementName)
  // map the status/attributes where we will
  // be able to retrive on subsequent runs
  memoMap.set(elementName, {
    s: true,      // pristine status
    n: node,      // the render output
    p: attributes // props
  })
  return node
}

// simple compare for objects
const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

function walk (node) {
  const { elementName, attributes, children } = node
  if (typeof elementName === 'function') {
    const pris = memoMap.get(elementName) || {}
    // return memoize node if status is pristine and props unchanged
    return (pris.s && isEqual(pris.p, attributes) && pris.n) || createContext(node)
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
