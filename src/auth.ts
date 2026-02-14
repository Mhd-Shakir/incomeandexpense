import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

// Destructure to avoid "providers specified more than once" warning during spread
const { providers: _, ...configWithoutProviders } = authConfig

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...configWithoutProviders,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await prisma.user.findUnique({ where: { email } })
                    if (!user || !user.password) return null

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) return user
                }

                return null
            },
        }),
    ],
})
