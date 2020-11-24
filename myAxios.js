

(function webpackUniversalModuleDefinition(root, factory) {
  // exports和module.exports是node.js里的模块
  // 二者的联系：exports对象实际上只是对module.exports的引用，也即：var module = { id: '', exports: {}, /* ... */} | var exmorts = module.exports
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	// define是amd规范里的模块
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axios"] = factory();
	else
		root["axios"] = factory();
})(this, function() {
	return (function(modules) { 
		// modules为传入的数组，长度为26
/******/ 	// 存储已安装的模块
/******/ 	var installedModules = {};
/******/
/******/ 	// 通过模块Id请求模块函数
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// 如果模块已经注册过，则直接从缓存对象中获取
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// 创建一个新的模块 (并且加入缓存对象中)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// 执行模块方法
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// 标志模块已经载入...
/******/ 		module.loaded = true;
/******/
/******/ 		// 返回模块导出的对象 (modules中的fn执行的返回结果)
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// 暴露模块对象
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// 暴露模块缓存对象
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// 暴露公共路径
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// 加载入口模块和返回导出 最终导出的是module.exports这个对象
/******/ 	return __webpack_require__(0);
/******/ })([
/* 0 入口函数 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ }),
/* 1 axios */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var bind = __webpack_require__(3);
	var Axios = __webpack_require__(4);
	var mergeConfig = __webpack_require__(22);
	var defaults = __webpack_require__(10);
	
	/**
	 * 创建Axios实例
	 *
	 * @param {Object} defaultConfig 实例的默认配置
	 * @return {Axios} Axios的新实例
	 */
	function createInstance(defaultConfig) {
		var context = new Axios(defaultConfig);
		/* 程序员调用的axios.request(config) */ 
	  var instance = bind(Axios.prototype.request, context);
	
		// 复制axios的原型到实例上
	  utils.extend(instance, Axios.prototype, context);
	
	  // 将上下文复制到实例
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	//创建要导出的默认实例
	var axios = createInstance(defaults);
	
	// 公开Axios类以允许类继承
	axios.Axios = Axios;
	
	/* 程序员调用的axios.create() */
	axios.create = function create(instanceConfig) {
	  return createInstance(mergeConfig(axios.defaults, instanceConfig));
	};
	
	// 公开取消令牌
	axios.Cancel = __webpack_require__(23);
	axios.CancelToken = __webpack_require__(24);
	axios.isCancel = __webpack_require__(9);
	
	// 全部暴露/扩散
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(25);
	
	module.exports = axios;
	
	// 允许在TypeScript中使用默认导入语法
	module.exports.default = axios;


/***/ }),
/* 2 utils：工具方法 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(3);
	
	var toString = Object.prototype.toString;
	
	/**
	 * 确定值是否为数组
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是数组，则为True，否则为false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * 确定某个值是否未定义
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值未定义，则为True，否则为false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * 确定值是否为Buffer
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是Buffer，则为True，否则为false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
	    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
	}
	
	/**
	 * 确定值是否为ArrayBuffer
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是ArrayBuffer，则为True，否则为false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * 确定值是否为FormData
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是FormData，则为True，否则为false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * 确定值是否是ArrayBuffer
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是ArrayBuffer，则为True，否则为false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * 确定值是否为字符串
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是字符串，则为True，否则为false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * 确定值是否为数字
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是数字，则为True，否则为false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * 判断一个值是否为对象（排除掉null）
	 *
	 * @param {Object} val 要检验的值
	 * @returns {boolean} 如果值是对象，则为True，否则为false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * 确定值是否为日期
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是日期，则为True，否则为false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * 确定值是否为文件
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是文件，则为True，否则为false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * 确定值是否为Blob
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是Blob，则为True，否则为false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * 确定值是否为函数
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是函数，则为True，否则为false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * 确定值是否为流
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是流，则为True，否则为false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * 确定值是否为URLSearchParams对象
	 *
	 * @param {Object} val 要测试的值
	 * @returns {boolean} 如果值是URLSearchParams对象，则为True，否则为false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * 删除字符串开头和结尾的多余空格
	 *
	 * @param {String} str 要修剪的字符串
	 * @returns {String} 没有多余空格的字符串
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * 确定我们是否在标准浏览器环境中运行
	 *
	 * 这允许axios在web worker中运行，并以本机方式响应。
	 * 这两种环境都支持XMLHttpRequest，但不是完全标准的全局变量。
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
	                                           navigator.product === 'NativeScript' ||
	                                           navigator.product === 'NS')) {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}
	
	/**
	 * 迭代数组或对象，为每个项调用函数。
	 *
	 * 如果“obj”是数组，则调用回调函数传递每个项的值、索引和完整数组。
	 *
	 * 如果“obj”是一个对象，则调用回调函数来传递每个属性的值、键和完整对象。
	 *
	 * @param {Object|Array} obj 要迭代的对象
	 * @param {Function} fn 为每个项调用的回调
	 */
	function forEach(obj, fn) {
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // 强制转成一个数组 如果传入的obj不是一个可迭代的对象
	  if (typeof obj !== 'object') {
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // 迭代数组值
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // 迭代对象键
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * 合并对象
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * 函数等于merge，区别在于不保留对原始对象的引用。
	 *
	 * @see merge
	 * @param {Object} obj1 要合并的对象
	 * @returns {Object} 所有合并属性的结果
	 */
	function deepMerge(/* obj1, obj2, obj3, ... */) {
		var result = {};
		// 闭包函数 所有的值将会存进result对象中
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
				// result已存在的属性为对象，将要合并的值也为对象，则再次深度合并
	      result[key] = deepMerge(result[key], val);
	    } else if (typeof val === 'object') {
				// result添加一个新的属性，值为深度合并后的对象
	      result[key] = deepMerge({}, val);
	    } else {
	      result[key] = val;
	    }
	  }
		
		// 遍历arguments，执行assignValue函数
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * 通过可变地添加对象b的属性来扩展对象a。
	 *
	 * @param {Object} a 要扩展的对象
	 * @param {Object} b 要从中复制属性的对象
	 * @param {Object} thisArg 要将函数绑定到的对象
	 * @return {Object} 对象a的结果值
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  deepMerge: deepMerge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 3 bind */
/***/ (function(module, exports) {

	'use strict';
	// 自定义bind函数，fn执行时传入至少两个参数，第一个参数为fn，后续参数逐一展开
	// 原生的bind函数，只是改变this指向
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 4 Axios */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var buildURL = __webpack_require__(5);
	var InterceptorManager = __webpack_require__(6);
	var dispatchRequest = __webpack_require__(7);
	var mergeConfig = __webpack_require__(22);
	
	/**
	 * Axios构造函数
	 *
	 * @param {Object} instanceConfig 实例的默认配置
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(), // 请求前拦截器
	    response: new InterceptorManager() // 返回结果前拦截器
	  };
	}
	
	/**
	 * 发送请求
	 * @param {Object} config 此请求的特定配置(merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  if (typeof config === 'string') {
			// eg: axios.request("localhost://xxx")
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }
		
		// 合并默认config和程序员传递的config
	  config = mergeConfig(this.defaults, config);
	
	  // 设置config的method，转换为小写
	  if (config.method) {
	    config.method = config.method.toLowerCase();
	  } else if (this.defaults.method) {
	    config.method = this.defaults.method.toLowerCase();
	  } else {
			// 默认为get请求
	    config.method = 'get';
	  }
	
	  // 连接拦截器中间件
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
		
		// 添加请求前拦截
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
		// 接收结果前拦截
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
		
		// dispatchReuest发送请求永远会在数组的中间
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	Axios.prototype.getUri = function getUri(config) {
	  config = mergeConfig(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	};
	
	// 为支持的请求方法提供别名 内部实现都是调用Axios.prototype.request方法
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ }),
/* 5 buildURL：构建xhr URL （也即：拼接?后面的参数）*/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	// encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * 通过在末尾附加参数来构建URL
	 *
	 * @param {string} url 基础url (e.g., http://www.google.com)
	 * @param {object} [params] 要附加的参数
	 * @returns {string} 格式化的url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
			// 自定义params转换函数（序列化程序）
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
			// 将params转成字符串
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
						// params: { key: ['', '']} 数组中的每一项为日期类型
						// 使用 ISO 标准返回 Date 对象的字符串格式:
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
						// 为对象类型，则转为json字符串
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    var hashmarkIndex = url.indexOf('#');
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }
	
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ }),
/* 6 InterceptorManager：拦截器 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * 向堆栈添加一个新的拦截器
	 *
	 * @param {Function} fulfilled 处理“then”for a“Promise”的函数`
	 * @param {Function} rejected 为一个承诺处理“拒绝”的函数`
	 *
	 * @return {Number} 用于稍后删除拦截器的ID
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1; // 返回数组的索引，便于移除
	};
	
	/**
	 * 从堆栈中移除拦截器
	 *
	 * @param {Number} id 使用返回的ID
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * 迭代所有注册的拦截器
	 *
	 * 此方法对于跳过任何可能已变为“null”并调用“eject”的侦听器特别有用。
	 *
	 * @param {Function} fn 为每个拦截器调用的函数
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ }),
/* 7 dispatchRequest：发送请求 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var transformData = __webpack_require__(8);
	var isCancel = __webpack_require__(9);
	var defaults = __webpack_require__(10);
	
	/**
	 * 如果已请求取消，则抛出“Cancel”。
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * 使用配置的适配器向服务器发送请求。
	 *
	 * @param {object} config 要用于请求的配置
	 * @returns {Promise} 返回done的promise对象
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // 确保请求头存在
	  config.headers = config.headers || {};
	
	  // 转换请求数据 
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // 扁平化请求头的参数
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers
	  );
		
		// 移除请求头的'delete', 'get', 'head', 'post', 'put', 'patch', 'common'
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // 转换响应数据
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // 转换响应数据
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 8 transformData：转换data */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	/**
	 * 转换请求或响应的数据
	 *
	 * @param {Object|String} data 要转换的数据
	 * @param {Array} headers 请求或响应的标头
	 * @param {Array|Function} fns 单个函数或函数数组 如果为函数数组，则数组中的最后一项转换后的数据将为最后返回的数据
	 * @returns {*} 转换后的数据
	 */
	module.exports = function transformData(data, headers, fns) {
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ }),
/* 9 isCancel */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 10 defaultConfig */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var normalizeHeaderName = __webpack_require__(11);
	
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	

	// 重新设置contentType
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	// 获取默认的适配器
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // 对于浏览器，使用XHR适配器
	    adapter = __webpack_require__(12);
	  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
	    // 对于node使用HTTP适配器
	    adapter = __webpack_require__(12);
	  }
	  return adapter;
	}
	
	// 创建axios的默认参数
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Accept'); // 转换Accept
			normalizeHeaderName(headers, 'Content-Type'); // 转换Content-Type
			// 上传文件Content-Type为multipart/form-data
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
				// 默认格式，当没有在信息头指定Content-Type的时候，默认使用这种格式传参
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
				// 参数为json格式 
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  /**
	   * 中止请求的超时（毫秒）。如果设置为0（默认值），则不会创建超时。
	   */
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
		// 验证状态 http请求的状态码
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;


/***/ }),
/* 11 normalizeHeaderName：格式化请求头的name*/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 12 adapter：适配器 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var settle = __webpack_require__(13);
	var buildURL = __webpack_require__(5);
	var buildFullPath = __webpack_require__(16);
	var parseHeaders = __webpack_require__(19);
	var isURLSameOrigin = __webpack_require__(20);
	var createError = __webpack_require__(14);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
			// 如果data为FormData类型，Content-Type默认为multipart/form-data
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // 让浏览器设置它
	    }
	
	    var request = new XMLHttpRequest();
	
			// HTTP基本身份验证
			// 推荐阅读：https://blog.csdn.net/JENREY/article/details/86521391
	    if (config.auth) {
	      var username = config.auth.username || '';
				var password = config.auth.password || '';
				// btoa() 方法用于创建一个 base-64 编码的字符串。
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
			
			// 完整的url
			var fullPath = buildFullPath(config.baseURL, config.url);
			// xhr open方法：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open
	    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
	
	    // 以毫秒为单位设置请求超时
	    request.timeout = config.timeout;
	
	    // 监听就绪状态
	    request.onreadystatechange = function handleLoad() {
				// 0: 请求未初始化
				// 1: 服务器连接已建立
				// 2: 请求已接收
				// 3: 请求处理中
				// 4: 请求已完成，且响应已就绪
	      if (!request || request.readyState !== 4) {
	        return;
	      }
	
	      // 请求出错，我们没有得到响应，这将由onerror处理，只有一个例外：请求使用file:protocol，大多数浏览器将返回状态为0，即使它是一个成功的请求
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // 准备回应 getAllResponseHeaders获取到页面的Response Headers数据
				var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
				// 如果不设置responseType或者responseType等于text，则responseData为responseText
				var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
				// response数据
	      var response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // 清理请求
	      request = null;
	    };
	
			// 处理浏览器请求取消（与手动取消相反）
			// 当一个请求终止时 abort 事件被触发，比如程序执行 XMLHttpRequest.abort()。
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }
	
	      reject(createError('Request aborted', config, 'ECONNABORTED', request));
	
	      // 清理请求
	      request = null;
	    };
	
	    // 处理低级网络错误
	    request.onerror = function handleError() {
	      // 浏览器对我们隐藏了真正的错误，只有当它是网络错误时才会触发错误
	      reject(createError('Network Error', config, null, request));
	
	      // 清理请求
	      request = null;
	    };
	
	    // 超时 当进度由于预定时间到期而终止时，会触发timeout 事件。
	    request.ontimeout = function handleTimeout() {
	      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
	      if (config.timeoutErrorMessage) {
	        timeoutErrorMessage = config.timeoutErrorMessage;
	      }
	      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
	        request));
	
	      // 清理请求
	      request = null;
	    };
	
	    // 添加xsrf标头
	    // 只有在标准浏览器环境中运行时，才能执行此操作。
	    // 特别是如果我们是一个网络工作者，或反应原生。
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(21);
	
	      // 添加xsrf标头
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // 使用setRequestHeader来添加config中的headers
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // 如果数据未定义，则删除内容类型
	          delete requestHeaders[key];
	        } else {
	          // 否则，请将标头添加到请求中
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // 如果需要，添加withCredentials以请求  credentials资格证书：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials
	    if (!utils.isUndefined(config.withCredentials)) {
	      request.withCredentials = !!config.withCredentials;
	    }
	
	    // 将responseType添加到请求
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // 与XMLHttpRequest Level 2不兼容的浏览器引发了预期的DOMException。
	        // 但是，对于“json”类型，这可以被禁止，因为默认的“transformResponse”函数可以解析它。
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // 必要时处理进度 progress事件会在请求接收到数据的时候被周期性触发。
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // 并非所有浏览器都支持上载事件 用来表示上传的进度。
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // 处理取消
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // 清理请求
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // 发送请求
	    request.send(requestData);
	  });
	};


