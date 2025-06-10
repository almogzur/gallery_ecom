import { signOut  } from 'next-auth/react'



export default function  signOutPage (){

    return (
        <>
        <h1>signOut</h1>
        <button onClick={()=>{
            signOut()
        }}>signOut</button>
        </>
    )
}