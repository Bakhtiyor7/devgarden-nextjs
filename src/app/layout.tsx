// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import HydrationFix from "@/components/HydrationLogger";
import ThemeRegistry from "@/components/ThemeRegistry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Providers } from "@/app/providers";
import Footer from "@/components/Footer";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <Providers>
            <ThemeRegistry>
              <Navbar />
              <HydrationFix />
              <main>{children}</main>
              <Footer />
            </ThemeRegistry>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
