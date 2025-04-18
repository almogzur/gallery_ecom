
import { Typography, } from "@mui/material"
import Image from "next/image"
import { CSSProperties } from "react"
 


type CoreImagePropsType = {
    height: number
    width: number
    src: string
    alt?: string
    discription?: string
    styles?:CSSProperties
    
}

export default function CoreImage(props: CoreImagePropsType) {

    return (
        <>
        <Image
            src={props.src}
            alt={props.alt??"image"}
            width={props.width}
            height={props.height}
            style={{
                ...props.styles,
            }}
         />
         {props.discription??
          <Typography>{props.discription}</Typography>
         }
         </>
    )
}