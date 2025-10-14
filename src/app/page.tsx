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

type PostEdge = {
    cursor: string
    node: {
        id: number
        title: string
        content: string
        author: string
        createdAt: string
        image?: string
    }
}

async function fetchPosts(
    categoryName: string | undefined,
    first: number,
    after?: string
) {
    const { data, errors } = await client.query<{
        getPosts: {
            edges: PostEdge[]
            pageInfo: { endCursor: string | null; hasNextPage: boolean }
        }
    }>({
        query: GET_POSTS,
        variables: { first, after, categoryName },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    })
    if (errors?.length) {
        console.error('GET_POSTS errors:', errors)
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
    searchParams?: { category?: string; after?: string }
}) {
    const sp = await searchParams
    const selected = sp?.category
    const after = sp?.after

    const categoryForQuery =
        selected && selected !== 'All' ? selected : undefined
    const first = 10

    const { edges, pageInfo } = await fetchPosts(categoryForQuery, first, after)
    const posts = edges.map((e) => e.node)

    return (
        <div className="home-page">
            <div className="homepage-wrapper">
                <Header />
                <div className="posts-container">
                    <CategoryFilter
                        categories={[
                            'All',
                            'Technology',
                            'Design',
                            'Programming',
                            'Tutorial',
                        ]}
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
                        {posts.length === 0 && (
                            <div className="empty-state">No posts yet.</div>
                        )}
                    </div>

                    {/* Simple SSR-friendly "Next" pager */}
                    {pageInfo.hasNextPage && pageInfo.endCursor && (
                        <div className="pager mt-6">
                            <a
                                href={`/?${new URLSearchParams({
                                    ...(selected ? { category: selected } : {}),
                                    after: pageInfo.endCursor,
                                }).toString()}`}
                                className="btn"
                            >
                                Next
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
