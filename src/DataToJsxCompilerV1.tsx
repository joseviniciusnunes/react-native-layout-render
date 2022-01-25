import React from 'react';
import ReactNativeAll from 'react-native';
import { View, Text, ScrollView, Image } from 'react-native';

import { TypeCustomElements } from '.';

export interface IUniqueElementDataProps {
    type: string;
    props: any;
    children?: Array<IUniqueElementDataProps> | string;
}

export interface IDataToJsxCompilerV1Props {
    data: IUniqueElementDataProps;
    customElements?: TypeCustomElements;
}

let customElements: TypeCustomElements = {};

function DataToJsxCompilerV1({ data, customElements: customElementsProp }: IDataToJsxCompilerV1Props): JSX.Element {
    customElements = customElementsProp ?? {};
    return compileComponent(data);
}

function compileComponent(el: IUniqueElementDataProps, key?: string): JSX.Element {
    const customElement = getCustomElement(el.type);
    if (customElement) {
        return customElement({ ...(el.props ?? {}), key }, generateChildren(el));
    }

    const elementNative = getReactNativeElement(el.type);
    if (elementNative) {
        return React.createElement(elementNative, { ...el.props, key }, generateChildren(el));
    } else {
        let style = el?.props?.style;
        if (!style) {
            style = {};
        }
        style = { ...style, backgroundColor: 'red' };
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
    const element = ReactNativeAll[key];
    console.log('element', element);
    if (!element) {
        throw new Error(`Element "${key}" not exists in react-native`);
    }
    return element;
}

function generateChildren(el: IUniqueElementDataProps) {
    return Array.isArray(el?.children) ? el.children?.map((subElement, index) => compileComponent(subElement, String(index))) : el?.children;
}

export default DataToJsxCompilerV1;
