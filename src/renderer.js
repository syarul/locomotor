// import morph from './morph'
import { lifeCyclesRunReset, invokeCleanup } from './walk'
// import { loop } from './utils'

// import { createElement, createText, createAttributes, createDocumentFragment } from 'marko-vdom'

import patch from './patcher'

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

function classes (el, value) {
  if (typeof value === 'object') {
    el.setAttribute('class', Object.keys(value).map(i => value[i]).join(' '))
  } else {
    el.setAttribute('class', value)
  }
}

const nodeMap = new (WeakMap || Map)()
// nodeMap.a = new (WeakMap || Map)()

function evt (el, attr, value) {
  attr = attr.replace(/^on/, '').toLowerCase()

  const cur = nodeMap.get(el) || {}

  // react like onChange handler
  if (el.nodeName === 'INPUT' && attr === 'change') {
    el.addEventListener('keyup', value, false)
    el.addEventListener('blur', value, false)

    nodeMap.set(el, {
      ...cur,
      keyup: value,
      blur: value
    })

    return false
  }

  // initial event handler
  el.addEventListener(attr, value, false)

  // on subsequent run we patch the node through WeakMap
  nodeMap.set(el, {
    ...cur,
    [attr]: value
  })
}

function parseAttr (el, attr, value) {
  if (typeof value === 'function' && attr.match(/^on/)) {
    evt.apply(null, arguments)
  } else if (attr === 'className' || attr === 'class') {
    classes(el, value)
  } else if (attr === 'style' && typeof value === 'object') {
    el.setAttribute(attr, styleToStr(value))
  } else if (attr === 'value') {
    el.value = value
  } else if (typeof value === 'boolean') {
    const types = ['checked', 'selected', 'disabled'].includes(attr)
    if (types) {
      el[attr] = !!value
    }
    value && el.setAttribute(attr, '')
  } else {
    el.setAttribute(attr, value)
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
      vtree.map(createFrom)
    } else {
      // handle fragment
      if (elementName === 'Locomotor.Fragment') {
        children.map(createFrom)
      // handle provider
      } else if (elementName.match(/Locomotor.Provider./)) {
        children.map(createFrom)
      } else {
        node = document.createElement(elementName)
        Object.keys(attributes).map(attr => parseAttr(node, attr, attributes[attr]))
        // loop(Object.keys(attributes), attr => parseAttr(node, attr, attributes[attr]))
      }
    }
  } else {
    node = document.createTextNode(vtree)
  }
  if (children && children.length) {
    children.map(child => createEl(child, node))
  }
  node && fragment.appendChild(node)
  return fragment
}

// resolve all promises in vtree object
// thanks to @Bergi https://stackoverflow.com/users/1048572/bergi for the help
/* function resolveVtree (vtree) {
  if (typeof vtree !== 'object' || vtree == null) {
    return Promise.resolve(vtree)
  } else if (vtree instanceof Promise) {
    return vtree.then(resolveVtree)
  } else if (Array.isArray(vtree)) {
    return Promise.all(vtree.map(resolveVtree))
  } else {
    return Promise.all([
      vtree.elementName,
      resolveVtree(vtree.children)
    ]).then(([elementName, children]) => ({
      ...vtree,
      elementName,
      children
    }))
  }
} */

let intv

let fn = []

const act = (run, clear) => {
  if (typeof run === 'function') {
    fn.push(run)
  }
  if (clear) fn = []
}

class Renderer {
  render (vtree, rootNode) {
    this.r = rootNode
    vtree instanceof Promise ? vtree.then(v => {
      console.log(v)
      this.paint('init', v)
    }) : this.paint('init', vtree)
  }

  paint(step, vtree) {
    // invokeCleanup()
    patch(this.r, vtree)
    this.emit(step, vtree)
  }

  deffer () {
    return new Promise(resolve => resolve(this.r))
  }

  emit (lifecycle) {
    this.deffer().then(() => {
      lifeCyclesRunReset(lifecycle)

      clearTimeout(intv)
      intv = setTimeout(() => {
        fn.map(f => f())
      }, 100)
    })
  }

  on (vtree) {
    console.log(vtree)
    this.paint('update', vtree)
  }
}

const locoDOM = new Renderer()

const batchRender = vtree => locoDOM.on(vtree)

export {
  locoDOM as default,
  nodeMap,
  batchRender,
  createEl,
  parseAttr,
  act
}
