webpackJsonp([5],{

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by heben on 2016/8/17.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Test = function (_Component) {
	    _inherits(Test, _Component);

	    function Test() {
	        _classCallCheck(this, Test);

	        return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
	    }

	    _createClass(Test, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h3',
	                    null,
	                    'test'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/test/test1' },
	                        'test1'
	                    ),
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/test/test2' },
	                        'test2'
	                    )
	                ),
	                _react2.default.createElement('br', null),
	                this.props.children
	            );
	        }
	    }]);

	    return Test;
	}(_react.Component);

	module.exports = Test;

/***/ }

});