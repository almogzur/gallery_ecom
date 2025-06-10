import {  Box , Stack as Flex } from '@mui/material'
import { p1 , p2   ,p3 , p4 , } from '@/util/constants'
import { useContext } from 'react'
import WidthContext from '@/context/width_context'
import LargeCard from '@/components/cards/large_card'
import { PostStructType } from '@/types/main'
import SmallCard from '../cards/small_card'




const SidePosts :  PostStructType []  = [
  {
    image: p2,
    title: 'בדיקה',
    body: 'טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי',
    description: '',
    tags: [],
    alt: ''
  },
  {
    image: p3,
    title: 'בדיקה',
    body: 'טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי',
    description: '',
    tags: [],
    alt: ''
  },
  {
    image: p4,
    title: 'בדיקה',
    body: 'טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי',
    description: '',
    tags: [],
    alt: ''
  }

]


export default function BlogMainSection () {

  const {  lg  , xs } = useContext(WidthContext)

  const MainPostBox =Box, 
           SideBarFlexBox = Flex  

    return (
   <Flex 
      direction={ !lg ? 'column' : 'row'}
      justifyContent={'center'}
      alignItems={'center'}
        >
      <MainPostBox
       bgcolor={'#ddd'} 
       height={550}
       width={!xs?  550:  280}
       m={1}
       borderRadius={5}
       p={1}
       
     >

     <LargeCard
        image={p1.src}
        title={'בדיקה'}
        body={
          'טקסט מילוי '+
          'טקסט מילוי טקסט מילוי טקסט מילוי ' + 
          'טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי '+
          'טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי טקסט מילוי '
        }
        />

    </MainPostBox>

      <SideBarFlexBox 
            bgcolor={'#ddd'} 
            height={ 550 }
            m={1}
            borderRadius={5}
            p={1}
            justifyContent={'space-around'}
        >
          {SidePosts.map((post) => {
            return <SmallCard 
              key={post.title}
              title='כותרת'
              description={'טקסט תיאורטקסט תיאורטקסט תיאורטקסט תיאורטקסט תיאור'}
              alt={''} 
              image={{
                ...post.image,
                width:150,  
                height:150,
              }}
               body={''}
               tags={[]}
               style={{
                background:'#fff',
                height:170,
                width:'inherit',
                borderRadius:10,
                marginTop:2,
                gap:2,
                
               }}
              />
          })}

    </SideBarFlexBox>

   </Flex>
    )
}


