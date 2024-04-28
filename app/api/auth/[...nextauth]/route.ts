import NextAuth from "next-auth/next"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import NaverProvider from "next-auth/providers/naver"
import prisma from "@/db"

import { authOptions } from "./authOptions"

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};