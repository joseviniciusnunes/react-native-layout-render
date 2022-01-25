import React from 'react';
import ReactNativeAll from 'react-native';

export type TypeCustomElements = {
    [key: string]: (props: any, children?: JSX.Element[] | string) => JSX.Element;
};

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
    return compileComponent(data, undefined);
}

function compileComponent(el: IUniqueElementDataProps, key?: string): JSX.Element {
    const customElement = getCustomElement(el?.type);
    if (customElement) {
        return customElement({ ...(el?.props ?? {}), key }, generateChildren(el));
    }
    const elementNative = getReactNativeElement(el?.type);
    return React.createElement(elementNative, { ...el?.props, key }, generateChildren(el));
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

function getReactNativeElement(key: string) {
    const element = ReactNativeAll[key];
    if (!element) {
        throw new Error(`Element "${key}" not exists in react-native or custom element`);
    }
    return element;
}

function generateChildren(el: IUniqueElementDataProps) {
    return Array.isArray(el?.children) ? el.children?.map((subElement, index) => compileComponent(subElement, String(index))) : el?.children;
}

export default DataToJsxCompilerV1;
