!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.locomotor=t():e.locomotor=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}([function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,"c",function(){return o}),n.d(t,"d",function(){return i}),n.d(t,"a",function(){return a}),n.d(t,"b",function(){return c});var o=function(e,t){for(var n=[],r=0,o=e.length;r<o;r++)n.push(t(e[r]));return n},i=function(e){for(var t=[],n=e.length-1;n>=0;n--)-1===t.indexOf(e[n])&&t.push(e[n]);return t},a=function(e,t){for(var n=[],r=0;r<e.length;r++)t(e[r])&&n.push(e[r]);return n},c=function e(t,n){if(t===n)return!0;if(!(t instanceof Object&&n instanceof Object))return!1;if(t.constructor!==n.constructor)return!1;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){if(!Object.prototype.hasOwnProperty.call(n,o))return!1;if(t[o]!==n[o]){if("object"!==r(t[o]))return!1;if(!e(t[o],n[o]))return!1}}for(o in n)if(Object.prototype.hasOwnProperty.call(n,o)&&!Object.prototype.hasOwnProperty.call(n,o))return!1;return!0}},function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a}),n.d(t,"c",function(){return s});const r=window.___hookusPocusRunMap||new(WeakMap||Map);window.___hookusPocusRunMap=r;const o=r.h||[];r.h=o;const i=r.d||new(WeakMap||Map);r.d=i;const a=e=>(function t(){const n=o[r.stackIndex][0];r.hookIndex++;const a=o[r.stackIndex][r.hookIndex]||(o[r.stackIndex][r.hookIndex]=[{context:n,hook:e}]);return(i.get(t)||e).apply({},a.concat(Array.from(arguments)))}),c=(e,t)=>{const n=(o[r.stackIndex]||[]).map(e=>{if(e[0]&&e[0][t]){const n=e[0][t]();return e[0][t]=0,n}}).filter(e=>e instanceof Promise);if(n.length>0){const t=Promise.all(n);r.set(e,r.has(e)?r.get(e).then(t):t)}},u=(e,t)=>{if(r.has(e)){const n=r.get(e).then(t);return r.set(e,n),n}return t()},f=(e,t,n,a)=>{if(!0!==t)return u(e,()=>(r.hookIndex=0,r.stackIndex=o.push(i.get(e)||[e])-1,i.set(e,o[r.stackIndex]),c(e,"before"),u(e,()=>{let t=n.apply(n,a);return c(e,"after"),u(e,()=>(o.pop(),r.delete(e),t))})));r.set(e,c(e,"cleanUp")),i.delete(e)},s=function(){const e=Array.from(arguments);let t;return e[0].pop&&(t=e.shift()),f("boolean"==typeof e[1]?e[0]:e[1]||e[0],!0===e[1]||e[2],e[0],t)}},function(e,t,n){"use strict";n.d(t,"b",function(){return s}),n.d(t,"a",function(){return l}),n.d(t,"d",function(){return d}),n.d(t,"c",function(){return p});var r=n(1),o=n(4);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){f(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=new(WeakMap||Map);s.h=[],s.c=[],s.d=new(WeakMap||Map),s.u=[];var l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=s.s||0;s.s=t+1;var n={Provider:"Locomotor.Provider.".concat(t)};return s.set(n,e),s.h.push(n),n},d=Object(r.b)(function(e,t){e.s=void 0!==e.s?e.s:s.get(t)||{};var n=i(Object(o.a)(function(t,n){return e.s=n,e.s},e.s),2),r=n[0],a=n[1];return s.d.set(t,function(e){return a(e)}),r}),p=function(e,t){e.context=t,e.elementName.match(/Locomotor.Provider./)&&function(e,t){var n=u({},s.get(s.h[e])||{});for(var r in t)"object"===a(t[r])?n=u({},n,{},t[r]):n[r]=t[r];var o=s.d.get(s.h[e]);s.c.push(o.bind(null,n))}(i(e.elementName.match(/([^Locomotor.Provider.])(.*)/g),1)[0],e.attributes)}},function(e,t,n){"use strict";n.d(t,"b",function(){return h}),n.d(t,"a",function(){return v}),n.d(t,"c",function(){return m}),n.d(t,"d",function(){return y});var r=n(5),o=n(2),i=n(1),a=n(8),c=n(0);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach(function(t){s(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=new(WeakMap||Map);l.gen=new(WeakMap||Map),l.stack=new(WeakMap||Map),l.base=[],l.fn=new(WeakMap||Map),l.c=[],l.w=[];var d=function(e){return e()},p=function e(t,n,r,o){var i=function(t){return e(t,n,r,o)};if(t instanceof Promise&&t.then(i),t.context===n){for(var a in t)t[a]=r[a];t.context=n}else t.context&&t.context!==o&&l.c.push(t.context),Array.isArray(t)?Object(c.c)(t,i):t.children&&t.children.length&&Object(c.c)(t.children,i);return t},h=function(e){var t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}(l.base,1)[0],n=l.get(t)[0];l.c.push(n);var a,c,u=l.fn.get(e);a=Object(i.c)([u.p],e),l.fn.set(e,f({},u,{n:a}));var s=[],d=[];a instanceof Promise&&(s.push(a),d.push(function(e){a=e})),e!==n&&(l.c.push(e),(c=l.fn.get(n)).n instanceof Promise&&(s.push(c.n),d.push(function(e){c.n=e})));var h=function(){Object(o.c)(a,e),e!==n?function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];Object(r.a)(p.apply(null,t))}(c.n,e,a,n):Object(r.a)(a)};s.length?Promise.all(s).then(function(e){return e.map(function(e,t){return d[t](e)})}).then(h):h()},v=function(){l.w.push(l.c),l.w.length>2&&l.w.shift(),l.c=[]},m=function(e){var t=l.w[1];if(2===l.w.length){var n=l.w[0];Object(c.a)(n,function(e){return!~t.findIndex(function(t){return t===e})}).forEach(function(e){i.a.delete(e);var t=l.gen.get(e),n=l.base[t];if(n){var r=l.get(n)||{};for(var o in r)r[o]===e&&delete r[o];l.set(n,r),l.gen.delete(e),l.fn.delete(e)}})}Object(c.c)(l.base,function(e){void 0!==l.stack.get(e)&&l.stack.set(e,0)}),l.stage=e,o.b.s=0,Object(c.c)(o.b.c,d),o.b.c=[],Object(a.a)()},y=function e(t){if(t instanceof Promise)return t.then(e);var n=t.children;return"function"==typeof t.elementName?function(e){var t=e.attributes,n=function(e,t){var n=t.key,r=l.stack.get(e)||void 0!==n&&n||0,o=l.get(e)||{},i=o[r]||e.bind({});!o[r]&&(o[r]=i),l.set(e,o),void 0===n&&l.stack.set(e,r+1);var a=l.base.indexOf(e);return~a?l.gen.set(i,a):(l.base.push(e),l.gen.set(i,l.base.length-1)),i}(e.elementName,t);l.c.push(n);var r=null,a=l.fn.get(n)||{},u=a.n,f=a.p,s=function(e){return Object(o.c)(e,n)};return(r=Object(c.b)(f,t)?u:Object(i.c)([t],n))instanceof Promise?r.then(s):s(r),l.fn.set(n,{n:r,p:t}),r}(t):n&&n.length?f({},t,{children:Object(c.c)(n,e)}):t}},function(e,t,n){"use strict";n.d(t,"a",function(){return o});var r=n(1);const o=Object(r.b)((e,t,n,r)=>(e.s=void 0!==e.s?e.s:r?r(n):n,[e.s,n=>(e.s=t(e.s,n),e.s)]))},function(e,t,n){"use strict";n(10);var r,o=n(7),i=n.n(o),a="undefined"==typeof document?void 0:document,c=!!a&&"content"in a.createElement("template"),u=!!a&&a.createRange&&"createContextualFragment"in a.createRange();function f(e){return e=e.trim(),c?function(e){var t=a.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(e):u?function(e){return r||(r=a.createRange()).selectNode(a.body),r.createContextualFragment(e).childNodes[0]}(e):function(e){var t=a.createElement("body");return t.innerHTML=e,t.childNodes[0]}(e)}function s(e,t){var n=e.nodeName,r=t.nodeName;return n===r||!!(t.actualize&&n.charCodeAt(0)<91&&r.charCodeAt(0)>90)&&n===r.toUpperCase()}function l(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var d={OPTION:function(e,t){var n=e.parentNode;if(n){var r=n.nodeName.toUpperCase();"OPTGROUP"===r&&(r=(n=n.parentNode)&&n.nodeName.toUpperCase()),"SELECT"!==r||n.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}l(e,t,"selected")},INPUT:function(e,t){l(e,t,"checked"),l(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var r=e.firstChild;if(r){var o=r.nodeValue;if(o==n||!n&&o==e.placeholder)return;r.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n,r,o=-1,i=0,a=e.firstChild;a;)if("OPTGROUP"===(r=a.nodeName&&a.nodeName.toUpperCase()))a=(n=a).firstChild;else{if("OPTION"===r){if(a.hasAttribute("selected")){o=i;break}i++}!(a=a.nextSibling)&&n&&(a=n.nextSibling,n=null)}e.selectedIndex=o}}};function p(){}function h(e){if(e)return e.getAttribute&&e.getAttribute("id")||e.id}var v=function(e){return function(t,n,r){if(r||(r={}),"string"==typeof n)if("#document"===t.nodeName||"HTML"===t.nodeName){var o=n;(n=a.createElement("html")).innerHTML=o}else n=f(n);var i=r.getNodeKey||h,c=r.onBeforeNodeAdded||p,u=r.onNodeAdded||p,l=r.onBeforeElUpdated||p,v=r.onElUpdated||p,m=r.onBeforeNodeDiscarded||p,y=r.onNodeDiscarded||p,b=r.onBeforeElChildrenUpdated||p,g=!0===r.childrenOnly,O=Object.create(null),w=[];function j(e){w.push(e)}function x(e,t,n){!1!==m(e)&&(t&&t.removeChild(e),y(e),function e(t,n){if(1===t.nodeType)for(var r=t.firstChild;r;){var o=void 0;n&&(o=i(r))?j(o):(y(r),r.firstChild&&e(r,n)),r=r.nextSibling}}(e,n))}function P(e){u(e);for(var t=e.firstChild;t;){var n=t.nextSibling,r=i(t);if(r){var o=O[r];o&&s(t,o)&&(t.parentNode.replaceChild(o,t),T(o,t))}P(t),t=n}}function T(t,n,r){var o=i(n);if(o&&delete O[o],!r){if(!1===l(t,n))return;if(e(t,n),v(t),!1===b(t,n))return}"TEXTAREA"!==t.nodeName?function(e,t){var n,r,o,u,f,l=t.firstChild,p=e.firstChild;e:for(;l;){for(u=l.nextSibling,n=i(l);p;){if(o=p.nextSibling,l.isSameNode&&l.isSameNode(p)){l=u,p=o;continue e}r=i(p);var h=p.nodeType,v=void 0;if(h===l.nodeType&&(1===h?(n?n!==r&&((f=O[n])?o===f?v=!1:(e.insertBefore(f,p),r?j(r):x(p,e,!0),p=f):v=!1):r&&(v=!1),(v=!1!==v&&s(p,l))&&T(p,l)):3!==h&&8!=h||(v=!0,p.nodeValue!==l.nodeValue&&(p.nodeValue=l.nodeValue))),v){l=u,p=o;continue e}r?j(r):x(p,e,!0),p=o}if(n&&(f=O[n])&&s(f,l))e.appendChild(f),T(f,l);else{var m=c(l);!1!==m&&(m&&(l=m),l.actualize&&(l=l.actualize(e.ownerDocument||a)),e.appendChild(l),P(l))}l=u,p=o}!function(e,t,n){for(;t;){var r=t.nextSibling;(n=i(t))?j(n):x(t,e,!0),t=r}}(e,p,r);var y=d[e.nodeName];y&&y(e,t)}(t,n):d.TEXTAREA(t,n)}!function e(t){if(1===t.nodeType||11===t.nodeType)for(var n=t.firstChild;n;){var r=i(n);r&&(O[r]=n),e(n),n=n.nextSibling}}(t);var E,k,A=t,N=A.nodeType,S=n.nodeType;if(!g)if(1===N)1===S?s(t,n)||(y(t),A=function(e,t){for(var n=e.firstChild;n;){var r=n.nextSibling;t.appendChild(n),n=r}return t}(t,(E=n.nodeName,(k=n.namespaceURI)&&"http://www.w3.org/1999/xhtml"!==k?a.createElementNS(k,E):a.createElement(E)))):A=n;else if(3===N||8===N){if(S===N)return A.nodeValue!==n.nodeValue&&(A.nodeValue=n.nodeValue),A;A=n}if(A===n)y(t);else{if(n.isSameNode&&n.isSameNode(A))return;if(T(A,n,g),w)for(var L=0,I=w.length;L<I;L++){var _=O[w[L]];_&&x(_,_.parentNode,!1)}}return!g&&A!==t&&t.parentNode&&(A.actualize&&(A=A.actualize(t.ownerDocument||a)),t.parentNode.replaceChild(A,t)),A}}(function(e,t){var n,r,o,i,a=t.attributes;if(11!==t.nodeType&&11!==e.nodeType){for(var c=a.length-1;c>=0;c--)r=(n=a[c]).name,i=n.value,(o=n.namespaceURI)?e.getAttributeNS(o,r=n.localName||r)!==i&&("xmlns"===n.prefix&&(r=n.name),e.setAttributeNS(o,r,i)):e.getAttribute(r)!==i&&e.setAttribute(r,i);for(var u=e.attributes,f=u.length-1;f>=0;f--)r=(n=u[f]).name,(o=n.namespaceURI)?t.hasAttributeNS(o,r=n.localName||r)||e.removeAttributeNS(o,r):t.hasAttribute(r)||e.removeAttribute(r)}}),m=function(e,t){v(e,t,{onNodeAdded:function(e){1===e.nodeType&&P.has(e)&&P.a.set(e,P.get(e))},onBeforeElUpdated:function(e,t){if(P.has(t)){var n=P.get(t),r=P.a.get(e);if(r)for(var o in r)e.removeEventListener(o,r[o]);for(var i in n)e.addEventListener(i,n[i]);P.a.set(e,n),P.delete(t)}return"INPUT"===e.nodeName&&e.hasAttribute("autofocus")&&e.focus(),!e.isEqualNode(t)},onBeforeNodeDiscarded:function(e){!function e(t){for(var n;t;)n=t,t=t.nextSibling,1===n.nodeType&&(P.a.has(n)&&P.a.delete(n),e(n.firstChild))}(e)},childrenOnly:!0})},y=n(3),b=n(0);function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach(function(t){j(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(e){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,"b",function(){return k}),n.d(t,"c",function(){return P}),n.d(t,"a",function(){return A});var P=new(WeakMap||Map);P.a=new(WeakMap||Map);var T=function e(t,n){if(n=n||document.createDocumentFragment(),null===t)return n;var r=t.elementName,o=t.attributes,i=t.children,a=function(t){return e(t,n)},c=null;return"object"===x(t)?Array.isArray(t)?Object(b.c)(t,a):"Locomotor.Fragment"===r?Object(b.c)(i,a):r.match(/Locomotor.Provider./)?Object(b.c)(i,a):(c=document.createElement(r),Object(b.c)(Object.keys(o),function(e){return function(e,t,n){return"function"==typeof n&&t.match(/^on/)?function(e,t,n){t=t.replace(/^on/,"").toLowerCase();var r=P.get(e)||{};if("change"===t)return e.addEventListener("keyup",n),e.addEventListener("blur",n),P.set(e,w({},r,{keyup:n,blur:n})),!1;e.addEventListener(t,n),P.set(e,w({},r,j({},t,n)))}.apply(null,arguments):"className"===t||"class"===t?function(e,t,n){if("object"===x(n)){var r=[];for(var o in n)r.push(n[o]);e.setAttribute("class",r.join(" "))}else e.setAttribute("class",n)}.apply(null,arguments):"style"===t&&"object"===x(n)?e.setAttribute(t,function(e){var t,n,r="";for(var o in e)r+=(n=e,"".concat((t=o).replace(/([A-Z]+)/g,"-$1").toLowerCase(),":").concat(n[t],";"));return r}(n)):"boolean"==typeof n?n&&e.setAttribute(t,""):e.setAttribute(t,n)}(c,e,o[e])})):c=document.createTextNode(t),i&&i.length&&Object(b.c)(i,function(t){return e(t,c)}),c&&n.appendChild(c),n},E=function e(t){return i.a.wrap(regeneratorRuntime.mark(function n(){var r,o,i;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(!(t instanceof Promise)){n.next=9;break}return n.next=3,Promise.resolve(t);case 3:return t=n.sent,n.next=6,e(t);case 6:return n.abrupt("return",n.sent);case 9:if(!Array.isArray(t)){n.next=15;break}return n.next=12,Object(b.c)(t,e);case 12:return n.abrupt("return",n.sent);case 15:if("object"===x(t)){n.next=19;break}return n.abrupt("return",t);case 19:if(o=(r=t).elementName,i=r.children,!(o instanceof Promise)){n.next=24;break}return n.next=23,Promise.resolve(o);case 23:o=n.sent;case 24:return n.next=26,Object(b.c)(i||[],e);case 26:return n.abrupt("return",w({},t,{elementName:o,children:i=n.sent}));case 28:case"end":return n.stop()}},n)}))(!0)},k=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,(n=[{key:"render",value:function(e,t){var n=this;E(e).then(function(e){Object(y.a)(),n.r=t;var r=T(e);m(n.r,r),n.emit("init",e)})}},{key:"deffer",value:function(){var e=this;return new Promise(function(t){return t(e.r)})}},{key:"emit",value:function(e){this.deffer().then(function(){return Object(y.c)(e)})}},{key:"on",value:function(e){var t=this;E(e).then(function(e){Object(y.a)();var n=P.a;(P=new(WeakMap||Map)).a=n;var r=T(e);m(t.r,r),t.emit("update",e)})}}])&&g(t.prototype,n),e}()),A=function(e){return k.on(e)}},function(e){var t;t=function(){return this}();try{t=t||Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e){var t=Array.prototype.slice;function n(e){var n=this,i=t.call(arguments,1);return new Promise(function(t,a){if("function"==typeof e&&(e=e.apply(n,i)),!e||"function"!=typeof e.next)return t(e);function c(t){var n;try{n=e.next(t)}catch(e){return a(e)}f(n)}function u(t){var n;try{n=e.throw(t)}catch(e){return a(e)}f(n)}function f(e){if(e.done)return t(e.value);var i=r.call(n,e.value);return i&&o(i)?i.then(c,u):u(new TypeError('You may only yield a function, promise, generator, array, or object, but the following object was passed: "'+e.value+'"'))}c()})}function r(e){return e?o(e)?e:function(e){var t=e.constructor;return!!t&&("GeneratorFunction"===t.name||"GeneratorFunction"===t.displayName||i(t.prototype))}(e)||i(e)?n.call(this,e):"function"==typeof e?function(e){var n=this;return new Promise(function(r,o){e.call(n,function(e,n){if(e)return o(e);arguments.length>2&&(n=t.call(arguments,1)),r(n)})})}.call(this,e):Array.isArray(e)?function(e){return Promise.all(e.map(r,this))}.call(this,e):Object==e.constructor?function(e){for(var t=new e.constructor,n=Object.keys(e),i=[],a=0;a<n.length;a++){var c=n[a],u=r.call(this,e[c]);u&&o(u)?f(u,c):t[c]=e[c]}return Promise.all(i).then(function(){return t});function f(e,n){t[n]=void 0,i.push(e.then(function(e){t[n]=e}))}}.call(this,e):e:e}function o(e){return"function"==typeof e.then}function i(e){return"function"==typeof e.next&&"function"==typeof e.throw}e.exports=n.default=n.co=n,n.wrap=function(e){return t.__generatorFunction__=e,t;function t(){return n.call(this,e.apply(this,arguments))}}},function(e,t,n){"use strict";!function(e){n.d(t,"a",function(){return c});var r=n(9),o=n(3),i=n(0),a=[],c=function(){return a.length&&(t=(e=Object(i.d)(a)).pop(),Object(o.b)(t),void(a=e));var e,t};Object(r.a)(function(t){a.push(t),new Promise(e).then(c)})}(n(11).setImmediate)},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n(4),o=n(1);const i=e=>((e,t)=>{o.a.set(r.a,t)})(0,(t,n,r,o)=>{const[i,a]=t.hook(t,n,r,o);return[i,n=>{const r=a(n);return i!==r&&e(t.context),r}]})},function(e){var t=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function c(e,t,n,r){var o=Object.create((t&&t.prototype instanceof s?t:s).prototype),i=new j(r||[]);return o._invoke=function(e,t,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=g(a,n);if(c){if(c===f)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=u(e,t,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===f)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(e,n,i),o}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var f={};function s(){}function l(){}function d(){}var p={};p[o]=function(){return this};var h=Object.getPrototypeOf,v=h&&h(h(x([])));v&&v!==t&&n.call(v,o)&&(p=v);var m=d.prototype=s.prototype=Object.create(p);function y(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function b(e){var t;this._invoke=function(r,o){function i(){return new Promise(function(t,i){!function t(r,o,i,a){var c=u(e[r],e,o);if("throw"!==c.type){var f=c.arg,s=f.value;return s&&"object"==typeof s&&n.call(s,"__await")?Promise.resolve(s.__await).then(function(e){t("next",e,i,a)},function(e){t("throw",e,i,a)}):Promise.resolve(s).then(function(e){f.value=e,i(f)},function(e){return t("throw",e,i,a)})}a(c.arg)}(r,o,t,i)})}return t=t?t.then(i,i):i()}}function g(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,g(e,t),"throw"===t.method))return f;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=u(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,f;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function w(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function j(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function x(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:P}}function P(){return{value:void 0,done:!0}}return l.prototype=m.constructor=d,d.constructor=l,d[a]=l.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===l||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,a in e||(e[a]="GeneratorFunction")),e.prototype=Object.create(m),e},e.awrap=function(e){return{__await:e}},y(b.prototype),b.prototype[i]=function(){return this},e.AsyncIterator=b,e.async=function(t,n,r,o){var i=new b(c(t,n,r,o));return e.isGeneratorFunction(n)?i:i.next().then(function(e){return e.done?e.value:i.next()})},y(m),m[a]="Generator",m[o]=function(){return this},m.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=x,j.prototype={constructor:j,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return a.type="throw",a.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),w(n),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;w(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:x(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},e}(e.exports);try{regeneratorRuntime=t}catch(e){Function("r","regeneratorRuntime = r")(t)}},function(e,t,n){(function(e){var r=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(o.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(12),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(6))},function(e,t,n){(function(e,t){!function(e){"use strict";if(!e.setImmediate){var n,r,o,i,a,c=1,u={},f=!1,s=e.document,l=Object.getPrototypeOf&&Object.getPrototypeOf(e);l=l&&l.setTimeout?l:e,"[object process]"==={}.toString.call(e.process)?n=function(e){t.nextTick(function(){p(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?(i="setImmediate$"+Math.random()+"$",a=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(i)&&p(+t.data.slice(i.length))},e.addEventListener?e.addEventListener("message",a,!1):e.attachEvent("onmessage",a),n=function(t){e.postMessage(i+t,"*")}):e.MessageChannel?((o=new MessageChannel).port1.onmessage=function(e){p(e.data)},n=function(e){o.port2.postMessage(e)}):s&&"onreadystatechange"in s.createElement("script")?(r=s.documentElement,n=function(e){var t=s.createElement("script");t.onreadystatechange=function(){p(e),t.onreadystatechange=null,r.removeChild(t),t=null},r.appendChild(t)}):n=function(e){setTimeout(p,0,e)},l.setImmediate=function(e){"function"!=typeof e&&(e=Function(""+e));for(var t=Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];return u[c]={callback:e,args:t},n(c),c++},l.clearImmediate=d}function d(e){delete u[e]}function p(e){if(f)setTimeout(p,0,e);else{var t=u[e];if(t){f=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(void 0,n)}}(t)}finally{d(e),f=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(6),n(13))},function(e){var t,n,r=e.exports={};function o(){throw Error("setTimeout has not been defined")}function i(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{n="function"==typeof clearTimeout?clearTimeout:i}catch(e){n=i}}();var c,u=[],f=!1,s=-1;function l(){f&&c&&(f=!1,c.length?u=c.concat(u):s=-1,u.length&&d())}function d(){if(!f){var e=a(l);f=!0;for(var t=u.length;t;){for(c=u,u=[];++s<t;)c&&c[s].run();s=-1,t=u.length}c=null,f=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===i||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function h(){}r.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new p(e,t)),1!==u.length||f||a(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=h,r.addListener=h,r.once=h,r.off=h,r.removeListener=h,r.removeAllListeners=h,r.emit=h,r.prependListener=h,r.prependOnceListener=h,r.listeners=function(){return[]},r.binding=function(){throw Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(){throw Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){"use strict";n.r(t);var r=n(4);const o=e=>{const[t,n]=Object(r.a)((e,t)=>t.value,e);return[t,e=>n({value:e})]};var i=n(1);const a=Object(i.b)((e,t,n)=>{e.v&&(!n||n.length===e.v.length&&n.every(t=>~e.v.indexOf(t)))||(e.v=n,e.cleanUp&&e.cleanUp(),e.after=(()=>{let n=t();return n instanceof Promise?n=n.then(t=>e.cleanUp=t):e.cleanUp=n,n}))}),c=(e,t)=>{a(()=>new Promise(t=>requestAnimationFrame(()=>t(e()))),t)};var u=n(2),f=n(5),s=n(3),l=function(e,t){if("function"!=typeof e)return Object(s.d)(e);for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return Object(s.d)({elementName:e,attributes:t||{},children:r||[]})};n.d(t,"L",function(){return d}),n.d(t,"default",function(){return l}),n.d(t,"locoDOM",function(){return f.b}),n.d(t,"useReducer",function(){return r.a}),n.d(t,"useState",function(){return o}),n.d(t,"useEffect",function(){return c}),n.d(t,"useLayoutEffect",function(){return a}),n.d(t,"createContext",function(){return u.a}),n.d(t,"useContext",function(){return u.d});var d="Locomotor.Fragment"}])});
//# sourceMappingURL=https://unpkg.com/locomotor@0.1.13/locomotor-min.js.map