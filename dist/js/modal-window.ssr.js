/**
 * Bundle of AWEMA @awema-pl/module-modal-window
 * Generated: 2019-07-22 14:05:34
 * Version: 1.1.3
 */

'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
  : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});var document$1 = _global.document; // typeof document.createElement is 'object' in old IE

var is = _isObject(document$1) && _isObject(document$1.createElement);

var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var _toPrimitive$1 = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};var dP = Object.defineProperty;
var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive$1(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var _objectDp = {
  f: f
};var dP$1 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // 19.2.4.2 name

NAME in FProto || _descriptors && dP$1(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});/**
 * Detects if the given value is an object
 *
 * @param {*} val - a variable to check
 *
 */
function isObject(val) {
  return val != null && typeof val === 'object';
}
/**
 * Detects if the value is empty
 * returns true if the value is `undefined`, `null`, `false`, `''`, `0`, `[]` or `{}`
 *
 * @param {Any} val - value to check
 *
 * @returns {Boolean} - is the value empty
 */

function isEmpty(val) {
  if (!val) {
    return true;
  } else if (typeof val !== 'function' && val.hasOwnProperty('length') && typeof val.length === 'number') {
    return !val.length;
  } else if (typeof val === 'object') {
    return !Object.keys(val).length;
  }

  return false;
}
/**
 * Creates an array by splitting given path to object's value
 *
 * @param {String} path - Path to value in object
 *
 * @returns {Array} Array of levels to object
 *
 * @example
 * // returns ['some', 'nested', '0', 'value']
 * pathToArr('some.nested[0].value')
 * pathToArr('some.nested.0.value')
 *
 */

