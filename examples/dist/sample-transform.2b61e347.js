// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
'use strict';
/**
 * locomotor v0.0.1 Alpha release: https://github.com/syarul/locomotor
 * A smooth and FPS friendly animation library
 *
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< locomotor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *
 * Copyright 2018, Shahrul Nizam Selamat
 * Released under the MIT License.
 */

function locomotor(id, anim, opts) {

  anim = anim || {};

  var animationProperty;
  var functionStr;

  for (var attr in anim) {
    animationProperty = attr;
    if (typeof anim[attr] === 'function') {
      functionStr = anim[attr];
    }
  }

  opts = opts || {};

  this.fps = opts.fps || 60;
  this.fpsInterval = opts.fpsInterval || 1000;
  this.stop = opts.stop || false;

  var startTime;
  var then;
  var elapsed;
  var animStep = 0;
  var frameCount = 0;
  var sinceStart = 0;
  var interval = opts.interval || 1; // default value
  var data = opts.data || [0, 100]; // default custom value
  var duration = opts.duration || Infinity;

  var node = document.getElementById(id);

  if (!node) {
    throw new Error('unable to find a DOM node with id: ' + id);
  }

  var hasDebugNode = document.getElementById(opts.debugNode);

  var rAF = window.requestAnimationFrame;
  var perf = window.performance;

  var self = this;

  this.startAnimating = function (fps) {
    self.fpsInterval = 1000 / fps;
    then = perf.now();
    startTime = then;
    self.animate(then);
  };

  this.animate = function (now) {

    if (sinceStart > duration) {
      return;
    }

    if (self.stop) {
      return;
    }

    rAF(self.animate);

    elapsed = now - then;

    then = now - elapsed % self.fpsInterval;

    // debug fps
    if (opts.debug) {
      sinceStart = now - startTime;
      var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
      if (hasDebugNode) {
        hasDebugNode.innerHTML = 'Node: ' + id + ' | Elapsed time: ' + Math.round(sinceStart / 1000 * 100) / 100 + ' secs @ ' + currentFps + ' fps.';
      } else {
        console.log('Node: ' + id + ' | Elapsed time: ' + Math.round(sinceStart / 1000 * 100) / 100 + ' secs @ ' + currentFps + ' fps.');
      }
    }

    self.animSet(node, interval, data, animationProperty, functionStr, now);
  };

  this.animSet = function (node, interval, data, animationProperty, functionStr, now) {
    if (typeof functionStr !== 'function') {
      throw new Error('No parameter given to the animation value');
    }

    var range = data[1] - data[0];

    // get radial degree base on performance.now()
    var theta = now % range / range * 2 * Math.PI;

    // instead linear value we assign accurate value on the given interval
    interval *= 1 + Math.cos(theta) / range;

    if (animStep > data[1]) {
      animStep = data[0];
    }

    if (node) {
      node.style[animationProperty] = functionStr.call(self, animStep);
    }

    animStep = animStep + interval;
  };

  this.startAnimating(this.fps);
}

module.exports = locomotor;
},{}],4:[function(require,module,exports) {
'use strict';

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = document.body.offsetWidth - 100;

var lm = new _2.default('square', {
	transform: function transform(step) {
		return 'translate(' + step + 'px, 0) rotate(' + step / 100 + 'rad)';
	}
}, {
	interval: 5,
	data: [0, width],
	debug: true,
	debugNode: 'message'

});

setTimeout(function () {
	//lm.stop = true
}, 5000);

var square2 = document.getElementById('squaretwo');

var c = 0;

var inc = 1.2;

setInterval(function () {
	if (c > width) {
		c = 0;
	}
	square2.style.transform = 'translate(' + c + 'px, 0) rotate(' + c / 100 + 'rad)';
	c = c + inc;
}, 1);
},{"../":6}],8:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52969' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[8,4], null)
//# sourceMappingURL=/sample-transform.2b61e347.map