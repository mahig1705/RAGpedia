"use client"

import type React from "react"

import { useState, useRef, type KeyboardEvent } from "react"
import { useSessionStore } from "@/hooks/useSession"
import { Send, Loader2 } from "lucide-react"
import clsx from "clsx"

export function ChatInput() {
  const { sendQuery, isQuerying, hasUploadedFiles } = useSessionStore()
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async () => {
    if (!input.trim() || isQuerying || !hasUploadedFiles) return

    const query = input.trim()
    setInput("")

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    await sendQuery(query)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)

    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }

  const isDisabled = isQuerying || !hasUploadedFiles

  return (
    <div className="border-t bg-white p-4">
      {!hasUploadedFiles && (
        <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">Please upload at least one document before asking questions.</p>
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              hasUploadedFiles
                ? "Ask a question about your documents... (⌘/Ctrl + Enter to send)"
                : "Upload documents first to start asking questions"
            }
            disabled={isDisabled}
            className={clsx(
              "w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm",
              "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              "min-h-[40px] max-h-[120px]",
            )}
            rows={1}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isDisabled || !input.trim()}
          className={clsx(
            "flex-shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            isDisabled || !input.trim()
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700",
          )}
        >
          {isQuerying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
