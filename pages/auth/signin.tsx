import InputWrap from "@/components/mui-input-wrap/input-wrap";
import { Box, Button, Typography, Stack as Flex } from "@mui/material";

import { signIn } from 'next-auth/react'
//import { useRouter } from "next/router";
import { useState } from "react";

export default function SingInPage() {

//    const router = useRouter()

//    const  { query } = router 

    const [user, setUser] = useState({
        email: "",
    })

    return (
        
        
        
        <Flex
            height={'100dvh'}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Box
                height={'70%'}
                width={'80%'}
                border={'1px solid black'}
            >
            
                 <Typography align="center" fontWeight={'bold'} variant="h5"
                      > אנא הזן את כתובת המייל שלך 
                </Typography>
                <Typography align="center" fontWeight={'bold'} variant="h5"
                 > ונשלח לחשבון המייל שלך קישור להתחברות 
                 </Typography>
                
                <Flex>
                    <InputWrap
                        label={"מייל"}
                        value={user.email}
                        onChangeHndler={(e) => { 
                         setUser({  email: e.target.value })
                        }}
                        helpText={undefined}
                        labelPositioin={"top"}
                        variant={"outlined"}
                        isLabelBold
                        isValueBold
                    />
                </Flex>

                <Flex 
                    direction={"row"}
                    justifyContent={"center"}
                    gap={2}
                    mt={2}
                     >

                <Button
                   variant="contained"
                    onClick={() => {
                    signIn(
                        "email", 
                         {
                        email: user.email,
                        callbackUrl:'/profile'
                         },   
                        )
                    }}
                > התחבר
                </Button>

                <Button
                variant="contained"
                href="/"
                >דף הבית 
                </Button>

                
                <Button
                variant="contained"
                >צור קשר </Button>

                </Flex>

            </Box>
        </Flex>
        
    )
}