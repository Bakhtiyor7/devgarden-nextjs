'use client'

import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
    id: number
    title: string
    content: string
    author: string
    createdAt: string
    image?: string
}

export default function PostCard({
    id,
    title,
    content,
    author,
    createdAt,
    image,
}: PostCardProps) {
    return (
        <Link href={`/article/${id}`} className="block no-underline">
            <div className="w-[380px] h-[520px] rounded-xl border border-[#333336] p-[20px] bg-[#0F1014] hover:translate-y-[-2px] transition-transform duration-200">
                {/* Post Image */}
                <div className="w-[340px] h-[240px] mb-[24px]">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                                ;(e.target as HTMLImageElement).src =
                                    '/header-image.png'
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#333336] to-[#1a1a1a] rounded-lg flex items-center justify-center">
                            <div className="text-[#666666] text-center">
                                <svg
                                    className="w-12 h-12 mx-auto mb-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-xs">No Image</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Post Content */}
                <div className="w-[340px]">
                    {/* Title */}
                    <h2 className="w-[320px] h-[28px] text-white font-semibold text-[18px] leading-[28px] mb-[12px] overflow-hidden">
                        {title}
                    </h2>

                    {/* Content */}
                    <p className="w-[340px] h-[40px] text-[#A3A3A3] text-[15px] leading-[20px] opacity-50 mb-[20px] overflow-hidden">
                        {content.slice(0, 400)}…
                    </p>

                    {/* Author */}
                    <div className="flex flex-row items-center gap-2 text-[#666666] text-[13px]">
                        <Image
                            src="/profile-img.jpg"
                            alt="Author"
                            width={22}
                            height={22}
                            className="rounded-full object-cover"
                        />
                        <span>{author}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
