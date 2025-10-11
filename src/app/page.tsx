// src/app/page.tsx
import Link from 'next/link'
import client from '@/lib/apollo-client'
import { GET_POSTS } from '@/graphql/queries'
import Header from '@/components/header'
import Image from 'next/image'
import './homepage.css'
import CategoryFilter from '@/components/CategoryFilter'
import PostCard from '@/components/PostCard'
import { stripHtml, toExcerpt } from '@/utils/commonUtils'

// Type for posts returned by GET_POSTS
interface Post {
    id: number
    title: string
    content: string
    author: string
    createdAt: string
    image?: string
}

async function fetchPosts(categoryName?: string): Promise<Post[]> {
    const { data, errors } = await client.query<{ getPosts: Post[] }>({
        query: GET_POSTS,
        variables: { categoryName }, // Example variables
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    })

    if (errors?.length) {
        console.error('GET_POSTS errors:', errors)
        return []
    }
    return data.getPosts
}

async function handleCategory(category: string | null) {
    // Placeholder for category filtering logic
    console.log('Selected category:', category)
}

export default async function Home({
    searchParams,
}: {
    searchParams?: { category?: string }
}) {
    const categories = [
        'All',
        'Technology',
        'Design',
        'Programming',
        'Tutorial',
    ]

    const selected = searchParams?.category
    const categoryForQuery =
        selected && selected !== 'All' ? selected : undefined

    const posts = await fetchPosts(categoryForQuery)

    return (
        <div className="home-page">
            <div className={'homepage-wrapper'}>
                <Header />
                <div className="posts-container">
                    <CategoryFilter
                        categories={categories}
                        activeCategory={selected ?? 'All'}
                    />
                    <div className="posts-list">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={toExcerpt(post.content)}
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
