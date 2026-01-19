// src/components/CategoryFilter.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CategoryButton from './CategoryButton'

interface CategoryFilterProps {
    categories: string[]
    activeCategory?: string // <-- new
    onCategoryChange?: (category: string | null) => void
}

export default function CategoryFilter({
    categories,
    activeCategory: activeFromServer = 'All',
    onCategoryChange,
}: CategoryFilterProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(
        activeFromServer ?? 'All'
    )

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // keep local state in sync with URL-driven prop
    useEffect(() => {
        setActiveCategory(activeFromServer ?? 'All')
    }, [activeFromServer])

    const handleCategoryClick = (category: string) => {
        const isSame = activeCategory === category
        const next = isSame ? 'All' : category
        setActiveCategory(next)
        onCategoryChange?.(next === 'All' ? null : next)

        const params = new URLSearchParams(searchParams.toString())
        if (next === 'All' || !next) params.delete('category')
        else params.set('category', next)

        // Replace (no scroll) -> triggers server re-render with filtered posts
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="w-auto flex flex-row gap-[32px]">
            {categories.map((category) => (
                <CategoryButton
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    isActive={activeCategory === category}
                >
                    {category}
                </CategoryButton>
            ))}
        </div>
    )
}
