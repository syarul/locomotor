import patch from './patch'
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

function evt (el, attr, value) {
  el.addEventListener(attr.replace(/^on/, '').toLowerCase(), value, false)
  // on subsequent run we patch the node through WeakMap
  nodeMap.set(el, true)
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

function createEl (vtree, fragment) {
  fragment = fragment || document.createDocumentFragment()
  if (vtree === null) return fragment
  const { elementName, attributes, children, context } = vtree
  let node = null
  if (typeof vtree === 'object') {
    if (Array.isArray(vtree)) {
      Array.from(vtree, vnode => createEl(vnode, fragment))
    } else {
      // if (!elementName) return fragment
      if(context) {
        // handle element with context, we need to attach listener
        // on dismount to clean all side effects - tba
      }
      // handle fragment
      if (elementName === 'Locomotor.Fragment') {
        Array.from(children, child => createEl(child, fragment))
      // handle provider
      } else if (elementName.match(/Locomotor.Provider./)) {
        Array.from(children, child => {
          createEl(child, fragment)
        })
      } else {
        node = document.createElement(elementName)
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

function handler (vtree, mount, transform, handle) {
  vtree instanceof Promise
    ? vtree.then(v => handle(mount, transform(v)))
    : handle(mount, transform(vtree))
  return mount
}

class Renderer {
  render (...args) {
    this.r = handler(
      ...args,
      createEl,
      (rootNode, vnode) => {
        rootNode.appendChild(vnode)
        this.emit('init')
      }
    )
  }

  deffer () {
    return new Promise(resolve => resolve(this.r))
  }

  emit () {
    this.deffer().then(lifeCyclesRunReset)
  }

  on (vtree) {
    handler(
      vtree,
      this.r,
      createEl,
      (rootNode, vnode) => {
        patch(rootNode, vnode)
        this.emit('update')
      }
    )
  }
}

const locoDOM = new Renderer()

const vtreeRender = vtree => locoDOM.on(vtree)

export {
  locoDOM as default,
  nodeMap,
  vtreeRender
}
