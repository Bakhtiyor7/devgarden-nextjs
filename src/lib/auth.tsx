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
import Cookies from 'js-cookie'

interface User {
    id: number
    username?: string
    email?: string
}

interface AuthContextType {
    token: string | null
    user: User | null
    isSignedIn: boolean
    isLoading: boolean
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
    const [isLoading, setIsLoading] = useState(true)

    // Load token and user from cookies on mount
    useEffect(() => {
        const storedToken = Cookies.get('token')
        const storedUser = Cookies.get('user')

        if (storedToken) {
            setToken(storedToken)
        }

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                console.error('Failed to parse user from cookies')
                // Clear invalid cookie
                Cookies.remove('user')
            }
        }

        setIsLoading(false)
    }, [])

    // Save token and user to cookies when they change
    useEffect(() => {
        if (token) {
            // Set cookie with 7 days expiration, secure and sameSite options
            Cookies.set('token', token, {
                expires: 7,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
        } else {
            Cookies.remove('token')
        }
    }, [token])

    useEffect(() => {
        if (user) {
            Cookies.set('user', JSON.stringify(user), {
                expires: 7,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
        } else {
            Cookies.remove('user')
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
        // Cookies will be cleared by the useEffect hooks when token/user become null
    }

    const value: AuthContextType = {
        token,
        user,
        isSignedIn: !!token,
        isLoading,
        signIn,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </AuthContext.Provider>
    )
}
