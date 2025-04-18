import CoreImage from "@/components/core_image"
import ImagesGrid from "@/components/images_grid"
import  {Box} from "@mui/material"

type TilesPropsType = {
    children?: React.ReactNode

}
export default function Tiles({}:TilesPropsType) {


 return(
     <Box
     sx={{
        border:` 1px solid black`,
        height:`50dvh`,
        mt:1
     }}
     >
       <CoreImage 
          height={0} 
          width={0} 
          src={""} 
          styles={{}}
          />
        <ImagesGrid rows={0} columns={0} images={[]}/>

     </Box>
    )

}
