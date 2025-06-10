
import InputWrap, { InputWrapPropsType } from "@/components/mui-input-wrap/input-wrap";

export type MultilineType =   {
    multiline: boolean;
    rows: number;
     
  }  

  export type MultilinePropsType  = InputWrapPropsType & MultilineType
  
  export default function TextAreaWrap ({rows  , ...restProps}:MultilinePropsType){
    return <InputWrap {...restProps}  rows={rows} multiline  />
}


