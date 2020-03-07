import morphdom from 'morphdom'
import { nodeMap } from './renderer'

const morph = (node, update) => {
  morphdom(node, update, {
    onBeforeElUpdated: function (fromEl, toEl) {
      // sane way to handle event listeners
      if (nodeMap.has(toEl)) {
        const n = nodeMap.get(toEl)
        const o = nodeMap.get(fromEl)
        if (o) {
          for (const i in o) {
            fromEl.removeEventListener(i, o[i])
          }
        }
        for (const i in n) {
          fromEl.addEventListener(i, n[i])
        }
        nodeMap.set(fromEl, n)
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
