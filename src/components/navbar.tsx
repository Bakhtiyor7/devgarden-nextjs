'use client'
import { useAuth } from '@/lib/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './styles/navbar.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const { isSignedIn, signOut, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        // clear your token + Apollo cache
        signOut()
        // then send them to the login page
        alert('Successfully logged out')
        router.push('/')
    }

    const handlePublish = () => {
        // Trigger the publish action by dispatching a custom event
        // This allows the write page to handle the actual publishing logic
        window.dispatchEvent(new CustomEvent('publishPost'))
    }
    return (
        <nav className="navbar">
            <div className="wrapper">
                <div className="container">
                    {/* Homepage Link */}
                    <Link
                        href="/"
                        className="text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors"
                    >
                        <Image
                            src="/logo.png"
                            alt="project logo"
                            width={121}
                            height={40}
                        />
                    </Link>

                    {/* Right Side: Search, Write, Mypage */}
                    <div className="flex items-center space-x-6 row-auto suppressHydrationWarning">
                        {/* Search Bar */}
                        {/*<input*/}
                        {/*  type="text"*/}
                        {/*  placeholder="Search anything"*/}
                        {/*  className="border rounded-[20px] p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"*/}
                        {/*/>*/}

                        {/* Write Icon/Link - Only show to signed in users */}
                        {!isLoading &&
                            isSignedIn &&
                            (pathname === '/write' ? (
                                <button
                                    onClick={handlePublish}
                                    className="flex items-center justify-center text-[#0F1014] transition-colors bg-[#41D26C] hover:bg-[#3ec766] w-[122px] h-[40px] px-6 py-2 rounded-[8px] font-semibold size-[16px]"
                                >
                                    Publish
                                </button>
                            ) : (
                                <Link
                                    href="/write"
                                    className="flex items-center justify-center text-[#41D26C] transition-colors border border-[#41D26C] w-[130px] h-[40px] px-6 py-2 rounded-md"
                                >
                                    <Image
                                        src="/write.png"
                                        alt="Write"
                                        width={24}
                                        height={24}
                                        className="write-icon"
                                    />
                                    <span className="ml-2 text-[#41D26C]">
                                        Write
                                    </span>
                                </Link>
                            ))}
                        {/* Mypage Icon/Link */}
                        {!isLoading && isSignedIn && (
                            <Link
                                href="/mypage"
                                className="text-white hover:text-blue-500 transition-colors"
                            >
                                <div className="flex items-center border border-gray-300 rounded-full p-0 hover:bg-gray-700 transition-colors cursor-pointer w-10 h-10">
                                    <Image
                                        src="/profile-img.jpg"
                                        alt="My Page"
                                        width={40}
                                        height={40}
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                        )}

                        {/* Login/Signup buttons - Only show to non-signed in users */}
                        {!isLoading && !isSignedIn && (
                            <div className={'login-btn-container'}>
                                <Link href="/signup" className="signup-btn">
                                    Signup
                                </Link>
                                <Link href="/login" className="login-btn">
                                    Login
                                </Link>
                            </div>
                        )}

                        {/* Logout button - Only show to signed in users */}
                        {!isLoading && isSignedIn && (
                            <Link
                                href="/"
                                onClick={handleLogout}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Logout
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
