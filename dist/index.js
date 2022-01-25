import React from 'react';
import { View } from 'react-native';
import YamlConverter from 'js-yaml';
import { ErrorBoundary } from 'react-error-boundary';
import DataToJsxCompilerV1 from './DataToJsxCompilerV1';
var customElements = {};
function RenderLayout(_a) {
    var yamlText = _a.yamlText, jsonText = _a.jsonText, versionNotSupported = _a.versionNotSupported, onErrorRender = _a.onErrorRender;
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
                return (<ErrorBoundary FallbackComponent={function (_a) {
                    var error = _a.error;
                    return (onErrorRender ? onErrorRender(error) : <View />);
                }}>
                        <DataToJsxCompilerV1 data={data.root} customElements={customElements}/>
                    </ErrorBoundary>);
            default:
                return versionNotSupported ? versionNotSupported(data.version) : <View />;
        }
    }
    catch (error) {
        return onErrorRender ? onErrorRender(error) : <View />;
    }
}
export function setCustomElements(elements) {
    customElements = elements;
}
export default RenderLayout;
