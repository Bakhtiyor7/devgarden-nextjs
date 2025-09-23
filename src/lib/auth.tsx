'use client' // ← must be first line
import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    ReactNode,
    FC,
    JSX,
    useEffect,
} from 'react'
import { ApolloProvider } from '@apollo/client'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

interface User {
    id: number
    username?: string
    email?: string
}

interface AuthContextType {
    token: string | null
    user: User | null
    isSignedIn: boolean
    signIn: (credentials: {
        username: string
        password: string
    }) => Promise<void>
    signOut: () => void
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be inside <AuthProvider>')
    return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    // Load token and user from localStorage on mount
    useEffect(() => {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token')
            const storedUser = localStorage.getItem('user')

            if (storedToken) {
                setToken(storedToken)
            }

            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser))
                } catch (e) {
                    console.error('Failed to parse user from localStorage')
                }
            }
        }
    }, [])

    // Save token and user to localStorage when they change
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
    }, [token])

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    // HTTP link is constant
    const httpLink = useMemo(
        () =>
            new HttpLink({
                uri:
                    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
                    'http://localhost:3001/graphql',
            }),
        []
    )

    // authLink re‑runs whenever `token` changes
    const authLink = useMemo(
        () =>
            setContext((_, { headers }) => ({
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            })),
        [token]
    )

    // combine them into a single client
    const client = useMemo(
        () =>
            new ApolloClient({
                link: authLink.concat(httpLink),
                cache: new InMemoryCache(),
            }),
        [authLink, httpLink]
    )

    const signIn = async ({
        username,
        password,
    }: {
        username: string
        password: string
    }) => {
        // Update login mutation to fetch user data
        const LOGIN_MUTATION = gql`
            mutation Login($authInput: AuthInput!) {
                login(authInput: $authInput) {
                    access_token
                    user {
                        id
                        username
                        email
                    }
                }
            }
        `

        const { data } = await client.mutate<{
            login: {
                access_token: string
                user: {
                    id: number
                    username?: string
                    email?: string
                }
            }
        }>({
            mutation: LOGIN_MUTATION,
            variables: { authInput: { username, password } },
        })

        if (data?.login.access_token) {
            setToken(data.login.access_token)

            // Set user data if available
            if (data.login.user) {
                setUser({
                    id: data.login.user.id,
                    username: data.login.user.username,
                    email: data.login.user.email,
                })
            }
        }
    }

    const signOut = () => {
        setToken(null)
        setUser(null)
        client.clearStore()
    }

    const value: AuthContextType = {
        token,
        user,
        isSignedIn: !!token,
        signIn,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </AuthContext.Provider>
    )
}
