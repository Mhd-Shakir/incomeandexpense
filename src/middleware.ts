import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    // The logic inside authConfig.callbacks.authorized will handle redirects
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