/***/ }),
/* 13 settle：结束请求*/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(14);
	
	/**
	 * 基于响应状态解决或拒绝承诺。
	 *
	 * @param {Function} resolve resolve
	 * @param {Function} reject reject
	 * @param {object} response 返回值
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  if (!validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 14 createError */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(15);
	
	/**
	 * 使用指定的消息、配置、错误代码、请求和响应创建错误。
	 *
	 * @param {string} message 错误消息。
	 * @param {Object} config 配置。
	 * @param {string} [code] 错误代码（例如，“ECONNABORTED”）。
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 15 enhanceError */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	
	  error.request = request;
	  error.response = response;
	  error.isAxiosError = true;
	
	  error.toJSON = function() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: this.config,
	      code: this.code
	    };
	  };
	  return error;
	};


/***/ }),
/* 16 buildFullPath：获取完整的url */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var isAbsoluteURL = __webpack_require__(17);
	var combineURLs = __webpack_require__(18);
	
	/**
	 * 通过将baseURL与requestedURL相结合来创建新的URL，
	 * 仅当requestedURL不是绝对URL时。
	 * 如果requestURL是绝对的，则此函数返回requestedURL。
	 *
	 * @param {string} baseURL 基础URL
	 * @param {string} requestedURL 要合并的绝对或相对URL
	 * @returns {string} 合并的完整路径
	 */
	module.exports = function buildFullPath(baseURL, requestedURL) {
	  if (baseURL && !isAbsoluteURL(requestedURL)) {
	    return combineURLs(baseURL, requestedURL);
	  }
	  return requestedURL;
	};


