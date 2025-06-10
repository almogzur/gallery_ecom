import type { AppProps } from "next/app";
import '@/styles/globals.css'
import { createTheme, ThemeProvider,} from "@mui/material";
import WidthContext from '../context/width_context';
import { ResourceApiResponse } from "cloudinary";
import { useState } from "react";
import { ImageContext } from "@/context/user_selected_image";
import { useMediaQuery } from "usehooks-ts";
import { SessionProvider } from "next-auth/react"

const theme = createTheme({
direction: "rtl",
components:{
  MuiInputLabel:{
    styleOverrides:{
      root:{
        direction:"rtl"
      }
    }
  },
  MuiStack:{
    styleOverrides:{
      root:{
       direction:"rtl"
      }
    }
   },
  MuiTypography:{
    defaultProps:{},
    styleOverrides:{
      root:{
        color:"black",
      }
    }
    
  },
  MuiOutlinedInput:{
    defaultProps:{notched:false},
    styleOverrides:{
      root:{},    
    }
  },
  
},
typography:{
  fontFamily:'monospace'
}
});

export default function App({ Component, pageProps: {  session, ...pageProps } }:  AppProps) {


  const [image, setImage] = useState<ResourceApiResponse["resources"][0]>({} as ResourceApiResponse["resources"][0])
  
  const xxl = useMediaQuery('(min-width : 1600px)')
  const xl = useMediaQuery('(min-width : 1200px)')
  const lg = useMediaQuery('(min-width: 992px)')
  const md = useMediaQuery('(min-width: 768px)')
  const sm = useMediaQuery('(min-width : 576px)')
  const xs = useMediaQuery('(min-width : 489px)')
  const xxs = useMediaQuery('(min-width : 300px)')

  const mediaQueryKay = () :  'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'  =>{

    if(xxl) return 'xxl'
    else if(xl) return 'xl'
    else if(lg) return 'lg'
    else if(md) return 'md'
    else if(sm) return 'sm'
    else if(xs) return 'xs'
    else if(xxs) return 'xxs'
    else return 'xxs'

  }


  
  return (
    <SessionProvider session={session}>
     <ThemeProvider theme={theme}>
      <WidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs, mediaQueryKay}}>
      <ImageContext.Provider  value={{image,setImage}} > 
        <Component {...pageProps} />
     </ImageContext.Provider>
     </WidthContext.Provider>
     </ThemeProvider>
     </SessionProvider>
  )
}
