import React from 'react';
import { View } from 'react-native';
import YamlConverter from 'js-yaml';
import { ErrorBoundary } from 'react-error-boundary';

import DataToJsxCompilerV1, { IUniqueElementDataProps, TypeCustomElements } from './DataToJsxCompilerV1';

export interface IElementRoot {
    version: string;
    root: IUniqueElementDataProps;
}

export interface IElementDataProps {
    yamlText?: string;
    jsonText?: string;
    versionNotSupported?: (version: string) => JSX.Element;
    onErrorRender?: (error: Error) => JSX.Element;
}

export interface ICustomElementProps {
    props: any;
    children?: JSX.Element[] | string;
}

let customElements: TypeCustomElements = {};

function RenderLayout({ yamlText, jsonText, versionNotSupported, onErrorRender }: IElementDataProps): JSX.Element {
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
                return (
                    <ErrorBoundary FallbackComponent={({ error }) => (onErrorRender ? onErrorRender(error) : <View />)}>
                        <DataToJsxCompilerV1 data={data.root} customElements={customElements} />
                    </ErrorBoundary>
                );

            default:
                return versionNotSupported ? versionNotSupported(data.version) : <View />;
        }
    } catch (error) {
        return onErrorRender ? onErrorRender(error) : <View />;
    }
}

export function setCustomElements(elements: TypeCustomElements) {
    customElements = elements;
}

export default RenderLayout;
