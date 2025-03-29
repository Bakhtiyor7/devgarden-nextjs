import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

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
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        </body>
        </html>
    );
}