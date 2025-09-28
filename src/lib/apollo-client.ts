import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    DefaultOptions,
} from '@apollo/client'

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
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
    cache: new InMemoryCache(),
    defaultOptions,
})

export default client
