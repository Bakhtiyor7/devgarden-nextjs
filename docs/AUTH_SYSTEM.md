# Authentication System - Cookie-Based SSR Solution

## Overview

This authentication system has been upgraded from localStorage to cookies to properly support Server-Side Rendering (SSR) and eliminate race conditions in protected routes.

## Key Improvements

### 1. **Cookie-Based Storage**

- Authentication tokens and user data are now stored in HTTP cookies
- Cookies are accessible both client-side and server-side
- Proper cookie security settings (secure, sameSite, expiration)

### 2. **SSR Compatible**

- Server can read authentication state during initial render
- No hydration mismatches between server and client
- Proper loading states to handle auth initialization

### 3. **Multiple Protection Layers**

- Client-side ProtectedRoute component
- Server-side ServerProtectedRoute component
- useAuthRedirect hook for additional protection
- Navbar visibility controls

## Components and Hooks

### `useAuth()` Hook

```tsx
const { isSignedIn, isLoading, user, token, signIn, signOut } = useAuth()
```

- `isLoading`: Indicates if auth state is still being initialized
- Other properties remain the same but now work with cookies

### `ProtectedRoute` Component (Client-side)

```tsx
<ProtectedRoute>
    <YourProtectedContent />
</ProtectedRoute>
```

- Shows loading state while checking authentication
- Redirects to login if not authenticated
- Works with client-side navigation

### `ServerProtectedRoute` Component (Server-side)

```tsx
// In your page.tsx (Server Component)
export default async function ProtectedPage() {
    return (
        <ServerProtectedRoute>
            <YourProtectedContent />
        </ServerProtectedRoute>
    )
}
```

- Provides SSR-level protection
- Immediate redirect without client-side flash
- Best for pages that should never be visible to unauthenticated users

### `useAuthRedirect()` Hook

```tsx
// Additional client-side protection
useAuthRedirect({
    protectedRoutes: ['/write', '/mypage', '/admin'],
    redirectTo: '/login',
})
```

### `getServerAuthState()` Function

```tsx
// In Server Components
const authState = await getServerAuthState()
```

- Read authentication state on the server
- Useful for conditional rendering and data fetching

## Usage Examples

### For Client Components with Protection

```tsx
'use client'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function WritePage() {
    return (
        <ProtectedRoute>
            <div>Your protected content here</div>
        </ProtectedRoute>
    )
}
```

### For Server Components with Protection

```tsx
import ServerProtectedRoute from '@/components/ServerProtectedRoute'

export default async function AdminPage() {
    return (
        <ServerProtectedRoute>
            <div>Your protected content here</div>
        </ServerProtectedRoute>
    )
}
```

### For Pages with Additional Hook Protection

```tsx
'use client'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'

export default function SomePage() {
    useAuthRedirect() // Additional protection layer

    return <div>Content</div>
}
```

## Migration Notes

### What Changed

1. **Storage**: localStorage → HTTP cookies
2. **Loading State**: Added `isLoading` to auth context
3. **SSR Support**: Server-side authentication checking
4. **Race Conditions**: Eliminated through proper loading states

### What Stayed the Same

- `signIn()` and `signOut()` function signatures
- `isSignedIn` and `user` properties
- Basic usage patterns for most components

## Security Features

- **Secure Cookies**: Automatically secure in production
- **SameSite Protection**: Prevents CSRF attacks
- **Automatic Expiration**: 7-day cookie expiration
- **Proper Cleanup**: Cookies removed on logout

## Best Practices

1. **Use ServerProtectedRoute** for pages that should never show to unauthenticated users
2. **Use ProtectedRoute** for client components that need protection
3. **Check isLoading** before making auth-dependent decisions
4. **Use useAuthRedirect** as an additional layer for complex routing logic

## Troubleshooting

### Common Issues

1. **Hydration Warnings**: Make sure to check `isLoading` before rendering auth-dependent content
2. **Cookie Not Persisting**: Check if your app is running over HTTPS in production
3. **Redirect Loops**: Ensure protected routes don't redirect to themselves

### Debug Tips

- Check browser developer tools → Application → Cookies to see stored auth data
- Use `console.log(authState)` in server components to debug server-side auth state
- Monitor network requests to ensure cookies are being sent with requests
