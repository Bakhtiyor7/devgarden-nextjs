import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3000/graphql"; // Adjust to your Nest.js GraphQL endpoint

export const client = new GraphQLClient(endpoint, {
    headers: {
        // Add auth headers if needed (e.g., for /mypage or /write)
        // Authorization: `Bearer ${token}`,
    },
});