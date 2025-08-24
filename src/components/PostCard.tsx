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
        <Link href={`/article/${id}`} className="w-full block no-underline">
            <div className="w-full h-[394px] rounded-xl border border-[#333336] p-10 bg-[#0F1014] flex flex-row items-center gap-[50px] box-border hover:translate-y-[-2px] transition-transform duration-200">
                <div className="w-[314px] h-[314px] min-w-[314px]">
                    <img
                        src={image || '/placeholder-image.jpg'}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex-1 p-0 flex flex-col h-full justify-between">
                    <div className="text-[#666666] text-[14px] mb-8">
                        <div className="flex flex-row gap-1">
                            <Image
                                src="/profile-img.jpg"
                                alt="My Page"
                                width={24}
                                height={24}
                                className="rounded-full object-cover"
                            />
                            {author}
                            {/* Date can be uncommented if needed */}
                            {/* {new Intl.DateTimeFormat(
                                'en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            ).format(
                                new Date(createdAt)
                            )} */}
                        </div>
                    </div>
                    <div className="flex flex-col h-full start">
                        <h2 className="text-white font-semibold mb-4">
                            {title}
                        </h2>
                        <p className="text-[#A3A3A3] leading-relaxed mb-6">
                            {content.slice(0, 150)}…
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
