'use client'
import React, { useState } from 'react'
import CategoryButton from './CategoryButton'

interface CategoryFilterProps {
    categories: string[]
    onCategoryChange?: (category: string | null) => void
}

export default function CategoryFilter({
    categories,
    onCategoryChange,
}: CategoryFilterProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    const handleCategoryClick = (category: string) => {
        // If clicking the same category, deselect it
        const newActiveCategory = activeCategory === category ? null : category
        setActiveCategory(newActiveCategory)
        onCategoryChange?.(newActiveCategory)
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
