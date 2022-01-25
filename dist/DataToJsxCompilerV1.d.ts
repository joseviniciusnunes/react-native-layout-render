/// <reference types="react" />
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
declare function DataToJsxCompilerV1({ data, customElements: customElementsProp }: IDataToJsxCompilerV1Props): JSX.Element;
export default DataToJsxCompilerV1;
