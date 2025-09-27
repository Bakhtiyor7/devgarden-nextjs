import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: '**',
                // port: '', // no port means any port
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig
