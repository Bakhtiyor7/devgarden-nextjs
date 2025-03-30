import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md p-4 w-full max-h-[75px]">
            <div className="container mx-auto flex justify-between items-center">
                {/* Homepage Link */}
                <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors">
                    DevGarden
                </Link>

                {/* Right Side: Search, Write, Mypage */}
                <div className="flex items-center space-x-6 row-auto">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search anything"
                        className="border rounded-[20px] p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />

                    {/* Write Icon/Link */}
                    <Link href="/write" className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        <span className="ml-2">Write</span>
                    </Link>

                    {/* Mypage Icon/Link */}
                    <Link href="/mypage" className="text-gray-600 hover:text-blue-500 transition-colors">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    );
}