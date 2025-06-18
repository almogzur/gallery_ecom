import { Box, Stack as Flex, useMediaQuery, useTheme } from '@mui/material'
import LargeCard from '@/components/cards/large_card'
import { BlogPostSchemaType } from '@/types/main'
import SmallCard from '../cards/small_card'
import { useWindowSize  } from 'usehooks-ts'

export type BlogMainSectionPropsType  = {
  main : BlogPostSchemaType,
  side: BlogPostSchemaType[]
}

export default function BlogMainSection({ main, side }: BlogMainSectionPropsType) {

  const theme = useTheme()

  const screenSize = useWindowSize()
  const getSectionWidth = useMediaQuery(theme.breakpoints.up('md')) ? 550 : screenSize.width - 50
  const sectionHeight = useWindowSize().height*.4


  const MainPostBox = Box,  
     SideBarFlexBox = Flex

   return (

    <Flex
     direction={ useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column' }
      justifyContent={'center'}
      alignItems={'center'}
    >

      <MainPostBox
        bgcolor={'#ddd'}
        height={sectionHeight}
        width={getSectionWidth}
        m={1}
        borderRadius={5}
        p={1}

      >
        <LargeCard
          alt={''}
          height={sectionHeight}
          width={getSectionWidth} 
          author={main.author} 
          date={main.date} 
          title={main.title}
           selectedImage={main.selectedImage} 
           content={main.content} 
           tags={[]} 
           description={main.description}
            isMain={false}
        />

      </MainPostBox>

      <SideBarFlexBox
        bgcolor={'#ddd'}
        m={1}
        borderRadius={5}
        p={1}
        width={getSectionWidth}
        height={sectionHeight}
        justifyContent={'space-around'}
      >{
        side.map((post, index) => {
          return (
            <SmallCard
             key={index+post.title}
              alt={''}
              imageHeight={150}
              imageWidth={150} 
              author={post.author} 
              date={post.date} 
              title={post.title}
               selectedImage={post.selectedImage} 
               content={post.content} 
               tags={[]} 
               description={post.description}
               isMain={false}
               WrapStyle={{
                    justifyContent:'space-between',
                    textAlign:"center",
                    margin:2
              }}
              btnProps={{sx:{padding:2}}}

            />
          )
        })
      }



      </SideBarFlexBox>
    </Flex>


  )

}


