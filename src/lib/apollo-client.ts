import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    DefaultOptions,
} from '@apollo/client'

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
    },
    mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const client = new ApolloClient({
    link: new HttpLink({
        uri:
            process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
            'http://localhost:3001/graphql',
    }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getPosts: {
                        // Use arguments to differentiate cache entries
                        keyArgs: ['categoryName'],
                        merge(existing, incoming, { args }) {
                            // If no existing data or fetching from beginning, use incoming
                            if (!existing || !args?.after) {
                                return incoming
                            }

                            // Merge edges: append new edges to existing ones
                            const existingEdges = existing.edges || []
                            const incomingEdges = incoming.edges || []

                            // Deduplicate by cursor to avoid duplicates
                            const existingCursors = new Set(
                                existingEdges.map((e: { cursor: string }) => e.cursor)
                            )
                            const newEdges = incomingEdges.filter(
                                (e: { cursor: string }) => !existingCursors.has(e.cursor)
                            )

                            return {
                                ...incoming,
                                edges: [...existingEdges, ...newEdges],
                            }
                        },
                    },
                },
            },
        },
    }),
    defaultOptions,
})

export default client
