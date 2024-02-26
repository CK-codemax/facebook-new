
import GoogleProvider from "next-auth/providers/google";
//import FacebookProvider from "next-auth/providers/facebook"

export const options = {
    providers: [

      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_CLIENT_ID,
      //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      //   // authorization: {
      //   //   params: {
      //   //     prompt: "consent",
      //   //     access_type: "offline",
      //   //     response_type: "code"
      //   //   }
      //   // }
      // }),

      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      })

      
    ],
    session : {
      strategy : 'jwt',
    },

    // debug : true,
  }
