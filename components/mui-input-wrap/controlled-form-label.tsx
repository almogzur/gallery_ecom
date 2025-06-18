import { SxProps, Typography, useFormControl ,useTheme} from "@mui/material"
import { CSSProperties } from "react"

interface ControlledLabelType {
    labelPosition:"top"|"end"
    label:string
    isLabelBold?:boolean
    labelTextColor?:CSSProperties['color']
    sxProps?:SxProps


}
 const ControlledLabel =({
   labelPosition,
   label ,
   isLabelBold  ,
   labelTextColor,
   sxProps

  }:ControlledLabelType)=>{
    const theme = useTheme()

    const { focused , filled, variant ,error,color } = useFormControl() || {};
  //  console.log(rest);
    
          const  fullWidth= 1000
    
      return   (
      <Typography   
           sx={
    
            focused?
                [ {   
                 width:labelPosition==="end"? fullWidth*0.11 : fullWidth,
                 color:error? "red" : color?theme.palette[`${color}`].main : null,

                 fontWeight: isLabelBold? "bold": null,

                  },
                 variant==="outlined"&&
                  {
                   position:"relative",
                   top:!theme.breakpoints.up('sm') ?3:3, 
                   p:1
                 },
                 {
                  color:error? "red": color? theme.palette[`${color}`].main  :undefined,    
                 }
                ]
                 :
             filled ?
                 [
                 {
                  width:labelPosition==="end"? fullWidth*0.11 : fullWidth,
                  color:error? "red":undefined,
                  fontWeight: isLabelBold? "bold": null,

                 },
                 variant==="outlined"&&
                 {
                  position:"relative",
                   top: !theme.breakpoints.up('sm') ? 3 : 3, 
                  p:1
                }
               ,{
              
                fontSize:!theme.breakpoints.up('sm')? 14:18,
              }
                ]      
                :
                {
                 width:fullWidth,
                 fontWeight: isLabelBold? "bold": null,
                 fontSize:!theme.breakpoints.up('sm')? 14:18,
                 position:"relative",
                 opacity:1,
                 color:labelTextColor?? null,
                  ...sxProps,
                  mr:5
                 }
                
                }
            >

        {label}
        </Typography>)
    


}

export default ControlledLabel

