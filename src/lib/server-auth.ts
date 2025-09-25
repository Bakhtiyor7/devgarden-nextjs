import { cookies } from 'next/headers'

export async function getServerAuthState() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const userCookie = cookieStore.get('user')?.value

    let user = null
    if (userCookie) {
        try {
            user = JSON.parse(userCookie)
        } catch (e) {
            console.error('Failed to parse user from server cookies')
        }
    }

    return {
        token: token || null,
        user: user,
        isSignedIn: !!token,
    }
}
