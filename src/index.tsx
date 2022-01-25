import React from 'react';
import {View} from 'react-native';
import YamlConverter from 'js-yaml';

import YamlToJsxCompilerV1, {IUniqueElementYamlProps} from './YamlToJsxCompilerV1';

export interface IElementRoot {
    version: string;
    root: IUniqueElementYamlProps;
}

export type TypeCustomElements = {
    [key: string]: (props: any, children?: JSX.Element[] | string) => JSX.Element;
};

export interface IElementYamlProps {
    yamlText: string;
    versionNotSupported?: JSX.Element;
    onErrorRender: (error: Error) => JSX.Element;
}

export interface ICustomElementProps {
    props: any;
    children?: JSX.Element[] | string;
}

let customElements: TypeCustomElements = {};

function RenderYaml({
    yamlText,
    versionNotSupported: VersionNotSupported,
}: IElementYamlProps): JSX.Element {
    if (!yamlText) {
        return <View />;
    }

    const data: IElementRoot = YamlConverter.load(yamlText) as any;

    if (!data.version || !data.root) {
        return <View />;
    }
    switch (data.version) {
        case 'v1':
            return <YamlToJsxCompilerV1 data={data.root} customElements={customElements} />;
        default:
            return VersionNotSupported ? VersionNotSupported : <View />;
    }
}

export function setCustomElements(elements: TypeCustomElements) {
    customElements = elements;
}

export default RenderYaml;
