import Locomotor from '../'

const width = document.body.offsetWidth - 100

const anim = new Locomotor('square', {
  transform: step => `translate(${step}px, 0) rotate(${step / 100}rad)`
}, {
  interval: 5,
  data: [ 0, width ],
  easing: 'easeOutCubic',
  debug: true,
  debugNode: 'message'
})

anim.run()

setTimeout(() => {
  // lm.stop = true
}, 5000)

const square2 = document.getElementById('squaretwo')

let c = 0

let inc = 1.2

setInterval(() => {
  if (c > width) {
    c = 0
  }
  square2.style.transform = `translate(${c}px, 0) rotate(${c / 100}rad)`
  c = c + inc
}, 1)
