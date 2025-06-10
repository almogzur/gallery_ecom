
import {  Typography, Stack as Flex } from "@mui/material";
import { CSSProperties } from "react";



export default function verifyRequest (){


    const  textStyle :CSSProperties = { 

        fontWeight:'bold',

    } 

    return (
        <Flex 
            justifyContent={'center'}
            alignItems={'center'}
            mt={5}
           > 
            
        <Typography textAlign={'center'} variant="h3" style={textStyle}  >  נמצא בהצלחה </Typography>
        <Typography  textAlign={'center'} variant="h3" style={textStyle}  >הודעה נשלחה לחשבון המייל</Typography>
        <Typography  textAlign={'center'} variant="h3"  style={textStyle}  >ניתן לסגור חלון</Typography>

        </Flex>
    )}