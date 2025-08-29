'use client'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Youtube from '@tiptap/extension-youtube'
import Placeholder from '@tiptap/extension-placeholder'
import { createLowlight } from 'lowlight'
import { useState, useRef, useEffect } from 'react'
import {
    Plus,
    Image as ImageIcon,
    Link as LinkIcon,
    Code,
    Video,
    Type,
} from 'lucide-react'
import './tiptap-styles.css'

interface TipTapEditorProps {
    content?: string
    onChange?: (content: string) => void
    placeholder?: string
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
    content = '',
    onChange,
    placeholder = 'Start writing...',
}) => {
    const [showMenu, setShowMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const editorRef = useRef<HTMLDivElement>(null)

    const lowlight = createLowlight()

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#64da87] underline hover:text-[#4ebb6c]',
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'bg-[#1A1B1F] border border-[#333336] rounded-lg p-4 my-4',
                },
            }),
            Youtube.configure({
                width: 640,
                height: 480,
                HTMLAttributes: {
                    class: 'rounded-lg my-4',
                },
            }),
            Placeholder.configure({
                placeholder,
                showOnlyWhenEditable: true,
                showOnlyCurrent: false,
            }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange?.(html)
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none text-[#A3A3A3] text-lg leading-relaxed min-h-[400px] p-4',
            },
        },
    })

    const updateMenuPosition = () => {
        if (!editor || !editorRef.current) return

        const { selection } = editor.state
        const { from } = selection
        const start = editor.view.coordsAtPos(from)
        const editorRect = editorRef.current.getBoundingClientRect()

        setMenuPosition({
            top: start.top - editorRect.top,
            left: -60, // Position to the left of the content
        })
    }

    useEffect(() => {
        if (!editor) return

        const updatePosition = () => {
            updateMenuPosition()
        }

        editor.on('selectionUpdate', updatePosition)
        editor.on('transaction', updatePosition)

        return () => {
            editor.off('selectionUpdate', updatePosition)
            editor.off('transaction', updatePosition)
        }
    }, [editor])

    const addImage = () => {
        const url = window.prompt('Enter image URL:')
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run()
        }
        setShowMenu(false)
    }

    const addLink = () => {
        const url = window.prompt('Enter link URL:')
        if (url && editor) {
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run()
        }
        setShowMenu(false)
    }

    const addCodeBlock = () => {
        if (editor) {
            editor.chain().focus().toggleCodeBlock().run()
        }
        setShowMenu(false)
    }

    const addYouTube = () => {
        const url = window.prompt('Enter YouTube URL:')
        if (url && editor) {
            editor.commands.setYoutubeVideo({
                src: url,
                width: 640,
                height: 480,
            })
        }
        setShowMenu(false)
    }

    const addHeading = () => {
        if (editor) {
            editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        setShowMenu(false)
    }

    const menuItems = [
        { icon: ImageIcon, label: 'Image', action: addImage },
        { icon: LinkIcon, label: 'Link', action: addLink },
        { icon: Code, label: 'Code', action: addCodeBlock },
        { icon: Video, label: 'Video', action: addYouTube },
        { icon: Type, label: 'Heading', action: addHeading },
    ]

    if (!editor) {
        return null
    }

    return (
        <div className="relative" ref={editorRef}>
            {/* Floating Plus Button */}
            <div
                className="absolute z-50 transition-all duration-200"
                style={{
                    top: menuPosition.top,
                    left: menuPosition.left,
                }}
            >
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setShowMenu(!showMenu)
                    }}
                    className="w-8 h-8 bg-[#1A1B1F] border border-[#333336] rounded-full flex items-center justify-center hover:bg-[#2A2A2D] transition-colors"
                >
                    <Plus size={16} className="text-[#A3A3A3]" />
                </button>

                {/* Menu */}
                {showMenu && (
                    <div className="absolute top-0 left-10 bg-[#1A1B1F] border border-[#333336] rounded-lg shadow-lg py-2 min-w-[120px] z-[60]">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    item.action()
                                }}
                                className="w-full px-4 py-2 text-left text-[#A3A3A3] hover:bg-[#2A2A2D] hover:text-white transition-colors flex items-center gap-2"
                            >
                                <item.icon size={16} />
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />

            {/* Click outside to close menu */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={(e) => {
                        e.preventDefault()
                        setShowMenu(false)
                    }}
                />
            )}
        </div>
    )
}

export default TipTapEditor
