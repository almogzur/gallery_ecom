import NewBlogPostForm from "@/components/forms/new-blog-post-form"
import NavWrapper from "@/components/navigation/nav_wrap"


export default function NewBlogPost () {


    return (
        <>
        <NavWrapper
          App_Bars_Styles={{position:'unset'}}
        />

        <NewBlogPostForm/>

        </>
    )
}