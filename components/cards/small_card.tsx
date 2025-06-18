import { BlogPostSchemaType } from "@/types/main";
import {  Typography , Stack as Flex, CSSProperties, Button, ButtonProps } from "@mui/material"
import { CldImage } from 'next-cloudinary';
import LoadingFallBack from "../loading-fallback";

type SmallCardPropsType = BlogPostSchemaType & {
         WrapStyle?: CSSProperties ,
          alt:string ,
          imageHeight:number ,
          imageWidth:number
          btnProps?:ButtonProps
         }


export default function SmallCard (props:SmallCardPropsType) {
    

    const {selectedImage , date ,   alt ,description, WrapStyle ,  imageHeight , imageWidth ,  title } = props


    if(!selectedImage) {
        return <LoadingFallBack/>
    }
    

    return (
        <Flex 
              direction={'row'}
              alignItems={'center'}
              style={WrapStyle}
              borderRadius={5}
         
              >
        <CldImage
            src={selectedImage}
             width={  imageWidth}
             height={ imageHeight }
             alt={alt}
             style={{
                marginRight: 10 
            }}
              />
              <Flex
                m={1}  
               justifyContent={"space-around"} 
               >
                <Typography variant="h6" fontWeight={'bold'} >{title}</Typography>
                <Typography fontWeight={'bold'} textAlign={'center'} >{description}</Typography>
                <Typography>{date}</Typography>
            </Flex>
            
            <Button 
                 variant="contained"
                 {...props.btnProps} 
                  > המשך
                  </Button>
            
        </Flex>
    )
}