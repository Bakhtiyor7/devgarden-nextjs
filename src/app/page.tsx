// src/app/page.tsx
import client from '@/lib/apollo-client'
import { GET_POSTS } from '@/graphql/queries'
import Header from '@/components/header'
import './homepage.css'
import CategoryFilter from '@/components/CategoryFilter'
import InfinitePostsList from '@/components/InfinitePostsList'

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
    node: Post
}

type PageInfo = {
    endCursor: string | null
    hasNextPage: boolean
}

async function fetchPosts(
    categoryName: string | undefined,
    first: number,
    after?: string
) {
    const { data, errors } = await client.query<{
        getPosts: {
            edges: PostEdge[]
            pageInfo: PageInfo
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

export default async function Home({
    searchParams,
}: {
    searchParams?: { category?: string }
}) {
    const sp = await searchParams
    const selected = sp?.category

    const categoryForQuery =
        selected && selected !== 'All' ? selected : undefined
    const first = 10

    const { edges, pageInfo } = await fetchPosts(categoryForQuery, first)
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
                    <InfinitePostsList
                        initialPosts={posts}
                        initialPageInfo={pageInfo}
                        categoryName={categoryForQuery}
                    />
                </div>
            </div>
        </div>
    )
}
