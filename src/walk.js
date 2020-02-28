import { vtreeRender } from './renderer'
import { pocus, dataMap } from 'hookuspocus/src/core'
import { on, onStateChanged } from 'hookuspocus/src/on'
import { useLayoutEffect } from 'hookuspocus/src/use_layout_effect'

// prop store
const propMap = new (WeakMap || Map)()
// effect store
const effectMap = new (WeakMap || Map)()

const rootVtree = []
// flush root vtree when we dont want it anymore
const flush = () => rootVtree.splice(0, 1)

const cleanup = (map, context) => {
  (map.get(context) || []).map(run => run())
  // map.set(context, [])
}

onStateChanged(context => {
  const [rootContext] = dataMap.get(...rootVtree) || []
  // console.log(effectMap)
  // cleanup all side effects
  // cleanup(effectMap, context)
  // generate new vtree
  const vtree = pocus([propMap.get(rootContext)], rootContext)
  // emit changes to render so patching can be done
  vtreeRender(vtree)
})

const values = new WeakMap()
// effect interceptor
const onEffect = cb =>
  on(useLayoutEffect, (data, effect, value) => {
    const [context] = dataMap.get(data.context)
    const effects = effectMap.get(context) || []
    const cValue = values.get(context) || []
    values.set(context, value)
    if (!effects.length || cValue !== value) {
      cleanup(effectMap, context)
      effect().then(clean => {
        if (clean && typeof clean === 'function') {
          cb(clean, context)
        }
      })
    }
  })

onEffect((effect, context) => {
  // console.log(effect)
  const effects = effectMap.get(context) || []
  effects.push(effect)
  effectMap.set(context, effects)
})

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
// from hookuspocus https://github.com/michael-klein/hookuspocus
function createContext ({ elementName, attributes }) {
  if (!rootVtree.length) { rootVtree.push(elementName) }
  // map the attributes/props where we will
  // be able to retrive on subsequent runs
  propMap.set(elementName, attributes)
  return pocus([attributes], elementName)
}

function walk (node) {
  const { elementName, children } = node
  if (typeof elementName === 'function') {
    return createContext(node)
  }
  if (children && children.length) {
    return {
      ...node,
      children: children.map(walk)
    }
  }
  return node
}

export {
  walk as default,
  flush
}
