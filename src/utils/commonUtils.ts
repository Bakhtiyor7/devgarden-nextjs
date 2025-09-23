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
