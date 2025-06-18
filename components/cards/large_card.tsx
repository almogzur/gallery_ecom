import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CSSProperties, useEffect, useState } from 'react';
import LoadingFallBack from '../loading-fallback';
import { CldImage } from 'next-cloudinary';
import { BlogPostSchemaType } from '@/types/main';
import { useTheme } from '@mui/material';



export default function LargeCard(props:BlogPostSchemaType& { ImageStyle?: CSSProperties , alt:string , height:number , width:number }) {

  const [isLoaded, setIsLoaded] = useState(false);  
    const {selectedImage , title, date ,   alt ,description, ImageStyle ,  height , width ,  content} = props
    const theme = useTheme()


useEffect(() => {
  setIsLoaded(true)
}, [])

if(!isLoaded){
  return <LoadingFallBack />
} 

  return (
    <Card sx={{  height: height , borderRadius:5 }}>
      <CldImage
         alt={alt} 
         src={selectedImage}
          width={width}
           height={height*0.6}
           style={ImageStyle}

            />
         

      <CardContent sx={{display:"flex", flexDirection:"column"}} >

        <Typography 
          variant={ theme.breakpoints.up('sm')  ? "h6" :"h5"}
          textAlign={'justify'}
           
           sx={{ 
             color: 'text.secondary' ,
             fontWeight:'bold' ,
              letterSpacing: '1px',
              
             }}
           >
            {title}

        </Typography>

        <Typography>{date}</Typography>
        <Typography>     {content}</Typography>
        <Typography variant="body2">{description}</Typography>
        

      </CardContent>

      <CardActions>
           <Button 
          size="large"
          variant='contained'
          sx={{ mx: 'auto' }}
          >המשך...
          </Button>
      </CardActions>
    </Card>
  );
}