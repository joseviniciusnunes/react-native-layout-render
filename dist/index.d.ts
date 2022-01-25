/// <reference types="react" />
import { IUniqueElementDataProps } from './DataToJsxCompilerV1';
export interface IElementRoot {
    version: string;
    root: IUniqueElementDataProps;
}
export declare type TypeCustomElements = {
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
declare function RenderLayout({ yamlText, jsonText, versionNotSupported: VersionNotSupported, onErrorRender }: IElementDataProps): JSX.Element;
export declare function setCustomElements(elements: TypeCustomElements): void;
export default RenderLayout;
