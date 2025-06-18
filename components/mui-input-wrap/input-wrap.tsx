import {  SxProps, TextField, TextFieldProps, TextFieldVariants,  } from "@mui/material"
import {ChangeEventHandler, CSSProperties, ReactNode, RefObject} from "react";


import ControlledHelperText from '@/components/mui-input-wrap/controlled-helper-text'
import ControlledLabel from '@/components/mui-input-wrap/controlled-form-label'

type HTMLInputTypes = 
  | "color"
  | "date"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number" 
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";



  

  export interface  InputWrapPropsType extends  Omit<TextFieldProps, 'variant'>  {

  /** Required Fields  */    
    
    label:string
    value:string|number|undefined
    onChangeHandler:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>
    helpText:string|undefined

  /** util  */
     inputType?: HTMLInputTypes
     isRequired?:boolean
     error?:boolean
     isDisabled?:boolean
     ref?:RefObject<HTMLInputElement>
     icon?:ReactNode

  // if provided alone will use label and place holder 
     placeholder?:string
     placeholderStyle?:CSSProperties

  // if provided will remove label and only display placeholder 
     placeholderMode?:boolean

  /** !!! this is extortion for Text-area-wrap . if you  this also change the ref warper  */
     multiline?: true;
     rows?: number;
  /** !!! this is extortion for Text-area-wrap . if you  this also change the ref   */

 
     /** Styles Options  */

     styles?:CSSProperties
     sxProps?:SxProps

      /*Labels*/
      isLabelBold?:boolean
      labelTextColor?:CSSProperties['color']
      

      isValueBold?:boolean
      valueTextColor?:CSSProperties['color']


     hoverColor?:CSSProperties['color']
     bg?:CSSProperties['color']

     variant?:TextFieldVariants
     Fgrow?:number
     m?:number|"auto"
    

     
    
    /**   Style Positions */
     helpTextPotionsEnd?:boolean
     labelPosition:"top"|"end"



     stateName?:string // the name of the state to update in the event 
  
  }


const InputWrap = ({
     inputType,
     label,
     value, 
     onChangeHandler,
     isRequired,
     stateName,
     variant,
     Fgrow ,
     bg,
     error,
     m,
     helpText,
     helpTextPotionsEnd,
     isDisabled,
     hoverColor,
   
     labelPosition,
     ref,
     styles,
     rows,
     multiline,
     placeholder,
     placeholderMode,
     isLabelBold,
     placeholderStyle,
     valueTextColor,
     isValueBold,
     labelTextColor,
     sxProps
    }:InputWrapPropsType)=>{


    return(
     
    
     <TextField
      sx={{
      flexGrow: Fgrow ?? null,
      bgcolor: bg,
      m: m ? m : 0.5,
      '&:hover': {
        backgroundColor: hoverColor,
 
      },
      "& .MuiInputBase-input::placeholder":placeholderStyle,
             ...sxProps
    }}
      id={label}
      type={inputType} //default to text
      value={value ?? ""}
      onChange={onChangeHandler}
      required={isRequired}
      disabled={isDisabled}
      name={stateName}
      helperText={helpText ? <ControlledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false} /> : null}
      variant={variant ?? 'standard'}
      label={ placeholderMode ? null : <ControlledLabel labelPosition={labelPosition?? "top"} label={label} isLabelBold={isLabelBold} labelTextColor={labelTextColor}/>}
      error={error}
      ref={ref}
      style={{...styles}}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder} // string can't extend with ReactNode in SxProps
      slotProps={{input:{placeholder,style:{fontWeight:isValueBold?"bold":undefined, color:valueTextColor}}}}
     />
     
    

    )
}
export default InputWrap

