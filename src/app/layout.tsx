import type { Metadata } from "next";
import "./globals.css";
import ApolloWrapper from "@/components/ApolloWrapper";
import Navbar from "@/components/navbar"; // Import the wrapper

export const metadata: Metadata = {
    title: "My Blog",
    description: "A simple blog with Next.js",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-gray-100">
        <ApolloWrapper>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
        </ApolloWrapper>
        </body>
        </html>
    );
}