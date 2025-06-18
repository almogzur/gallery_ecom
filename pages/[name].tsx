import { ImageContext } from "@/context/user_selected_image"
import CloudinaryImage from "@/util/cloudinary/front/cid-imag-wrapper"
import {  useContext } from "react"
import { Button, Stack as Flex } from "@mui/material"
import DownloadBar from "@/components/image-bars/download_bar"
import ImageDescriptionBar from "@/components/image-bars/Image_description_bar"
import Head from "next/head"
import NavWrapper from "@/components/navigation/nav_wrap";
import { useRouter } from "next/router"

export default function ImagePage() {

    const router = useRouter()
    const { image } = useContext(ImageContext)

    // const getRatio = useCallback(
    //     (image: ImagePropsType): Size => {

    //       const ImageMode = image.width > image.height ? "landscape" : "portrait"

    //       const ImageSizesObject = ImageSizes[ImageMode]

    //       return ImageSizesObject


    //      }
    // ,[])

    // useEffect(
    //     () => { 
    //         console.log(getRatio(image))
    //      },[getRatio, image])


    if(!image.public_id){
        return <>
        <h1>Err Loading Asset</h1>
        <Button 
        onClick={() => {router.push("/")}}> Home Page</Button>
        </>
    }

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <NavWrapper
                App_Bars_Styles={{
                    position:'unset'
                }}
            />

            <DownloadBar />

            <Flex
                direction={'row'}
                justifyContent={"center"}
                sx={{ mt: 2 }}
            >

            <CloudinaryImage
                    alt={""}
                    publicId={image.public_id}
                    width={image.width}
                    height={image.height}
                    style={{ height:"auto", width:"auto" }}
                />
            </Flex>

            <ImageDescriptionBar />
        </>
    )
}