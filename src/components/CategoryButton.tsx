'use client'
import React from 'react'
import localFont from 'next/font/local'

const dg = localFont({
    src: '../../src/fonts/DungGeunMo.ttf', // adjust path if needed
    weight: '400',
    style: 'normal',
    display: 'swap',
})

interface CategoryButtonProps {
    children: React.ReactNode
    onClick?: () => void
    isActive?: boolean
}

export default function CategoryButton({
    children,
    onClick,
    isActive = false,
}: CategoryButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${dg.className} rounded-full text-[32px] transition-all duration-200 w-auto px-4 py-2 cursor-pointer ${
                isActive
                    ? 'text-[#64DA87]'
                    : 'text-gray-600 hover:text-[#64DA87]'
            }`}
        >
            {children}
        </button>
    )
}
