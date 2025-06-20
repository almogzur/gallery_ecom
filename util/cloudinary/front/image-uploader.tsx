 import {  CldUploadWidget } from 'next-cloudinary';
 import ImageUploaderHebtexts from '@/util/cloudinary/front/image-uploader-heb-text'
import {   Button, useTheme } from '@mui/material';


export default function ImageUploader() {
    

    const theme = useTheme()


return (
     <CldUploadWidget     
               uploadPreset="E-commerce"
               onClose={(_statues,_widgt)=>{ }}
               onQueuesStart={(e)=>{console.log("q start", e.event , e.info );}} // event &&  strings are strings 
               onQueuesEnd={(_result)=>{}}
               
               options={{      
                singleUploadAutoClose:true,
                
                 autoMinimize:false,
                 sources:["local","google_drive","dropbox"], 
                 defaultSource:'local',       
                 maxFiles:1,
                 multiple:false,
                 showPoweredBy:false,
                 showUploadMoreButton:false,
                 showAdvancedOptions:false,  
                 text:{...ImageUploaderHebtexts},
                 styles:{
                     palette: {
                         window: "#F5F5F5",
                         sourceBg: "#FFFFFF",
                         windowBorder: "#90a0b3",
                         tabIcon: "#0094c7",
                         inactiveTabIcon: "#69778A",
                         menuIcons: theme.palette.primary.main,
                         link: theme.palette.primary.main,
                         action: theme.palette.primary.main,
                      inProgress: "#0194c7",
                      complete: "#53ad9d",
                      error: "#c43737",
                      textDark: "#000000",
                      textLight: "#FFFFFF"
                },}
                }}
               >
               {({ open }) => {
                 return  <Button
                 sx={{p:0, m:0}}
                style={{         
                  textDecoration: 'none',
                   color: 'black',
                   fontWeight:'bold' ,
                    fontSize: '1em',

                   }}
                 
                 onClick={() => {  open() }} 
                 >
                  העלה תמונה 
                 </Button> 
              
               }}
     </CldUploadWidget>        
)}