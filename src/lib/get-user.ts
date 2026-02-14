import { auth } from "../auth"

export async function getUserId() {
    const session = await auth()

    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    return session.user.id
}
