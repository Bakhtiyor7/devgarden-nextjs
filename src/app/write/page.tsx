'use client'
import ProtectedRoute from '@/components/ProtectedRoute'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import TipTapEditor from '@/components/TipTapEditor'
import { useAuth } from '@/lib/auth'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '@/graphql/queries'
import { firstImageSrc } from '@/utils/commonUtils'

export default function Write() {
    const { user } = useAuth()
    const titleRef = useRef<HTMLInputElement>(null)
    const [content, setContent] = useState('')
    const [category, setCategory] = useState<string>('')
    const [tagInput, setTagInput] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [createPost, { loading: mutationLoading }] = useMutation(CREATE_POST)

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput])
            setTagInput('')
        }
    }

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag))
    }

    const handlePublish = async () => {
        const title = titleRef.current?.value

        if (!title || !content || content === '<p></p>') {
            alert('Please fill in both title and content')
            return
        }

        setLoading(true)
        setError('')

        try {
            const tagInputs = tags.map((tag) => ({ name: tag }))
            const cover = image || firstImageSrc(content) || null
            const { data } = await createPost({
                variables: {
                    input: {
                        title,
                        content,
                        author: user?.username || 'Anonymous',
                        image: cover,
                        categoryName: category,
                        tags: tagInputs,
                    },
                },
            })

            // Show success message
            alert('Post published successfully!')

            // Redirect to the article page if we have an ID
            if (data?.createPost?.id) {
                window.location.href = `/article/${data.createPost.id}`
            } else {
                // Otherwise redirect to home
                window.location.href = '/'
            }
        } catch (error) {
            console.error('Error creating post:', error)
            setError('Failed to publish post. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Listen for the publish event from the navbar
        const handlePublishEvent = () => {
            handlePublish()
        }

        window.addEventListener('publishPost', handlePublishEvent)

        return () => {
            window.removeEventListener('publishPost', handlePublishEvent)
        }
    }, [content, category, tags, image])

    // TODO: Get categories from the server (DB)
    const categories = [
        'Technology',
        'Design',
        'Programming',
        'Tutorial',
        'Career',
        'DevOps',
        "Other"
    ]

    return (
        <ProtectedRoute>
            <div className="flex w-screen flex-col justify-center items-center bg-[#0F1014]">
                <div className="max-w-[1280px] w-full flex items-center justify-center flex-col px-[50px] pb-[60px]">
                    <div className="w-full mt-12">
                        <div className="w-full rounded-xl p-10 bg-[#0F1014] mb-8">
                            <div className="flex items-start flex-row gap-[10px] relative">
                                <div className="h-[auto]">
                                    <div className="w-[50px] h-[70px]">
                                        <Image
                                            src="/plant-mid.png"
                                            alt="Post Image"
                                            width={50}
                                            height={70}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <input
                                    ref={titleRef}
                                    type="text"
                                    placeholder="Title"
                                    className="w-full bg-transparent text-[57px] font-semibold text-white pb-2 mt-3 focus:outline-none"
                                />
                            </div>

                            {/* TipTap Rich Text Editor */}
                            <div className="mt-8">
                                <TipTapEditor
                                    content={content}
                                    onChange={setContent}
                                    placeholder="Start writing your amazing content..."
                                />
                            </div>

                            {/* category selector */}
                            <div className="mb-8">
                                <label className="block text-[#A3A3A3] mb-2">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="bg-[#1a1a1a] text-white border border-[#333336] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#64da87]"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tags input */}
                            <div className="mb-8">
                                <label className="block text-[#A3A3A3] mb-2">
                                    Tags
                                </label>
                                <div className="flex flex-row items-center">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' && handleAddTag()
                                        }
                                        placeholder="Add tag and press Enter"
                                        className="flex-1 bg-[#1a1a1a] text-white border border-[#333336] rounded-lg px-4 py-2 focus:outline-none focus:border-[#64da87]"
                                    />
                                    <button
                                        onClick={handleAddTag}
                                        className="ml-2 bg-[#1a1a1a] text-white border border-[#333336] rounded-lg px-4 py-2 hover:bg-[#333336]"
                                    >
                                        Add Tag
                                    </button>
                                </div>

                                {/* Tags display */}
                                {tags.length > 0 && (
                                    <div className="flex flex-row flex-wrap gap-2 mt-3">
                                        {tags.map((tag) => (
                                            <div
                                                key={tag}
                                                className="bg-[#1a1a1a] text-[#64da87] border border-[#333336] rounded-full px-3 py-1 text-sm flex items-center"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() =>
                                                        handleRemoveTag(tag)
                                                    }
                                                    className="ml-2 text-[#A3A3A3] hover:text-white"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Error message */}
                        {error && (
                            <div className="mt-4 text-red-500">{error}</div>
                        )}

                        {/* Publish button */}
                        {/* <div className="mt-8 flex justify-end">
                            <button
                                onClick={handlePublish}
                                disabled={loading || mutationLoading}
                                className="bg-[#41D26C] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#3EC766] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading || mutationLoading
                                    ? 'Publishing...'
                                    : 'Publish'}
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
