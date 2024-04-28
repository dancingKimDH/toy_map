import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google"
import NaverProvider from "next-auth/providers/naver"
import prisma from "@/db"

export const authOptions: NextAuthOptions = {
  
  // jwt: JSON Web Tokens, user session authentic for 24 hours, logged out after two hours of inactivity 
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2, 
  },

  adapter: PrismaAdapter(prisma),
  providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      NaverProvider({
        clientId: process.env.NAVER_CLIENT_ID || "",
        clientSecret: process.env.NAVER_CLIENT_SECRET || "",
      })
  ],
  pages: {
    signIn: "/users/login"
  },

  callbacks: {
    // the callback is executed when a session(user's authentication status) is created or updated
    // When a JWT is created/updated, the jwt callback is triggered: updates the sub with the id from the user object
    // The session callback is triggered when a session is created/updated: receives the updated token object
    session: ({session, token}) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({user, token}) => {
      if(user) {
        token.sub = user.id;
      }
      return token;
    }
  }
}
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};