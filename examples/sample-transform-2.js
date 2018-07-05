import Locomotor from '../'

const width = document.body.offsetWidth - 100

var step = []
var interval = 5

var listLength = 50

for (let i = 0; i < listLength; i++) {
  let str = `<div id="square${i}" style="display: block; width: 20px; height: 20px; background: black; margin-bottom: 5px;"></div>`
  let tempDiv = document.createElement('div')
  tempDiv.innerHTML = str
  document.body.append(tempDiv.childNodes[0])

  step.push(0)

  let anim = new Locomotor(`square${i}`, {}, {
    debug: i === 0,
    easing: 'easeInOutQuint',
    debugNode: 'message',
    advanceSetup: (node, timeStamp, easing) => {
      if (step[i] > width) {
        step[i] = 0
      }
      var inc = width * easing.get(step[i] / width)
      if (node) {
        node.style.transform = `translate(${inc}px, 0) rotate(${inc / 100}rad)`
      }
      step[i] = step[i] + interval
    }
  })

  anim.run()

  setTimeout(() => anim.stop(), 15000)
}
