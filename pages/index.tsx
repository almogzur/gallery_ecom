
import NavWrapper from "@/components/navigation/nav_wrap";
import Head from "next/head";
import AutoComplite from '@/components/auto-complite-input-wrap'
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { p1 as Cover } from "@/util/constants";
import { Stack as Flex } from '@mui/material'
import MainCategoryBar from "@/components/main_category_bar";
import Gallery from "@/components/gallery";
import BlogGallary from "@/components/blog/blog-gallary";

export default function Home() {

  const [userInput, setUserInput] = useState<string>('')

  const FlexSectionWrapper = Flex

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Flex direction={"row"} justifyContent={"center"}>

        <FlexSectionWrapper
          direction={"column"}
          justifyContent={"center"}
          alignItems={'center'}

          sx={{
            maxWidth: 1600,
            width: '100%',
            height: '40dvh',
            backgroundImage: `url(${Cover.src})`,
            backgroundSize: "cover",
            backgroundPosition: 'bottom',
          }}>

        <NavWrapper
            App_Bars_Styles={{
              position: 'absolute',
              justifySelf: "top",
              background: 'transparent',
              boxShadow: "none",
              width: "100%",
            }}

          />
          <AutoComplite
            label={"חיפוש"}
            value={userInput}
            onChangeHndler={(e) => { setUserInput(e.target.value) }}
            helpText={undefined}
            labelPositioin={"end"}
            variant="outlined"
            bg={grey[200]}
            AutocompleteOptionArray={[]}
            sxProps={{
              borderRadius: "20px",
              maxWidth: "600px",
              minWidth: 260,
              justifySelf: 'center',
            }}
            controledLabelSxcProps={{
              fontFamily: 'monospace'
            }}
          />

        </FlexSectionWrapper>

      </Flex>


      <MainCategoryBar>

      </MainCategoryBar>

      <Gallery />

      <BlogGallary/>
      
    </>
  )
}
