import { nodeMap, createEl, parseAttr } from './renderer'

const DOCUMENT_ELEMENT_TYPE = 1

// DOM patching method
// borrow some of the ideas from https://github.com/DylanPiercey/set-dom
// with the addition of handling input element

/* function isEqual (DOMnode, VDOMnode, eventStore) {
  // continue diffing if VDOMnode has children
  if (VDOMnode.children && VDOMnode.children.length) {
    return false
  }
  return (input(DOMnode, VDOMnode))
}

function input (DOMnode, VDOMnode) {
  console.log(nodeMap)
  if (DOMnode.nodeName !== 'INPUT') return

  // if (DOMnode.checked !== VDOMnode._checked) {
  //   DOMnode.checked = VDOMnode._checked
  // }
  // if (DOMnode.disabled !== VDOMnode._disabled) {
  //   DOMnode.disabled = VDOMnode._disabled
  // }
  // if (DOMnode.hasAttribute('autofocus')){
  //   DOMnode.focus()
  // }
  // if (DOMnode.value !== VDOMnode._value) {
  //   DOMnode.value = VDOMnode._value
  // }
}

function setAttributes (oldAttributes, newAttributes) {
  var i, a, b, ns, name

  // Remove old attributes.
  for (i = oldAttributes.length; i--;) {
    a = oldAttributes[i]
    ns = a.namespaceURI
    name = a.localName
    b = newAttributes.getNamedItemNS(ns, name)
    if (!b) oldAttributes.removeNamedItemNS(ns, name)
  }

  // Set new attributes.
  for (i = newAttributes.length; i--;) {
    a = newAttributes[i]
    ns = a.namespaceURI
    name = a.localName
    b = oldAttributes.getNamedItemNS(ns, name)
    if (!b) {
      // Add a new attribute.
      newAttributes.removeNamedItemNS(ns, name)
      oldAttributes.setNamedItemNS(a)
    } else if (b.value !== a.value) {
      // Update existing attribute.
      b.value = a.value
    }
  }
} */

const nodeStore = new (WeakMap || Map)()

function patch (DOMnode, VDOMnode) {
  if (Array.isArray(VDOMnode)) {
    // resolve in patch function
  } else {
    if (typeof VDOMnode === 'object') {
      const { elementName, attributes, children } = VDOMnode
      if (elementName === 'Locomotor.Fragment') {
        return diff(DOMnode, VDOMnode, true)
      }

      if (DOMnode.nodeType === DOCUMENT_ELEMENT_TYPE) {
        // if (isEqual(DOMnode, VDOMnode)) return
        if (DOMnode.nodeName === elementName.toUpperCase()) {
          Object.keys(attributes || {}).map(attr => {
            if (typeof attributes[attr] === 'function') {
              const ev = attr.replace(/^on/, '').toLowerCase()
              // onChange workaround for input keys event capturing
              if (DOMnode.nodeName === 'INPUT' && ev === 'change') {
                DOMnode.removeEventListener('keyup', (nodeMap.get(DOMnode) || {}).keyup, false)
                DOMnode.removeEventListener('blur', (nodeMap.get(DOMnode) || {}).blur, false)
              } else {
                DOMnode.removeEventListener(ev, (nodeMap.get(DOMnode) || {})[ev], false)
              }
            }
            parseAttr(DOMnode, attr, attributes[attr])
          })

          if (children && children.length) {
            // console.log(children)
            diff(DOMnode, VDOMnode)
          }
        } else {
          // nodeName is different
          const newDOMnode = createEl(VDOMnode).firstChild
          // store ref for DOMnode replacement
          nodeStore.set(DOMnode, newDOMnode)
          DOMnode.parentNode.replaceChild(newDOMnode, DOMnode)
        }
      }
    } else {
      if (DOMnode.nodeValue !== VDOMnode.toString()) {
        DOMnode.nodeValue = VDOMnode
      }
    }
  }
}

function getIndex (store, count) {
  return store.length - count - 1
}

function addExtra (count, oldParentNode, newStore) {
  let index
  while (count > 0) {
    count--
    index = getIndex(newStore, count)
    oldParentNode.appendChild(createEl(newStore[index]))
  }
}

let checkOld

function diff (oldParentNode, newParentNode, isFragment) {
  let DOMnode = isFragment ? oldParentNode : oldParentNode.firstChild

  let count = (newParentNode.children && newParentNode.children.length) || 0

  const newStore = newParentNode.children || []

  let index

  if (!DOMnode) {
    // if DOMnode is null process VDOMnode
    addExtra(count, oldParentNode, newStore)
  } else {
    while (DOMnode) {
      count--
      checkOld = DOMnode
      DOMnode = DOMnode.nextSibling
      index = getIndex(newStore, count)
      if (checkOld && (newStore[index] !== undefined)) {
        if (Array.isArray(newStore[index])) {
          // exit when it's a list
          return diff(oldParentNode, { children: newStore[index] })
        } else {
          patch(checkOld, newStore[index])
        }
      } else if (checkOld && (newStore[index] === undefined)) {
        if (nodeMap.has(checkOld)) {
          nodeMap.delete(checkOld)
        }
        oldParentNode.removeChild(checkOld)
      }
      if (DOMnode === null) {
        if (isFragment && oldParentNode.parentNode) {
          addExtra(count, oldParentNode.parentNode, newStore)
        } else if (isFragment && !oldParentNode.parentNode) {
          oldParentNode = nodeStore.get(oldParentNode)
          oldParentNode && addExtra(count, oldParentNode.parentNode, newStore)
          // remove ref from cache
          oldParentNode && nodeStore.delete(oldParentNode)
        } else {
          addExtra(count, oldParentNode, newStore)
        }
      }
    }
  }
}

function dompatcher (DOMnode, VDOMnode) {
  diff(DOMnode, VDOMnode)
}

export {
  dompatcher as default
}
