/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/core-js/internals/a-callable.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-callable.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-call.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-call.js ***!
  \*********************************************************/
/***/ ((module) => {

var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-name.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-name.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this.js ***!
  \*****************************************************************/
/***/ ((module) => {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);

module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-method.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/get-method.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has-own-property.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/has-own-property.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-callable.js ***!
  \*******************************************************/
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/is-symbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/length-of-array-like.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/length-of-array-like.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-is-prototype-of.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-is-prototype-of.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js").CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer-or-infinity.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \******************************************************************/
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-property-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "./node_modules/core-js/internals/try-to-string.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/try-to-string.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.reverse.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.reverse.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var un$Reverse = uncurryThis([].reverse);
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return un$Reverse(this);
  }
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/styles/style.scss":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/styles/style.scss ***!
  \*******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/* Titre d'entrée*/\n@keyframes bounce {\n  0% {\n    transform: rotate(-45deg);\n  }\n  10% {\n    transform: rotate(-35deg);\n  }\n  70% {\n    transform: rotate(20deg);\n  }\n  80% {\n    transform: rotate(-10deg);\n  }\n  90% {\n    transform: rotate(5deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes bounce-1 {\n  0% {\n    transform: rotate(45deg);\n  }\n  10% {\n    transform: rotate(35deg);\n  }\n  70% {\n    transform: rotate(-20deg);\n  }\n  80% {\n    transform: rotate(10deg);\n  }\n  90% {\n    transform: rotate(-5deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n/* Animation bouton ouvert*/\n/* Animations portfolio*/\n.fadeIn-one {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-one.toggleHover {\n  animation: fadeIn-one 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-one.toggleHover ~ .list-overview {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-one {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-2 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-3 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-4 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-5 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-6 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-7 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-8 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-9 {\n  to {\n    left: 72%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-10 {\n  to {\n    left: 81%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-11 {\n  to {\n    left: 90%;\n    opacity: 1;\n  }\n}\n.fadeIn-two {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-two.toggleHover {\n  animation: fadeIn-two 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-two.toggleHover ~ .list-overview-two {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-two {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-13 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-14 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-15 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-16 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-17 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-18 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-19 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n.fadeIn-three {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-three.toggleHover {\n  animation: fadeIn-three 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-three.toggleHover ~ .list-overview-three {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-three {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-21 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-22 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-23 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-24 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-25 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-26 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-27 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-28 {\n  to {\n    left: 70%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-29 {\n  to {\n    left: 77%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-30 {\n  to {\n    left: 84%;\n    opacity: 1;\n  }\n}\n/* Animation texte défilant */\n.wrapper {\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translate(10%);\n    opacity: 1;\n  }\n  100% {\n    transform: translate(0%);\n    opacity: 1;\n  }\n}\n\n.wrapper-two {\n  background: blue;\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper-two.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translateX(100%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n}\n\n.wrapper-three {\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper-three.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translateX(100%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n}\n\n/* Codes font et colors*/\n:root {\n  --font-family: \"Muli\", sans-serif;\n  --light: #fab1a0;\n  --primary: #e84118;\n  --middle: #ee5253;\n  --dark: #ff3f34;\n  --text: #333;\n  --background: #fafafa;\n  --hint: #999;\n  --border: #ddd;\n  --overflow: #f5f6fa;\n  --copyright: #282a2b;\n  --cookie: #2071e7;\n  --light-blue: #00c3ff;\n  --primary-blue: #2071e7;\n  --font-number: \"roboto\";\n  --backrgoundTextSlider: #fcfffc;\n}\n\n/* Reset des différents éléments de notre page*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 62.5%;\n}\n\nbody {\n  font-family: var(--font-family);\n  color: var(--text);\n  font-size: 1.6rem;\n}\n\np {\n  margin: 1rem 0;\n}\n\nh1 {\n  margin: 0;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 1rem 0 2rem 0;\n}\n\n/*ul{\n  list-style: none;\n}*/\nul {\n  list-style-type: circle;\n}\n\na {\n  color: var(--text);\n  text-decoration: none;\n}\n\nimg {\n  max-width: 100%;\n}\n\n/* On créé ici une classe générique\npour des styles qu'on va utiliser beaucoup dans le projet*/\n.title-small {\n  letter-spacing: 0.5rem;\n  font-size: 1.7rem;\n}\n\n.text-primary {\n  color: var(--primary);\n}\n.text-hint {\n  color: var(--hint);\n}\n.text-border {\n  color: var(--border);\n}\n\n/* Pour des classes utilitaires */\n.mb-5 {\n  margin-bottom: 5rem !important;\n}\n\n.mb-3 {\n  margin-bottom: 3rem !important;\n}\n\n.mb-2 {\n  margin-bottom: 2rem !important;\n}\n\n.align-flex {\n  display: flex !important;\n  flex-flow: nowrap !important;\n}\n\n/*.imag-2{\n  filter: opacity: 0.9 !important;\n}\n.imag-3{\n  opacity: 0.8 !important;\n}\n.imag-4{\n  opacity: 0.7 !important;\n}\n.imag-5{\n  opacity: 0.6 !important;\n}\n.imag-6{\n  opacity: 0.5 !important;\n}\n.imag-7{\n  opacity: 0.4 !important;\n}\n.imag-8{\n  opacity: 0.3 !important;\n}\n.imag-9{\n  opacity: 0.2 !important;\n}\n.imag-10{\n  opacity: 0.1 !important;\n}*/\n/* Les media queries sont placées ici dans des mixins */\n/* phones and down */\n/* phone to portrait tablet */\n/* Portrait tablet to landscape and desktop */\n/* Laptop */\n/* Laptop and desktop */\n/* btn pour test :\n\n.btn-visible{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0;\n    color: var(--dark);\n    font-weight: bold;\n    background:\n    linear-gradient(to bottom,\n    rgba(255, 255, 255, 1),\n    rgba(254, 254, 254, 1),\n    rgba(248, 248, 248, 1),\n    rgba(244, 244, 244, 1));\n    overflow: hidden;\n    cursor: pointer;\n\n    span{\n      position: relative;\n      display: block;\n      text-align: center;\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n      transition: transform 0.3s;\n      &::after{\n        content: \"PORTFOLIO\";\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        transform: translateY(100%);\n      }\n      &:hover{\n          transform: translateY(-100%);\n\n      }\n    }\n\n  }*/\n/* btn de secours*/\n/*.btn-visible{\n    text-align: center;\n    padding: 2rem 0;\n    color: var(--dark);\n    font-weight: bold;\n    background:\n    linear-gradient(to bottom,\n    rgba(255, 255, 255, 1),\n    rgba(254, 254, 254, 1),\n    rgba(248, 248, 248, 1),\n    rgba(244, 244, 244, 1));\n    cursor: pointer;\n    &:hover{\n      transform: scale(1.2);\n      transition: 0.2s;\n      background: transparent;\n    }\n\n      span::after{\n        content: \"VOIR\";\n      }\n      &:hover span::after{\n        content: \"PORTFOLIO\";\n      }\n\n  }*/\n.overflow-visible {\n  display: flex;\n  flex-flow: row wrap;\n  padding: 0 0 4rem 0;\n}\n.overflow-visible .btn-overflow {\n  font-size: 1.5rem;\n  background: var(--border);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.overflow-visible .btn-overflow:hover {\n  background: var(--hint);\n  color: #fff;\n}\n.overflow-visible .btn-overflow:focus {\n  outline-style: none;\n}\n.overflow-visible .text-overflow {\n  display: none;\n  background: var(--overflow);\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  margin: 2.5rem 0 2.5rem 0;\n  border-radius: 10px;\n  flex-flow: row wrap;\n  align-items: center;\n}\n\n.overflowTwo-visible {\n  display: flex;\n  flex-flow: row wrap;\n  padding: 0 0 4rem 0;\n}\n.overflowTwo-visible .btn-overflow-two {\n  font-size: 1.5rem;\n  background: var(--border);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.overflowTwo-visible .btn-overflow-two:hover {\n  background: var(--hint);\n  color: #fff;\n}\n.overflowTwo-visible .btn-overflow-two:focus {\n  outline-style: none;\n}\n.overflowTwo-visible .text-overflow-two {\n  display: none;\n  background: var(--overflow);\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  margin: 2.5rem 0 2.5rem 0;\n  border-radius: 10px;\n  flex-flow: row wrap;\n  align-items: center;\n}\n.overflowTwo-visible .text-overflow-two p {\n  margin-left: -2rem !important;\n  font-weight: bold;\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n\n.queries-cookie {\n  margin-top: 1rem;\n}\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .queries-cookie {\n    display: flex;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .queries-cookie {\n    display: flex;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .queries-cookie {\n    display: flex;\n    flex-flow: row wrap;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .queries-cookie {\n    display: flex;\n    flex-flow: row wrap;\n  }\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .is-hidden {\n    display: none;\n  }\n}\n\n.cookiebar {\n  grid-area: copyright;\n  width: 100%;\n  display: flex;\n  flex-flow: column;\n  background: var(--cookie);\n  color: #fff;\n  padding: 3rem;\n  font-size: 1.5rem;\n  position: fixed;\n  bottom: 0;\n}\n.cookiebar p {\n  margin: 0;\n}\n.cookiebar a {\n  color: #fff;\n  text-decoration: underline;\n}\n.cookiebar .button-cookie-ok {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.cookiebar .button-cookie-ok:hover {\n  opacity: 0.5;\n}\n.cookiebar .button-cookie-ok:focus {\n  outline-style: none;\n}\n.cookiebar .button-cookie-no {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.cookiebar .button-cookie-no:hover {\n  opacity: 0.5;\n}\n.cookiebar .button-cookie-no:focus {\n  outline-style: none;\n}\n\n.is-hidden {\n  display: none;\n}\n\n.grid-container-page {\n  display: grid;\n  grid: \"header header\" auto \"aside main\" 1fr \"copyright copyright\" auto;\n  max-height: 100vh;\n}\n@media only screen and (max-width: 480px) {\n  .grid-container-page {\n    grid: \"header\" auto \"main\" auto \"aside aside\" \"copyright\" auto;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .grid-container-page {\n    grid: \"header\" auto \"main\" auto \"aside aside\" \"copyright\" auto;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .grid-container-page aside {\n    padding: 0;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .grid-container-page aside {\n    padding: 0;\n  }\n}\n\n.header-two {\n  background: linear-gradient(to right, var(--primary-blue), var(--light-blue));\n}\n\n.header-three {\n  background: linear-gradient(to right, var(--light), var(--primary));\n}\n\n.button-back {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n  color: var(--primary) !important;\n  border: 3px solid !important;\n  font-size: 2rem !important;\n  margin: 0 !important;\n}\n.button-back:hover {\n  opacity: 0.5;\n}\n.button-back:focus {\n  outline-style: none;\n}", "",{"version":3,"sources":["webpack://./src/assets/styles/style.scss","webpack://./src/assets/styles/_animations.scss","webpack://./src/assets/styles/_variables.scss","webpack://./src/assets/styles/_reset.scss","webpack://./src/assets/styles/_base.scss","webpack://./src/assets/styles/_classes.scss","webpack://./src/assets/styles/_utils.scss","webpack://./src/assets/styles/_media-queries.scss","webpack://./src/assets/styles/_gsap.scss","webpack://./src/assets/styles/_overflow.scss","webpack://./src/assets/styles/_cookies.scss"],"names":[],"mappings":"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","sourcesContent":["@charset \"UTF-8\";\n/* Titre d'entrée*/\n@keyframes bounce {\n  0% {\n    transform: rotate(-45deg);\n  }\n  10% {\n    transform: rotate(-35deg);\n  }\n  70% {\n    transform: rotate(20deg);\n  }\n  80% {\n    transform: rotate(-10deg);\n  }\n  90% {\n    transform: rotate(5deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes bounce-1 {\n  0% {\n    transform: rotate(45deg);\n  }\n  10% {\n    transform: rotate(35deg);\n  }\n  70% {\n    transform: rotate(-20deg);\n  }\n  80% {\n    transform: rotate(10deg);\n  }\n  90% {\n    transform: rotate(-5deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n/* Animation bouton ouvert*/\n/* Animations portfolio*/\n.fadeIn-one {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-one.toggleHover {\n  animation: fadeIn-one 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-one.toggleHover ~ .list-overview {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-one {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-2 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-3 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-4 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-5 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-6 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-7 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-8 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-9 {\n  to {\n    left: 72%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-10 {\n  to {\n    left: 81%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-11 {\n  to {\n    left: 90%;\n    opacity: 1;\n  }\n}\n.fadeIn-two {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-two.toggleHover {\n  animation: fadeIn-two 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-two.toggleHover ~ .list-overview-two {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-two {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-13 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-14 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-15 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-16 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-17 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-18 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-19 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n.fadeIn-three {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-three.toggleHover {\n  animation: fadeIn-three 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-three.toggleHover ~ .list-overview-three {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-three {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-21 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-22 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-23 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-24 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-25 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-26 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-27 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-28 {\n  to {\n    left: 70%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-29 {\n  to {\n    left: 77%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-30 {\n  to {\n    left: 84%;\n    opacity: 1;\n  }\n}\n/* Animation texte défilant */\n.wrapper {\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translate(10%);\n    opacity: 1;\n  }\n  100% {\n    transform: translate(0%);\n    opacity: 1;\n  }\n}\n\n.wrapper-two {\n  background: blue;\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper-two.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translateX(100%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n}\n\n.wrapper-three {\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper-three.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translateX(100%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n}\n\n/* Codes font et colors*/\n:root {\n  --font-family: \"Muli\", sans-serif;\n  --light: #fab1a0;\n  --primary: #e84118;\n  --middle: #ee5253;\n  --dark: #ff3f34;\n  --text: #333;\n  --background: #fafafa;\n  --hint: #999;\n  --border: #ddd;\n  --overflow: #f5f6fa;\n  --copyright: #282a2b;\n  --cookie: #2071e7;\n  --light-blue: #00c3ff;\n  --primary-blue: #2071e7;\n  --font-number: \"roboto\";\n  --backrgoundTextSlider: #fcfffc;\n}\n\n/* Reset des différents éléments de notre page*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 62.5%;\n}\n\nbody {\n  font-family: var(--font-family);\n  color: var(--text);\n  font-size: 1.6rem;\n}\n\np {\n  margin: 1rem 0;\n}\n\nh1 {\n  margin: 0;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 1rem 0 2rem 0;\n}\n\n/*ul{\n  list-style: none;\n}*/\nul {\n  list-style-type: circle;\n}\n\na {\n  color: var(--text);\n  text-decoration: none;\n}\n\nimg {\n  max-width: 100%;\n}\n\n/* On créé ici une classe générique\npour des styles qu'on va utiliser beaucoup dans le projet*/\n.title-small {\n  letter-spacing: 0.5rem;\n  font-size: 1.7rem;\n}\n\n.text-primary {\n  color: var(--primary);\n}\n.text-hint {\n  color: var(--hint);\n}\n.text-border {\n  color: var(--border);\n}\n\n/* Pour des classes utilitaires */\n.mb-5 {\n  margin-bottom: 5rem !important;\n}\n\n.mb-3 {\n  margin-bottom: 3rem !important;\n}\n\n.mb-2 {\n  margin-bottom: 2rem !important;\n}\n\n.align-flex {\n  display: flex !important;\n  flex-flow: nowrap !important;\n}\n\n/*.imag-2{\n  filter: opacity: 0.9 !important;\n}\n.imag-3{\n  opacity: 0.8 !important;\n}\n.imag-4{\n  opacity: 0.7 !important;\n}\n.imag-5{\n  opacity: 0.6 !important;\n}\n.imag-6{\n  opacity: 0.5 !important;\n}\n.imag-7{\n  opacity: 0.4 !important;\n}\n.imag-8{\n  opacity: 0.3 !important;\n}\n.imag-9{\n  opacity: 0.2 !important;\n}\n.imag-10{\n  opacity: 0.1 !important;\n}*/\n/* Les media queries sont placées ici dans des mixins */\n/* phones and down */\n/* phone to portrait tablet */\n/* Portrait tablet to landscape and desktop */\n/* Laptop */\n/* Laptop and desktop */\n/* btn pour test :\n\n.btn-visible{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0;\n    color: var(--dark);\n    font-weight: bold;\n    background:\n    linear-gradient(to bottom,\n    rgba(255, 255, 255, 1),\n    rgba(254, 254, 254, 1),\n    rgba(248, 248, 248, 1),\n    rgba(244, 244, 244, 1));\n    overflow: hidden;\n    cursor: pointer;\n\n    span{\n      position: relative;\n      display: block;\n      text-align: center;\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n      transition: transform 0.3s;\n      &::after{\n        content: \"PORTFOLIO\";\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        transform: translateY(100%);\n      }\n      &:hover{\n          transform: translateY(-100%);\n\n      }\n    }\n\n  }*/\n/* btn de secours*/\n/*.btn-visible{\n    text-align: center;\n    padding: 2rem 0;\n    color: var(--dark);\n    font-weight: bold;\n    background:\n    linear-gradient(to bottom,\n    rgba(255, 255, 255, 1),\n    rgba(254, 254, 254, 1),\n    rgba(248, 248, 248, 1),\n    rgba(244, 244, 244, 1));\n    cursor: pointer;\n    &:hover{\n      transform: scale(1.2);\n      transition: 0.2s;\n      background: transparent;\n    }\n\n      span::after{\n        content: \"VOIR\";\n      }\n      &:hover span::after{\n        content: \"PORTFOLIO\";\n      }\n\n  }*/\n.overflow-visible {\n  display: flex;\n  flex-flow: row wrap;\n  padding: 0 0 4rem 0;\n}\n.overflow-visible .btn-overflow {\n  font-size: 1.5rem;\n  background: var(--border);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.overflow-visible .btn-overflow:hover {\n  background: var(--hint);\n  color: #fff;\n}\n.overflow-visible .btn-overflow:focus {\n  outline-style: none;\n}\n.overflow-visible .text-overflow {\n  display: none;\n  background: var(--overflow);\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  margin: 2.5rem 0 2.5rem 0;\n  border-radius: 10px;\n  flex-flow: row wrap;\n  align-items: center;\n}\n\n.overflowTwo-visible {\n  display: flex;\n  flex-flow: row wrap;\n  padding: 0 0 4rem 0;\n}\n.overflowTwo-visible .btn-overflow-two {\n  font-size: 1.5rem;\n  background: var(--border);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.overflowTwo-visible .btn-overflow-two:hover {\n  background: var(--hint);\n  color: #fff;\n}\n.overflowTwo-visible .btn-overflow-two:focus {\n  outline-style: none;\n}\n.overflowTwo-visible .text-overflow-two {\n  display: none;\n  background: var(--overflow);\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  margin: 2.5rem 0 2.5rem 0;\n  border-radius: 10px;\n  flex-flow: row wrap;\n  align-items: center;\n}\n.overflowTwo-visible .text-overflow-two p {\n  margin-left: -2rem !important;\n  font-weight: bold;\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n\n.queries-cookie {\n  margin-top: 1rem;\n}\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .queries-cookie {\n    display: flex;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .queries-cookie {\n    display: flex;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .queries-cookie {\n    display: flex;\n    flex-flow: row wrap;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .queries-cookie {\n    display: flex;\n    flex-flow: row wrap;\n  }\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .is-hidden {\n    display: none;\n  }\n}\n\n.cookiebar {\n  grid-area: copyright;\n  width: 100%;\n  display: flex;\n  flex-flow: column;\n  background: var(--cookie);\n  color: #fff;\n  padding: 3rem;\n  font-size: 1.5rem;\n  position: fixed;\n  bottom: 0;\n}\n.cookiebar p {\n  margin: 0;\n}\n.cookiebar a {\n  color: #fff;\n  text-decoration: underline;\n}\n.cookiebar .button-cookie-ok {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.cookiebar .button-cookie-ok:hover {\n  opacity: 0.5;\n}\n.cookiebar .button-cookie-ok:focus {\n  outline-style: none;\n}\n.cookiebar .button-cookie-no {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.cookiebar .button-cookie-no:hover {\n  opacity: 0.5;\n}\n.cookiebar .button-cookie-no:focus {\n  outline-style: none;\n}\n\n.is-hidden {\n  display: none;\n}\n\n.grid-container-page {\n  display: grid;\n  grid: \"header header\" auto \"aside main\" 1fr \"copyright copyright\" auto;\n  max-height: 100vh;\n}\n@media only screen and (max-width: 480px) {\n  .grid-container-page {\n    grid: \"header\" auto \"main\" auto \"aside aside\" \"copyright\" auto;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .grid-container-page {\n    grid: \"header\" auto \"main\" auto \"aside aside\" \"copyright\" auto;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .grid-container-page aside {\n    padding: 0;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .grid-container-page aside {\n    padding: 0;\n  }\n}\n\n.header-two {\n  background: linear-gradient(to right, var(--primary-blue), var(--light-blue));\n}\n\n.header-three {\n  background: linear-gradient(to right, var(--light), var(--primary));\n}\n\n.button-back {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n  color: var(--primary) !important;\n  border: 3px solid !important;\n  font-size: 2rem !important;\n  margin: 0 !important;\n}\n.button-back:hover {\n  opacity: 0.5;\n}\n.button-back:focus {\n  outline-style: none;\n}","/* Titre d'entrée*/\n\n@keyframes bounce{\n  0%{\n    transform: rotate(-45deg);\n  }\n  10%{\n    transform: rotate(-35deg);\n  }\n  70%{\n    transform: rotate(20deg);\n  }\n  80%{\n    transform: rotate(-10deg);\n  }\n  90%{\n    transform: rotate(5deg);\n  }\n  100%{\n    transform: rotate(0deg);\n  }\n}\n\n@keyframes bounce-1{\n  0%{\n    transform: rotate(45deg);\n  }\n  10%{\n    transform: rotate(35deg);\n  }\n  70%{\n    transform: rotate(-20deg);\n  }\n  80%{\n    transform: rotate(10deg);\n  }\n  90%{\n    transform: rotate(-5deg);\n  }\n  100%{\n    transform: rotate(0deg);\n  }\n}\n\n/* Animation bouton ouvert*/\n\n@mixin scaleNumber {\n  @keyframes scaleNumber {\n\n  to   {\n    transform: scale(1) translate(-50%, -50%);\n    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1.0);\n    opacity: 0.5;\n    box-shadow: 0 2px 4px 6px #e0e0e0;\n    transition-property: boxShadow;\n  }\n  }\n}\n\n\n\n/* Animations portfolio*/\n@mixin fadeTitle{\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n\n.fadeIn-one{\n  @include fadeTitle;\n  &.toggleHover{\n    animation: fadeIn-one 2s linear 1 forwards;\n    animation-delay: 0.5s;\n    & ~ .list-overview{\n      animation: all 2s ease-in-out 3s forwards;\n    }\n  }\n\n    @keyframes fadeIn-one{\n      to{\n      opacity: 1;\n    }\n    }\n}\n\n\n@keyframes unfold-2{\n  to{\n    left: 9%;\n    opacity:1;\n  }\n\n}\n\n@keyframes unfold-3{\n  to{\n    left: 18%;\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-4{\n  to{\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-5{\n  to{\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-6{\n  to{\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-7{\n  to{\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-8{\n  to{\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-9{\n  to{\n    left: 72%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-10{\n  to{\n    left: 81%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-11{\n  to{\n    left: 90%;\n    opacity: 1;\n  }\n}\n\n\n.fadeIn-two{\n  @include fadeTitle;\n  &.toggleHover{\n    animation: fadeIn-two 2s linear 1 forwards;\n    animation-delay: 0.5s;\n    & ~ .list-overview-two{\n      animation: all 2s ease-in-out 3s forwards;\n    }\n  }\n\n    @keyframes fadeIn-two{\n      to{\n      opacity: 1;\n    }\n    }\n}\n\n\n@keyframes unfold-13{\n  to{\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-14{\n  to{\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-15{\n  to{\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-16{\n  to{\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-17{\n  to{\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-18{\n  to{\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-19{\n  to{\n    left: 63%;\n    opacity: 1;\n  }\n}\n\n\n.fadeIn-three{\n  @include fadeTitle;\n  &.toggleHover{\n    animation: fadeIn-three 2s linear 1 forwards;\n    animation-delay: 0.5s;\n    & ~ .list-overview-three{\n      animation: all 2s ease-in-out 3s forwards;\n    }\n  }\n\n    @keyframes fadeIn-three{\n      to{\n      opacity: 1;\n    }\n    }\n}\n\n\n@keyframes unfold-21{\n  to{\n    left: 9%;\n    opacity:1;\n  }\n}\n\n@keyframes unfold-22{\n  to{\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-23{\n  to{\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-24{\n  to{\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-25{\n  to{\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-26{\n  to{\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-27{\n  to{\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-28{\n  to{\n    left: 70%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-29{\n  to{\n    left: 77%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-30{\n  to{\n    left: 84%;\n    opacity: 1;\n  }\n}\n\n\n\n/* Animation texte défilant */\n@mixin textSlider{\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: 'Pangolin';\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n\n\n\n  &.toggleHover{\n   animation: slider 0.5s ease-in-out forwards;\n   animation-delay: 3s;\n   transition: slider 0.5s;\n   }\n}\n\n.wrapper{\n@include textSlider;\n@keyframes slider {\n  0%   { transform: translate(10%); opacity:1; }\n  100% { transform: translate(0%); opacity:1; }\n}\n}\n\n.wrapper-two{\n  background: blue;\n  @include textSlider;\n  @keyframes slider{\n     0%   { transform: translateX(100%); opacity:1;}\n    100% {transform: translateX(0%); opacity:1;}\n  }\n}\n\n\n.wrapper-three{\n  @include textSlider;\n  @keyframes slider{\n     0%   { transform: translateX(100%); opacity:1;}\n    100% {transform: translateX(0%); opacity:1;}\n  }\n}\n","/* Codes font et colors*/\n:root{\n--font-family: \"Muli\", sans-serif;\n\n//colors\n--light: #fab1a0;\n--primary: #e84118;\n--middle: #ee5253;\n--dark: #ff3f34;\n--text: #333;\n--background: #fafafa;\n--hint: #999;\n--border: #ddd;\n--overflow: #f5f6fa;\n--copyright: #282a2b;\n--cookie: #2071e7;\n--light-blue: #00c3ff;\n--primary-blue: #2071e7;\n\n\n// Fonts annexes :\n--font-number: \"roboto\";\n--backrgoundTextSlider : #fcfffc;  //#fcfcfc\n}\n","/* Reset des différents éléments de notre page*/\n\n*{\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n","html{\n  font-size: 62.5%;   // donnera 10px comme base à ma font\n}\n\nbody{\n  font-family: var(--font-family);\n  color: var(--text);\n  font-size: 1.6rem;\n}\n\np{\n  margin: 1rem 0;\n}\n\nh1{\n  margin: 0;\n}\n\n\nh2,\nh3,\nh4,\nh5,\nh6{\n  margin: 1rem 0 2rem 0;\n}\n\n/*ul{\n  list-style: none;\n}*/\nul {\n  list-style-type: circle;\n}\n\n\na{\n  color: var(--text);\n  text-decoration: none;\n}\n\nimg{\n  max-width: 100%;\n}\n","/* On créé ici une classe générique\npour des styles qu'on va utiliser beaucoup dans le projet*/\n\n.title{\n  &-small{\n    letter-spacing: 0.5rem;\n    font-size: 1.7rem;\n  }\n}\n\n.text{\n  &-primary{\n    color: var(--primary);\n  }\n  &-hint{\n    color: var(--hint);\n  }\n  &-border{\n    color: var(--border);\n  }\n}\n","/* Pour des classes utilitaires */\n\n.mb-5{ // m pour margin, b pour bottom, 5 pour la valeur de la marge\n  margin-bottom: 5rem !important;\n}\n\n.mb-3{\n  margin-bottom: 3rem !important;\n}\n\n.mb-2{\n  margin-bottom: 2rem !important;\n}\n\n.align-flex{\n  display: flex !important;\n  flex-flow: nowrap !important;\n}\n\n/*.imag-2{\n  filter: opacity: 0.9 !important;\n}\n.imag-3{\n  opacity: 0.8 !important;\n}\n.imag-4{\n  opacity: 0.7 !important;\n}\n.imag-5{\n  opacity: 0.6 !important;\n}\n.imag-6{\n  opacity: 0.5 !important;\n}\n.imag-7{\n  opacity: 0.4 !important;\n}\n.imag-8{\n  opacity: 0.3 !important;\n}\n.imag-9{\n  opacity: 0.2 !important;\n}\n.imag-10{\n  opacity: 0.1 !important;\n}*/\n","/* Les media queries sont placées ici dans des mixins */\n\n/* phones and down */\n@mixin xs{\n  @media only screen and (max-width: 480px) {\n    @content;\n  }\n}\n\n/* phone to portrait tablet */\n@mixin sm{\n  @media only screen and (min-width: 481px) and (max-width: 767px) {\n    @content;\n  }\n}\n\n/* Portrait tablet to landscape and desktop */\n@mixin md{\n  @media only screen and (min-width: 768px) and (max-width: 991px) {\n    @content;\n  }\n}\n\n/* Laptop */\n@mixin xl{\n  @media only screen and (min-width: 992px) and (max-width: 1199px) {\n    @content;\n  }\n}\n\n/* Laptop and desktop */\n@mixin lg{\n  @media only screen and (min-width: 1200px)\n   {\n    @content;\n  }\n}\n","\n\n@mixin toggle-number{\n  color: var(--border);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.8rem;\n  font-family: var(--font-number);\n  background: var(--primary);\n}\n\n\n@mixin toggle-one{\n.list-experience-one{\n  /* Pour le toggle */\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n  //background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent 3rem);\n\n  section {\n    position: relative;\n    margin: auto;\n    padding: 2rem 0 7rem 0;\n\n\n  .experience-one\n  /*, .experience-two,\n  .experience-three*/\n  {\n    display: flex;\n    margin: 0;\n    overflow: scroll;\n    height: 70rem;  // 25 rem pour une partie estompée\n\n\n    /*&.toggleHover{\n      overflow: visible;\n      height: 25rem;\n    }*/\n\n    /* Exemple avec grid :\n    display: grid;\n    grid-template-columns: 100%;\n    grid-template-rows: 5rem 1fr 8rem;\n    width: 100%;\n    height: 60rem;\n    */\n\n    .timeline{\n      text-align: center;\n      color: var(--border);\n      padding-right: 2rem;\n      border-right: 1px solid var(--hint);\n      p{\n        margin: 0;\n      }\n    }\n\n    .content{\n      padding: 0 1rem;\n      h3{\n        margin: 0;\n      }\n      p{\n        margin: 0;\n      }\n    }\n  }\n\n\n  .toggle-one {\n      position: absolute;\n      top: 100%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 50px;\n      height: 50px;\n      border: 8px solid #e0e0e0;\n      border-radius: 50%;\n      background: var(--primary);\n      box-shadow: 0 2px 4px #e0e0e0;\n      cursor: pointer;\n      @include toggle-number;\n      @include scaleNumber;\n\n  }\n\n\n\n  /*\n .togglePlay::before{\n    display: none;\n  }\n  .togglePlay::after{\n    content: \"X\";\n  }*/\n\n\n  }\n}\n}\n\n@mixin toggle-two{\n.list-experience-two{\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n\n  section {\n    position: relative;\n    margin: auto;\n    padding: 2rem 0 7rem 0;\n\n\n  .experience-two{\n    display: flex;\n    margin: 0;\n    overflow: scroll;\n    height: 70rem;\n\n\n    .timeline{\n      text-align: center;\n      color: var(--border);\n      padding-right: 2rem;\n      border-right: 1px solid var(--hint);\n      p{\n        margin: 0;\n      }\n    }\n    .content{\n      padding: 0 1rem;\n      h3{\n        margin: 0;\n      }\n      p{\n        margin: 0;\n      }\n    }\n  }\n  .toggle-two {\n      position: absolute;\n      top: 100%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 50px;\n      height: 50px;\n      border: 8px solid #e0e0e0;\n      border-radius: 50%;\n      //background-color: var(--primary);\n      box-shadow: 0 2px 4px #e0e0e0;\n      cursor: pointer;\n      @include toggle-number;\n      @include scaleNumber;\n  }\n  }\n}\n}\n\n\n@mixin toggle-three{\n.list-experience-three{\n  /* Pour le toggle */\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n\n\n\n  section {\n    position: relative;\n    margin: auto;\n    padding: 2rem 0 7rem 0;\n\n  .experience-three{\n    display: flex;\n    margin: 0;\n    overflow: scroll;\n    height: 70rem;\n\n\n    .timeline{\n      text-align: center;\n      color: var(--border);\n      padding-right: 2rem;\n      border-right: 1px solid var(--hint);\n      p{\n        margin: 0;\n      }\n    }\n    .content{\n      padding: 0 1rem;\n      h3{\n        margin: 0;\n      }\n      p{\n        margin: 0;\n      }\n    }\n  }\n  .toggle-three {\n      position: absolute;\n      top: 100%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 50px;\n      height: 50px;\n      border: 8px solid #e0e0e0;\n      border-radius: 50%;\n      //background-color: var(--primary);\n      box-shadow: 0 2px 4px #e0e0e0;\n      cursor: pointer;\n      @include toggle-number;\n      @include scaleNumber;\n  }\n  }\n}\n}\n\n\n/* btn pour test :\n\n.btn-visible{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0;\n    color: var(--dark);\n    font-weight: bold;\n    background:\n    linear-gradient(to bottom,\n    rgba(255, 255, 255, 1),\n    rgba(254, 254, 254, 1),\n    rgba(248, 248, 248, 1),\n    rgba(244, 244, 244, 1));\n    overflow: hidden;\n    cursor: pointer;\n\n    span{\n      position: relative;\n      display: block;\n      text-align: center;\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n      transition: transform 0.3s;\n      &::after{\n        content: \"PORTFOLIO\";\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        transform: translateY(100%);\n      }\n      &:hover{\n          transform: translateY(-100%);\n\n      }\n    }\n\n  }*/\n\n  /* btn de secours*/\n  /*.btn-visible{\n      text-align: center;\n      padding: 2rem 0;\n      color: var(--dark);\n      font-weight: bold;\n      background:\n      linear-gradient(to bottom,\n      rgba(255, 255, 255, 1),\n      rgba(254, 254, 254, 1),\n      rgba(248, 248, 248, 1),\n      rgba(244, 244, 244, 1));\n      cursor: pointer;\n      &:hover{\n        transform: scale(1.2);\n        transition: 0.2s;\n        background: transparent;\n      }\n\n        span::after{\n          content: \"VOIR\";\n        }\n        &:hover span::after{\n          content: \"PORTFOLIO\";\n        }\n\n    }*/\n","// Bouton & texte OVERFLOW\n\n@mixin overflowVisible{\n  display: flex;\n  flex-flow: row wrap;\n    padding: 0 0 4rem 0;\n}\n\n@mixin btnOverflow{\n  font-size: 1.5rem;\n  background: var(--border);\n  border: none;\n  font-weight: bold;\n  padding: .5rem 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n\n    &:hover {\n      background: var(--hint);\n      color: #fff;\n        }\n    &:focus {\n      outline-style: none;\n}\n}\n\n@mixin textOverflow{\n  display: none;\n  //height: 30rem;\n  background: var(--overflow);\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  margin: 2.5rem 0 2.5rem 0;\n  border-radius: 10px;\n  flex-flow: row wrap;\n  align-items: center;\n}\n\n\n.overflow-visible{\n  @include overflowVisible;\n  .btn-overflow {\n    @include btnOverflow;\n    }\n\n\n    .text-overflow{\n        @include textOverflow;\n    }\n\n}\n\n\n.overflowTwo-visible{\n  @include overflowVisible;\n  .btn-overflow-two {\n    @include btnOverflow;\n    }\n\n\n    .text-overflow-two{\n        @include textOverflow;\n        p{\n          margin-left: -2rem !important;\n          font-weight: bold;\n        }\n    }\n\n}\n","// Bandeau et bouton cookies\n\n@mixin buttonCookie{\n\n    font-size: 1.5rem;\n    font-weight: 300 !important;\n    background: #fff;\n    color: var(--cookie);\n    border: none;\n    font-weight: bold;\n    padding: .5rem 2rem;\n    margin: 0 0 0 2rem;\n    border-radius: 35px;\n    cursor: pointer;\n\n      &:hover {\n        opacity: 0.5;\n          }\n      &:focus {\n        outline-style: none;\n  }\n\n};\n\n@mixin cookieBar{\n  grid-area: copyright;\n  width: 100%;\n  display: flex;\n  flex-flow: column;\n  background: var(--cookie);\n  color: #fff;\n  padding: 3rem;\n  font-size: 1.5rem;\n  position: fixed;\n  bottom: 0;\n  p{\n    margin: 0;\n  }\n  a{\n    color: #fff;\n     text-decoration: underline;\n  }\n}\n\n// Bandeau cookie : media queries\n.cookiebar{\n@include xl{\n  display: flex;\n  flex-flow: column;\n}\n@include md{\n  display: flex;\n  flex-flow: column;\n}\n@include sm{\n  display: flex;\n  flex-flow: column;\n}\n@include xs{\n  display: flex;\n  flex-flow: column;\n}\n}\n.queries-cookie{\n  margin-top: 1rem;\n  @include xl{\n    display: flex;\n  }\n  @include md{\n    display: flex;\n  }\n  @include sm{\n    display: flex;\n    flex-flow: row wrap;\n  }\n  @include xs{\n    display: flex;\n    flex-flow: row wrap;\n  }\n\n}\n\n.is-hidden{\n  @include xl{\n    display: none;\n  }\n  @include md{\n    display: none;\n  }\n  @include sm{\n    display: none;\n  }\n  @include xs{\n    display: none;\n  }\n\n}\n\n// Bandeau cookie : visible/hidden\n\n.cookiebar {\n@include cookieBar;\n\n.button-cookie-ok{\n  @include buttonCookie;\n}\n\n.button-cookie-no{\n  @include buttonCookie;\n}\n}\n\n.is-hidden{\n  display: none;\n}\n\n// Page COOKIES\n\n.grid-container-page{\n  display: grid;\n  grid:\n    \"header header\" auto\n    \"aside main\" 1fr\n    \"copyright copyright\" auto;\n    max-height: 100vh;\n    @include xs{\n      grid:\n        \"header\" auto\n        \"main\" auto\n        \"aside aside\"\n        \"copyright\" auto ;\n    }\n    @include sm{\n      grid:\n      \"header\" auto\n      \"main\" auto\n      \"aside aside\"\n      \"copyright\" auto ;\n    }\n\n    aside{\n      @include xs{\n        padding: 0;\n      }\n      @include sm{\n        padding: 0;\n      }\n    }\n\n  }\n\n// Header cookies\n  .header-two{\n    background: linear-gradient(to right, var(--primary-blue), var(--light-blue));\n  }\n\n// Header mentions légales\n.header-three{\n  background: linear-gradient(to right, var(--light), var(--primary));\n}\n\n  .button-back{\n    @include buttonCookie;\n    color: var(--primary) !important;\n    border: 3px solid !important;\n    font-size: 2rem !important;\n    margin: 0 !important;\n    //color: #fff !important;\n  }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/* Titre d'entrée*/\n@keyframes bounce {\n  0% {\n    transform: rotate(-45deg);\n  }\n  10% {\n    transform: rotate(-35deg);\n  }\n  70% {\n    transform: rotate(20deg);\n  }\n  80% {\n    transform: rotate(-10deg);\n  }\n  90% {\n    transform: rotate(5deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes bounce-1 {\n  0% {\n    transform: rotate(45deg);\n  }\n  10% {\n    transform: rotate(35deg);\n  }\n  70% {\n    transform: rotate(-20deg);\n  }\n  80% {\n    transform: rotate(10deg);\n  }\n  90% {\n    transform: rotate(-5deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n/* Animation bouton ouvert*/\n/* Animations portfolio*/\n.fadeIn-one {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-one.toggleHover {\n  animation: fadeIn-one 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-one.toggleHover ~ .list-overview {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-one {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-2 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-3 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-4 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-5 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-6 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-7 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-8 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-9 {\n  to {\n    left: 72%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-10 {\n  to {\n    left: 81%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-11 {\n  to {\n    left: 90%;\n    opacity: 1;\n  }\n}\n.fadeIn-two {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-two.toggleHover {\n  animation: fadeIn-two 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-two.toggleHover ~ .list-overview-two {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-two {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-13 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-14 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-15 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-16 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-17 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-18 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-19 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n.fadeIn-three {\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n.fadeIn-three.toggleHover {\n  animation: fadeIn-three 2s linear 1 forwards;\n  animation-delay: 0.5s;\n}\n.fadeIn-three.toggleHover ~ .list-overview-three {\n  animation: all 2s ease-in-out 3s forwards;\n}\n@keyframes fadeIn-three {\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-21 {\n  to {\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-22 {\n  to {\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-23 {\n  to {\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-24 {\n  to {\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-25 {\n  to {\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-26 {\n  to {\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-27 {\n  to {\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-28 {\n  to {\n    left: 70%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-29 {\n  to {\n    left: 77%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-30 {\n  to {\n    left: 84%;\n    opacity: 1;\n  }\n}\n/* Animation texte défilant */\n.wrapper {\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translate(10%);\n    opacity: 1;\n  }\n  100% {\n    transform: translate(0%);\n    opacity: 1;\n  }\n}\n\n.wrapper-two {\n  background: blue;\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper-two.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translateX(100%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n}\n\n.wrapper-three {\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: \"Pangolin\";\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n}\n.wrapper-three.toggleHover {\n  animation: slider 0.5s ease-in-out forwards;\n  animation-delay: 3s;\n  transition: slider 0.5s;\n}\n@keyframes slider {\n  0% {\n    transform: translateX(100%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n}\n\n/* Codes font et colors*/\n:root {\n  --font-family: \"Muli\", sans-serif;\n  --light: #fab1a0;\n  --primary: #e84118;\n  --middle: #ee5253;\n  --dark: #ff3f34;\n  --text: #333;\n  --background: #fafafa;\n  --hint: #999;\n  --border: #ddd;\n  --overflow: #f5f6fa;\n  --copyright: #282a2b;\n  --cookie: #2071e7;\n  --light-blue: #00c3ff;\n  --primary-blue: #2071e7;\n  --font-number: \"roboto\";\n  --backrgoundTextSlider: #fcfffc;\n}\n\n/* Reset des différents éléments de notre page*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 62.5%;\n}\n\nbody {\n  font-family: var(--font-family);\n  color: var(--text);\n  font-size: 1.6rem;\n}\n\np {\n  margin: 1rem 0;\n}\n\nh1 {\n  margin: 0;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 1rem 0 2rem 0;\n}\n\n/*ul{\n  list-style: none;\n}*/\nul {\n  list-style-type: circle;\n}\n\na {\n  color: var(--text);\n  text-decoration: none;\n}\n\nimg {\n  max-width: 100%;\n}\n\n/* On créé ici une classe générique\npour des styles qu'on va utiliser beaucoup dans le projet*/\n.title-small {\n  letter-spacing: 0.5rem;\n  font-size: 1.7rem;\n}\n\n.text-primary {\n  color: var(--primary);\n}\n.text-hint {\n  color: var(--hint);\n}\n.text-border {\n  color: var(--border);\n}\n\n/* Pour des classes utilitaires */\n.mb-5 {\n  margin-bottom: 5rem !important;\n}\n\n.mb-3 {\n  margin-bottom: 3rem !important;\n}\n\n.mb-2 {\n  margin-bottom: 2rem !important;\n}\n\n.align-flex {\n  display: flex !important;\n  flex-flow: nowrap !important;\n}\n\n/*.imag-2{\n  filter: opacity: 0.9 !important;\n}\n.imag-3{\n  opacity: 0.8 !important;\n}\n.imag-4{\n  opacity: 0.7 !important;\n}\n.imag-5{\n  opacity: 0.6 !important;\n}\n.imag-6{\n  opacity: 0.5 !important;\n}\n.imag-7{\n  opacity: 0.4 !important;\n}\n.imag-8{\n  opacity: 0.3 !important;\n}\n.imag-9{\n  opacity: 0.2 !important;\n}\n.imag-10{\n  opacity: 0.1 !important;\n}*/\n/* Les media queries sont placées ici dans des mixins */\n/* phones and down */\n/* phone to portrait tablet */\n/* Portrait tablet to landscape and desktop */\n/* Laptop */\n/* Laptop and desktop */\n/* btn pour test :\n\n.btn-visible{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0;\n    color: var(--dark);\n    font-weight: bold;\n    background:\n    linear-gradient(to bottom,\n    rgba(255, 255, 255, 1),\n    rgba(254, 254, 254, 1),\n    rgba(248, 248, 248, 1),\n    rgba(244, 244, 244, 1));\n    overflow: hidden;\n    cursor: pointer;\n\n    span{\n      position: relative;\n      display: block;\n      text-align: center;\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n      transition: transform 0.3s;\n      &::after{\n        content: \"PORTFOLIO\";\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        transform: translateY(100%);\n      }\n      &:hover{\n          transform: translateY(-100%);\n\n      }\n    }\n\n  }*/\n/* btn de secours*/\n/*.btn-visible{\n    text-align: center;\n    padding: 2rem 0;\n    color: var(--dark);\n    font-weight: bold;\n    background:\n    linear-gradient(to bottom,\n    rgba(255, 255, 255, 1),\n    rgba(254, 254, 254, 1),\n    rgba(248, 248, 248, 1),\n    rgba(244, 244, 244, 1));\n    cursor: pointer;\n    &:hover{\n      transform: scale(1.2);\n      transition: 0.2s;\n      background: transparent;\n    }\n\n      span::after{\n        content: \"VOIR\";\n      }\n      &:hover span::after{\n        content: \"PORTFOLIO\";\n      }\n\n  }*/\n.overflow-visible {\n  display: flex;\n  flex-flow: row wrap;\n  padding: 0 0 4rem 0;\n}\n.overflow-visible .btn-overflow {\n  font-size: 1.5rem;\n  background: var(--border);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.overflow-visible .btn-overflow:hover {\n  background: var(--hint);\n  color: #fff;\n}\n.overflow-visible .btn-overflow:focus {\n  outline-style: none;\n}\n.overflow-visible .text-overflow {\n  display: none;\n  background: var(--overflow);\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  margin: 2.5rem 0 2.5rem 0;\n  border-radius: 10px;\n  flex-flow: row wrap;\n  align-items: center;\n}\n\n.overflowTwo-visible {\n  display: flex;\n  flex-flow: row wrap;\n  padding: 0 0 4rem 0;\n}\n.overflowTwo-visible .btn-overflow-two {\n  font-size: 1.5rem;\n  background: var(--border);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.overflowTwo-visible .btn-overflow-two:hover {\n  background: var(--hint);\n  color: #fff;\n}\n.overflowTwo-visible .btn-overflow-two:focus {\n  outline-style: none;\n}\n.overflowTwo-visible .text-overflow-two {\n  display: none;\n  background: var(--overflow);\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  margin: 2.5rem 0 2.5rem 0;\n  border-radius: 10px;\n  flex-flow: row wrap;\n  align-items: center;\n}\n.overflowTwo-visible .text-overflow-two p {\n  margin-left: -2rem !important;\n  font-weight: bold;\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .cookiebar {\n    display: flex;\n    flex-flow: column;\n  }\n}\n\n.queries-cookie {\n  margin-top: 1rem;\n}\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .queries-cookie {\n    display: flex;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .queries-cookie {\n    display: flex;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .queries-cookie {\n    display: flex;\n    flex-flow: row wrap;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .queries-cookie {\n    display: flex;\n    flex-flow: row wrap;\n  }\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .is-hidden {\n    display: none;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .is-hidden {\n    display: none;\n  }\n}\n\n.cookiebar {\n  grid-area: copyright;\n  width: 100%;\n  display: flex;\n  flex-flow: column;\n  background: var(--cookie);\n  color: #fff;\n  padding: 3rem;\n  font-size: 1.5rem;\n  position: fixed;\n  bottom: 0;\n}\n.cookiebar p {\n  margin: 0;\n}\n.cookiebar a {\n  color: #fff;\n  text-decoration: underline;\n}\n.cookiebar .button-cookie-ok {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.cookiebar .button-cookie-ok:hover {\n  opacity: 0.5;\n}\n.cookiebar .button-cookie-ok:focus {\n  outline-style: none;\n}\n.cookiebar .button-cookie-no {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n}\n.cookiebar .button-cookie-no:hover {\n  opacity: 0.5;\n}\n.cookiebar .button-cookie-no:focus {\n  outline-style: none;\n}\n\n.is-hidden {\n  display: none;\n}\n\n.grid-container-page {\n  display: grid;\n  grid: \"header header\" auto \"aside main\" 1fr \"copyright copyright\" auto;\n  max-height: 100vh;\n}\n@media only screen and (max-width: 480px) {\n  .grid-container-page {\n    grid: \"header\" auto \"main\" auto \"aside aside\" \"copyright\" auto;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .grid-container-page {\n    grid: \"header\" auto \"main\" auto \"aside aside\" \"copyright\" auto;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .grid-container-page aside {\n    padding: 0;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .grid-container-page aside {\n    padding: 0;\n  }\n}\n\n.header-two {\n  background: linear-gradient(to right, var(--primary-blue), var(--light-blue));\n}\n\n.header-three {\n  background: linear-gradient(to right, var(--light), var(--primary));\n}\n\n.button-back {\n  font-size: 1.5rem;\n  font-weight: 300 !important;\n  background: #fff;\n  color: var(--cookie);\n  border: none;\n  font-weight: bold;\n  padding: 0.5rem 2rem;\n  margin: 0 0 0 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n  color: var(--primary) !important;\n  border: 3px solid !important;\n  font-size: 2rem !important;\n  margin: 0 !important;\n}\n.button-back:hover {\n  opacity: 0.5;\n}\n.button-back:focus {\n  outline-style: none;\n}\n\n/* je mets en place ma grille :\nles background blue, red, green et purple permettent de visualiser les parties de ma grille*/\n.grid-container {\n  display: grid;\n  grid: \"picture header\" auto \"aside main\" 1fr \"footer footer\" auto \"copyright copyright\" auto \"copyright copyright\" auto/350px auto;\n  min-height: 100vh;\n  /*ci-dessous, les mixins correspondant à la responsivité selon 4 formats */\n}\n@media only screen and (max-width: 480px) {\n  .grid-container {\n    /* Grille adaptée pour une seule colonne*/\n    grid: \"header\" auto \"main\" auto \"picture\" auto \"aside\" auto \"footer\" auto \"copyright\" auto/auto;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .grid-container {\n    grid: \"header\" auto \"main\" auto \"picture\" auto \"aside\" auto \"footer\" auto \"copyright\" auto/auto;\n  }\n}\n\nheader {\n  grid-area: header;\n  background: linear-gradient(to right, var(--primary), var(--light));\n  padding: 5rem;\n  text-align: center;\n  color: #fff;\n  position: sticky;\n  top: 0;\n  z-index: 1;\n  /*@include sm{\n    padding: 5rem 2rem;\n  }\n  @include md{\n    padding: 5rem 2rem;\n  }*/\n}\n@media only screen and (max-width: 480px) {\n  header {\n    position: static;\n  }\n}\nheader h1 {\n  line-height: 8rem;\n  font-weight: 400;\n  letter-spacing: 3rem;\n}\n@media only screen and (max-width: 480px) {\n  header h1 {\n    font-size: 2.5rem !important;\n    letter-spacing: 0.5rem;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  header h1 {\n    font-size: 3rem !important;\n    letter-spacing: 2rem;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  header h1 {\n    font-size: 2.8rem !important;\n    letter-spacing: 1rem;\n  }\n}\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  header h1 {\n    font-size: 3.5rem !important;\n    letter-spacing: 2.5rem;\n  }\n}\nheader p {\n  letter-spacing: 0.5rem;\n  margin: 0;\n}\nheader span {\n  /* Rappel, span est un inline\n  sur un élément inline, les animations ne marchent pas\n  donc on rajoute un display: inline-block*/\n  display: inline-block;\n  animation: bounce 2s;\n}\n\n.picture {\n  grid-area: picture;\n  padding: 3rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 6rem;\n  background: var(--background);\n  border-right: 1px solid var(--border);\n}\n.picture .image-circle {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  overflow: hidden;\n  border-radius: 50%;\n}\n.picture img {\n  width: 100%;\n  height: auto;\n  margin-top: -50px;\n}\n.picture img:hover {\n  filter: brightness(110%);\n  cursor: pointer;\n}\n\naside {\n  grid-area: aside;\n  background: var(--background);\n  border-right: 1px solid var(--border);\n  padding: 5rem;\n  min-height: 1500px;\n  max-width: 100% !important;\n}\naside .block {\n  margin-bottom: 5rem;\n  font-style: italic;\n}\naside .block h3 {\n  margin-bottom: 0;\n  font-size: 1.4rem;\n}\naside .block p {\n  margin: 0 0 2rem 0;\n}\naside .block .scale-formation {\n  border-radius: 5px;\n  transition: all 0.2s;\n}\naside .block .scale-formation:hover {\n  background: var(--border);\n  transform: scale(1.3);\n  transition: 0.2s;\n  color: var(--middle);\n  max-width: 75%;\n  margin-left: 5%;\n}\naside .block .scale-formation:hover span {\n  color: var(--middle);\n}\naside .block .bar-skill {\n  margin: 2rem 0;\n  height: 5px;\n  background: var(--hint);\n  position: relative;\n}\naside .block .bar-skill .bar-skill-progress {\n  position: absolute;\n  height: 5px;\n  top: 0;\n  left: 0;\n  background: var(--light);\n}\naside .block .bar-skill .bar-skill-progress.one {\n  width: 100%;\n}\naside .block .bar-skill .bar-skill-progress.two {\n  width: 90%;\n}\naside .block .bar-skill .bar-skill-progress.three {\n  width: 70%;\n}\naside .block .bar-skill .bar-skill-progress.four {\n  width: 70%;\n}\naside .block .bar-skill .bar-skill-dot {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  background: var(--dark);\n  top: -2.5px;\n  transform: rotate(45deg);\n}\naside .block .bar-skill .bar-skill-dot.one {\n  left: calc(100% - 5px);\n}\naside .block .bar-skill .bar-skill-dot.two {\n  left: calc(90% - 5px);\n}\naside .block .bar-skill .bar-skill-dot.three {\n  left: calc(70% - 5px);\n}\naside .block .bar-skill .bar-skill-dot.four {\n  left: calc(70% - 5px);\n}\naside .block .stars-container {\n  display: flex;\n  margin: 2rem 0 3rem 0;\n  color: var(--hint);\n}\naside .block .stars-container i {\n  font-size: 2rem;\n  margin: 0 1rem;\n}\naside .block .social-container {\n  display: flex;\n  justify-content: start;\n  align-items: center;\n  padding: 1rem 1rem;\n  border-radius: 5px;\n  transition: all 0.2s;\n}\naside .block .social-container:hover {\n  background: var(--border);\n  transform: scale(1.2);\n  transition: 0.2s;\n  justify-content: center;\n  cursor: pointer;\n  /*Au passage du hover,\n  le bloc devient gris et grossit\n  passage adouci par une transition light de 0.2s*/\n  /*.fa-instagram-square::before{\n    display: none;\n  }\n  .fa-instagram-square::after{\n    content: \"Pseudo : blanchepigalle\";\n    cursor: default;\n    color: var(--text);\n    font-size: 1.4rem;\n    font-style: italic;\n    font-family: var(--font-family);\n  }*/\n}\naside .block .social-container:hover i {\n  color: var(--primary);\n  /*Pour que l'icône se colore au passage du hover */\n}\naside .block .social-container i {\n  font-size: 2rem;\n  margin-right: 1rem;\n}\n\nmain {\n  grid-area: main;\n  padding: 5rem;\n  max-width: 100% !important;\n}\n@media only screen and (max-width: 480px) {\n  main {\n    padding: 5rem 1.5rem;\n    width: auto;\n  }\n}\nmain h2 {\n  margin-bottom: 4rem;\n}\nmain p,\nmain ul {\n  letter-spacing: 0.1rem;\n  line-height: 3rem;\n}\nmain .list-experience-one {\n  /* Pour le toggle */\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n}\nmain .list-experience-one section {\n  position: relative;\n  margin: auto;\n  padding: 2rem 0 7rem 0;\n  /*\n  .togglePlay::before{\n     display: none;\n   }\n   .togglePlay::after{\n     content: \"X\";\n   }*/\n}\nmain .list-experience-one section .experience-one {\n  display: flex;\n  margin: 0;\n  overflow: scroll;\n  height: 70rem;\n  /*&.toggleHover{\n    overflow: visible;\n    height: 25rem;\n  }*/\n  /* Exemple avec grid :\n  display: grid;\n  grid-template-columns: 100%;\n  grid-template-rows: 5rem 1fr 8rem;\n  width: 100%;\n  height: 60rem;\n  */\n}\nmain .list-experience-one section .experience-one .timeline {\n  text-align: center;\n  color: var(--border);\n  padding-right: 2rem;\n  border-right: 1px solid var(--hint);\n}\nmain .list-experience-one section .experience-one .timeline p {\n  margin: 0;\n}\nmain .list-experience-one section .experience-one .content {\n  padding: 0 1rem;\n}\nmain .list-experience-one section .experience-one .content h3 {\n  margin: 0;\n}\nmain .list-experience-one section .experience-one .content p {\n  margin: 0;\n}\nmain .list-experience-one section .toggle-one {\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 50px;\n  height: 50px;\n  border: 8px solid #e0e0e0;\n  border-radius: 50%;\n  background: var(--primary);\n  box-shadow: 0 2px 4px #e0e0e0;\n  cursor: pointer;\n  color: var(--border);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.8rem;\n  font-family: var(--font-number);\n  background: var(--primary);\n}\n@keyframes scaleNumber {\n  to {\n    transform: scale(1) translate(-50%, -50%);\n    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n    opacity: 0.5;\n    box-shadow: 0 2px 4px 6px #e0e0e0;\n    transition-property: boxShadow;\n  }\n}\nmain .list-experience-two {\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n}\nmain .list-experience-two section {\n  position: relative;\n  margin: auto;\n  padding: 2rem 0 7rem 0;\n}\nmain .list-experience-two section .experience-two {\n  display: flex;\n  margin: 0;\n  overflow: scroll;\n  height: 70rem;\n}\nmain .list-experience-two section .experience-two .timeline {\n  text-align: center;\n  color: var(--border);\n  padding-right: 2rem;\n  border-right: 1px solid var(--hint);\n}\nmain .list-experience-two section .experience-two .timeline p {\n  margin: 0;\n}\nmain .list-experience-two section .experience-two .content {\n  padding: 0 1rem;\n}\nmain .list-experience-two section .experience-two .content h3 {\n  margin: 0;\n}\nmain .list-experience-two section .experience-two .content p {\n  margin: 0;\n}\nmain .list-experience-two section .toggle-two {\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 50px;\n  height: 50px;\n  border: 8px solid #e0e0e0;\n  border-radius: 50%;\n  box-shadow: 0 2px 4px #e0e0e0;\n  cursor: pointer;\n  color: var(--border);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.8rem;\n  font-family: var(--font-number);\n  background: var(--primary);\n}\n@keyframes scaleNumber {\n  to {\n    transform: scale(1) translate(-50%, -50%);\n    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n    opacity: 0.5;\n    box-shadow: 0 2px 4px 6px #e0e0e0;\n    transition-property: boxShadow;\n  }\n}\nmain .list-experience-three {\n  /* Pour le toggle */\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n}\nmain .list-experience-three section {\n  position: relative;\n  margin: auto;\n  padding: 2rem 0 7rem 0;\n}\nmain .list-experience-three section .experience-three {\n  display: flex;\n  margin: 0;\n  overflow: scroll;\n  height: 70rem;\n}\nmain .list-experience-three section .experience-three .timeline {\n  text-align: center;\n  color: var(--border);\n  padding-right: 2rem;\n  border-right: 1px solid var(--hint);\n}\nmain .list-experience-three section .experience-three .timeline p {\n  margin: 0;\n}\nmain .list-experience-three section .experience-three .content {\n  padding: 0 1rem;\n}\nmain .list-experience-three section .experience-three .content h3 {\n  margin: 0;\n}\nmain .list-experience-three section .experience-three .content p {\n  margin: 0;\n}\nmain .list-experience-three section .toggle-three {\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 50px;\n  height: 50px;\n  border: 8px solid #e0e0e0;\n  border-radius: 50%;\n  box-shadow: 0 2px 4px #e0e0e0;\n  cursor: pointer;\n  color: var(--border);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.8rem;\n  font-family: var(--font-number);\n  background: var(--primary);\n}\n@keyframes scaleNumber {\n  to {\n    transform: scale(1) translate(-50%, -50%);\n    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n    opacity: 0.5;\n    box-shadow: 0 2px 4px 6px #e0e0e0;\n    transition-property: boxShadow;\n  }\n}\nmain hr {\n  margin: 0;\n  overflow: visible;\n  /* For IE */\n  border: none;\n  border-top: medium double #e0e0e0;\n  color: #e0e0e0;\n  text-align: center;\n}\nmain hr:after {\n  content: \"§\";\n  display: inline-block;\n  position: relative;\n  top: -0.7em;\n  font-size: 1.5em;\n  padding: 0 0.25em;\n  background: #fff;\n}\nmain .list-overview {\n  display: flex;\n  flex-flow: row wrap;\n  position: relative;\n}\nmain .list-overview.toggleHover .elem-overview {\n  border: 1px solid #ddd;\n  background: #eee;\n  left: 0;\n  position: absolute;\n  max-width: 100px;\n  height: 100px;\n  padding: 0;\n  box-shadow: 0 2px 4px #e0e0e0;\n}\nmain .list-overview.toggleHover .elem-overview.screen-1 {\n  opacity: 1;\n}\nmain .list-overview.toggleHover .elem-overview.screen-2 {\n  opacity: 0;\n  animation: unfold-2 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-3 {\n  opacity: 0;\n  animation: unfold-3 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-4 {\n  opacity: 0;\n  animation: unfold-4 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-5 {\n  opacity: 0;\n  animation: unfold-5 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-6 {\n  opacity: 0;\n  animation: unfold-6 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-7 {\n  opacity: 0;\n  animation: unfold-7 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-8 {\n  opacity: 0;\n  animation: unfold-8 0.5s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-9 {\n  opacity: 0;\n  animation: unfold-9 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-10 {\n  opacity: 0;\n  animation: unfold-10 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview.screen-11 {\n  opacity: 0;\n  animation: unfold-11 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview.toggleHover .elem-overview img {\n  height: 100%;\n  -moz-transition: opacity 0.9s;\n  -webkit-transition: opacity 0.9s;\n  -o-transition: opacity 0.9s;\n}\nmain .list-overview.toggleHover .elem-overview img:hover {\n  opacity: 1 !important;\n  -moz-transition: opacity 0.7s;\n  -webkit-transition: opacity 0.7s;\n  -o-transition: opacity 0.7s;\n  transform: scale(2.5);\n  transition: 0.2s;\n}\nmain .list-overview-two {\n  display: flex;\n  flex-flow: row wrap;\n  position: relative;\n}\nmain .list-overview-two.toggleHover .elem-overview-two {\n  background: #eee;\n  left: 0;\n  position: absolute;\n  max-width: 100px;\n  height: 100px;\n  padding: 0;\n}\nmain .list-overview-two.toggleHover .elem-overview-two.screen-12 {\n  opacity: 1;\n}\nmain .list-overview-two.toggleHover .elem-overview-two.screen-13 {\n  opacity: 0;\n  animation: unfold-13 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-two.toggleHover .elem-overview-two.screen-14 {\n  opacity: 0;\n  animation: unfold-14 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-two.toggleHover .elem-overview-two.screen-15 {\n  opacity: 0;\n  animation: unfold-15 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-two.toggleHover .elem-overview-two.screen-16 {\n  opacity: 0;\n  animation: unfold-16 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-two.toggleHover .elem-overview-two.screen-17 {\n  opacity: 0;\n  animation: unfold-17 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-two.toggleHover .elem-overview-two.screen-18 {\n  opacity: 0;\n  animation: unfold-18 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-two.toggleHover .elem-overview-two.screen-19 {\n  opacity: 0;\n  animation: unfold-19 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-two.toggleHover .elem-overview-two img {\n  height: 100%;\n  -moz-transition: opacity 0.9s;\n  -webkit-transition: opacity 0.9s;\n  -o-transition: opacity 0.9s;\n}\nmain .list-overview-two.toggleHover .elem-overview-two img:hover {\n  opacity: 1;\n  -moz-transition: opacity 0.7s;\n  -webkit-transition: opacity 0.7s;\n  -o-transition: opacity 0.7s;\n  transform: scale(2.5);\n  transition: 0.2s;\n}\nmain .list-overview-three {\n  display: flex;\n  flex-flow: row wrap;\n  position: relative;\n}\nmain .list-overview-three.toggleHover .elem-overview-three {\n  background: #eee;\n  left: 0;\n  position: absolute;\n  max-width: 100px;\n  height: 100px;\n  padding: 0;\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-20 {\n  opacity: 1;\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-21 {\n  opacity: 0;\n  animation: unfold-21 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-22 {\n  opacity: 0;\n  animation: unfold-22 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-23 {\n  opacity: 0;\n  animation: unfold-23 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-24 {\n  opacity: 0;\n  animation: unfold-24 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-25 {\n  opacity: 0;\n  animation: unfold-25 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-26 {\n  opacity: 0;\n  animation: unfold-26 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-27 {\n  opacity: 0;\n  animation: unfold-27 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-28 {\n  opacity: 0;\n  animation: unfold-28 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-29 {\n  opacity: 0;\n  animation: unfold-29 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three.screen-30 {\n  opacity: 0;\n  animation: unfold-30 1s forwards;\n  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);\n}\nmain .list-overview-three.toggleHover .elem-overview-three img {\n  height: 100%;\n  -moz-transition: opacity 0.9s;\n  -webkit-transition: opacity 0.9s;\n  -o-transition: opacity 0.9s;\n}\nmain .list-overview-three.toggleHover .elem-overview-three img:hover {\n  opacity: 1;\n  -moz-transition: opacity 0.7s;\n  -webkit-transition: opacity 0.7s;\n  -o-transition: opacity 0.7s;\n  transform: scale(2.5);\n  transition: 0.2s;\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  main .list-overview.toggleHover .elem-overview,\nmain .list-overview-two.toggleHover .elem-overview-two,\nmain .list-overview-three.toggleHover .elem-overview-three {\n    position: static;\n    margin: 0 5rem 5rem 0;\n    min-width: 75%;\n    height: auto;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  main .list-overview.toggleHover .elem-overview,\nmain .list-overview-two.toggleHover .elem-overview-two,\nmain .list-overview-three.toggleHover .elem-overview-three {\n    position: static;\n    margin: 0 5rem 5rem 0;\n    max-width: 100%;\n    height: auto;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  main .list-overview.toggleHover .elem-overview,\nmain .list-overview-two.toggleHover .elem-overview-two,\nmain .list-overview-three.toggleHover .elem-overview-three {\n    position: static;\n    margin: 0 5rem 5rem 0;\n    max-width: 100%;\n    height: auto;\n  }\n}\n@media only screen and (max-width: 480px) {\n  main .list-overview.toggleHover .elem-overview,\nmain .list-overview-two.toggleHover .elem-overview-two,\nmain .list-overview-three.toggleHover .elem-overview-three {\n    position: static;\n    margin: 0 5rem 5rem 0;\n    max-width: 100%;\n    height: auto;\n  }\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  main .list-overview.toggleHover .elem-overview img,\nmain .list-overview-two.toggleHover .elem-overview-two img,\nmain .list-overview-three.toggleHover .elem-overview-three img {\n    min-width: 75%;\n    height: auto;\n  }\n  main .list-overview.toggleHover .elem-overview img:hover,\nmain .list-overview-two.toggleHover .elem-overview-two img:hover,\nmain .list-overview-three.toggleHover .elem-overview-three img:hover {\n    transform: scale(1.1);\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  main .list-overview.toggleHover .elem-overview img,\nmain .list-overview-two.toggleHover .elem-overview-two img,\nmain .list-overview-three.toggleHover .elem-overview-three img {\n    max-width: 100%;\n    height: auto;\n  }\n  main .list-overview.toggleHover .elem-overview img:hover,\nmain .list-overview-two.toggleHover .elem-overview-two img:hover,\nmain .list-overview-three.toggleHover .elem-overview-three img:hover {\n    transform: scale(1.1);\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  main .list-overview.toggleHover .elem-overview img,\nmain .list-overview-two.toggleHover .elem-overview-two img,\nmain .list-overview-three.toggleHover .elem-overview-three img {\n    min-width: 100%;\n    height: auto;\n  }\n  main .list-overview.toggleHover .elem-overview img:hover,\nmain .list-overview-two.toggleHover .elem-overview-two img:hover,\nmain .list-overview-three.toggleHover .elem-overview-three img:hover {\n    transform: scale(1.1);\n  }\n}\n@media only screen and (max-width: 480px) {\n  main .list-overview.toggleHover .elem-overview img,\nmain .list-overview-two.toggleHover .elem-overview-two img,\nmain .list-overview-three.toggleHover .elem-overview-three img {\n    min-width: 100%;\n    height: auto;\n  }\n  main .list-overview.toggleHover .elem-overview img:hover,\nmain .list-overview-two.toggleHover .elem-overview-two img:hover,\nmain .list-overview-three.toggleHover .elem-overview-three img:hover {\n    transform: scale(1.1);\n  }\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .wrapper.toggleHover,\n.wrapper-two.toggleHover,\n.wrapper-three.toggleHover {\n    margin: 0 0 2rem 0;\n    font-size: 2rem;\n  }\n}\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .wrapper.toggleHover,\n.wrapper-two.toggleHover,\n.wrapper-three.toggleHover {\n    margin: 0 0 2rem 0;\n    font-size: 2rem;\n  }\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  .wrapper.toggleHover,\n.wrapper-two.toggleHover,\n.wrapper-three.toggleHover {\n    margin: 0 0 2rem 0;\n    font-size: 2rem;\n  }\n}\n@media only screen and (max-width: 480px) {\n  .wrapper.toggleHover,\n.wrapper-two.toggleHover,\n.wrapper-three.toggleHover {\n    margin: 0 0 2rem 0;\n    font-size: 2rem;\n  }\n}\n\nfooter {\n  grid-area: footer;\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  color: #fff;\n  background: var(--text);\n  padding: 5rem;\n}\n@media only screen and (min-width: 481px) and (max-width: 767px) {\n  footer {\n    padding: 5rem 0rem;\n  }\n}\n@media only screen and (max-width: 480px) {\n  footer {\n    padding: 5rem 1.5rem;\n  }\n}\nfooter form {\n  display: flex;\n  align-items: center;\n}\nfooter form h2 {\n  margin-bottom: 3rem;\n}\nfooter form .prefix,\nfooter form .postfix {\n  background: linear-gradient(to right, var(--dark), var(--light));\n  padding: 1rem 2rem;\n  color: #fff;\n  font-size: 2rem;\n}\nfooter form .prefix {\n  border-top-left-radius: 0.5rem;\n  border-bottom-left-radius: 0.5rem;\n}\nfooter form button {\n  background: var(--text);\n  border: 0;\n  cursor: pointer;\n  transition: all 0.2s;\n}\nfooter form button:hover {\n  opacity: 0.7;\n}\nfooter form button .postfix {\n  border-top-right-radius: 0.5rem;\n  border-bottom-right-radius: 0.5rem;\n}\nfooter form input {\n  outline: 0;\n  border: 0;\n  padding: 1rem 2rem;\n  line-height: 2rem;\n  min-width: 400px;\n  font-size: 1.6rem;\n}\n@media only screen and (max-width: 480px) {\n  footer form input {\n    min-width: 200px;\n  }\n}\nfooter form input::placeholder {\n  color: var(--text);\n}\n\n.copyright {\n  grid-area: copyright;\n  display: flex;\n  flex-direction: row;\n  padding: 2rem 0 2rem 5rem;\n  justify-content: flex-start;\n  background: var(--copyright);\n}\n.copyright span {\n  color: var(--hint);\n}", "",{"version":3,"sources":["webpack://./src/index.scss","webpack://./src/assets/styles/_animations.scss","webpack://./src/assets/styles/_variables.scss","webpack://./src/assets/styles/_reset.scss","webpack://./src/assets/styles/_base.scss","webpack://./src/assets/styles/_classes.scss","webpack://./src/assets/styles/_utils.scss","webpack://./src/assets/styles/_media-queries.scss","webpack://./src/assets/styles/_gsap.scss","webpack://./src/assets/styles/_overflow.scss","webpack://./src/assets/styles/_cookies.scss"],"names":[],"mappings":"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","sourcesContent":["@import './assets/styles/style.scss';\n\n/* je mets en place ma grille :\nles background blue, red, green et purple permettent de visualiser les parties de ma grille*/\n\n.grid-container{\n  display: grid;\n  grid:\n    \"picture header\" auto\n    \"aside main\" 1fr\n    \"footer footer\" auto\n    \"copyright copyright\" auto\n    \"copyright copyright\" auto\n    / 350px auto;\n    min-height: 100vh;\n  /*ci-dessous, les mixins correspondant à la responsivité selon 4 formats */\n    @include xs{\n      /* Grille adaptée pour une seule colonne*/\n      grid:\n        \"header\" auto\n        \"main\" auto\n        \"picture\" auto\n        \"aside\" auto\n        \"footer\" auto\n        \"copyright\" auto\n        / auto;\n    }\n    @include sm{\n      grid:\n        \"header\" auto\n        \"main\" auto\n        \"picture\" auto\n        \"aside\" auto\n        \"footer\" auto\n        \"copyright\" auto\n        / auto;\n    }\n\n}\n\nheader{\n  grid-area: header;\n  background: linear-gradient(to right, var(--primary), var(--light));\n  padding: 5rem;\n  text-align: center;\n  color: #fff;\n  position: sticky;\n  top: 0;\n  z-index: 1;\n  @include xs{\n    position: static;\n    //padding: 1.5rem 5rem;\n  }\n  /*@include sm{\n    padding: 5rem 2rem;\n  }\n  @include md{\n    padding: 5rem 2rem;\n  }*/\n  h1{\n    //font-size: 4rem !important;\n    line-height: 8rem;\n    font-weight: 400;\n    letter-spacing: 3rem;\n    @include xs{\n      font-size: 2.5rem !important;\n      letter-spacing: 0.5rem;\n    }\n    @include sm{\n      font-size: 3rem !important;\n      letter-spacing: 2rem;\n    }\n    @include md{\n      font-size: 2.8rem !important;\n      letter-spacing: 1rem;\n    }\n    @include xl{\n      font-size: 3.5rem !important;\n      letter-spacing: 2.5rem;\n    }\n  }\n  p{\n    letter-spacing: 0.5rem;\n    margin: 0;\n  }\n  span{\n  /* Rappel, span est un inline\n  sur un élément inline, les animations ne marchent pas\n  donc on rajoute un display: inline-block*/\n    display: inline-block;\n    animation: bounce 2s;\n  }\n}\n\n.picture{\n  grid-area: picture;\n  padding: 3rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 6rem;\n  background: var(--background);\n  border-right: 1px solid var(--border);\n  .image-circle{\n    position: relative;\n     width: 200px;\n     height: 200px;\n     overflow: hidden;\n     border-radius: 50%;\n  }\n    img{\n      width: 100%;\n      height: auto;\n      margin-top: -50px;\n    }\n    img:hover{\n      filter: brightness(110%);\n      //filter: sepia(30%);\n      //background-image: url(\"./assets/images/heleneCV_red_light.jpg\");\n      cursor: pointer;\n    }\n\n  }\n\naside{\n  grid-area: aside;\n  background: var(--background);\n  border-right: 1px solid var(--border);\n  padding: 5rem;\n  min-height: 1500px;\n  max-width: 100% !important;\n\n  .block{\n    margin-bottom: 5rem;\n    font-style: italic;\n    h3{\n      margin-bottom: 0;\n      font-size: 1.4rem;\n    }\n    p{\n      margin: 0 0 2rem 0;\n    }\n    .scale-formation{\n     border-radius: 5px;\n     transition: all 0.2s;\n       &:hover {\n       background: var(--border);\n       transform: scale(1.3);\n       transition: 0.2s;\n       color: var(--middle);\n       max-width: 75%;\n       margin-left: 5%;\n       span{\n         color: var(--middle);\n       }\n      }\n    }\n\n\n    .bar-skill{\n      margin: 2rem 0;\n      height: 5px;\n      background: var(--hint);\n      position: relative;\n      .bar-skill-progress{\n        position: absolute;\n        height: 5px;\n        top: 0;\n        left: 0;\n        background: var(--light);\n        &.one{\n          width: 100%;\n        }\n        &.two{\n          width: 90%;\n        }\n        &.three{\n          width: 70%;\n        }\n        &.four{\n          width: 70%;\n        }\n      }\n      .bar-skill-dot{\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        background: var(--dark);\n        top: -2.5px;\n        transform: rotate(45deg);\n        &.one{\n          left: calc(100% - 5px);\n        }\n        &.two{\n          left: calc(90% - 5px);\n        }\n        &.three{\n          left: calc(70% - 5px);\n        }\n        &.four{\n          left: calc(70% - 5px);\n        }\n      }\n    }\n\n    .stars-container{\n      display: flex;\n      margin: 2rem 0 3rem 0;\n      color: var(--hint);\n      i{\n        font-size: 2rem;\n        margin: 0 1rem;\n      }\n    }\n\n    .social-container{\n      display: flex;\n      justify-content: start;\n      align-items: center;\n      padding: 1rem 1rem;\n      border-radius: 5px;\n      transition: all 0.2s;\n      &:hover{\n        background: var(--border);\n        transform: scale(1.2);\n        transition: 0.2s;\n        justify-content: center;\n        cursor: pointer;\n        /*Au passage du hover,\n        le bloc devient gris et grossit\n        passage adouci par une transition light de 0.2s*/\n        i{\n          color: var(--primary);\n          /*Pour que l'icône se colore au passage du hover */\n        }\n        /*.fa-instagram-square::before{\n          display: none;\n        }\n        .fa-instagram-square::after{\n          content: \"Pseudo : blanchepigalle\";\n          cursor: default;\n          color: var(--text);\n          font-size: 1.4rem;\n          font-style: italic;\n          font-family: var(--font-family);\n        }*/\n      }\n      i{\n        font-size: 2rem;\n        //flex: 0 0 50px; // petit rappel : le 0 0 correspondent au growth et au shrink\n        margin-right: 1rem;\n      }\n    }\n  }\n\n\n}\n\nmain{\n  grid-area: main;\n  padding: 5rem;\n  max-width: 100% !important;\n  @include xs{\n    padding: 5rem 1.5rem;\n    width: auto;\n  }\n  h2{\n    margin-bottom: 4rem;\n  }\n  p,\n  ul{\n    letter-spacing: 0.1rem;\n    line-height: 3rem;\n  }\n\n\n  @include toggle-one;\n  @include toggle-two;\n  @include toggle-three;\n\n  hr{\n    //margin: 0 40rem;\n    margin: 0;\n    overflow: visible; /* For IE */\n    border: none;\n    border-top: medium double #e0e0e0;\n    color: #e0e0e0;\n    text-align: center;\n    &:after {\n    content: \"§\";\n    display: inline-block;\n    position: relative;\n    top: -0.7em;\n    font-size: 1.5em;\n    padding: 0 0.25em;\n    background: #fff;\n}\n  }\n\n// Animation des images pour le 1er toggleHover\n\n  .list-overview{\n    display: flex;\n    flex-flow: row wrap;\n    position: relative;\n    //margin: 0 auto;\n    //justify-content: center;\n\n    &.toggleHover{\n\n    .elem-overview{\n      border: 1px solid #ddd;\n      background: #eee;\n      left: 0;\n      position: absolute;\n      //margin: 1rem 2rem;\n      max-width: 100px;\n      height: 100px;\n      padding: 0;\n      box-shadow: 0 2px 4px #e0e0e0;\n\n      &.screen-1{\n        opacity: 1;\n      }\n      &.screen-2{\n        opacity: 0;\n        animation: unfold-2 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-3{\n        opacity: 0;\n        animation: unfold-3 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-4{\n        opacity: 0;\n        animation: unfold-4 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-5{\n        opacity: 0;\n        animation: unfold-5 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-6{\n        opacity: 0;\n        animation: unfold-6 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-7{\n        opacity: 0;\n        animation: unfold-7 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-8{\n        opacity: 0;\n        animation: unfold-8 0.5s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-9{\n        opacity: 0;\n        animation: unfold-9 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-10{\n        opacity: 0;\n        animation: unfold-10 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n      &.screen-11{\n        opacity: 0;\n        animation: unfold-11 1s forwards;\n        animation-timing-function: cubic-bezier(.42,0,.58,1);\n        //animation-delay: 1.5s;\n      }\n\n\n\n\n    img {\n      height: 100%;\n      //opacity:0.7;\n      -moz-transition: opacity 0.9s;\n      -webkit-transition: opacity 0.9s;\n      -o-transition: opacity 0.9s;\n      &:hover{\n      opacity:1 !important;\n      -moz-transition: opacity 0.7s;\n      -webkit-transition: opacity 0.7s;\n      -o-transition: opacity 0.7s;\n      transform: scale(2.5);\n      transition: 0.2s;\n          }\n          }\n          }\n\n        }\n\n      }\n\n  // Animation des images pour le 2e toggleHover\n\n  .list-overview-two{\n    display: flex;\n    flex-flow: row wrap;\n    position: relative;\n    //margin: 0 auto;\n    //justify-content: center;\n    &.toggleHover{\n\n  .elem-overview-two{\n    //border: 1px solid #ddd;\n    background: #eee;\n    left: 0;\n    position: absolute;\n    //margin: 1rem 2rem;\n    max-width: 100px;\n    height: 100px;\n    padding: 0;\n    //box-shadow: 0 2px 4px #e0e0e0;\n\n    &.screen-12{\n      opacity: 1;\n    }\n    &.screen-13{\n      opacity: 0;\n      animation: unfold-13 1s forwards;\n      animation-timing-function: cubic-bezier(.42,0,.58,1);\n      //animation-delay: 1.5s;\n    }\n    &.screen-14{\n      opacity: 0;\n      animation: unfold-14 1s forwards;\n      animation-timing-function: cubic-bezier(.42,0,.58,1);\n      //animation-delay: 1.5s;\n    }\n    &.screen-15{\n      opacity: 0;\n      animation: unfold-15 1s forwards;\n      animation-timing-function: cubic-bezier(.42,0,.58,1);\n      //animation-delay: 1.5s;\n    }\n    &.screen-16{\n      opacity: 0;\n      animation: unfold-16 1s forwards;\n      animation-timing-function: cubic-bezier(.42,0,.58,1);\n      //animation-delay: 1.5s;\n    }\n    &.screen-17{\n      opacity: 0;\n      animation: unfold-17 1s forwards;\n      animation-timing-function: cubic-bezier(.42,0,.58,1);\n      //animation-delay: 1.5s;\n    }\n    &.screen-18{\n      opacity: 0;\n      animation: unfold-18 1s forwards;\n      animation-timing-function: cubic-bezier(.42,0,.58,1);\n      //animation-delay: 1.5s;\n    }\n    &.screen-19{\n      opacity: 0;\n      animation: unfold-19 1s forwards;\n      animation-timing-function: cubic-bezier(.42,0,.58,1);\n      //animation-delay: 1.5s;\n    }\n\n\n  img {\n    height: 100%;\n    //opacity:0.7;\n    -moz-transition: opacity 0.9s;\n    -webkit-transition: opacity 0.9s;\n    -o-transition: opacity 0.9s;\n    &:hover{\n    opacity:1;\n    -moz-transition: opacity 0.7s;\n    -webkit-transition: opacity 0.7s;\n    -o-transition: opacity 0.7s;\n    transform: scale(2.5);\n    transition: 0.2s;\n\n            }\n            }\n            }\n\n          }\n      }\n\n      // Animation des images pour le 3e toggleHover\n\n\n\n      .list-overview-three{\n        display: flex;\n        flex-flow: row wrap;\n        position: relative;\n        //margin: 0 auto;\n\n        &.toggleHover{\n\n          .elem-overview-three{\n            //border: 1px solid #ddd;\n            background: #eee;\n            left: 0;\n            position: absolute;\n            //margin: 1rem 2rem;\n            max-width: 100px;\n            height: 100px;\n            padding: 0;\n\n            //box-shadow: 0 2px 4px #e0e0e0;\n\n            &.screen-20{\n              opacity: 1;\n            }\n            &.screen-21{\n              opacity: 0;\n              animation: unfold-21 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-22{\n              opacity: 0;\n              animation: unfold-22 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-23{\n              opacity: 0;\n              animation: unfold-23 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-24 {\n              opacity: 0;\n              animation: unfold-24 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-25 {\n              opacity: 0;\n              animation: unfold-25 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-26 {\n              opacity: 0;\n              animation: unfold-26 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-27 {\n              opacity: 0;\n              animation: unfold-27 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-28{\n              opacity: 0;\n              animation: unfold-28 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-29{\n              opacity: 0;\n              animation: unfold-29 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n            &.screen-30{\n              opacity: 0;\n              animation: unfold-30 1s forwards;\n              animation-timing-function: cubic-bezier(.42,0,.58,1);\n              //animation-delay: 1.5s;\n            }\n\n\n            img {\n              height: 100%;\n              //opacity:0.7;\n              -moz-transition: opacity 0.9s;\n              -webkit-transition: opacity 0.9s;\n              -o-transition: opacity 0.9s;\n              &:hover{\n              opacity:1;\n              -moz-transition: opacity 0.7s;\n              -webkit-transition: opacity 0.7s;\n              -o-transition: opacity 0.7s;\n              transform: scale(2.5);\n              transition: 0.2s;\n\n                }\n\n                }\n                }\n\n            }\n            }\n\n\n    }\n\n\n    // media queries des animations unfold\n\n    main .list-overview.toggleHover .elem-overview,\n    main .list-overview-two.toggleHover .elem-overview-two,\n    main .list-overview-three.toggleHover .elem-overview-three\n    {\n      @include xl{\n        position: static;\n        margin: 0 5rem 5rem 0;\n        min-width: 75%;\n        //max-width: 60%;\n        //text-align: center;\n        height: auto;\n      }\n      @include md{\n        position: static;\n        margin: 0 5rem 5rem 0;\n        max-width: 100%;\n        height: auto;\n      }\n      @include sm{\n        position: static;\n        margin: 0 5rem 5rem 0;\n        max-width: 100%;\n        height: auto;\n      }\n      @include xs{\n        position: static;\n        margin: 0 5rem 5rem 0;\n        max-width: 100%;\n        height: auto;\n      }\n    }\n\n    // media queries du resizing images\n\n    main .list-overview.toggleHover .elem-overview img,\n    main .list-overview-two.toggleHover .elem-overview-two img,\n    main .list-overview-three.toggleHover .elem-overview-three img\n    {\n      @include xl{\n        min-width: 75%;\n        height: auto;\n        &:hover{\n          transform: scale(1.1);\n        }\n      }\n      @include md{\n        max-width: 100%;\n        height: auto;\n        &:hover{\n          transform: scale(1.1);\n        }\n      }\n      @include sm{\n        min-width: 100%;\n        height: auto;\n        &:hover{\n          transform: scale(1.1);\n        }\n      }\n      @include xs{\n        min-width: 100%;\n        height: auto;\n        &:hover{\n          transform: scale(1.1);\n        }\n      }\n    }\n\n    .wrapper.toggleHover,\n    .wrapper-two.toggleHover,\n    .wrapper-three.toggleHover{\n      @include xl{\n        margin: 0 0 2rem 0;\n        font-size: 2rem;\n      }\n      @include md{\n        margin: 0 0 2rem 0;\n        font-size: 2rem;\n      }\n      @include sm{\n        margin: 0 0 2rem 0;\n        font-size: 2rem;\n      }\n      @include xs{\n        margin: 0 0 2rem 0;\n        font-size: 2rem;\n      }\n\n    }\n\n  //}\n\n\n//}\n\n\nfooter{\n  grid-area: footer;\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  color: #fff;\n  background: var(--text);\n  padding: 5rem;\n  @include sm{\n    padding: 5rem 0rem;\n  }\n  @include xs{\n    padding: 5rem 1.5rem;\n  }\n  form{\n    display: flex;\n    align-items: center;\n    //flex-direction: column;\n    h2{\n      margin-bottom: 3rem;\n    }\n    .prefix,\n    .postfix{\n      background: linear-gradient(to right, var(--dark), var(--light));\n      padding: 1rem 2rem;\n      color: #fff;\n      font-size: 2rem;\n\n    }\n    .prefix{\n      border-top-left-radius: 0.5rem;\n      border-bottom-left-radius: 0.5rem;\n    }\n\n\n    button{\n      background: var(--text);\n      border: 0;\n      cursor: pointer;\n      transition: all 0.2s;\n      &:hover{\n        opacity: 0.7;\n      }\n      .postfix{\n        border-top-right-radius: 0.5rem;\n        border-bottom-right-radius: 0.5rem;\n      }\n    }\n    input{\n      outline: 0;\n      border: 0;\n      padding: 1rem 2rem;\n      line-height: 2rem;\n      min-width: 400px;\n      font-size: 1.6rem;\n      @include xs{\n      min-width: 200px;\n      }\n      &::placeholder{\n        color: var(--text);\n      }\n    }\n\n  }\n\n\n}\n\n// Barre mentions légales\n\n.copyright{\n  grid-area: copyright;\n  display: flex;\n  flex-direction: row;\n  padding: 2rem 0 2rem 5rem;\n  justify-content: flex-start;\n  background: var(--copyright);\n  span{\n    color: var(--hint);\n  }\n}\n","/* Titre d'entrée*/\n\n@keyframes bounce{\n  0%{\n    transform: rotate(-45deg);\n  }\n  10%{\n    transform: rotate(-35deg);\n  }\n  70%{\n    transform: rotate(20deg);\n  }\n  80%{\n    transform: rotate(-10deg);\n  }\n  90%{\n    transform: rotate(5deg);\n  }\n  100%{\n    transform: rotate(0deg);\n  }\n}\n\n@keyframes bounce-1{\n  0%{\n    transform: rotate(45deg);\n  }\n  10%{\n    transform: rotate(35deg);\n  }\n  70%{\n    transform: rotate(-20deg);\n  }\n  80%{\n    transform: rotate(10deg);\n  }\n  90%{\n    transform: rotate(-5deg);\n  }\n  100%{\n    transform: rotate(0deg);\n  }\n}\n\n/* Animation bouton ouvert*/\n\n@mixin scaleNumber {\n  @keyframes scaleNumber {\n\n  to   {\n    transform: scale(1) translate(-50%, -50%);\n    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1.0);\n    opacity: 0.5;\n    box-shadow: 0 2px 4px 6px #e0e0e0;\n    transition-property: boxShadow;\n  }\n  }\n}\n\n\n\n/* Animations portfolio*/\n@mixin fadeTitle{\n  margin: 5rem 1rem 3rem 0;\n  color: var(--dark);\n  opacity: 0;\n  font-size: 1.8rem;\n}\n\n.fadeIn-one{\n  @include fadeTitle;\n  &.toggleHover{\n    animation: fadeIn-one 2s linear 1 forwards;\n    animation-delay: 0.5s;\n    & ~ .list-overview{\n      animation: all 2s ease-in-out 3s forwards;\n    }\n  }\n\n    @keyframes fadeIn-one{\n      to{\n      opacity: 1;\n    }\n    }\n}\n\n\n@keyframes unfold-2{\n  to{\n    left: 9%;\n    opacity:1;\n  }\n\n}\n\n@keyframes unfold-3{\n  to{\n    left: 18%;\n    opacity: 1;\n  }\n}\n\n@keyframes unfold-4{\n  to{\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-5{\n  to{\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-6{\n  to{\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-7{\n  to{\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-8{\n  to{\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-9{\n  to{\n    left: 72%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-10{\n  to{\n    left: 81%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-11{\n  to{\n    left: 90%;\n    opacity: 1;\n  }\n}\n\n\n.fadeIn-two{\n  @include fadeTitle;\n  &.toggleHover{\n    animation: fadeIn-two 2s linear 1 forwards;\n    animation-delay: 0.5s;\n    & ~ .list-overview-two{\n      animation: all 2s ease-in-out 3s forwards;\n    }\n  }\n\n    @keyframes fadeIn-two{\n      to{\n      opacity: 1;\n    }\n    }\n}\n\n\n@keyframes unfold-13{\n  to{\n    left: 9%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-14{\n  to{\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-15{\n  to{\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-16{\n  to{\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-17{\n  to{\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-18{\n  to{\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-19{\n  to{\n    left: 63%;\n    opacity: 1;\n  }\n}\n\n\n.fadeIn-three{\n  @include fadeTitle;\n  &.toggleHover{\n    animation: fadeIn-three 2s linear 1 forwards;\n    animation-delay: 0.5s;\n    & ~ .list-overview-three{\n      animation: all 2s ease-in-out 3s forwards;\n    }\n  }\n\n    @keyframes fadeIn-three{\n      to{\n      opacity: 1;\n    }\n    }\n}\n\n\n@keyframes unfold-21{\n  to{\n    left: 9%;\n    opacity:1;\n  }\n}\n\n@keyframes unfold-22{\n  to{\n    left: 18%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-23{\n  to{\n    left: 27%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-24{\n  to{\n    left: 36%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-25{\n  to{\n    left: 45%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-26{\n  to{\n    left: 54%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-27{\n  to{\n    left: 63%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-28{\n  to{\n    left: 70%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-29{\n  to{\n    left: 77%;\n    opacity: 1;\n  }\n}\n@keyframes unfold-30{\n  to{\n    left: 84%;\n    opacity: 1;\n  }\n}\n\n\n\n/* Animation texte défilant */\n@mixin textSlider{\n  margin: 12rem 0 3rem 0;\n  display: flex;\n  max-width: 100%;\n  opacity: 0;\n  z-index: -1;\n  font-size: 1.7rem;\n  font-family: 'Pangolin';\n  background: var(--backrgoundTextSlider);\n  padding: 0.3rem 0;\n\n\n\n  &.toggleHover{\n   animation: slider 0.5s ease-in-out forwards;\n   animation-delay: 3s;\n   transition: slider 0.5s;\n   }\n}\n\n.wrapper{\n@include textSlider;\n@keyframes slider {\n  0%   { transform: translate(10%); opacity:1; }\n  100% { transform: translate(0%); opacity:1; }\n}\n}\n\n.wrapper-two{\n  background: blue;\n  @include textSlider;\n  @keyframes slider{\n     0%   { transform: translateX(100%); opacity:1;}\n    100% {transform: translateX(0%); opacity:1;}\n  }\n}\n\n\n.wrapper-three{\n  @include textSlider;\n  @keyframes slider{\n     0%   { transform: translateX(100%); opacity:1;}\n    100% {transform: translateX(0%); opacity:1;}\n  }\n}\n","/* Codes font et colors*/\n:root{\n--font-family: \"Muli\", sans-serif;\n\n//colors\n--light: #fab1a0;\n--primary: #e84118;\n--middle: #ee5253;\n--dark: #ff3f34;\n--text: #333;\n--background: #fafafa;\n--hint: #999;\n--border: #ddd;\n--overflow: #f5f6fa;\n--copyright: #282a2b;\n--cookie: #2071e7;\n--light-blue: #00c3ff;\n--primary-blue: #2071e7;\n\n\n// Fonts annexes :\n--font-number: \"roboto\";\n--backrgoundTextSlider : #fcfffc;  //#fcfcfc\n}\n","/* Reset des différents éléments de notre page*/\n\n*{\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n","html{\n  font-size: 62.5%;   // donnera 10px comme base à ma font\n}\n\nbody{\n  font-family: var(--font-family);\n  color: var(--text);\n  font-size: 1.6rem;\n}\n\np{\n  margin: 1rem 0;\n}\n\nh1{\n  margin: 0;\n}\n\n\nh2,\nh3,\nh4,\nh5,\nh6{\n  margin: 1rem 0 2rem 0;\n}\n\n/*ul{\n  list-style: none;\n}*/\nul {\n  list-style-type: circle;\n}\n\n\na{\n  color: var(--text);\n  text-decoration: none;\n}\n\nimg{\n  max-width: 100%;\n}\n","/* On créé ici une classe générique\npour des styles qu'on va utiliser beaucoup dans le projet*/\n\n.title{\n  &-small{\n    letter-spacing: 0.5rem;\n    font-size: 1.7rem;\n  }\n}\n\n.text{\n  &-primary{\n    color: var(--primary);\n  }\n  &-hint{\n    color: var(--hint);\n  }\n  &-border{\n    color: var(--border);\n  }\n}\n","/* Pour des classes utilitaires */\n\n.mb-5{ // m pour margin, b pour bottom, 5 pour la valeur de la marge\n  margin-bottom: 5rem !important;\n}\n\n.mb-3{\n  margin-bottom: 3rem !important;\n}\n\n.mb-2{\n  margin-bottom: 2rem !important;\n}\n\n.align-flex{\n  display: flex !important;\n  flex-flow: nowrap !important;\n}\n\n/*.imag-2{\n  filter: opacity: 0.9 !important;\n}\n.imag-3{\n  opacity: 0.8 !important;\n}\n.imag-4{\n  opacity: 0.7 !important;\n}\n.imag-5{\n  opacity: 0.6 !important;\n}\n.imag-6{\n  opacity: 0.5 !important;\n}\n.imag-7{\n  opacity: 0.4 !important;\n}\n.imag-8{\n  opacity: 0.3 !important;\n}\n.imag-9{\n  opacity: 0.2 !important;\n}\n.imag-10{\n  opacity: 0.1 !important;\n}*/\n","/* Les media queries sont placées ici dans des mixins */\n\n/* phones and down */\n@mixin xs{\n  @media only screen and (max-width: 480px) {\n    @content;\n  }\n}\n\n/* phone to portrait tablet */\n@mixin sm{\n  @media only screen and (min-width: 481px) and (max-width: 767px) {\n    @content;\n  }\n}\n\n/* Portrait tablet to landscape and desktop */\n@mixin md{\n  @media only screen and (min-width: 768px) and (max-width: 991px) {\n    @content;\n  }\n}\n\n/* Laptop */\n@mixin xl{\n  @media only screen and (min-width: 992px) and (max-width: 1199px) {\n    @content;\n  }\n}\n\n/* Laptop and desktop */\n@mixin lg{\n  @media only screen and (min-width: 1200px)\n   {\n    @content;\n  }\n}\n","\n\n@mixin toggle-number{\n  color: var(--border);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.8rem;\n  font-family: var(--font-number);\n  background: var(--primary);\n}\n\n\n@mixin toggle-one{\n.list-experience-one{\n  /* Pour le toggle */\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n  //background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent 3rem);\n\n  section {\n    position: relative;\n    margin: auto;\n    padding: 2rem 0 7rem 0;\n\n\n  .experience-one\n  /*, .experience-two,\n  .experience-three*/\n  {\n    display: flex;\n    margin: 0;\n    overflow: scroll;\n    height: 70rem;  // 25 rem pour une partie estompée\n\n\n    /*&.toggleHover{\n      overflow: visible;\n      height: 25rem;\n    }*/\n\n    /* Exemple avec grid :\n    display: grid;\n    grid-template-columns: 100%;\n    grid-template-rows: 5rem 1fr 8rem;\n    width: 100%;\n    height: 60rem;\n    */\n\n    .timeline{\n      text-align: center;\n      color: var(--border);\n      padding-right: 2rem;\n      border-right: 1px solid var(--hint);\n      p{\n        margin: 0;\n      }\n    }\n\n    .content{\n      padding: 0 1rem;\n      h3{\n        margin: 0;\n      }\n      p{\n        margin: 0;\n      }\n    }\n  }\n\n\n  .toggle-one {\n      position: absolute;\n      top: 100%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 50px;\n      height: 50px;\n      border: 8px solid #e0e0e0;\n      border-radius: 50%;\n      background: var(--primary);\n      box-shadow: 0 2px 4px #e0e0e0;\n      cursor: pointer;\n      @include toggle-number;\n      @include scaleNumber;\n\n  }\n\n\n\n  /*\n .togglePlay::before{\n    display: none;\n  }\n  .togglePlay::after{\n    content: \"X\";\n  }*/\n\n\n  }\n}\n}\n\n@mixin toggle-two{\n.list-experience-two{\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n\n  section {\n    position: relative;\n    margin: auto;\n    padding: 2rem 0 7rem 0;\n\n\n  .experience-two{\n    display: flex;\n    margin: 0;\n    overflow: scroll;\n    height: 70rem;\n\n\n    .timeline{\n      text-align: center;\n      color: var(--border);\n      padding-right: 2rem;\n      border-right: 1px solid var(--hint);\n      p{\n        margin: 0;\n      }\n    }\n    .content{\n      padding: 0 1rem;\n      h3{\n        margin: 0;\n      }\n      p{\n        margin: 0;\n      }\n    }\n  }\n  .toggle-two {\n      position: absolute;\n      top: 100%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 50px;\n      height: 50px;\n      border: 8px solid #e0e0e0;\n      border-radius: 50%;\n      //background-color: var(--primary);\n      box-shadow: 0 2px 4px #e0e0e0;\n      cursor: pointer;\n      @include toggle-number;\n      @include scaleNumber;\n  }\n  }\n}\n}\n\n\n@mixin toggle-three{\n.list-experience-three{\n  /* Pour le toggle */\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 1px 0px #e0e0e0;\n  margin: 0 0 3rem 0;\n\n\n\n  section {\n    position: relative;\n    margin: auto;\n    padding: 2rem 0 7rem 0;\n\n  .experience-three{\n    display: flex;\n    margin: 0;\n    overflow: scroll;\n    height: 70rem;\n\n\n    .timeline{\n      text-align: center;\n      color: var(--border);\n      padding-right: 2rem;\n      border-right: 1px solid var(--hint);\n      p{\n        margin: 0;\n      }\n    }\n    .content{\n      padding: 0 1rem;\n      h3{\n        margin: 0;\n      }\n      p{\n        margin: 0;\n      }\n    }\n  }\n  .toggle-three {\n      position: absolute;\n      top: 100%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 50px;\n      height: 50px;\n      border: 8px solid #e0e0e0;\n      border-radius: 50%;\n      //background-color: var(--primary);\n      box-shadow: 0 2px 4px #e0e0e0;\n      cursor: pointer;\n      @include toggle-number;\n      @include scaleNumber;\n  }\n  }\n}\n}\n\n\n/* btn pour test :\n\n.btn-visible{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0;\n    color: var(--dark);\n    font-weight: bold;\n    background:\n    linear-gradient(to bottom,\n    rgba(255, 255, 255, 1),\n    rgba(254, 254, 254, 1),\n    rgba(248, 248, 248, 1),\n    rgba(244, 244, 244, 1));\n    overflow: hidden;\n    cursor: pointer;\n\n    span{\n      position: relative;\n      display: block;\n      text-align: center;\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n      transition: transform 0.3s;\n      &::after{\n        content: \"PORTFOLIO\";\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        transform: translateY(100%);\n      }\n      &:hover{\n          transform: translateY(-100%);\n\n      }\n    }\n\n  }*/\n\n  /* btn de secours*/\n  /*.btn-visible{\n      text-align: center;\n      padding: 2rem 0;\n      color: var(--dark);\n      font-weight: bold;\n      background:\n      linear-gradient(to bottom,\n      rgba(255, 255, 255, 1),\n      rgba(254, 254, 254, 1),\n      rgba(248, 248, 248, 1),\n      rgba(244, 244, 244, 1));\n      cursor: pointer;\n      &:hover{\n        transform: scale(1.2);\n        transition: 0.2s;\n        background: transparent;\n      }\n\n        span::after{\n          content: \"VOIR\";\n        }\n        &:hover span::after{\n          content: \"PORTFOLIO\";\n        }\n\n    }*/\n","// Bouton & texte OVERFLOW\n\n@mixin overflowVisible{\n  display: flex;\n  flex-flow: row wrap;\n    padding: 0 0 4rem 0;\n}\n\n@mixin btnOverflow{\n  font-size: 1.5rem;\n  background: var(--border);\n  border: none;\n  font-weight: bold;\n  padding: .5rem 2rem;\n  border-radius: 35px;\n  cursor: pointer;\n\n    &:hover {\n      background: var(--hint);\n      color: #fff;\n        }\n    &:focus {\n      outline-style: none;\n}\n}\n\n@mixin textOverflow{\n  display: none;\n  //height: 30rem;\n  background: var(--overflow);\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  margin: 2.5rem 0 2.5rem 0;\n  border-radius: 10px;\n  flex-flow: row wrap;\n  align-items: center;\n}\n\n\n.overflow-visible{\n  @include overflowVisible;\n  .btn-overflow {\n    @include btnOverflow;\n    }\n\n\n    .text-overflow{\n        @include textOverflow;\n    }\n\n}\n\n\n.overflowTwo-visible{\n  @include overflowVisible;\n  .btn-overflow-two {\n    @include btnOverflow;\n    }\n\n\n    .text-overflow-two{\n        @include textOverflow;\n        p{\n          margin-left: -2rem !important;\n          font-weight: bold;\n        }\n    }\n\n}\n","// Bandeau et bouton cookies\n\n@mixin buttonCookie{\n\n    font-size: 1.5rem;\n    font-weight: 300 !important;\n    background: #fff;\n    color: var(--cookie);\n    border: none;\n    font-weight: bold;\n    padding: .5rem 2rem;\n    margin: 0 0 0 2rem;\n    border-radius: 35px;\n    cursor: pointer;\n\n      &:hover {\n        opacity: 0.5;\n          }\n      &:focus {\n        outline-style: none;\n  }\n\n};\n\n@mixin cookieBar{\n  grid-area: copyright;\n  width: 100%;\n  display: flex;\n  flex-flow: column;\n  background: var(--cookie);\n  color: #fff;\n  padding: 3rem;\n  font-size: 1.5rem;\n  position: fixed;\n  bottom: 0;\n  p{\n    margin: 0;\n  }\n  a{\n    color: #fff;\n     text-decoration: underline;\n  }\n}\n\n// Bandeau cookie : media queries\n.cookiebar{\n@include xl{\n  display: flex;\n  flex-flow: column;\n}\n@include md{\n  display: flex;\n  flex-flow: column;\n}\n@include sm{\n  display: flex;\n  flex-flow: column;\n}\n@include xs{\n  display: flex;\n  flex-flow: column;\n}\n}\n.queries-cookie{\n  margin-top: 1rem;\n  @include xl{\n    display: flex;\n  }\n  @include md{\n    display: flex;\n  }\n  @include sm{\n    display: flex;\n    flex-flow: row wrap;\n  }\n  @include xs{\n    display: flex;\n    flex-flow: row wrap;\n  }\n\n}\n\n.is-hidden{\n  @include xl{\n    display: none;\n  }\n  @include md{\n    display: none;\n  }\n  @include sm{\n    display: none;\n  }\n  @include xs{\n    display: none;\n  }\n\n}\n\n// Bandeau cookie : visible/hidden\n\n.cookiebar {\n@include cookieBar;\n\n.button-cookie-ok{\n  @include buttonCookie;\n}\n\n.button-cookie-no{\n  @include buttonCookie;\n}\n}\n\n.is-hidden{\n  display: none;\n}\n\n// Page COOKIES\n\n.grid-container-page{\n  display: grid;\n  grid:\n    \"header header\" auto\n    \"aside main\" 1fr\n    \"copyright copyright\" auto;\n    max-height: 100vh;\n    @include xs{\n      grid:\n        \"header\" auto\n        \"main\" auto\n        \"aside aside\"\n        \"copyright\" auto ;\n    }\n    @include sm{\n      grid:\n      \"header\" auto\n      \"main\" auto\n      \"aside aside\"\n      \"copyright\" auto ;\n    }\n\n    aside{\n      @include xs{\n        padding: 0;\n      }\n      @include sm{\n        padding: 0;\n      }\n    }\n\n  }\n\n// Header cookies\n  .header-two{\n    background: linear-gradient(to right, var(--primary-blue), var(--light-blue));\n  }\n\n// Header mentions légales\n.header-three{\n  background: linear-gradient(to right, var(--light), var(--primary));\n}\n\n  .button-back{\n    @include buttonCookie;\n    color: var(--primary) !important;\n    border: 3px solid !important;\n    font-size: 2rem !important;\n    margin: 0 !important;\n    //color: #fff !important;\n  }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/assets/styles/style.scss":
/*!**************************************!*\
  !*** ./src/assets/styles/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/styles/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_reverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.reverse.js */ "./node_modules/core-js/modules/es.array.reverse.js");
/* harmony import */ var core_js_modules_es_array_reverse_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reverse_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _assets_styles_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/styles/style.scss */ "./src/assets/styles/style.scss");



/*import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);*/

var tweenOne = TweenLite.from(".experience-one", 0.5, {
  height: 0,
  paused: true,
  reversed: false
});
var tweenTwo = TweenLite.from(".experience-two", 0.5, {
  height: 0,
  paused: true,
  reversed: false
});
var tweenThree = TweenLite.from(".experience-three", 0.5, {
  height: 0,
  paused: true,
  reversed: false
});
var togglePlayOne = TweenLite.to(".toggle-one", 0.5, {
  background: "#fff",
  color: "var(--primary)",
  animation: "scaleNumber 1.5s infinite",
  reversed: true
}).reverse();
TweenLite.from(".toggle-one", 0.5, {
  played: true
}).play();
var togglePlayTwo = TweenLite.to(".toggle-two", 0.5, {
  background: "#fff",
  color: "var(--primary)",
  animation: "scaleNumber 1.5s infinite",
  reversed: true
}).reverse();
TweenLite.from(".toggle-two", 0.5, {
  played: true
}).play();
var togglePlayThree = TweenLite.to(".toggle-three", 0.5, {
  background: "#fff",
  color: "var(--primary)",
  animation: "scaleNumber 1.5s infinite",
  reversed: true
}).reverse();
TweenLite.from(".toggle-three", 0.5, {
  played: true
}).play();
/* ANIMATION SIMPLE, pour que le PORFOLIO SE DEROULE*/

document.querySelector(".toggle-one").addEventListener("mouseover", function (e) {
  document.querySelector(".fadeIn-one").classList.add("toggleHover");
  document.querySelector(".list-overview").classList.add("toggleHover");
  document.querySelector(".wrapper").classList.add("toggleHover");
  togglePlayOne.reversed(!togglePlayOne.reversed());
  doCoolStuffOne();
}, false);
document.querySelector(".toggle-two").addEventListener("mouseover", function () {
  document.querySelector(".fadeIn-two").classList.add("toggleHover");
  document.querySelector(".list-overview-two").classList.add("toggleHover");
  document.querySelector(".wrapper-two").classList.add("toggleHover");
  togglePlayTwo.reversed(!togglePlayTwo.reversed());
  doCoolStuffTwo();
}, false);
document.querySelector(".toggle-three").addEventListener("mouseover", function () {
  document.querySelector(".fadeIn-three").classList.add("toggleHover");
  document.querySelector(".list-overview-three").classList.add("toggleHover");
  document.querySelector(".wrapper-three").classList.add("toggleHover");
  togglePlayThree.reversed(!togglePlayThree.reversed());
  doCoolStuffThree();
}, false);

function doCoolStuffOne() {
  tweenOne.reversed() ? tweenOne.play() : tweenOne.reverse();
}

function doCoolStuffTwo() {
  tweenTwo.reversed() ? tweenTwo.play() : tweenTwo.reverse();
}

function doCoolStuffThree() {
  tweenThree.reversed() ? tweenThree.play() : tweenThree.reverse();
}

var scrollFunction = function scrollFunction(e) {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.querySelector("header").style.padding = "1rem 5rem";
    document.querySelector("header").style.height = "17rem";
    document.querySelector("h1").style.fontSize = "3rem";
    document.querySelector("h1").style.padding = "0rem";
  } else {
    document.querySelector("header").style.padding = "2rem 5rem";
    document.querySelector("header").style.height = "22rem";
    document.querySelector("h1").style.fontSize = "4rem !important";
    document.querySelector("h1").style.padding = "0 0 1.5rem 0";
  }
};

var scrollEvent;
window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    scrollEvent = window.addEventListener('scroll', scrollFunction, false);
  } else {
    scrollEvent = window.removeEventListener('scroll', scrollFunction, false);
  }
}, false);
/* Bouton overflow*/

var btn = document.querySelector(".btn-overflow");
var training = document.querySelector(".text-overflow");
var experience = document.querySelector(".experience-one");
var btnTwo = document.querySelector(".btn-overflow-two");
var eBooks = document.querySelector(".text-overflow-two");
var experienceTwo = document.querySelector(".experience-two");
btn.addEventListener("click", function (e) {
  training.style.display = training.style.display === "" ? "flex" : "";
  experience.style.height = experience.style.height == "90rem" ? "70rem" : "90rem";
});
btnTwo.addEventListener("click", function (e) {
  eBooks.style.display = eBooks.style.display === "" ? "flex" : "";
  experienceTwo.style.height = experienceTwo.style.height == "95rem" ? "70rem" : "95rem";
}); // BOUTONS COOKIES FONCTIONNELS

var buttonCookieok = document.querySelector(".button-cookie-ok");
var buttonCookieno = document.querySelector(".button-cookie-no");
var cookieBar = document.querySelector(".cookiebar");
buttonCookieok.addEventListener("click", function (e) {
  cookieBar.classList.add("is-hidden");
  console.log('Yes');
});
buttonCookieno.addEventListener("click", function (e) {
  cookieBar.classList.add("is-hidden");
  console.log('No');
});
doCoolStuffOne();
doCoolStuffTwo();
doCoolStuffThree();
scrollFunction(); //extractCookies();
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map