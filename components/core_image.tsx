
import { Typography, } from "@mui/material"
import { CSSProperties } from "react"
import { motion,  AnimationProps} from 'framer-motion'
 

type CoreImagePropsType = {
    height: number
    width: number
    src: string
    alt?: string
    description?: string
    styles?:CSSProperties,
    animation?:AnimationProps
}

export default function CoreImage(props: CoreImagePropsType) {

    return (
        <>
        <motion.img
            src={props.src}
            alt={props.alt??"image"}
            width={props.width}
            height={props.height}
            {...props.animation}
            style={{
                ...props.styles,
            }}
            
         />
         {props.description??
          <Typography>{props.description}</Typography>
         }
         </>
    )
}