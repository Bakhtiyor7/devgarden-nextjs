'use client'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isSignedIn, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Only redirect after loading is complete and user is not signed in
        if (!isLoading && !isSignedIn) {
            router.replace('/login')
        }
    }, [isSignedIn, isLoading, router])

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0F1014]">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    // Show redirecting message if not signed in
    if (!isSignedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0F1014]">
                <div className="text-white">Redirecting to login page...</div>
            </div>
        )
    }

    return <>{children}</>
}