/***/ }),
/* 17 isAbsoluteURL：判断url是否为绝对url*/
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 确定指定的URL是否为绝对URL
	 *
	 * @param {string} url 要测试的URL
	 * @returns {boolean} 如果指定的URL是绝对的，则为True，否则为false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // 如果URL以“<scheme>：//”或“//”（协议相对URL）开头，则认为它是绝对的。
	  // rfc3986将scheme名称定义为以字母开头并后跟的字符序列
	  // 通过字母、数字、加号、句点或连字符的任意组合。
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 18 combineURLs：将baseURL和请求URL合并*/
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 通过组合指定的URL创建新的URL
	 *
	 * @param {string} baseURL 基础url
	 * @param {string} relativeURL 相对URL
	 * @returns {string} 组合URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 19 parseHeaders */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	// node 将忽略其重复项的标头
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];
	
	/**
	 * 将头解析为对象
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 * @param {String} headers 需要解析的标头
	 * @returns {Object} 解析为对象的标头
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') { // set-cookie为一个数组
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val; // 如果有相同的key，则添加, 隔开
	      }
	    }
	  });
	
	  return parsed;
	};


/***/ }),
/* 20 isURLSameOrigin：判断url是否同源*/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // 标准浏览器env完全支持测试请求URL是否与当前位置相同所需的api。
	    (function standardBrowserEnv() {
	      var msie = /(msie|trident)/i.test(navigator.userAgent);
	      var urlParsingNode = document.createElement('a');
	      var originURL;
	
	      /**
				* 	解析URL以发现其组件
				*
				* @param {String} url 要分析的URL
				* @returns {Object}
				*/
	      function resolveURL(url) {
	        var href = url;
	
	        if (msie) {
	        	// 要解析的URL需要属性设置两次才能规范化属性
	          urlParsingNode.setAttribute('href', href);
	          href = urlParsingNode.href;
	        }
	
	        urlParsingNode.setAttribute('href', href);
	
	        // urlParsingNode提供UrlUtils接口 - http://url.spec.whatwg.org/#urlutils
	        return {
	          href: urlParsingNode.href,
	          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	          host: urlParsingNode.host,
	          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	          hostname: urlParsingNode.hostname,
	          port: urlParsingNode.port,
	          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	            urlParsingNode.pathname :
	            '/' + urlParsingNode.pathname
	        };
	      }
	
	      originURL = resolveURL(window.location.href);
	
	      /**
				* 确定URL是否与当前位置共享相同的源
				*
				* @param {String} requestURL 要测试的URL
				* @returns {boolean} 如果URL共享同一来源，则为True，否则为false
				*/
	      return function isURLSameOrigin(requestURL) {
	        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	        return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	      };
	    })() :
	
	  // 非标准浏览器环境（webworkers，react native）缺少所需的支持。
	    (function nonStandardBrowserEnv() {
	      return function isURLSameOrigin() {
	        return true;
	      };
	    })()
	);


