import CoreImage from "@/components/core_image"
import ImagesGrid from "@/components/images_grid"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { p1, p3 , p4  } from "@/util/constants"

import {   useEffect, useState } from "react"

type TilesPropsType = {
    children?: React.ReactNode
}

export default function Tiles({ }: TilesPropsType) {


    const theme = useTheme()
    const [pageLoaded, setPageLoaded] = useState(false)


    const getWidth = useMediaQuery(theme.breakpoints.up('sm')) ? 0 : '60%'

    useEffect(() => {
        setPageLoaded(true)
    }, [])

    if (!pageLoaded) {
        return null
    }

    return (
        <Box
            sx={{
                width: '100%',
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
                    width: getWidth,
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
