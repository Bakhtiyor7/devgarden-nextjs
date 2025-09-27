// src/utils/commonUtils.ts (server/client safe)
import striptags from 'striptags'

export function stripHtml(html: string): string {
    // Pure text
    return striptags(html ?? '')
}

export function toExcerpt(html: string, max = 180): string {
    const text = stripHtml(html).replace(/\s+/g, ' ').trim()
    return text.length > max ? text.slice(0, max) + '…' : text
}

export function firstImageSrc(html?: string): string | null {
    if (!html) return null
    // Browser path
    if (typeof window !== 'undefined' && 'DOMParser' in window) {
        try {
            const doc = new DOMParser().parseFromString(html, 'text/html')
            return doc.querySelector('img')?.getAttribute('src') || null
        } catch {
            /* fallthrough */
        }
    }
    // Server-safe fallback
    const m = html.match(/<img\b[^>]*?\bsrc\s*=\s*(['"])(.*?)\1/ims)
    return m?.[2] ?? null
}
