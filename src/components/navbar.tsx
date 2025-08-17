"use client";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./styles/navbar.css";
import Image from "next/image";

export default function Navbar() {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    // clear your token + Apollo cache
    signOut();
    // then send them to the login page
    alert("Successfully logged out");
    router.push("/");
  };
  return (
    <nav className="navbar">
      <div className="wrapper">
        <div className="container">
          {/* Homepage Link */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors"
          >
            <Image src="/logo.png" alt="project logo" width={121} height={40} />
          </Link>

          {/* Right Side: Search, Write, Mypage */}
          <div className="flex items-center space-x-6 row-auto suppressHydrationWarning">
            {/* Search Bar */}
            {/*<input*/}
            {/*  type="text"*/}
            {/*  placeholder="Search anything"*/}
            {/*  className="border rounded-[20px] p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"*/}
            {/*/>*/}

            {/* Write Icon/Link */}
            <Link
              href="/write"
              className="flex items-center text-white hover:text-blue-500 transition-colors"
            >
              {/* <span className="ml-2">Write</span> */}
              <Image src="/write.png" alt="Write" width={24} height={24} />
            </Link>

            {/* Mypage Icon/Link */}
            {isSignedIn ? (
              <Link
                href="/mypage"
                className="text-white hover:text-blue-500 transition-colors"
              >
                <Image src="/mypage.png" alt="My Page" width={24} height={24} />
              </Link>
            ) : null}
            {isSignedIn ? null : (
              <div className={"login-btn-container"}>
                <Link href="/signup" className="signup-btn">
                  Signup
                </Link>
                <Link href="/login" className="login-btn">
                  Login
                </Link>
              </div>
            )}

            {isSignedIn ? (
              <Link
                href="/"
                onClick={handleLogout}
                className="text-sm text-blue-500 hover:underline"
              >
                Logout
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
