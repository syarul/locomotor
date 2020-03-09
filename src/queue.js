import { onStateChanged } from 'hookuspocus/src/on'
import { hydrate } from './walk'
import { batchRender } from './renderer'
import { uniqueReverse }  from './utils'

let enqueueRender = []

/**
 * perform render sequence by filtering duplicates context
 * this in general increase performance by big margin offset, 
 * as to efficiently removing unnecessary duplicates.
 */
const renderQueue = () => {

  const queues = uniqueReverse(enqueueRender)
  // console.log(queues.length, enqueueRender.length)
  
  let vtree
  
  while (queues.length) {
    // get current queue
    const queue = queues.pop()
    hydrate(queue, vtree, nvtree => {
      vtree = nvtree
      if(queues.length === 0) {
        // batch render
        batchRender(vtree.n)
        // clean up render queue
        enqueueRender = []
      }
    })
  }

}

export const comitQueue = () =>
  enqueueRender.length && renderQueue()

/**
 * When states changed, we push the context to render queue,
 * and commit the render by throttling, so render will not
 * get abused overtimes. Multiple way to do this, with the
 * the reason to make it as lazy as possible
 * @param {*} context the context to pass to the render queue
 */
const renderHook = context => {
  enqueueRender.push(context)
  const p = new Promise(setImmediate) // new Promise(resolve => setTimeout(resolve, 100))
  p.then(comitQueue)
}

onStateChanged(renderHook)
