import NewBlogPostForm from "@/components/forms/new-blog-post-form"
import NavWrapper from "@/components/navigation/nav_wrap"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"


export default function NewBlogPost () {

  const {status } = useSession()
  const router = useRouter()

  if( status === "loading"  ) {
    return <h1>loading</h1>
}
else if( status === "unauthenticated" ) {
        router.push("/")
}


    return (
        <>
        <NavWrapper
          App_Bars_Styles={{position:'unset'}}
        />

        <NewBlogPostForm/>

        </>
    )
}