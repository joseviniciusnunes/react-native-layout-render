var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import ReactNativeAll from 'react-native';
var customElements = {};
function DataToJsxCompilerV1(_a) {
    var data = _a.data, customElementsProp = _a.customElements;
    customElements = customElementsProp !== null && customElementsProp !== void 0 ? customElementsProp : {};
    return compileComponent(data, undefined);
}
function compileComponent(el, key) {
    var _a;
    var customElement = getCustomElement(el === null || el === void 0 ? void 0 : el.type);
    if (customElement) {
        return customElement(__assign(__assign({}, ((_a = el === null || el === void 0 ? void 0 : el.props) !== null && _a !== void 0 ? _a : {})), { key: key }), generateChildren(el));
    }
    var elementNative = getReactNativeElement(el === null || el === void 0 ? void 0 : el.type);
    return React.createElement(elementNative, __assign(__assign({}, el === null || el === void 0 ? void 0 : el.props), { key: key }), generateChildren(el));
}
function getCustomElement(key) {
    var keysCustom = Object.keys(customElements);
    for (var _i = 0, keysCustom_1 = keysCustom; _i < keysCustom_1.length; _i++) {
        var keyCustom = keysCustom_1[_i];
        if (keyCustom === key) {
            return customElements[keyCustom];
        }
    }
    return null;
}
function getReactNativeElement(key) {
    var element = ReactNativeAll[key];
    if (!element) {
        throw new Error("Element \"" + key + "\" not exists in react-native or custom element");
    }
    return element;
}
function generateChildren(el) {
    var _a;
    return Array.isArray(el === null || el === void 0 ? void 0 : el.children) ? (_a = el.children) === null || _a === void 0 ? void 0 : _a.map(function (subElement, index) { return compileComponent(subElement, String(index)); }) : el === null || el === void 0 ? void 0 : el.children;
}
export default DataToJsxCompilerV1;
