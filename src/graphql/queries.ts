import { gql } from "@apollo/client";

// Fetch all posts
export const GET_POSTS = gql`
    query GetPosts {
        posts {
            id
            title
            content
            author
            createdAt
            updatedAt
            category {
                name
            }
            tags {
                name
            }
            user {
                username
            }
        }
    }
`;

// Fetch a single post by ID
export const GET_POST = gql`
    query GetPost($id: Int!) {
        post(id: $id) {
            id
            title
            content
            author
            createdAt
            updatedAt
            category {
                name
            }
            tags {
                name
            }
            user {
                username
            }
            comments {
                id
                content
                author
                createdAt
            }
        }
    }
`;

// Fetch a user by ID (for /mypage)
export const GET_USER = gql`
    query GetUser($id: Int!) {
        user(id: $id) {
            id
            email
            username
            posts {
                id
                title
            }
        }
    }
`;