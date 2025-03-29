import { GET_POSTS } from "@/graphql/queries";
import { use } from "react";
import client from "@/lib/apollo-client";

// Fetch posts on the server (Server Component)
async function fetchPosts() {
    const { data } = await client.query({ query: GET_POSTS });
    return data.getPosts; // Changed from 'data.posts' to 'data.getPosts'
}

export default async function Home() {
    const posts = await fetchPosts();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to My Blog</h1>
            <div className="space-y-4">
                {posts.map((post: any) => (
                    <div key={post.id} className="p-4 bg-white rounded-md shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                        <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
                        <p className="text-sm text-gray-500">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}