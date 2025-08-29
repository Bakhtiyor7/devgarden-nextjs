'use client'
import ProtectedRoute from '@/components/ProtectedRoute'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import TipTapEditor from '@/components/TipTapEditor'

export default function Write() {
    const titleRef = useRef<HTMLInputElement>(null)
    const [content, setContent] = useState('')

    const handlePublish = async () => {
        const title = titleRef.current?.value

        if (!title || !content || content === '<p></p>') {
            alert('Please fill in both title and content')
            return
        }

        // TODO: make api call
        // handle image upload

        // Here you would typically make an API call to publish the post
        console.log('Publishing post:', { title, content })
        alert('Post published successfully!')

        // Clear the form or redirect
        if (titleRef.current) titleRef.current.value = ''
        setContent('')
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
    }, [content])

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
                        </div>

                        {/* <div className="flex justify-end">
                            <button
                                onClick={handlePublish}
                                className="bg-[#41d26c] text-[#0F1014] font-semibold px-8 py-4 rounded-lg hover:bg-[#3ec766] transition-colors"
                            >
                                Publish Post
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
