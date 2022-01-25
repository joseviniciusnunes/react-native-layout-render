/// <reference types="react" />
import { TypeCustomElements } from '.';
export interface IUniqueElementYamlProps {
    type: string;
    props: any;
    children?: Array<IUniqueElementYamlProps> | string;
}
export interface IYamlToJsxCompilerV1Props {
    data: IUniqueElementYamlProps;
    customElements?: TypeCustomElements;
}
export default function YamlToJsxCompilerV1({ data, customElements: customElementsProp, }: IYamlToJsxCompilerV1Props): JSX.Element;
