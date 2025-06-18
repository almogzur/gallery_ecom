import type { AppProps } from "next/app";
import '@/styles/globals.css'
import { createTheme, ThemeProvider,} from "@mui/material";
import { ResourceApiResponse } from "cloudinary";
import { useState } from "react";
import { ImageContext } from "@/context/user_selected_image";
import { SessionProvider } from "next-auth/react"
import { BlogPostSchemaType } from "@/types/main";
import { BlogStateType } from "./blog";

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

export const getFillText = ()=>{
  return "ם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס."+
"נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן גולר מונפרר סוברט לורם שבצק"
+" יהול, לכנוץ בעריר גק ליץ, קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף+"
+"זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק."
+" איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. נולו"
}

export function organizeBlogPosts(posts: BlogPostSchemaType[]): BlogStateType {

    if (posts.length === 0) {
        throw new Error("No posts available");
    }

    console.log(posts, "GetServerSideProps")

    const mainIndex = posts.reverse().findIndex(post => post.isMain);

    if (mainIndex === -1) {
        throw new Error("No main post found");
    }

    const main = posts[mainIndex];
    const remainingPosts = posts.filter((_, i) => i !== mainIndex);

    const side = remainingPosts.slice(0, 3);
    const restPosts = remainingPosts.slice(3);

    return {
        main,
        side,
        restPosts
    };
}



export default function App({ Component, pageProps: {  session, ...pageProps } }:  AppProps) {


  const [image, setImage] = useState<ResourceApiResponse["resources"][0]>({} as ResourceApiResponse["resources"][0])
  


  
  return (
    <SessionProvider session={session}>
     <ThemeProvider theme={theme}>
      <ImageContext.Provider  value={{image,setImage}} > 
        <Component {...pageProps} />
     </ImageContext.Provider>
     </ThemeProvider>
     </SessionProvider>
  )
}
