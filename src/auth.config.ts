import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
    providers: [
        Credentials({}),
    ],
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isPublicRoute = ["/login", "/register", "/"].includes(nextUrl.pathname)

            if (!isLoggedIn && !isPublicRoute) {
                return false // Redirect to login
            }

            if (isLoggedIn && isPublicRoute) {
                if (nextUrl.pathname !== "/") {
                    return Response.redirect(new URL("/dashboard", nextUrl))
                }
            }

            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.sub = user.id
                token.name = user.name
                token.email = user.email
            }
            return token
        },
        session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
    },
} satisfies NextAuthConfig
