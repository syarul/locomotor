import { vtreeRender } from './renderer'
import { pocus, dataMap } from 'hookuspocus/src/core'
import { on, onStateChanged } from 'hookuspocus/src/on'
import { useEffect } from 'hookuspocus/src/use_effect'
import c from 'clone'

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
  // cleanup(memo)
  console.log(dataMap.get(context))
  memoMap.set(context, { 
    ...memo,
    // e: [],   // clear side effects
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
// const onEffect = cb =>
//   on(useEffect, (data, effect) => {
//     const [context] = dataMap.get(data.context)
//     effect().then(clean => {
//       if (clean && typeof clean === 'function') {
//         cb(clean, context)
//       }
//     })
//   })

// onEffect((effect, context) => {
//   const memo = memoMap.get(context) || {}
//   const { e } = memo || []
//   memoMap.set(context, {
//     ...memo,
//     e: e.concat(effect)
//   })
// })

function getContexFromMemo(context, key) {
  if(!memoMap.has(context)){ 
    return (key !== undefined && context.bind({})) || context
  }
  const memo = memoMap.get(context) || {}
  if (key !== undefined){
    return (memo[key] && memo[key].c) || context.bind({})
  }
  return context
}

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
function createContext ({ elementName, attributes }) {

  // If keyed attributes exist unbind the elementName and map it to the key.
  // Context should always refer to its original ref and remain pristine.
  // This should address function hooks thats go through Array mapping or 
  // use elsewhere** (not solve yet for reusable hooks)

  const fn = getContexFromMemo(elementName, attributes.key)

  if (!rootVtree.length) { rootVtree.push(elementName) }
  const node = pocus([attributes], fn, elementName)
  // map the status/attributes where we will
  // be able to retrive on subsequent runs
 
  let store = memoMap.get(elementName) || {}
  const s =  {
    c: fn,
    n: node,
    p: attributes
  }
  if(attributes.key !== undefined){
    store[attributes.key] = s
  } else {
    store = s
  }
  memoMap.set(elementName, {
    ...store,
    s: true
  })
  return node
}

// simple compare for objects
const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

function walk (node) {
  const { elementName, attributes, children } = node
  if (typeof elementName === 'function') {
    const pris = memoMap.get(elementName) || {}
    console.log(pris, attributes.key)
    const p = (attributes.key !== undefined && pris[attributes.key]) || pris
    // return memoize node if status is pristine and props unchanged
    return (pris.s && isEqual(p.p, attributes) && p.n) || createContext(node)
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
