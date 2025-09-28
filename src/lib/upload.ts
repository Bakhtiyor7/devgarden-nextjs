// lib/upload.ts
import Cookies from 'js-cookie'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001' // ← fallback

export async function uploadImage(file: File): Promise<string> {
    const fd = new FormData()
    fd.append('file', file)

    // Get the JWT token from cookies
    const token = Cookies.get('token')

    const res = await fetch(`${API_BASE}/upload/image`, {
        method: 'POST',
        body: fd,
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
    })
    if (!res.ok) {
        let detail = ''
        try {
            detail = JSON.stringify(await res.json())
        } catch {}
        throw new Error(detail || `Upload failed (${res.status})`)
    }

    const { url } = await res.json()
    return url.startsWith('http') ? url : `${API_BASE}${url}` // return absolute if your consumer needs it
}