/***/ }),
/* 21 cookies： 读、写、移除*/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  	// 标准浏览器环境支持文档.cookie
	    (function standardBrowserEnv() {
	      return {
	        write: function write(name, value, expires, path, domain, secure) {
	          var cookie = [];
	          cookie.push(name + '=' + encodeURIComponent(value));
	
	          if (utils.isNumber(expires)) {
	            cookie.push('expires=' + new Date(expires).toGMTString());
	          }
	
	          if (utils.isString(path)) {
	            cookie.push('path=' + path);
	          }
	
	          if (utils.isString(domain)) {
	            cookie.push('domain=' + domain);
	          }
	
	          if (secure === true) {
	            cookie.push('secure');
	          }
	
	          document.cookie = cookie.join('; ');
	        },
	
	        read: function read(name) {
						// eg: BAIDUID=sfs; XSRF-TOKEN="123"; 匹配：match[3] = XSRF-TOKEN
	          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	          return (match ? decodeURIComponent(match[3]) : null);
	        },
	
	        remove: function remove(name) {
	          this.write(name, '', Date.now() - 86400000);
	        }
	      };
	    })() :
	
	  	//非标准浏览器env（webworkers，react native）缺少所需的支持。
	    (function nonStandardBrowserEnv() {
	      return {
	        write: function write() {},
	        read: function read() { return null; },
	        remove: function remove() {}
	      };
	    })()
	);


