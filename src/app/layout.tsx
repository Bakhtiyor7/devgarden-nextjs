// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import ThemeRegistry from "@/components/ThemeRegistry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Providers } from "@/app/providers";

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
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gray-100 w-full flex flex-col">
        {/* collect & stream MUI styles server-side */}
        <AppRouterCacheProvider>
          <Providers>
            <ThemeRegistry>
              <Navbar />
              <main className="container mx-auto max-w-screen-lg p-4 flex-grow">
                {children}
              </main>
            </ThemeRegistry>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
