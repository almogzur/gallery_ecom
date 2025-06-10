import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import width_context from '@/context/width_context';
import LoadingFallBack from '../loading-fallback';


export type MediaCardPropsType = {
        image: string
        body:string
        title:string
        
}

export default function LargeCard( props: MediaCardPropsType) {

  const [isLoaded, setIsLoaded] = useState(false);  
    const {  image, body , title} = props
    const { xxs} = useContext(width_context)


useEffect(() => {
  setIsLoaded(true)
}, [])

if(!isLoaded){
  return <LoadingFallBack />
} 

  return (
    <Card sx={{ height:'inherit', borderRadius:5 }}>
      <CardMedia
        sx={{ height: "50%" }}
        image={image}
        title={title}
      />

      <CardContent >

        <Typography 
          variant={ xxs? "h6" :"h5"}
          textAlign={'justify'}
           
           sx={{ 
             color: 'text.secondary' ,
             fontWeight:'bold' ,
              letterSpacing: '1px',
              
             }}
           >
            {body.slice(0,120)+"..."}
        </Typography>

      </CardContent>

      <CardActions>
           <Button 
          size="large"
          variant='contained'
          sx={{ mx: 'auto' }}
          >המשך קריאה
          </Button>
      </CardActions>
    </Card>
  );
}