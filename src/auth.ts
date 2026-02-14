import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

// Merge manually to ensure no duplicate keys or hidden conflicts
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: authConfig.pages,
    callbacks: authConfig.callbacks,
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data

                    try {
                        const user = await prisma.user.findUnique({ where: { email } })
                        if (!user || !user.password) return null

                        const passwordsMatch = await bcrypt.compare(password, user.password)
                        if (passwordsMatch) return user
                    } catch (dbError) {
                        console.error("Auth Database Error:", dbError)
                        return null
                    }
                }
                return null
            },
        }),
    ],
})
