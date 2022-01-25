import React from 'react';
import { View } from 'react-native';
import YamlConverter from 'js-yaml';

import DataToJsxCompilerV1, { IUniqueElementDataProps } from './DataToJsxCompilerV1';

export interface IElementRoot {
    version: string;
    root: IUniqueElementDataProps;
}

export type TypeCustomElements = {
    [key: string]: (props: any, children?: JSX.Element[] | string) => JSX.Element;
};

export interface IElementDataProps {
    yamlText?: string;
    jsonText?: string;
    versionNotSupported?: JSX.Element;
    onErrorRender: (error: Error) => JSX.Element;
}

export interface ICustomElementProps {
    props: any;
    children?: JSX.Element[] | string;
}

let customElements: TypeCustomElements = {};

function RenderLayout({ yamlText, jsonText, versionNotSupported: VersionNotSupported, onErrorRender }: IElementDataProps): JSX.Element {
    try {
        if (!yamlText && !jsonText) {
            return <View />;
        }

        let data: IElementRoot | null = null;

        if (yamlText) {
            data = YamlConverter.load(yamlText) as any;
        } else if (jsonText) {
            data = JSON.parse(jsonText);
        }

        if (!data?.version || !data?.root) {
            return <View />;
        }

        switch (data.version) {
            case 'v1':
                return <DataToJsxCompilerV1 data={data.root} customElements={customElements} />;
            default:
                return VersionNotSupported ? VersionNotSupported : <View />;
        }
    } catch (error) {
        return onErrorRender(error);
    }
}

export function setCustomElements(elements: TypeCustomElements) {
    customElements = elements;
}

export default RenderLayout;
