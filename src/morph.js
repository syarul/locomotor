import morphdom from 'morphdom'
import { nodeMap } from './renderer'

const morph = (node, update) => {
  morphdom(node, update, {
    getNodeKey: function (node) {
      return node.key
    },
    onBeforeElUpdated: function (fromEl, toEl) {
      if (nodeMap.has(fromEl) && nodeMap.has(toEl)) {
        console.log(fromEl, toEl)
        const o = nodeMap.get(fromEl)
        const { attr, value } = nodeMap.get(toEl)
        // console.log(ev)
        
        console.log(nodeMap.get(toEl))
        fromEl.removeEventListener(o.attr, o.value)
        fromEl.addEventListener(attr, value)
        // nodeMap.delete(fromEl)
        nodeMap.delete(toEl)
      }
      // spec - https://dom.spec.whatwg.org/#concept-node-equals
      if (fromEl.isEqualNode(toEl)) {
        return false
      }
      return true
    },
    childrenOnly: true
  })
}

export default morph
