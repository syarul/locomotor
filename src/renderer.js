import 'regenerator-runtime/runtime'
import co from 'co'
import patch from './patch'
import morph from './morph'
import { lifeCyclesRunReset } from './walk'

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

const nodeMap = new (WeakMap || Map)()
nodeMap.i = new (WeakMap || Map)()

function evt (el, attr, value) {
  attr = attr.replace(/^on/, '').toLowerCase()
  // set change as keyup
  attr = (attr === 'change' && 'keyup') || attr

  // initial event handler
  el.addEventListener(attr, value, false)
  // on subsequent run we patch the node through WeakMap
  nodeMap.set(el, {
    attr,
    value
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

const createEl = (vtree, fragment, key) => {
  fragment = fragment || document.createDocumentFragment()
  if (vtree === null) return fragment
  const { elementName, attributes, children, context } = vtree
  if (key !== undefined) {
    attributes.key = key
  }
  let node = null
  if (typeof vtree === 'object') {
    if (Array.isArray(vtree)) {
      // if it a list we automatically assign a key index.
      // It's the reason why key property is not needed
      Array.from(vtree, (vnode, key) => createEl(vnode, fragment, key))
    } else {
      // if (!elementName) return fragment
      if (context) {
        // handle element with context, we need to attach listener
        // on dismount to clean all side effects - tba
      }
      // handle fragment
      if (elementName === 'Locomotor.Fragment') {
        Array.from(children, child => createEl(child, fragment))
      // handle provider
      } else if (elementName.match(/Locomotor.Provider./)) {
        Array.from(children, child => createEl(child, fragment))
      } else {
        node = document.createElement(elementName)
        // catch focus input
        // if (node.nodeName === 'INPUT') {
        //   node.addEventListener('focus', () =>
        //     nodeMap.i.set(node, true)
        //   , false)
        // }
        Array.from(Object.keys(attributes), attr => parseAttr(node, attr, attributes[attr]))
      }
    }
  } else {
    node = document.createTextNode(vtree)
  }
  if (children && children.length) {
    Array.from(children, child => createEl(child, node))
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
      return yield Array.from(vtree, resolveVtree)
    } else if (typeof vtree !== 'object') {
      return vtree
    } else {
      let { elementName, children } = vtree
      if (elementName instanceof Promise) {
        elementName = yield Promise.resolve(elementName)
      }
      children = yield Array.from(children || [], resolveVtree)
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
      this.r = rootNode
      const node = createEl(vtree)
      rootNode.appendChild(node)
      this.emit('init')
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
      const node = createEl(vtree)
      morph(this.r, node)
      this.emit('update')
    })
  }
}

const locoDOM = new Renderer()

const vtreeRender = vtree => locoDOM.on(vtree)

export {
  locoDOM as default,
  nodeMap,
  vtreeRender
}
