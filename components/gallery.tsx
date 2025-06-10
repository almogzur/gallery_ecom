import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import LoadingFallBack from './loading-fallback';
import { ResourceApiResponse, } from 'cloudinary';
import { Box, Stack as Flex, useTheme } from '@mui/material'
import { ImageContext } from '@/context/user_selected_image';
import { useRouter } from 'next/router';
import CloudinaryImage from '@/util/cloudinary/front/cid-imag';
import WidthContext from '../context/width_context';
import { Size } from '@/types/main';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

type ImageListPropsType = {

  children?: React.ReactNode

}


export default function Gallery(_props: ImageListPropsType) {


  const { sm } = React.useContext(WidthContext)
  const theme = useTheme()

  const CalcShape = (imageWidth: number, imageHeight: number): Size => {

    const landscape = !sm ? 300 : 500
    const portrait = 300
    const height = 500

    if (imageWidth > imageHeight) {
      return {
        width: landscape,
        height: height
      }
    }
    else {
      return {
        width: portrait,
        height: height
      }
    }
  }

  const route = useRouter()
  const [ImgList, setImgList] = useState<ResourceApiResponse>()
  const { setImage } = React.useContext(ImageContext)


  // Scrooler vars
  const [scrollToLeft, setScrollToLeft] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);


  const getAssets = async (): Promise<ResourceApiResponse | undefined> => {

    try {
      const responce = await axios.get('/api/profile/assets')
      const data = await responce.data
      return data
    }
    catch (err: unknown) {
      alert(JSON.stringify(err))
      return undefined
    }

  }

  React.useEffect(() => {
    getAssets().then((data) => {
      //console.log(data)
      setImgList(data)
    })
  }, [])

  const ScroolerConetnt = Box,
    ArowsWrapper = Flex

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ behavior: "smooth", left: -310 })
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ behavior: "smooth", left: +310 })
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft); // Mouse position relative to container
    setScrollToLeft(scrollContainerRef.current.scrollLeft); // Save the initial scroll position
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft; // Current mouse position
    const walk = (x - startX) * 1; // Distance moved (adjust multiplier for sensitivity)
    scrollContainerRef.current.scrollLeft = scrollToLeft - walk; // Update scroll position
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false); // Stop dragging
  };

  if (!ImgList?.resources.length) {
    return <LoadingFallBack />
  }

  return (
    <>
      <ScroolerConetnt
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        display={"flex"}
        flexDirection={"row"}
        gap={3}
        sx={{
          zIndex: 1,
          overflowX: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          '&::-webkit-scrollbar': {},
        }}
      >
        {ImgList.resources?.map((resource) => (
          <Box
            key={resource.asset_id}
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              if (!isDragging) {
                setImage(resource);
                route.push(`/${resource.asset_id}`);
              }
            }}
          >
            <CloudinaryImage
              alt={resource.public_id}
              loading="lazy"
              publicId={resource.public_id}
              width={CalcShape(resource.width, resource.height).width * 0.8}
              height={400}
              style={{ margin: 1, zIndex: 1100 }}
            />
          </Box>
        ))}
      </ScroolerConetnt>

      <ArowsWrapper

        direction={"row"}
        justifyContent={"space-between"}
        width={'100%'}
        mt={1}
        mb={1}
      >
        <FaCircleArrowRight
          onClick={scrollRight}
          cursor={'pointer'}
          size={'2.5em'}
          style={{ zIndex: 5, marginRight: '1em', color: theme.palette.primary.dark }}
        />

        <FaCircleArrowLeft
          onClick={scrollLeft}
          cursor={'pointer'}
          size={'2.5em'}
          style={{ zIndex: 5, marginLeft: '0.5em', color: theme.palette.primary.dark }}
        />

      </ArowsWrapper>

    </>
  );
}

