import BlogMainSection from "@/components/blog/blog-main-section"
import SmallCard from "@/components/cards/small_card"
import NavWrapper from "@/components/navigation/nav_wrap"
import { PostStructType } from "@/types/main"
import { p2, p3, p4, p5 } from "@/util/constants"
import { Stack as Flex } from '@mui/material'
import { grey } from "@mui/material/colors"




const SubPosts: PostStructType[] = [
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
    },
    {
        image: p5,
        title: 'בדיקה',
        body: 'טקסט מילויטקסט מילויטקסט מילויטקסט מילויטקסט מילויטקסט מילויטקסט מילויטקסט מילוי',
        description: "",
        tags: [],
        alt: ""
    }

]


export default function BlogPage() {

    const PostLoopFlex = Flex


    return (
        <>
            <NavWrapper
                App_Bars_Styles={{ position: 'unset' }}
            />

            <BlogMainSection />

            <PostLoopFlex
                height={500}
                width={'100%'}
        
            >
                {SubPosts.map((post, index) => (
                    <SmallCard
                    
                        key={index}
                        image={{
                            src: post.image.src,
                            width: 100,
                            height: 100
                        }}
                        title={"קונדימנטום קורוס בליקרה " + 
                             "נונסטי, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי."
                        }
                        body={ "נונסטי, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי."    +   "נונסטי, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי."}
                        description={""}
                        tags={[]}
                        alt={""} 
                        style={{
                            backgroundColor: grey[300],
                            margin: 10,
                            padding:10
                        }}
                        />
                ))}


            </PostLoopFlex>

        </>
    )
}