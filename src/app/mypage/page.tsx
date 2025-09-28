import Image from 'next/image'
import Link from 'next/link'

export default function MyPage() {
    return (
        <div className="flex w-screen flex-col justify-start items-center bg-[#0F1014] h-auto">
            <div className="max-w-[1280px] w-full flex flex-col px-[50px] py-[40px]">
                {/* Header with logo, search and profile */}
                {/* <div className="w-full flex items-center justify-between py-6 border-b border-[#2A2A2D] mb-12">
                    <Link href="/">
                        <h1 className="text-3xl text-white font-medium dunggeunmo hover:text-[#64da87] transition-colors">
                            Dev Garden
                        </h1>
                    </Link>

                    <div className="flex items-center gap-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-[#1A1B1F] text-white px-5 py-2.5 rounded-full border border-[#333336] w-[240px] focus:outline-none focus:border-[#64da87] transition-colors"
                            />
                        </div>

                        <Link
                            href="/write"
                            className="text-[#64da87] hover:text-[#4ebb6c] transition-colors text-lg"
                        >
                            Write
                        </Link>

                        <Link href="/mypage">
                            <div className="w-[44px] h-[44px] rounded-full overflow-hidden border-2 border-[#64da87]">
                                <Image
                                    src="/profile-img.jpg"
                                    alt="Profile"
                                    width={44}
                                    height={44}
                                    className="object-cover"
                                />
                            </div>
                        </Link>
                    </div>
                </div> */}

                {/* Main content with profile sidebar - reversed order */}
                <div className="w-full flex flex-row-reverse gap-16">
                    {/* Sidebar - now on the left visually */}
                    <div className="w-[320px]">
                        <div className="bg-[#141419] border border-[#2A2A2D] rounded-xl p-6 mb-6">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
                                    <Image
                                        src="/profile-img.jpg"
                                        alt="Profile"
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                </div>
                                <h2 className="text-white text-2xl font-semibold">
                                    Bakhtiyor
                                </h2>
                            </div>

                            <p className="text-[#A3A3A3] mb-6 flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                5 followers
                            </p>

                            <div className="bg-[#1A1B1F] p-4 mb-6 rounded-lg border border-[#2A2A2D]">
                                <h3 className="text-white text-lg mb-2 font-medium">
                                    About me
                                </h3>
                                <p className="text-[#A3A3A3]">
                                    Software developer passionate about creating
                                    beautiful user interfaces and solving
                                    complex problems.
                                </p>
                            </div>

                            <Link
                                href="/mypage/edit"
                                className="flex items-center justify-center w-full bg-[#1A1B1F] border border-[#333336] hover:border-[#64da87] py-3 rounded-lg text-white transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit profile
                            </Link>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-grow">
                        <h2 className="text-2xl text-white font-semibold mb-6">
                            My Posts
                        </h2>

                        <div className="space-y-6">
                            {/* Post items could go here */}
                            <div className="bg-[#141419] border border-[#2A2A2D] p-6 rounded-xl hover:border-[#333336] transition-colors">
                                <h3 className="text-xl text-white font-medium mb-3">
                                    Getting started with Next.js and Tailwind
                                </h3>
                                <p className="text-[#A3A3A3] mb-4">
                                    A comprehensive guide to setting up a
                                    Next.js project with Tailwind CSS and
                                    creating beautiful responsive designs.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#666666] text-sm">
                                        Aug 20, 2025
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[#666666] flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="3"
                                                ></circle>
                                            </svg>
                                            124
                                        </span>
                                        <span className="text-[#666666] flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                            </svg>
                                            18
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#141419] border border-[#2A2A2D] p-6 rounded-xl hover:border-[#333336] transition-colors">
                                <h3 className="text-xl text-white font-medium mb-3">
                                    Building a personal portfolio with React
                                </h3>
                                <p className="text-[#A3A3A3] mb-4">
                                    Step-by-step guide to create an impressive
                                    developer portfolio that showcases your
                                    skills and projects effectively.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#666666] text-sm">
                                        Aug 12, 2025
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[#666666] flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="3"
                                                ></circle>
                                            </svg>
                                            86
                                        </span>
                                        <span className="text-[#666666] flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                            </svg>
                                            12
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
