webpackJsonp([2],{

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by heben on 2016/8/17.
	 */

	module.exports = {
	    path: 'test1',
	    getComponent: function getComponent(nextState, cb) {
	        __webpack_require__.e/* nsure */(3, function (require) {
	            cb(null, __webpack_require__(6));
	        });
	    }
	};

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by heben on 2016/8/17.
	 */

	module.exports = {
	    path: 'test2',
	    getComponent: function getComponent(nextState, cb) {
	        __webpack_require__.e/* nsure */(4, function (require) {
	            cb(null, __webpack_require__(8));
	        });
	    }
	};

/***/ }

});