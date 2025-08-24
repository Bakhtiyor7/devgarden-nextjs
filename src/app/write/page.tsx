import ProtectedRoute from '@/components/ProtectedRoute'
import Image from 'next/image'

export default function Write() {
    return (
        <ProtectedRoute>
            <div className="flex w-screen flex-col justify-center items-center bg-[#0F1014]">
                <div className="max-w-[1280px] w-full flex items-center justify-center flex-col px-[50px] pb-[60px]">
                    <div className="w-full mt-12">
                        {/* <h1 className="text-4xl font-semibold text-white mb-6">
                            Write a Post
                        </h1> */}

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
                                    type="text"
                                    placeholder="Title"
                                    className="w-full bg-transparent text-[57px] font-semibold text-white pb-2 mt-3 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-row items-start align-middle gap-[28px] mt-4 relative">
                                <div className="pt-1">
                                    <Image
                                        src="/plus-icn.png"
                                        alt="Post Image"
                                        width={34}
                                        height={34}
                                        className="object-contain"
                                    />
                                </div>
                                <textarea
                                    className="flex-1 min-h-[400px] bg-transparent text-[#A3A3A3] text-lg leading-relaxed focus:outline-none resize-none"
                                    placeholder="Start writing..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-[#41d26c] text-[#0F1014] font-semibold px-8 py-4 rounded-lg hover:bg-[#3ec766] transition-colors">
                                Publish Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
