import { gql } from "@apollo/client";

// Fetch all posts
export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      content
      author
      createdAt
      image
      updatedAt
      category {
        name
      }
      tags {
        name
      }
    }
  }
`;

// Fetch a single post by ID
export const GET_POST = gql`
  query GetPost($id: Int!) {
    getPost(id: $id) {
      id
      title
      content
      author
      createdAt
      updatedAt
      image
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
