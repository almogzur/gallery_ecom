
import NavWrapper from "@/components/navigation/nav_wrap";
import Head from "next/head";
import AutoComplete from '@/components/auto-complete-input-wrap'
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { p1 as Cover } from "@/util/constants";
import { Stack as Flex } from '@mui/material'
import BlogGallery from "@/components/blog/blog-gallery";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getAssetsCall, getPostCall } from "@/hooks_and_axios/fn";
import { ResourceApiResponse } from "cloudinary";
import { organizeBlogPosts } from "./_app";
import { BlogStateType } from "./blog";


// get BlogPost and cloudinary images 


export const getServerSideProps = (async (_context) => {
  const assets = await getAssetsCall();
  const RowPosts = await getPostCall();

  if (!RowPosts) {
    return {
      props: {
        posts: null,
        assets
      }
    }

  }

  const posts = organizeBlogPosts(RowPosts)

  return {
    props: {
      posts,
      assets,
    },
  };
}) satisfies GetServerSideProps<{
  posts: BlogStateType | null;
  assets: ResourceApiResponse | undefined;
}>;


export default function Home({
  posts,
  assets
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [userInput, setUserInput] = useState<string>('')

  const FlexSectionWrapper = Flex

  if (!posts || !assets) {
    return <h1>no Data</h1>
  }

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
          <AutoComplete
            label={"חיפוש"}
            value={userInput}
            onChangeHandler={(e) => { setUserInput(e.target.value) }}
            helpText={undefined}
            labelPosition={"end"}
            variant="outlined"
            bg={grey[200]}
            AutocompleteOptionArray={[]}
            sxProps={{
              borderRadius: "20px",
              maxWidth: "600px",
              minWidth: 260,
              justifySelf: 'center',
            }}
            controlledLabelSxcProps={{
              fontFamily: 'monospace'
            }}
          />

        </FlexSectionWrapper>

      </Flex>


      <BlogGallery posts={[posts.main, ...posts.restPosts ,...posts.side]} />


    </>
  )
}
