import Locomotor from '../'

import easing from '../easing'

const width = document.body.offsetWidth - 100

const anim = new Locomotor('square', {
  transform: step => `translate(${step}px, 0) rotate(${step / 100}rad)`
}, {
  interval: 2,
  data: [ 0, width ],
  easing: 'easeOutCubic',
  debug: true,
  debugNode: 'message',
  fps: 24
})

anim.run()

setTimeout(() => {
  // lm.stop = true
}, 5000)

const square2 = document.getElementById('squaretwo')

let c = 0

let inc = 1

let ease = new easing('easeOutCubic')

let pos, posEase

setInterval(() => {
  if (c > width) {
    c = 0
  }
  posEase = ease.get(c / width)
  pos = c * posEase
  square2.style.transform = `translate(${pos}px, 0) rotate(${pos / 100}rad)`
  c = c + inc
}, 1)
