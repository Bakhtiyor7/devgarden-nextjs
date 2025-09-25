import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getServerAuthState } from '@/lib/server-auth'

interface ServerProtectedRouteProps {
    children: ReactNode
    redirectTo?: string
}

export default async function ServerProtectedRoute({
    children,
    redirectTo = '/login',
}: ServerProtectedRouteProps) {
    const { isSignedIn } = await getServerAuthState()

    if (!isSignedIn) {
        redirect(redirectTo)
    }

    return <>{children}</>
}
