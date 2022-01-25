import React from 'react';
import { View } from 'react-native';
import YamlConverter from 'js-yaml';
import YamlToJsxCompilerV1 from './YamlToJsxCompilerV1';
var customElements = {};
function RenderYaml(_a) {
    var yamlText = _a.yamlText, VersionNotSupported = _a.versionNotSupported;
    if (!yamlText) {
        return <View />;
    }
    var data = YamlConverter.load(yamlText);
    if (!data.version || !data.root) {
        return <View />;
    }
    switch (data.version) {
        case 'v1':
            return <YamlToJsxCompilerV1 data={data.root} customElements={customElements}/>;
        default:
            return VersionNotSupported ? VersionNotSupported : <View />;
    }
}
export function setCustomElements(elements) {
    customElements = elements;
}
export default RenderYaml;
