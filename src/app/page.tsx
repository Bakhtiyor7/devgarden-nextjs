// src/app/page.tsx
import Link from 'next/link'
import client from '@/lib/apollo-client'
import { GET_POSTS } from '@/graphql/queries'
import Header from '@/components/header'
import Image from 'next/image'
import './homepage.css'
import CategoryButton from '@/components/CategoryButton'
import PostCard from '@/components/PostCard'

// Type for posts returned by GET_POSTS
interface Post {
    id: number
    title: string
    content: string
    author: string
    createdAt: string
    image?: string
}

async function fetchPosts(): Promise<Post[]> {
    const { data, errors } = await client.query<{ getPosts: Post[] }>({
        query: GET_POSTS,
        errorPolicy: 'all',
    })

    if (errors?.length) {
        console.error('GET_POSTS errors:', errors)
        return []
    }
    return data.getPosts
}

export default async function Home() {
    const posts = await fetchPosts()

    return (
        <div className="home-page">
            <div className={'homepage-wrapper'}>
                <Header />
                <div className="posts-container">
                    <div className="w-auto flex flex-row gap-[32px]">
                        <CategoryButton>Category1</CategoryButton>
                        <CategoryButton>Category2</CategoryButton>
                        <CategoryButton>Category3</CategoryButton>
                        <CategoryButton>Category4</CategoryButton>
                    </div>
                    <div className="posts-list">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                author={post.author}
                                createdAt={post.createdAt}
                                image={post.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
