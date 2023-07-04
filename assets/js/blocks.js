/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./attributes.js":
/*!***********************!*\
  !*** ./attributes.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\nfunction registerAttributes(settings, name) {\n  var _objectSpread2;\n  if (!_constants__WEBPACK_IMPORTED_MODULE_0__.SUPPORTED_BLOCKS[name]) {\n    return settings;\n  }\n  settings.attributes = _objectSpread(_objectSpread({}, settings.attributes), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, _constants__WEBPACK_IMPORTED_MODULE_0__.OPTIONS_LISTENER_ENABLED, {\n    type: 'boolean',\n    default: false\n  }), _defineProperty(_objectSpread2, _constants__WEBPACK_IMPORTED_MODULE_0__.VALUE_LISTENER_ENABLED, {\n    type: 'boolean',\n    default: false\n  }), _defineProperty(_objectSpread2, _constants__WEBPACK_IMPORTED_MODULE_0__.FIELD_TO_LISTEN, {\n    type: 'string',\n    default: ''\n  }), _defineProperty(_objectSpread2, _constants__WEBPACK_IMPORTED_MODULE_0__.LISTEN_ALL, {\n    type: 'boolean',\n    default: false\n  }), _defineProperty(_objectSpread2, _constants__WEBPACK_IMPORTED_MODULE_0__.CALLBACK, {\n    type: 'string',\n    default: ''\n  }), _objectSpread2));\n  return settings;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registerAttributes);\n\n//# sourceURL=webpack:///./attributes.js?");

/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CALLBACK: () => (/* binding */ CALLBACK),\n/* harmony export */   FIELD_TO_LISTEN: () => (/* binding */ FIELD_TO_LISTEN),\n/* harmony export */   LISTEN_ALL: () => (/* binding */ LISTEN_ALL),\n/* harmony export */   OPTIONS_LISTENER_ENABLED: () => (/* binding */ OPTIONS_LISTENER_ENABLED),\n/* harmony export */   SUPPORTED_BLOCKS: () => (/* binding */ SUPPORTED_BLOCKS),\n/* harmony export */   VALUE_LISTENER_ENABLED: () => (/* binding */ VALUE_LISTENER_ENABLED)\n/* harmony export */ });\nvar OPTIONS_LISTENER_ENABLED = 'jfb_update_fields_options_enabled';\nvar VALUE_LISTENER_ENABLED = 'jfb_update_fields_value_enabled';\nvar FIELD_TO_LISTEN = 'jfb_update_fields_field_to_listen';\nvar CALLBACK = 'jfb_update_fields_callback';\nvar LISTEN_ALL = 'jfb_update_fields_listen_all';\nvar SUPPORTED_BLOCKS = {\n  'jet-forms/select-field': 'options',\n  'jet-forms/radio-field': 'options',\n  'jet-forms/checkbox-field': 'options',\n  'jet-forms/text-field': 'value',\n  'jet-forms/textarea-field': 'value',\n  'jet-forms/hidden-field': 'value'\n};\n\n\n//# sourceURL=webpack:///./constants.js?");

/***/ }),

