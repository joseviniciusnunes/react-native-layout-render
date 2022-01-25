/// <reference types="react" />
import { IUniqueElementDataProps, TypeCustomElements } from './DataToJsxCompilerV1';
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
declare function RenderLayout({ yamlText, jsonText, versionNotSupported, onErrorRender }: IElementDataProps): JSX.Element;
export declare function setCustomElements(elements: TypeCustomElements): void;
export default RenderLayout;
