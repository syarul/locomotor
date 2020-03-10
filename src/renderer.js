import 'regenerator-runtime/runtime'
import co from 'co'
// import patch from './patch'
import morph from './morph'
import { lifeCyclesRunReset, flattenContext } from './walk'
import { loop } from './utils'

function camelCase (s, o) {
  return `${s.replace(/([A-Z]+)/g, '-$1').toLowerCase()}:${o[s]};`
}

function styleToStr (obj) {
  let style = ''
  for (const attr in obj) {
    style += camelCase(attr, obj)
  }
  return style
}

function classes (el, attr, value) {
  if (typeof value === 'object') {
    el.setAttribute('class', Object.keys(value)
      .filter(c => value[c])
      .map(c => c)
      .join(' ')
    )
  } else {
    el.setAttribute('class', value)
  }
}

let nodeMap = new (WeakMap || Map)()
nodeMap.a = new (WeakMap || Map)()

function evt (el, attr, value) {
  attr = attr.replace(/^on/, '').toLowerCase()

  const cur = nodeMap.get(el) || {}

  // currently still leaking

  // react like onChange handler
  // for input
  if (attr === 'change') {
    el.addEventListener('keyup', value)
    el.addEventListener('blur', value)

    nodeMap.set(el, {
      ...cur,
      keyup: value,
      blur: value
    })

    return false
  }

  // el.setAttribute('__evt', value)

  // initial event handler
  el.addEventListener(attr, value)

  // on subsequent run we patch the node through WeakMap
  nodeMap.set(el, {
    ...cur,
    [attr]: value
  })
}

function parseAttr (el, attr, value) {
  if (typeof value === 'function' && attr.match(/^on/)) {
    return evt.apply(null, arguments)
  } else if (attr === 'className' || attr === 'class') {
    return classes.apply(null, arguments)
  } else if (attr === 'style' && typeof value === 'object') {
    return el.setAttribute(attr, styleToStr(value))
  } else if (typeof value === 'boolean') {
    return value && el.setAttribute(attr, '')
  } else {
    return el.setAttribute(attr, value)
  }
}

const createEl = (vtree, fragment) => {
  fragment = fragment || document.createDocumentFragment()
  if (vtree === null) return fragment
  const { elementName, attributes, children } = vtree
  const createFrom = vnode => createEl(vnode, fragment)
  let node = null
  if (typeof vtree === 'object') {
    if (Array.isArray(vtree)) {
      loop(vtree, createFrom)
    } else {
      // handle fragment
      if (elementName === 'Locomotor.Fragment') {
        loop(children, createFrom)
      // handle provider
      } else if (elementName.match(/Locomotor.Provider./)) {
        loop(children, createFrom)
      } else {
        node = document.createElement(elementName)
        loop(Object.keys(attributes), attr => parseAttr(node, attr, attributes[attr]))
      }
    }
  } else {
    node = document.createTextNode(vtree)
  }
  if (children && children.length) {
    loop(children, child => createEl(child, node))
  }
  node && fragment.appendChild(node)
  return fragment
}

// resolve all promises in vtree object
// using co since it's more compact compare to core-js
const resolveVtree = vtree =>
  co.wrap(function * () {
    if (vtree instanceof Promise) {
      vtree = yield Promise.resolve(vtree)
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
    resolveVtree(vtree).then(vtree => {
      flattenContext()
      this.r = rootNode
      const node = createEl(vtree)
      morph(this.r, node)
      this.emit('init', vtree)
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
      flattenContext()
      const a = nodeMap.a
      nodeMap = new(WeakMap || Map)()
      nodeMap.a = a
      const node = createEl(vtree)
      morph(this.r, node)
      this.emit('update', vtree)
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
