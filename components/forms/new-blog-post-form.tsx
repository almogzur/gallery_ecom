import { useState } from "react"
import { Button, Stack as Flex, Typography } from "@mui/material"
import InputWrap from "../mui-input-wrap/input-wrap"
import SelectWrap from "../select-wrap"
import axios from "axios"





export type BlogPostStateType = {
    author: string,
    date: string,
    titel: string,
    image: string,
    content: string,
    tags: string[],
    description: string
}

export default function NewBlogPostForm() {


    const [blogState, setBlogState] = useState<BlogPostStateType>({
        author: '',
        date: '',
        titel: '',
        image: '',
        content: '',
        tags: [],
        description: ''
    })

    const savePost = async  () : Promise<unknown> => {

        try{ 
            const response = await axios.post('/api/blog/new-post', blogState)
            if(response.status === 200){
                return response     
            }else{
                return false
            }
            

         }
        catch (err:unknown ){  
            console.log(JSON.stringify(err))
            return false
        }  
     }


    return (
        <>
            <Typography textAlign={'center'} variant="h3" > פוסט חדש</Typography>
            <Flex direction={'row'} justifyContent={'space-around'} >
                <form style={{ width: '100%' }} >
                    <Flex direction={'row'} flexWrap={'wrap'} justifyContent={"center"} >
                        <InputWrap
                            label={"כותרת "}
                            value={blogState.titel}
                            onChangeHndler={() => { }}
                            helpText={undefined}
                            labelPositioin={"top"}
                            variant="filled"
                        />
                        <InputWrap
                            label={"מפרסם"}
                            value={blogState.author}
                            onChangeHndler={() => { }}
                            helpText={undefined}
                            labelPositioin={"top"}
                            variant="filled"
                        />
                       
                        <SelectWrap
                            label={"תמונה"}
                            items={[]}
                            value={""}
                            changeHndler={() => { }}
                            helpText={""}
                            labelPositioin={"top"}
                            variant="filled"
                        />

                    </Flex >

                    <Flex direction={'row'} flexWrap={'wrap'} justifyContent={"center"}>

                        <SelectWrap
                            label={"תגיות"}
                            items={[]}
                            value={blogState.tags[0]}
                            changeHndler={(e) => {
                                setBlogState(p=>({
                                    ...p,
                                    tags: [...p.tags, e.target.value]
                                }))
                             }}
                            helpText={""}
                            labelPositioin={"top"}
                            variant="filled"
                        />
                        <InputWrap
                            label={"תיאור"}
                            value={blogState.description}
                            onChangeHndler={(e) => { 
                                setBlogState({
                                    ...blogState,
                                    description: e.target.value
                                })
                            }}
                            helpText={undefined}
                            labelPositioin={"top"}
                            variant="filled"
                        />
                    </Flex>

                    <Flex m={2}  >
                        <InputWrap
                            label={"תוכן "}
                            value={blogState.content}
                            onChangeHndler={(e) => { 
                                setBlogState({
                                    ...blogState,
                                    content: e.target.value
                                })
                            }}
                            helpText={undefined}
                            labelPositioin={"top"}
                            variant="filled"
                            rows={20}
                            multiline
                        />
                        <Button
                        variant="contained"
                        onClick={()=>{
                            savePost()
                        }}
                        >שמור</Button>
                    </Flex>


                </form>
            </Flex>
        </>
    )
}