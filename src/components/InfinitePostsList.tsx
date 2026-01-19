'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_POSTS } from '@/graphql/queries'
import PostCard from './PostCard'
import { toExcerpt } from '@/utils/commonUtils'

interface Post {
    id: number
    title: string
    content: string
    author: string
    createdAt: string
    image?: string
}

interface PostEdge {
    cursor: string
    node: Post
}

interface PageInfo {
    endCursor: string | null
    hasNextPage: boolean
}

interface GetPostsData {
    getPosts: {
        edges: PostEdge[]
        pageInfo: PageInfo
    }
}

interface InfinitePostsListProps {
    initialPosts: Post[]
    initialPageInfo: PageInfo
    categoryName?: string
}

export default function InfinitePostsList({
    initialPosts,
    initialPageInfo,
    categoryName,
}: InfinitePostsListProps) {
    const sentinelRef = useRef<HTMLDivElement>(null)
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    // Reset state when category changes
    useEffect(() => {
        setPosts(initialPosts)
        setPageInfo(initialPageInfo)
    }, [initialPosts, initialPageInfo, categoryName])

    const [fetchMorePosts] = useLazyQuery<GetPostsData>(GET_POSTS, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (data?.getPosts) {
                const newPosts = data.getPosts.edges.map((e) => e.node)
                // Deduplicate posts by id
                setPosts((prev) => {
                    const existingIds = new Set(prev.map((p) => p.id))
                    const uniqueNewPosts = newPosts.filter((p) => !existingIds.has(p.id))
                    return [...prev, ...uniqueNewPosts]
                })
                setPageInfo(data.getPosts.pageInfo)
            }
            setIsLoadingMore(false)
        },
        onError: (err) => {
            console.error('Error loading more posts:', err)
            if (err.graphQLErrors) {
                console.error('GraphQL Errors:', err.graphQLErrors)
            }
            if (err.networkError) {
                console.error('Network Error:', err.networkError)
            }
            setIsLoadingMore(false)
        },
    })

    const loadMore = useCallback(() => {
        if (isLoadingMore || !pageInfo.hasNextPage || !pageInfo.endCursor) return

        setIsLoadingMore(true)
        fetchMorePosts({
            variables: {
                first: 10,
                after: pageInfo.endCursor,
                categoryName: categoryName || undefined,
            },
        })
    }, [isLoadingMore, pageInfo, fetchMorePosts, categoryName])

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (entry.isIntersecting) {
                    loadMore()
                }
            },
            {
                root: null,
                rootMargin: '100px',
                threshold: 0,
            }
        )

        observer.observe(sentinel)

        return () => {
            observer.disconnect()
        }
    }, [loadMore])

    return (
        <>
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
                {posts.length === 0 && !isLoadingMore && (
                    <div className="empty-state">No posts yet.</div>
                )}
            </div>

            {/* Sentinel element for infinite scroll */}
            <div ref={sentinelRef} className="h-10 flex items-center justify-center">
                {isLoadingMore && (
                    <div className="flex items-center gap-2 text-[#666666]">
                        <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span>Loading more posts...</span>
                    </div>
                )}
            </div>
        </>
    )
}