/***/ "./controls.js":
/*!*********************!*\
  !*** ./controls.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\n\nvar addFilter = wp.hooks.addFilter;\nvar createHigherOrderComponent = wp.compose.createHigherOrderComponent;\nvar InspectorControls = wp.blockEditor.InspectorControls;\nvar _wp$components = wp.components,\n  TextControl = _wp$components.TextControl,\n  ToggleControl = _wp$components.ToggleControl,\n  Panel = _wp$components.Panel,\n  PanelRow = _wp$components.PanelRow,\n  PanelBody = _wp$components.PanelBody;\nvar addControls = createHigherOrderComponent(function (BlockEdit) {\n  return function (props) {\n    var blockName = props.name,\n      supportType = _constants__WEBPACK_IMPORTED_MODULE_0__.SUPPORTED_BLOCKS[blockName] || false;\n    if (!supportType) {\n      return wp.element.createElement(BlockEdit, props);\n    }\n    var attributes = props.attributes,\n      setAttributes = props.setAttributes,\n      isSelected = props.isSelected;\n    return wp.element.createElement(React.Fragment, null, wp.element.createElement(BlockEdit, props), isSelected && wp.element.createElement(InspectorControls, null, wp.element.createElement(Panel, null, wp.element.createElement(PanelBody, {\n      title: \"Field updater\",\n      initialOpen: false\n    }, supportType === 'options' && wp.element.createElement(PanelRow, null, wp.element.createElement(ToggleControl, {\n      label: \"Enable options updater\",\n      help: attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.OPTIONS_LISTENER_ENABLED] ? 'Enabled.' : 'Disabled.',\n      checked: attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.OPTIONS_LISTENER_ENABLED],\n      onChange: function onChange() {\n        setAttributes(_defineProperty({}, _constants__WEBPACK_IMPORTED_MODULE_0__.OPTIONS_LISTENER_ENABLED, !attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.OPTIONS_LISTENER_ENABLED]));\n      }\n    })), supportType === 'value' && wp.element.createElement(PanelRow, null, wp.element.createElement(ToggleControl, {\n      label: \"Enable value updater\",\n      help: attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.VALUE_LISTENER_ENABLED] ? 'Enabled.' : 'Disabled.',\n      checked: attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.VALUE_LISTENER_ENABLED],\n      onChange: function onChange() {\n        setAttributes(_defineProperty({}, _constants__WEBPACK_IMPORTED_MODULE_0__.VALUE_LISTENER_ENABLED, !attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.VALUE_LISTENER_ENABLED]));\n      }\n    })), (attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.OPTIONS_LISTENER_ENABLED] || attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.VALUE_LISTENER_ENABLED]) && wp.element.createElement(PanelRow, null, wp.element.createElement(TextControl, {\n      label: \"Fields to listen\",\n      help: 'comma-separated',\n      value: attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.FIELD_TO_LISTEN],\n      onChange: function onChange(newValue) {\n        setAttributes(_defineProperty({}, _constants__WEBPACK_IMPORTED_MODULE_0__.FIELD_TO_LISTEN, newValue));\n      }\n    })), (attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.OPTIONS_LISTENER_ENABLED] || attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.VALUE_LISTENER_ENABLED]) && wp.element.createElement(PanelRow, null, wp.element.createElement(ToggleControl, {\n      label: \"Listen all\",\n      help: attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.LISTEN_ALL] ? 'Yes.' : 'No.',\n      checked: attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.LISTEN_ALL],\n      onChange: function onChange() {\n        setAttributes(_defineProperty({}, _constants__WEBPACK_IMPORTED_MODULE_0__.LISTEN_ALL, !attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.LISTEN_ALL]));\n      }\n    })), supportType === 'value' && attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.VALUE_LISTENER_ENABLED] && wp.element.createElement(PanelRow, null, wp.element.createElement(TextControl, {\n      label: \"Callback or query parameters\",\n      value: attributes[_constants__WEBPACK_IMPORTED_MODULE_0__.CALLBACK],\n      help: 'Callback which parameters are $item_id (value of the field that is being listened to), $field_name (this field name), $form_id (this form ID). Alternatively JetEngine query_id|property to get a specified propery from the first object from query.',\n      onChange: function onChange(newValue) {\n        setAttributes(_defineProperty({}, _constants__WEBPACK_IMPORTED_MODULE_0__.CALLBACK, newValue));\n      }\n    }))))));\n  };\n}, 'addControls');\naddFilter('editor.BlockEdit', 'jet-form-builder/update-fields', addControls);\n\n//# sourceURL=webpack:///./controls.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributes */ \"./attributes.js\");\n/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls */ \"./controls.js\");\n\n\nvar addFilter = wp.hooks.addFilter;\naddFilter('blocks.registerBlockType', 'jet-form-builder/switch-page-on-change-support', _attributes__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./main.js?");

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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;