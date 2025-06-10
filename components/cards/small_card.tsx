import {  Typography , Stack as Flex, CSSProperties } from "@mui/material"
import Image from "next/image"
import { PostStructType } from "@/types/main"




export default function SmallCard (props:PostStructType & { style?: CSSProperties }) {

    const { image, title , alt ,description, style } = props
    

    return (
        <Flex 
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              style={style}
              borderRadius={5}
              >
        <Image
             {...image}
             alt={alt}
             style={{
                marginRight: 10 
            }}
              />
              <Flex m={1}  height={'inherit'} justifyContent={"space-around"} >
                <Typography variant="h5" fontWeight={'bold'} >{title}</Typography>
                <Typography fontWeight={'bold'} textAlign={'center'} >{description}</Typography>
            </Flex>
        </Flex>
    )
}