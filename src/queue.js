import { onStateChanged } from 'hookuspocus/src/on'
import { hydrate } from './walk'
import './utils'

let enqueueRender = []

/**
 * perform render sequence by filtering duplicates context
 * this in general increase performance by big margin offset, 
 * as to efficiently removing unnecessary duplicates, render
 * queue.
 */
const renderQueue = () => {
  // const queues = Array.from(new Set(enqueueRender))
  // const [queue] = queues
  // hydrate(queue)
  // // remove finished queue
  // queues.shift()
  // enqueueRender = queues
  const queues = enqueueRender.uniqueReverse()
  // console.log(queues.length, enqueueRender.length)
  const queue = queues.pop()
  hydrate(queue)
  enqueueRender = queues
}

export const comitQueue = () =>
  enqueueRender.length && renderQueue()

/**
 * When states changed, we push the context the render queue,
 * and we commit the render by throttling, so render will not
 * get abused overtimes. We use requestAnimationFrame, so
 * element rendering/animations don't look way too clunky
 * @param {*} context the context to pass to the render queue
 */
const renderHook = context => {
  enqueueRender.push(context)
  const p = new Promise(setImmediate)
  p.then(comitQueue)
}

onStateChanged(renderHook)
