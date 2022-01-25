/// <reference types="react" />
import { IUniqueElementYamlProps } from './YamlToJsxCompilerV1';
export interface IElementRoot {
    version: string;
    root: IUniqueElementYamlProps;
}
export declare type TypeCustomElements = {
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
declare function RenderYaml({ yamlText, versionNotSupported: VersionNotSupported, }: IElementYamlProps): JSX.Element;
export declare function setCustomElements(elements: TypeCustomElements): void;
export default RenderYaml;
