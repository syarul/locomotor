import 'regenerator-runtime/runtime'
import co from 'co'
import morph from './morph'
import { lifeCycles } from './walk'
import { loop } from './utils'
import hyperscript from 'hyperscript'
// import observable from 'observable'

const h = hyperscript.context()

let nodeMap = new (WeakMap || Map)()

const evtHyper = function(attributes, rev) {
  const newAttributes = {}
  for (let attr in attributes) {
    if (typeof attributes[attr] === 'function') {
      if (attr === 'onchange') {
        newAttributes['onkeyup'] = attributes[attr]
        newAttributes['onblur'] = attributes[attr]
        rev.push({
          keyup: attributes[attr],
          blur: attributes[attr]
        })
      } else {
        rev.push({
          [attr.slice(2).toLocaleLowerCase()]: attributes[attr]
        })
        newAttributes[attr.toLocaleLowerCase()] = attributes[attr]
      }
    } else {
      newAttributes[attr] = attributes[attr]
    }
  }
  return newAttributes
}

export const createEl = vtree => {
  h.cleanup()
  const { elementName, attributes, children } = vtree
  if(typeof vtree === 'object') {
    if(Array.isArray(vtree)) {
      return loop(vtree, createEl)
    } else {
      const rev = []
      const n = h(elementName, evtHyper(attributes, rev), loop(children, createEl))
      if(rev.length) {
        loop(rev, e => nodeMap.set(n, e))
      }
      return n
    }
  } else {
    return vtree
  }

}

// resolve all promises in vtree object
// using co since it's more compact compare to core-js
const resolveVtree = vtree =>
  co.wrap(function * () {
    console.log(vtree)
    const setNode = vtree.setNode
    if (vtree instanceof Promise) {
      vtree = yield Promise.resolve(vtree)
      if (setNode) vtree.setNode = setNode
      return yield resolveVtree(vtree)
    } else if (Array.isArray(vtree)) {
      return yield loop(vtree, resolveVtree)
    } else if (typeof vtree !== 'object') {
      return vtree
    } else {
      let { elementName, children } = vtree
      if (elementName instanceof Promise) {
        elementName = yield Promise.resolve(elementName)
      }
      children = yield loop((children || []), resolveVtree)
      return {
        ...vtree,
        elementName,
        children
      }
    }
  })(true)

class Renderer {
  render (vtree, rootNode) {
    const setNode = vtree.setNode
    resolveVtree(vtree).then(vtree => {
      const [rootBaseContext] = lifeCycles.base
      const rootContext = lifeCycles.get(rootBaseContext)[0]
      // console.log(vtree)
      setNode(vtree)
      const ctx = lifeCycles.fn.get(rootContext) || {}
      // Promise.all(lifeCycles.c).then(r => {
      //   console.log(lifeCycles.fn.get(rootContext))
      // })
      rootNode.appendChild(ctx.v)
    })
  }

  deffer () {
    return new Promise(resolve => resolve(this.r))
  }

  emit (lifecycle) {
    this.deffer().then(() =>
      lifeCyclesRunReset(lifecycle)
    )
  }

  on (vtree) {
    resolveVtree(vtree).then(vtree => {
      // flattenContext()
      // const a = nodeMap.a
      // nodeMap = new (WeakMap || Map)()
      // nodeMap.a = a
      Promise.resolve(createEl(vtree)).then(node => {
        console.log(node)
        morph(this.r, node)
        this.emit('update', vtree)
      })
    })
  }
}

const locoDOM = new Renderer()

const batchRender = vtree => locoDOM.on(vtree)

export {
  locoDOM as default,
  nodeMap,
  batchRender
}
