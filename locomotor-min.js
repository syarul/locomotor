!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Locomotor=e()}}(function(){return function e(n,t,a){function i(o,u){if(!t[o]){if(!n[o]){var s="function"==typeof require&&require;if(!u&&s)return s(o,!0);if(r)return r(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var c=t[o]={exports:{}};n[o][0].call(c.exports,function(e){var t=n[o][1][e];return i(t||e)},c,c.exports,e,n,t,a)}return t[o].exports}for(var r="function"==typeof require&&require,o=0;o<a.length;o++)i(a[o]);return i}({1:[function(e,n,t){var a=e("./external/KeySpline"),i={ease:[.25,.1,.25,1],linear:[0,0,1,1],easeIn:[.42,0,1,1],easeOut:[0,0,.58,1],easeInOut:[.42,0,.58,1],easeInCubic:[.55,.055,.675,.19],easeOutCubic:[.215,.61,.355,1],easeInOutCubic:[.645,.045,.355,1],easeInCirc:[.6,.04,.98,.335],easeOutCirc:[.075,.82,.165,1],easeInOutCirc:[.785,.135,.15,.86],easeInExpo:[.95,.05,.795,.035],easeOutExpo:[.19,1,.22,1],easeInOutExpo:[1,0,0,1],easeInQuad:[.55,.085,.68,.53],easeOutQuad:[.25,.46,.45,.94],easeInOutQuad:[.455,.03,.515,.955],easeInQuart:[.895,.03,.685,.22],easeOutQuart:[.165,.84,.44,1],easeInOutQuart:[.77,0,.175,1],easeInQuint:[.755,.05,.855,.06],easeOutQuint:[.23,1,.32,1],easeInOutQuint:[.86,0,.07,1],easeInSine:[.47,0,.745,.715],easeOutSine:[.39,.575,.565,1],easeInOutSine:[.445,.05,.55,.95],easeInBack:[.6,-.28,.735,.045],easeOutBack:[.175,.885,.32,1.275],easeInOutBack:[.68,-.55,.265,1.55]};n.exports=function(e){var n;return"string"!=typeof e?new(Function.prototype.bind.apply(a,[null].concat([].slice.call(arguments)))):(n=i[e])&&Array.isArray(n)?new(Function.prototype.bind.apply(a,[null].concat(n))):void 0}},{"./external/KeySpline":2}],2:[function(e,n,t){n.exports=function(e,n,t,a){function i(e,n){return 1-3*n+3*e}function r(e,n){return 3*n-6*e}function o(e){return 3*e}function u(e,n,t){return((i(n,t)*e+r(n,t))*e+o(n))*e}this.get=function(s){return e==n&&t==a?s:u(function(n){for(var a=n,s=0;s<4;++s){var f=(p=a,3*i(d=e,l=t)*p*p+2*r(d,l)*p+o(d));if(0==f)return a;var c=u(a,e,t)-n;a-=c/f}var p,d,l;return a}(s),n,a)}}},{}],3:[function(e,n,t){"use strict";var a=e("./easing");n.exports=function(e,n,t){var i,r,o,u;for(var s in n=n||{})i=s,"function"==typeof n[s]&&(r=n[s]);t=t||{},this.fps=t.fps||60,this.fpsInterval=t.fpsInterval||1e3,this.stop=t.stop||!1,this.advanceSetup=t.advanceSetup||null,this.easing=t.easing||null;var f,c,p,d,l=0,v=0,h=0,I=t.interval||1,m=t.data||[0,100],y=t.duration||1/0,g=document.getElementById(e);if(!g)throw new Error("unable to find a DOM node with id: "+e);this.easing&&(f=a(this.easing));var O=document.getElementById(t.debugNode),w=window.requestAnimationFrame,x=window.performance,S=this;this.startAnimating=function(e){S.fpsInterval=1e3/e,u=x.now(),o=u,S.animate(u)},this.animate=function(n){if(!(h>y||S.stop)){if(w(S.animate),u=n-(n-u)%S.fpsInterval,t.debug){h=n-o;var a=Math.round(1e3/(h/++v)*100)/100;O?O.innerHTML="Node: "+e+" | Elapsed time: "+Math.round(h/1e3*100)/100+" secs @ "+a+" fps.":console.log("Node: "+e+" | Elapsed time: "+Math.round(h/1e3*100)/100+" secs @ "+a+" fps.")}S.advanceSetup&&"function"==typeof S.advanceSetup?S.advanceSetup(g,n,f):S.animSet(g,I,m,i,r,n)}},this.animSet=function(e,n,t,a,i,r){if("function"!=typeof i)throw new Error("No parameter given to the animation value");d=t[1]-t[0],l>t[1]&&(l=t[0]),S.easing&&(c=f.get(l/d),p=d*c),e&&(e.style[a]=i.call(S,S.easing?p:l)),l+=n},this.startAnimating(this.fps)}},{"./easing":1}]},{},[3])(3)});
