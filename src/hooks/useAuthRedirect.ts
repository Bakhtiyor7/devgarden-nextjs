'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'

interface UseAuthRedirectOptions {
    protectedRoutes?: string[]
    redirectTo?: string
}

// Hook to redirect users away from protected pages if not authenticated
export function useAuthRedirect(options: UseAuthRedirectOptions = {}) {
    const { protectedRoutes = ['/write', '/mypage'], redirectTo = '/login' } =
        options

    const { isSignedIn, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Only redirect after loading is complete
        if (!isLoading) {
            // Check if current path is protected and user is not signed in
            const isProtectedRoute = protectedRoutes.some((route) =>
                pathname.startsWith(route)
            )

            if (isProtectedRoute && !isSignedIn) {
                router.replace(redirectTo)
            }
        }
    }, [isSignedIn, isLoading, router, pathname, protectedRoutes, redirectTo])

    return {
        isProtectedRoute: protectedRoutes.some((route) =>
            pathname.startsWith(route)
        ),
        shouldRedirect:
            !isLoading &&
            !isSignedIn &&
            protectedRoutes.some((route) => pathname.startsWith(route)),
    }
}
