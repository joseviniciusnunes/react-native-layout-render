import React from 'react';
import { View } from 'react-native';
import YamlConverter from 'js-yaml';
import DataToJsxCompilerV1 from './DataToJsxCompilerV1';
var customElements = {};
function RenderLayout(_a) {
    var yamlText = _a.yamlText, jsonText = _a.jsonText, VersionNotSupported = _a.versionNotSupported, onErrorRender = _a.onErrorRender;
    try {
        if (!yamlText && !jsonText) {
            return <View />;
        }
        var data = null;
        if (yamlText) {
            data = YamlConverter.load(yamlText);
        }
        else if (jsonText) {
            data = JSON.parse(jsonText);
        }
        if (!(data === null || data === void 0 ? void 0 : data.version) || !(data === null || data === void 0 ? void 0 : data.root)) {
            return <View />;
        }
        switch (data.version) {
            case 'v1':
                return <DataToJsxCompilerV1 data={data.root} customElements={customElements}/>;
            default:
                return VersionNotSupported ? VersionNotSupported : <View />;
        }
    }
    catch (error) {
        return onErrorRender(error);
    }
}
export function setCustomElements(elements) {
    customElements = elements;
}
export default RenderLayout;
