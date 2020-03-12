import { nodeMap } from './renderer'

const DOCUMENT_ELEMENT_TYPE = 1

// DOM patching method
// borrow some of the ideas from https://github.com/DylanPiercey/set-dom
// with the addition of handling input element

function isEqual (oldNode, newNode) {
  if (oldNode.nodeType === DOCUMENT_ELEMENT_TYPE && nodeMap.has(newNode)) {
    const n = nodeMap.get(newNode)
    const o = nodeMap.get(oldNode)
    if (o) {
      nodeMap.delete(oldNode)
      for(const i in o) {
        oldNode.removeEventListener(i, o[i])
      }
    }
    for (const i in n) {
      oldNode.addEventListener(i, n[i])
    }
    nodeMap.set(oldNode, n)
    nodeMap.delete(newNode)
  }

  return (arbiter(oldNode, newNode) || oldNode.isEqualNode(newNode))
}

function arbiter (oldNode, newNode) {
  if (oldNode.nodeName !== 'INPUT') return
  if (oldNode.checked !== newNode.checked) {
    oldNode.checked = newNode.checked
  }
  if (oldNode.value !== newNode.value) {
    oldNode.value = newNode.value
  }
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
}

function patch (oldNode, newNode) {
  if (oldNode.nodeType === newNode.nodeType) {
    if (oldNode.nodeType === DOCUMENT_ELEMENT_TYPE) {
      if (isEqual(oldNode, newNode)) return
      if (oldNode.nodeName === newNode.nodeName) {
        setAttributes(oldNode.attributes, newNode.attributes)
        diff(oldNode.firstChild, newNode.firstChild, oldNode)
      } else {
        diff(oldNode.firstChild, newNode.firstChild, oldNode)
      }
    } else {
      if (oldNode.nodeValue !== newNode.nodeValue) {
        oldNode.nodeValue = newNode.nodeValue
      }
    }
  } else {
    diff(oldNode.firstChild, newNode.firstChild, oldNode)
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
    oldParentNode.appendChild(newStore[index])
  }
}

let checkNew
let checkOld

function diff (oldNode, newNode, oldParentNode) {
  let count = 0
  const newStore = []

  while (newNode) {
    count++
    checkNew = newNode
    newNode = newNode.nextSibling
    newStore.push(checkNew)
  }

  let index

  if (!oldNode) {
    // if oldNode is null process newNode
    addExtra(count, oldParentNode, newStore)
  } else {
    while (oldNode) {
      count--
      checkOld = oldNode
      oldNode = oldNode.nextSibling
      index = getIndex(newStore, count)
      if (checkOld && newStore[index]) {
        patch(checkOld, newStore[index])
      } else if (checkOld && !newStore[index]) {
        oldParentNode.removeChild(checkOld)
      }
      if (oldNode === null) {
        addExtra(count, oldParentNode, newStore)
      }
    }
  }
}

function patcher (node, update) {
  diff(node.firstChild, update, node)
}

export default patcher
