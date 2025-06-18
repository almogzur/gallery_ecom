import { useEffect, useState } from "react"
import { Button, Stack as Flex, FormControlLabel, Switch, Typography } from "@mui/material"
import InputWrap from "../mui-input-wrap/input-wrap"
import SelectWrap, { SelectItemType } from "../select-wrap"
import axios from "axios"
import { BlogPostSchemaType } from "@/types/main"





export default function NewBlogPostForm() {

    const [blogState, setBlogState] = useState<BlogPostSchemaType>({
        author: '',
        date: '',
        title: '',
        selectedImage: '',
        content: '',
        tags: [],
        description: '',
        isMain: false
    })
    const [assetsList , setAssetsList] = useState<SelectItemType[]>()
    

    const savePostCall = async  ( State : BlogPostSchemaType ) : Promise<unknown> => {

        try{ 
            const response = await axios.post('/api/blog/save-post', State)
            return  response.data
         }
        catch (err:unknown ){  
            console.log(JSON.stringify(err))
            return false
        }  
     }


     useEffect(()=>{
  
    const getAssetsList = async () => {
        try{ 
            const response = await axios.get('/api/profile/assets',{ params:{'SelectList':true }})
            return response.data
         }
        catch (err){  
            console.log("cloudinary GetAssetsList ERR",err )
            return false
        }
        

     }
        // using .then  instead of await 
      getAssetsList().then((data)=>{
            if(data){
                setAssetsList(data)
                console.log(data)

            }
        })
     },[ ])

    
    return (
        <>
            <Typography textAlign={'center'} variant="h3" > פוסט חדש</Typography>

            <Flex 
                direction={'row'}
                 justifyContent={'space-around'} 
                 >

                <form style={{ width: '100%' }} >
                    <Flex direction={'row'} flexWrap={'wrap'} justifyContent={"center"} >
                        <InputWrap
                            label={"כותרת "}
                            value={blogState.title}
                            onChangeHandler={(e) => {
                                setBlogState(p => ({ ...p, title: e.target.value }))
                             }}
                            helpText={undefined}
                            labelPosition={"top"}
                            variant="filled"
                        />
                        <InputWrap
                            label={"מפרסם"}
                            value={blogState.author}
                            onChangeHandler={(e) => {
                                setBlogState(p => ({ ...p, author: e.target.value }))
                             }}
                            helpText={undefined}
                            labelPosition={"top"}
                            variant="filled"
                        />
                        <SelectWrap
                            label={"תמונה"}
                            items={assetsList??[{value:"שגיאה",label:"שגיאה"}]}
                            value={blogState.selectedImage}
                            changeHandler={(e) => {
                                setBlogState(p => ({ ...p, selectedImage: e.target.value }))
                             }}
                            helpText={""}
                            labelPosition={"top"}
                            variant="filled"
                        />

                    </Flex >

                    <Flex direction={'row'} flexWrap={'wrap'} justifyContent={"center"}>

                        <SelectWrap
                            label={"תגיות"}
                            items={[]}
                            value={blogState.tags[0]}
                            changeHandler={(e) => {
                                setBlogState(p=>({
                                    ...p,
                                    tags: [...p.tags, e.target.value]
                                }))
                             }}
                            helpText={""}
                            labelPosition={"top"}
                            variant="filled"
                        />
                        <InputWrap
                            label={"תיאור"}
                            value={blogState.description}
                            onChangeHandler={(e) => {
                                setBlogState(p => ({ ...p, description: e.target.value }))
                            }}
                            helpText={undefined}
                            labelPosition={"top"}
                            variant="filled"
                        />
                    </Flex>

                    <Flex m={2}  >
                        <InputWrap
                            label={"תוכן "}
                            value={blogState.content}
                            onChangeHandler={(e) => { 
                                setBlogState({
                                    ...blogState,
                                    content: e.target.value
                                })
                            }}
                            helpText={undefined}
                            labelPosition={"top"}
                            variant="filled"
                            rows={20}
                            multiline
                        />
                        <FormControlLabel 
                            control={<Switch 
                                color="error"
                                 value={blogState.isMain}
                                  onChange={(e)=>{
                                    setBlogState(p=>({...p,isMain:e.target.checked}))
                                  }}
                                     />} 
                                  label="פוסט ראשי" 
                           
                            />

                        <Button
                        variant="contained"
                        onClick={()=>{
                            savePostCall(blogState)
                        }}
                        >שמור</Button>
                    </Flex>


                </form>

            </Flex>
        </>
    )
}