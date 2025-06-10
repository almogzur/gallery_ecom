import {Button, Stack as Flex  } from '@mui/material'
import { useRouter } from 'next/router';
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { SiCanva } from "react-icons/si";


export default function DownloadBar () {

const router = useRouter();
const Wrapper = Flex

    return (
      <Wrapper
           direction={"row"}
           width={'inherit'}
           mt={1}
           p={1}
           height={'3em'}
           alignItems={'center'}
        >
          <Button   
              variant='contained' >הורדה</Button>
          <Button><AiFillLike size={'2em'}/></Button>

          <Button >
             <SiCanva style={{scale:3}}/>
          </Button>

          <Button
             sx={{mr:'auto'}}
             variant='contained'
             onClick={() => {router.back()}}

          >
            <RiArrowGoBackFill size={'1.5em'}/>

          </Button>
          
        </Wrapper>
 
    )
}