/***/ }),
/* 22 mergeConfig：合并config */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	/**
	 * 配置特定的合并函数，用于创建新的配置对象
	 * 将两个配置对象合并在一起。
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} 将config2合并到config1后生成的新对象
	 */
	module.exports = function mergeConfig(config1, config2) {
	  config2 = config2 || {};
	  var config = {}; // 一个全新的config
	
	  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
	  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
	  var defaultToConfig2Keys = [
	    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
	    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
	    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
	    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
	    'httpsAgent', 'cancelToken', 'socketPath'
	  ];
	
	  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
	    if (typeof config2[prop] !== 'undefined') {
				// 如果config2中含有'url', 'method', 'params', 'data'属性，直接添加到config中
	      config[prop] = config2[prop];
	    }
	  });
		
		// 优先判断config2
	  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
	    if (utils.isObject(config2[prop])) { // 如果config2传入的'headers', 'auth', 'proxy'属性为一个对象，则深度合并每一个属性
	      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
	    } else if (typeof config2[prop] !== 'undefined') {
	      config[prop] = config2[prop];
	    } else if (utils.isObject(config1[prop])) { // 如果config1传入的'headers', 'auth', 'proxy'属性为一个对象，则深度合并每一个属性
	      config[prop] = utils.deepMerge(config1[prop]);
	    } else if (typeof config1[prop] !== 'undefined') {
	      config[prop] = config1[prop];
	    }
	  });
	
		// 优先判断config2
	  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
	    if (typeof config2[prop] !== 'undefined') {
	      config[prop] = config2[prop];
	    } else if (typeof config1[prop] !== 'undefined') {
	      config[prop] = config1[prop];
	    }
	  });
	
		// axiosKeys为3个数组的结合体
	  var axiosKeys = valueFromConfig2Keys
	    .concat(mergeDeepPropertiesKeys)
	    .concat(defaultToConfig2Keys);
		
		// config2传递的额外参数
	  var otherKeys = Object
	    .keys(config2)
	    .filter(function filterAxiosKeys(key) {
	      return axiosKeys.indexOf(key) === -1;
	    });
	
		// 将config2传递的额外参数添加到config中，优先判断config2
	  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
	    if (typeof config2[prop] !== 'undefined') {
	      config[prop] = config2[prop];
	    } else if (typeof config1[prop] !== 'undefined') {
	      config[prop] = config1[prop];
	    }
	  });
	
	  return config;
	};


/***/ }),
/* 23 Cancel：取消*/
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * “Cancel”是取消操作时引发的对象。
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ }),
/* 24 CancelToken */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(23);
	
	/**
	 * “CancelToken”是可用于请求取消操作的对象。
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // 已请求取消
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * 如果已请求取消，则抛出“Cancel”。
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * 返回一个对象，该对象包含一个新的“CancelToken”和一个在调用时取消“CancelToken”的函数。
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
			cancel: cancel 
			// cancel()执行时，取消请求；配合
			// config.cancelToken.promise.then(function onCanceled(cancel) {
			// 	if (!request) {
			// 		return;
			// 	}

			// 	request.abort();
			// 	reject(cancel);
			// 	// 清理请求
			// 	request = null;
			// });
			// 使用。
			// config.cancelToken.promise.then会在cancel()执行时，触发resolvePromise Promise.resolve函数后，再执行
			// 所以，cancel()不执行时，不会取消请求
	  };
	};
	
	module.exports = CancelToken;


/***/ }),
/* 25 spread */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 用于调用函数和扩展参数数组的语法糖。
	 *
	 * 常见的用例是`函数.原型.应用`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ })
/******/ ])
});