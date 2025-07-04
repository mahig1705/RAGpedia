"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import hljs from "highlight.js/lib/common"
import "highlight.js/styles/github.css"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeHighlight, { hljs }]]}
        components={{
          // Custom styling for code blocks
          pre: ({ children, ...props }) => (
            <pre {...props} className="bg-gray-50 rounded-md p-3 overflow-x-auto text-sm">
              {children}
            </pre>
          ),
          // Custom styling for inline code
          code: ({ children, className, ...props }) => {
            const isInline = !className
            return (
              <code {...props} className={isInline ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" : className}>
                {children}
              </code>
            )
          },
          // Custom styling for tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props} className="min-w-full divide-y divide-gray-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              {...props}
              className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td {...props} className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
              {children}
            </td>
          ),
          // Handle images with proper paths
          img: ({ src, alt, ...props }) => (
            <img
              {...props}
              src={src || "/placeholder.svg"}
              alt={alt}
              className="max-w-full h-auto rounded-md"
              loading="lazy"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
