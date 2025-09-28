// src/app/article/[id]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import client from '@/lib/apollo-client'
import { GET_POST } from '@/graphql/queries'
import Image from 'next/image'
import { formatYYYYMMDD } from '../../../../public/utils/formatDate'
import Link from 'next/link'
import { toExcerpt } from '@/utils/commonUtils'

// TS type matching the GET_POST result
interface Post {
    id: number
    title: string
    content: string
    author: string
    image?: string
    createdAt: string
    updatedAt: string
    category?: { name: string }
    tags?: { name: string }[]
    comments?: {
        id: number
        content: string
        author: string
        createdAt: string
    }[]
}

// 1) HEAD metadata loader
export async function generateMetadata({
    params,
}: {
    // in Next 13.4+, params is a promise for dynamic routes
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    // **await** the params before using
    const { id } = await params
    const idNum = parseInt(id, 10)

    const { data, errors } = await client.query<
        { getPost: Post },
        { id: number }
    >({
        query: GET_POST,
        variables: { id: idNum },
        errorPolicy: 'all',
    })

    if (errors?.length || !data.getPost) {
        return { title: 'Post Not Found' }
    }

    return {
        title: data.getPost.title,
        description: data.getPost.content.slice(0, 150),
    }
}

// 2) Page component
export default async function Article({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const idNum = parseInt(id, 10)

    // fetch once more for the page body
    let data: { getPost: Post }
    let errors: readonly any[] | undefined

    try {
        const result = await client.query<{ getPost: Post }, { id: number }>({
            query: GET_POST,
            variables: { id: idNum },
            errorPolicy: 'all',
        })
        data = result.data
        errors = result.errors
    } catch (networkError: any) {
        console.error(
            'HTTP-level error:',
            networkError.networkError?.result?.errors
        )
        return notFound()
    }

    // handle GraphQL validation or missing-post
    if (errors?.length || !data.getPost) {
        console.error('GraphQL errors:', errors)
        return notFound()
    }

    const post = data.getPost
    // title
    // image
    // const
    // author
    // createdAt

    return (
        <div className="flex w-screen flex-col justify-center items-center bg-[#0F1014]">
            <div className="max-w-[1280px] w-full flex items-center justify-center flex-col px-[50px] pb-[60px]">
                {/* Back button */}
                <div className="w-full mt-8 mb-6">
                    <Link
                        href="/"
                        className="text-[#64da87] hover:underline flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to home
                    </Link>
                </div>

                <article className="w-full rounded-xl p-10 bg-[#0F1014] mb-8">
                    {/* Author info */}
                    <div className="flex items-center gap-3 mb-8">
                        <Image
                            src="/profile-img.jpg"
                            alt={post.author}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <div className="text-[#666666]">
                            <span className="text-white">{post.author}</span> •{' '}
                            {formatYYYYMMDD(post.createdAt)}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-semibold text-white mb-8">
                        {post.title}
                    </h1>

                    {/* Featured Image */}
                    {/* {post.image && (
                        <div className="mb-10">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full rounded-lg object-cover max-h-[500px]"
                            />
                        </div>
                    )} */}

                    {/* Content */}
                    <div
                        className="prose prose-invert max-w-none text-[#A3A3A3] leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2 mt-8">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag.name}
                                    className="px-3 py-1 rounded-full bg-[#1A1B1F] text-[#A3A3A3] text-sm"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </article>
            </div>
        </div>
    )
}
