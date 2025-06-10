import WidthContext from "@/context/width_context"
import { SxProps, Typography, useFormControl ,useTheme} from "@mui/material"
import { CSSProperties, useContext } from "react"

interface ControledLabelType {
    labelPositioin:"top"|"end"
    label:string
    isLabelBold?:boolean
    labelTextcolor?:CSSProperties['color']
    sxProps?:SxProps


}
 const ControledLabel =({
   labelPositioin,
   label ,
   isLabelBold  ,
   labelTextcolor,
   sxProps

  }:ControledLabelType)=>{
    const theme = useTheme()
    const {sm} = useContext(WidthContext)

    const { focused , filled, variant ,error,color } = useFormControl() || {};
  //  console.log(rest);
    
          const  fullWidth= 1000
    
      return   (
      <Typography   
           sx={
    
            focused?
                [ {   
                 width:labelPositioin==="end"? fullWidth*0.11 : fullWidth,
                 color:error? "red" : color?theme.palette[`${color}`].main : null,

                 fontWeight: isLabelBold? "bold": null,

                  },
                 variant==="outlined"&&
                  {
                   position:"relative",
                   top:!sm ?3:3, 
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
                  width:labelPositioin==="end"? fullWidth*0.11 : fullWidth,
                  color:error? "red":undefined,
                  fontWeight: isLabelBold? "bold": null,

                 },
                 variant==="outlined"&&
                 {
                  position:"relative",
                   top: !sm ? 3 : 3, 
                  p:1
                }
               ,{
              
                fontSize:!sm? 14:18,
              }
                ]      
                :
                {
                 width:fullWidth,
                 fontWeight: isLabelBold? "bold": null,
                 fontSize:!sm? 14:18,
                 position:"relative",
                 opacity:1,
                 color:labelTextcolor?? null,
                  ...sxProps,
                  mr:5
                 }
                
                }
            >

        {label}
        </Typography>)
    


}

export default ControledLabel

