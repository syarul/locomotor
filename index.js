'use strict'
/**
 * locomotor v0.0.4 Alpha release: https://github.com/syarul/locomotor
 * A smooth and FPS friendly animation library
 *
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< locomotor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *
 * Copyright 2018, Shahrul Nizam Selamat
 * Released under the MIT License.
 */

function locomotor (id, anim, opts) {

  anim = anim || {}

  var animationProperty
  var functionStr

  for (var attr in anim) {
    animationProperty = attr
    if (typeof anim[attr] === 'function') {
      functionStr = anim[attr]
    }
  }

  opts = opts || {}

  this.fps = opts.fps || 60
  this.fpsInterval = opts.fpsInterval || 1000
  this.stop = opts.stop || false
  this.advanceSetup = opts.advanceSetup || null

  var startTime
  var then
  var elapsed
  var animStep = 0
  var frameCount = 0
  var sinceStart = 0
  var interval = opts.interval || 1 // default value
  var data = opts.data || [0, 100] // default custom value
  var duration = opts.duration || Infinity

  var node = document.getElementById(id)

  if (!node) {
    throw new Error('unable to find a DOM node with id: ' + id)
  }

  var hasDebugNode = document.getElementById(opts.debugNode)
  var rAF = window.requestAnimationFrame
  var perf = window.performance
  var self = this
  this.startAnimating = function (fps) {
    self.fpsInterval = 1000 / fps
    then = perf.now()
    startTime = then
    self.animate(then)
  }

  this.animate = function (now) {
    if (sinceStart > duration) {
      return
    }
    if (self.stop) {
      return
    }
    rAF(self.animate)
    elapsed = now - then
    then = now - (elapsed % self.fpsInterval)

    // debug fps
    if (opts.debug) {
      sinceStart = now - startTime
      var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100
      if (hasDebugNode) {
        hasDebugNode.innerHTML = 'Node: ' + id + ' | Elapsed time: ' + Math.round(sinceStart / 1000 * 100) / 100 + ' secs @ ' + currentFps + ' fps.'
      } else {
        console.log('Node: ' + id + ' | Elapsed time: ' + Math.round(sinceStart / 1000 * 100) / 100 + ' secs @ ' + currentFps + ' fps.')
      }
    }
    if(self.advanceSetup && typeof self.advanceSetup === 'function') {
      self.advanceSetup.call(self, node, now)
    } else {
      self.animSet(node, interval, data, animationProperty, functionStr, now)
    }
  }

  this.animSet = function (node, interval, data, animationProperty, functionStr, now) {
    if (typeof functionStr !== 'function') {
      throw new Error('No parameter given to the animation value')
    }
    var range = data[1] - data[0]
    if (animStep > data[1]) {
      animStep = data[0]
    }
    if (node) {
      node.style[animationProperty] = functionStr.call(self, animStep)
    }
    animStep = animStep + interval
  }
  this.startAnimating(this.fps)
}

module.exports = locomotor
