"use client"

import { useEffect, useRef } from "react"
import { useSessionStore } from "@/hooks/useSession"
import { MarkdownRenderer } from "./MarkdownRenderer"
import { User, Bot } from "lucide-react"
import clsx from "clsx"

export function ChatWindow() {
  const { messages } = useSessionStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to help!</h3>
          <p className="text-gray-600 max-w-sm">
            Upload some documents and start asking questions. I'll help you find answers based on your uploaded content.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={clsx("flex gap-3", message.type === "user" ? "justify-end" : "justify-start")}>
          {message.type === "assistant" && (
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          )}

          <div
            className={clsx(
              "max-w-[80%] rounded-lg px-4 py-2",
              message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900",
            )}
          >
            {message.type === "user" ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <MarkdownRenderer content={message.content} />
            )}
          </div>

          {message.type === "user" && (
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
