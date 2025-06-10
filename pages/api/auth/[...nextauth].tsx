import NextAuth, { } from "next-auth"
import { AuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import MongoClient from '@/util/mongo/adpter_promiss-client'
import { Adapter } from "next-auth/adapters"
import {z} from 'zod'

/**
 * 
 * use on password validate 
 *   const authKeyBuffer = encoder.encode(user,pass);
     const inputKeyBuffer = encoder.encode(input.pass); 
     const isKeyValide = crypto.timingSafeEqual(new Uint8Array(authKeyBuffer), new Uint8Array(inputKeyBuffer))
 */

// Exdenting the type using -  module Augmentation
// to enclude extra filde in the session || && the User we need to add the fild to the type struc 
declare module "next-auth" {

  interface User {
    phoneNumber: string | null | undefined;
    id: string
    email: string
    name: string
    image: string
  }
}
// validate input  values  at run time 




// check evn
const NODE_ENV = process.env.NODE_ENV

export const authOptions: AuthOptions = {

  session: {
    strategy: "database"
  },
  adapter: MongoDBAdapter(MongoClient) as Adapter,

  providers: [

    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        },
      },
      from: 'Ecommerce <no-reply@ecommerce.com>',
      maxAge: 60 * 60 * 24,

    }),
  ],
  callbacks: {


    // When using the Credentials Provider the user object is 
    // the response returned from the authorize callback and the profile object is 
    // the raw body of the HTTP POST submission.

    async signIn({ user, ..._rest }) {

      const isValiedEmail = z.string().email().safeParse(user.email)

      if (!isValiedEmail.success) {
        return false
      }

      const dbAdapter = MongoDBAdapter(MongoClient)

      const { getUserByEmail } = dbAdapter

      // using the Adpter Driver getUserByEmail expose fn
      // the return type from can be undefined so null chack 

      if (!getUserByEmail) {
        return false
      }

      const isUser = await getUserByEmail(user.email)

      console.log(isUser, 'isUser')

      if (!isUser) {
        return false
      }

      return true

    },

    //The redirect callback is called anytime 
    // the user is redirected to a callback URL (e.g. on signin or signout).
    //By default only URLs on the same URL as the site are allowed
    // , you can use the redirect callback to customise that behaviour.
    //The default redirect callback looks like this:

    // async redirect({ baseUrl }) {
    //   return `${baseUrl}`; // Redirect after login
    // },




    // async jwt({ token, user, account, profile, }) {

    /*
      sing In Pass data to JWT Token 
      This callback is called whenever a JSON Web 
      Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
      The returned value will be encrypted, and it is stored in a cookie.
      token, user, account, ans  profile passed from singIn callback
     */

    //   return token
    // },


    // //  the Session Validate On JWT Token 


    async session({ session, token, user }) {

      // user aeg is the return quray from db 

      // session object is exposed to front end 

      console.log(user, 'user _ session', "token", token, session, "session")
      /*
           If you want to make something available you added to 
          the token (like access_token and user.id from above) via the jwt() callback,
           you have to explicitly forward it here t o make it available to the client.
    
          When using JSON Web Tokens and not Db for sessions,
           the JWT payload (token) is provided instead of user .
    
          Danger !!!
          If using JSON Web Tokens instead of database sessions,
           you should use the User ID or a unique key stored in the
          token (you will need to generate a key for this yourself on sign in,
          as access tokens for sessions are not generated when using JSON Web Tokens).
    
        Adds the displayName from the token to the session
        */
      session.user = user

      return session; // Return the updated session
    }

  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: "/auth/error",
    verifyRequest: '/auth/verify-request',

  },
  useSecureCookies: NODE_ENV === 'production' ? true : false,
}

export default NextAuth(authOptions)
