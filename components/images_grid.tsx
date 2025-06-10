
import { Box } from '@mui/material'
import { AnimationProps, motion } from 'framer-motion'
import { StaticImageData } from 'next/image'
import { CSSProperties } from 'react'
import CoreImage from './core_image'

type ImageGtidPropType = {
  images: Array<StaticImageData>
  styles:CSSProperties
}



export default function ImagesGrid(props: ImageGtidPropType) {


  const ColAStyle : CSSProperties ={
    display:"flex",
    flexDirection:"column",
    alignItems:'center',
    justifyContent:'space-between',    
    height:"inherit",
    
  }


  const ImageStyle : CSSProperties = {
    height:'100%' ,
    width:"45%",
    borderRadius:10,
    margin:0,
    padding:2
  }

  const ImageAnimation : AnimationProps = {
    animate:{
      rotate:[15,0],
      type:"bounece",
      
      transition:{
        default: { type: 'spring' },

        duration:1, 
         stiffness:180, 
         
      } 
    }
  }

  const [ p3, p4] = props.images

  return (
    <motion.div 
      style={props.styles} 
      animate={{

      transition:{ 
          duration:2
        }
      }}
    >
  
      <Box sx={ColAStyle} >


        <CoreImage 
          styles={ImageStyle}
          height={0} 
          width={0} 
          src={p4.src} 
          animation={ImageAnimation}

          />
          <CoreImage height={0} width={0} src={p3.src}    styles={ImageStyle}
 />

      </Box>
    




    </motion.div>
  )
}

