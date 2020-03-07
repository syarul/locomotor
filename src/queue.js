import { onStateChanged } from 'hookuspocus/src/on'
import { hydrate } from './walk'

let enqueueRender = []

/**
 * perform render sequence by filtering duplicates context
 */
const renderQueue = () => {
  const queues = Array.from(new Set(enqueueRender))
  //   console.log(queues.length, enqueueRender.length)
  const [queue] = queues
  hydrate(queue)
  // remove finished queue
  queues.shift()
  enqueueRender = queues
}

export const comitQueue = () =>
  enqueueRender.length && renderQueue()

/**
 * When states changed, we push the context the render queue,
 * and we commit the render by trottling, so render will not
 * get abused over times
 * @param {*} context the context to pass to the render queue
 */
const renderHook = context => {
  enqueueRender.push(context)
  const p = new Promise(setTimeout)
  p.then(comitQueue)
}

onStateChanged(context => {
    console.log(context)
    hydrate(context)
})
