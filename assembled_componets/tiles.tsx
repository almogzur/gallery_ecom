import CoreImage from "@/components/core_image"
import ImagesGrid from "@/components/images_grid"
import { Box } from "@mui/material"
import { p1, p3 , p4  } from "@/util/constants"
import WidthContext from "@/context/width_context"
import { useContext, useEffect, useState } from "react"

type TilesPropsType = {
    children?: React.ReactNode
}

export default function Tiles({ }: TilesPropsType) {

    const { sm } = useContext(WidthContext)
    const [pageLoaded, setPageLoaded] = useState(false)
    const [width] = useState('100%')

    useEffect(() => {
        setPageLoaded(true)
    }, [])

    if (!pageLoaded) {
        return null
    }

    return (
        <Box
            sx={{
                width: width,
                height:'30dvh',
                mt: 1,
                
            }}
        >

            <CoreImage
                height={0}
                width={0}
                src={p1.src}
                styles={{
                    height: 'inherit',
                    width: !sm ? 0 : '60%',
                    float: 'right',
                }}

                animation={{
                    animate: {
                        rotate: [-15, 0],
                        transition: {
                            default: { type: 'spring' },

                            duration: 2,
                        },
                    },
                }}
            />

            <ImagesGrid
                styles={{
                    height: 'inherit',
                 
                }}
                images={[p4, p3]}
            />

        </Box>
    )

}
