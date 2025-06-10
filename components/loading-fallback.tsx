import { CircularProgress , CircularProgressProps, Stack as Flex} from "@mui/material"

type  ImageListFallbackPropsType = {
    children? : React.ReactNode,
    CircularProgressProps?:CircularProgressProps
} 

function LoadingFallBack (props : ImageListFallbackPropsType) { 

  return (
  <Flex direction={"row"} justifyContent={"center"} width={'inherit'}>
        <CircularProgress size="3rem" {...props.CircularProgressProps}/>  
    {props.children}
  </Flex>
  )
}

export default LoadingFallBack