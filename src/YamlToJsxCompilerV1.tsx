import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';

import {TypeCustomElements} from '.';

export interface IUniqueElementYamlProps {
    type: string;
    props: any;
    children?: Array<IUniqueElementYamlProps> | string;
}

export interface IYamlToJsxCompilerV1Props {
    data: IUniqueElementYamlProps;
    customElements?: TypeCustomElements;
}

let customElements: TypeCustomElements = {};

export default function YamlToJsxCompilerV1({
    data,
    customElements: customElementsProp,
}: IYamlToJsxCompilerV1Props): JSX.Element {
    customElements = customElementsProp ?? {};
    return compileComponent(data);
}

function compileComponent(el: IUniqueElementYamlProps, key?: string): JSX.Element {
    const customElement = getCustomElement(el.type);
    if (customElement) {
        return customElement({...(el.props ?? {}), key}, generateChildren(el));
    }

    const elementNative = getReactNativeElement(el.type);
    if (elementNative) {
        return React.createElement(elementNative, {...el.props, key}, generateChildren(el));
    } else {
        let style = el?.props?.style;
        if (!style) {
            style = {};
        }
        style = {...style, backgroundColor: 'red'};
        return <View {...el.props} key={key} style={style} />;
    }
}

function getCustomElement(key: string) {
    const keysCustom = Object.keys(customElements);
    for (const keyCustom of keysCustom) {
        if (keyCustom === key) {
            return customElements[keyCustom];
        }
    }
    return null;
}

function getReactNativeElement(key: string): any {
    switch (key) {
        case 'View':
            return View;
        case 'ScrollView':
            return ScrollView;
        case 'Text':
            return Text;
        case 'Image':
            return Image;
        default:
            return null;
    }
}

function generateChildren(el: IUniqueElementYamlProps) {
    return Array.isArray(el?.children)
        ? el.children?.map((subElement, index) => compileComponent(subElement, String(index)))
        : el?.children;
}
