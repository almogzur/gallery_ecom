
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NavWrapper from "@/components/navigation/nav_wrap"
import { Stack as Flex, Box } from '@mui/material'
import InputWrap from "@/components/mui-input-wrap/input-wrap"
import Image from "next/image"
import UnknownImage from '@/public/unknown_user.jpg'

export default function ProfilePage() {

    const { data: session, status } = useSession()
    const router = useRouter()

    const [] = useState({})

    const ProfileAvatarBox = Box

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push("/")
        }
    }, [router, status])




    if  ( status === "loading") {
        return <h1>loading</h1>
    }
    else
        return (
            <>
                <NavWrapper
                    App_Bars_Styles={{ position: 'unset' }}
                />

                <Flex  >

                    <Flex
                        direction={'row'}
                        justifyContent={"center"}
                        mt={2}

                    >
                        <ProfileAvatarBox >
                            <Image
                                alt={session?.user?.name || " User"}
                                {...UnknownImage}
                                height={200}
                                width={200}
                                style={{ borderRadius: 15 }}

                            />
                        </ProfileAvatarBox>
                    </Flex>

                    <Flex direction={'row'}>
                        <InputWrap
                            label={"שם מלא"}
                            value={undefined}
                            onChangeHandler={() => { }}
                            helpText={undefined}
                            labelPosition={"top"}
                            variant="filled"

                        />
                        <InputWrap
                            label={" טלפון"}
                            value={undefined}
                            onChangeHandler={() => { }}
                            helpText={undefined}
                            labelPosition={"top"}
                            variant="filled"
                        />
                        <InputWrap
                            label={"מיל"}
                            value={undefined}
                            onChangeHandler={() => { }}
                            helpText={undefined}
                            labelPosition={"top"}
                            variant="filled"
                        />
                    </Flex>

                </Flex>

            </>
        )
}