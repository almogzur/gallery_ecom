import BlogMainSection from "@/components/blog/blog-main-section"
import SmallCard from "@/components/cards/small_card"
import NavWrapper from "@/components/navigation/nav_wrap"
import { getPostCall } from "@/hooks_and_axios/fn"
import { BlogPostSchemaType } from "@/types/main"
import { Container, Stack as Flex } from '@mui/material'
import { grey } from "@mui/material/colors"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { organizeBlogPosts } from '@/pages/_app'



export const getServerSideProps = (
    async (_context) => {
        const RowPosts = await getPostCall()

        if (!RowPosts) {
            return {
                props: {
                    posts: null,
                }
            }
        }

        const post = organizeBlogPosts(RowPosts)

        return {
            props: {
                posts: post,
            }
        }


    }) satisfies GetServerSideProps<{
        posts: BlogStateType | null
    }>




export type BlogStateType = {
    main: BlogPostSchemaType,
    side: BlogPostSchemaType[],
    restPosts: BlogPostSchemaType[]
}


export default function BlogPage({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const PostLoopFlex = Flex


    if (!posts) {
        return <h1>no posts</h1>
    }

    return (
        <>
            <NavWrapper
                App_Bars_Styles={{ position: 'unset' }}
            />
            <Container>
                <BlogMainSection
                    side={posts.side}
                    main={posts.main}

                />

                <PostLoopFlex
                    overflow={'clip'}
                    
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {posts.restPosts.map((post, index) => (
                        <SmallCard
                            alt={""} key={index}
                            {...post}
                            imageHeight={200}
                            imageWidth={200}
                            WrapStyle={{
                                backgroundColor: grey[300],
                                margin: 10,
                                padding: 10,
                                width: "80%",
                               justifyContent:"space-between",
                                
                            }}
                            btnProps={{
                                sx:{ml:2}
                            }}
                             />
                    ))}


                </PostLoopFlex>
            </Container>
        </>
    )

}