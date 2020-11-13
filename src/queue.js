// import { onStateChanged } from 'hookuspocus/src/on'
import { onStateChanged } from 'hookuspocus/dist/hookuspocus'
import { hydrate } from './walk'
import { uniqueReverse } from './utils'

let enqueueRender = []

/**
 * perform render sequence by filtering duplicates context
 * this in general increase performance by big margin offset,
 * as to efficiently removing unnecessary duplicates.
 */
const renderQueue = () => {
  const queues = uniqueReverse(enqueueRender)
  const queue = queues.pop()
  hydrate(queue)
  enqueueRender = queues
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
  const p = new Promise(setImmediate)
  p.then(comitQueue)
}

onStateChanged(renderHook)