function pathToArr(path) {
  return path.split(/(?:\]?\.|\[['"]?|['"]?\])/g).filter(part => part !== '');
}
/**
 * Get a value by given path
 *
 * @param {Object} obj - object to search
 * @param {String} path - path to level
 * @param {*} defaultValue - default value if nothig found
 *
 * @returns {*} value of given path in object
 */

function get(obj, path, defaultValue) {
  if (!isObject(obj)) {
    console.warn('get supports only objects, ', obj, ' given');
    return defaultValue;
  } // create a path array of levels from a key


  path = pathToArr(path);
  let current = obj,
      value;

  while (path.length && current) {
    let key = path.shift();

    if (path.length) {
      current = current[key];
    } else {
      value = current[key];
    }
  }

  return typeof value !== 'undefined' ? value : defaultValue;
}
/**
 * Applies a function to every nested object in given object
 * and passes value, key and object itself
 * 
 * @param  {Array, Object}   obj - given object
 * @param  {Function}        fn  - function to apply
 * 
 * @return {Array, Object}   mutated object
 */

function forEach(obj, fn) {
  if (!isObject(obj)) return;
  let keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let val = obj[key];

    if (isObject(val)) {
      forEach(val, fn);
    } else {
      fn.call(null, obj[key], key, obj);
    }
  }

  return obj;
}var langMixin = {
  props: {
    lang: Object
  },
  computed: {
    '$lang': function () {
      return { ...this.lang,
        ...get(this.$options, '_config.lang', {})
      };
    }
  }
};var _uniqModalId = 0;

function getStopper() {
  return {
    prevented: false,
    preventClose: function preventClose() {
      this.prevented = true;
    }
  };
}

var script = {
  name: 'modal-window',
  mixins: [langMixin],
  props: {
    title: String,
    stay: {
      type: Boolean,
      default: function _default() {
        return this.$options._config.stay;
      }
    },
    bgClickClose: {
      type: Boolean,
      default: function _default() {
        return this.$options._config.bgClickClose;
      }
    },
    name: {
      type: String,
      default: function _default() {
        return "modal-".concat(_uniqModalId++);
      }
    },
    param: {
      type: String,
      default: 'modal'
    },
    theme: {
      type: String,
      default: 'default'
    }
  },
  data: function data() {
    return {
      showContent: false,
      lastFocused: null
    };
  },
  computed: {
    eventBus: function eventBus() {
      return this.$options._config.eventBus;
    },
    isOpened: function isOpened() {
      return this.$route.query[this.param] === this.name;
    }
  },
  provide: function provide() {
    return {
      modal: {
        name: this.name,
        open: this.open,
        close: this.close
      }
    };
  },
  watch: {
    isOpened: function isOpened(_isOpened) {
      if (!_isOpened) {
        var stopper = getStopper(); // global event

        this.eventBus.$emit("modal::".concat(this.name, ":before-close"), stopper);

        if (stopper.prevented) {
          this.open();
        }
      }
    },
    showContent: function showContent(isVisible) {
      var _this = this;

      if (isVisible) {
        if (typeof document === 'undefined') return;
        this.lastFocused = document.activeElement;
        this.$nextTick(function () {
          return _this.$el.focus();
        });
        window.addEventListener('keyup', this._escButtonHandler);
      } else {
        window.removeEventListener('keyup', this._escButtonHandler);

        if (this.lastFocused) {
          this.lastFocused.focus();
          this.lastFocused = null; // clear reference
        }
      }
    }
  },
  methods: {
    _addBodyClass: function _addBodyClass() {
      var _document$body$classL;

      (_document$body$classL = document.body.classList).add.apply(_document$body$classL, arguments);
    },
    _removeBodyClass: function _removeBodyClass() {
      var _document$body$classL2;

      (_document$body$classL2 = document.body.classList).remove.apply(_document$body$classL2, arguments);
    },
    open: function open() {
      this.$router.$setParam(this._getModalParam(this.name));
    },
    selfClose: function selfClose(event) {
      if (this.fullscreen || !this.bgClickClose) return;
      var self = this;
      window.addEventListener('mouseup', function onUp(e) {
        window.removeEventListener('mouseup', onUp);

        if (e.target === self.$el) {
          self.close();
        }
      });
    },
    close: function close() {
      this.$router.$setParam(this._getModalParam(null)); // emit closed

      this.eventBus.$emit("modal::".concat(this.name, ":closed"));
      this.$emit('closed');
    },
    _getModalParam: function _getModalParam(val) {
      var _param = {};
      _param[this.param] = val;
      return _param;
    },
    _escButtonHandler: function _escButtonHandler($event) {
      if ($event.keyCode === 27) {
        this.close();
      }
    }
  },
  created: function created() {
    this.showContent = this.isOpened;
  },
  mounted: function mounted() {
    this.eventBus.$on("modal::".concat(this.name, ":open"), this.open);
    this.eventBus.$on("modal::".concat(this.name, ":close"), this.close);
  },
  beforeDestroy: function beforeDestroy() {
    this.eventBus.$off("modal::".concat(this.name, ":open"), this.open);
    this.eventBus.$off("modal::".concat(this.name, ":close"), this.close); // clear external references

    this.lastFocused = null;
    window.removeEventListener('keyup', this._escButtonHandler);
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":("modal-transition-" + _vm.theme)},on:{"before-enter":function($event){_vm.showContent = true; _vm._addBodyClass(("has-modal-" + _vm.theme));},"after-leave":function($event){_vm._removeBodyClass(("has-modal-" + _vm.theme)); _vm.showContent = false;}}},[_c('aside',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpened),expression:"isOpened"}],staticClass:"modal",class:("is-" + _vm.theme),attrs:{"tabindex":_vm.isOpened ? '0' : '-1',"role":"dialog","aria-hidden":_vm.isOpened ? 'false' : 'true',"aria-label":_vm.title},on:{"mousedown":function($event){if($event.target !== $event.currentTarget){ return null; }return _vm.selfClose($event)}}},[_c('div',{staticClass:"modal__dialog",attrs:{"role":"document"}},[_c('div',{staticClass:"modal__header"},[_c('button',{staticClass:"modal__back",attrs:{"type":"button","title":_vm.$lang.MODAL_BACK,"aria-label":_vm.$lang.MODAL_BACK,"tabindex":"0"},on:{"click":function($event){$event.preventDefault();return _vm.$router.back()}}},[_c('svg',{attrs:{"width":"24","height":"24","viewBox":"0 0 20 20","fill":"none","stroke":"currentColor","aria-hidden":"true"}},[_c('polyline',{attrs:{"points":"10 14 5 9.5 10 5"}}),_vm._v(" "),_c('line',{attrs:{"x1":"16","y1":"9.5","x2":"5","y2":"9.52"}})])]),_vm._v(" "),_c('h5',{staticClass:"modal__title"},[_vm._v("\n                    "+_vm._s(_vm.title)+"\n                ")]),_vm._v(" "),_c('button',{staticClass:"modal__close",attrs:{"type":"button","title":_vm.$lang.MODAL_CLOSE,"aria-label":_vm.$lang.MODAL_CLOSE,"tabindex":"0"},on:{"click":function($event){$event.preventDefault();return _vm.close()}}},[_c('svg',{attrs:{"width":"24","height":"24","viewBox":"0 0 20 20","fill":"none","stroke":"currentColor","aria-hidden":"true"}},[_c('path',{attrs:{"stroke-width":"1.06","d":"M16,16 L4,4"}}),_vm._v(" "),_c('path',{attrs:{"stroke-width":"1.06","d":"M16,4 L4,16"}})])])]),_vm._v(" "),_c('div',{staticClass:"modal__body"},[(_vm.stay || _vm.showContent)?_c('div',{staticClass:"modal__content"},[_vm._t("default",null,{"closeModal":_vm.close})],2):_vm._e()])])])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = "data-v-5c7bcfa0";
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var modalWindow = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );var config = {
  stay: false,
  bgClickClose: true,
  lang: {
    MODAL_BACK: "Go back",
    MODAL_CLOSE: "Close modal (ESC)"
  }
};/**
 * Modifies VueRouter current GET-params and pushes next route
 * applied to VueRouter.prototype
 * 
 * @param {Object} queryObj - params object. If param is set to `null`, 
 *                           `undefined`, or empty `String`,
 *                          it will be deleted from query.
 *                          To set param=null, pass a string `'null'`
 * @param {Boolean} push - true to use history.pushState,
 *                         false to use history.replaceState
 *
 * @return {Object<VueRouter>} - AWEMA._vueRouter - global Vue router instance
 */

function setParam(queryObj, push = true) {
  // do nothing if nothing passed
  if (isEmpty(queryObj)) return; // shallow copy next route is enough for reactivity

  let next = Object.assign({}, this.currentRoute); // shallow copy route query

  let query = Object.assign({}, this.currentRoute.query); // merge queries

  Object.assign(query, queryObj); // remove null values

  query = forEach(query, function (val, key, obj) {
    if (typeof val === 'undefined' || val === '' || val === null) {
      delete obj[key];
    }
  }); // set query and push route

  next.query = query;
  this[push ? 'push' : 'replace'](next);
  return this;
}
/**
 * Component mixin - extends default $router functional
 */

const routerMixin = {
  beforeCreate() {
    this.$router.$setParam = setParam;
  }

};function install(Vue, options) {
  // check if already installed
  if (this.installed) return;
  this.installed = true; // apply utils

  modalWindow.mixins = modalWindow.mixins || [];
  modalWindow.mixins.push(routerMixin); // merge configs

  var _config = _objectSpread({}, config, options); // create Event Bus


  if (!_config.eventBus) {
    var eventBus = new Vue({
      methods: {
        open: function open(name) {
          name && this.$emit("modal::".concat(name, ":open"));
        },
        close: function close(name) {
          name && this.$emit("modal::".concat(name, ":close"));
        }
      }
    });
    _config.eventBus = eventBus;
    Vue.prototype.$modals = eventBus;
  }

  modalWindow._config = _config;
  Vue.component('modal-window', modalWindow);
}
var plugin = {
  install: install // auto install

};
var GlobalVue = null;
var GlobalVueRouter = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
  GlobalVueRouter = window.VueRouter;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
  GlobalVueRouter = global.VueRouter;
}

if (GlobalVue && GlobalVueRouter) {
  GlobalVue.use(plugin);
}

modalWindow.install = install;exports.install=install;exports.default=modalWindow;