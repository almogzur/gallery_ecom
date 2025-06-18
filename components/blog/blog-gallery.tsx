import { BlogPostSchemaType } from '@/types/main';
import { Box, Button, Stack as Flex, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';
import { CldImage } from 'next-cloudinary'
import LoadingFallBack from '../loading-fallback';
// home page is passing post 
// from getServerSideProps

export default function BlogGallery({ posts }: { posts: BlogPostSchemaType[] }) {


  const theme = useTheme()

  const [isPageLoaded, setIsPageLoaded] = useState(false)


  // Scroller vars

  const [scrollToLeft, setScrollToLeft] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);


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


  useEffect(() => {
    setIsPageLoaded(true)
  }, [isPageLoaded])

  const ScrollerContent = Box,
    ArrowsWrapper = Flex

  if (!isPageLoaded) {
    return <LoadingFallBack />
  }

  return (
    <>
      <ScrollerContent
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        display={"flex"}
        flexDirection={"row"}
        gap={3}
        sx={{
          mt: 2,
          zIndex: 1,
          overflowX: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          '&::-webkit-scrollbar': {},
        }}
      >
        {posts.reverse().map((post, i) => <Box key={i + post.date}>
          <CldImage
            alt={''}
            src={post.selectedImage}
            width={400}
            height={300}
          />
          <Flex>
            <  Typography textAlign={'center'} >{post.title} </Typography>
            <Button>המשך</Button>
          </Flex>
        </Box>)}



      </ScrollerContent>

      <ArrowsWrapper

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

      </ArrowsWrapper>
    </>
  )
}