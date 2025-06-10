import { Button, Typography, Stack  as Flex} from "@mui/material";
import { FaInfoCircle } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";

export default  function ImageDisciptionBar () {


return (
        <Flex
           direction={"row" } 
           justifyContent={"space-around"}
         >

        <Flex   >
          <Typography  variant="h6"   >רישון : </Typography>
          <Typography variant="h6"  >תאור : </Typography>
        </Flex>

        <Flex direction={"row" } >
           <Button   > <FaInfoCircle size={'2em'}   /></Button>
           <Button> <CiShare2 size={'2em'}/></Button>
        </Flex>

        </Flex>
    )
}