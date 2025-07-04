// app/page.tsx
"use client"

import { useEffect, useState } from "react"
import { FileUploader } from "@/components/FileUploader"
import { ChatWindow } from "@/components/ChatWindow"
import { ChatInput } from "@/components/ChatInput"
import { useSessionStore } from "@/hooks/useSession"
import NewChatButton from "@/components/NewChatButton"
import { Toaster } from "react-hot-toast"
import { MoonIcon, SunIcon, UploadCloudIcon } from "lucide-react"

export default function HomePage() {
  /* ── SESSION ─────────────────────────────────────── */
  const { initializeSession, isInitialized } = useSessionStore()
  useEffect(() => { initializeSession() }, [initializeSession])

  /* ── DARK / LIGHT TOGGLE ─────────────────────────── */
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  /* ── UPLOAD DRAWER ──────────────────────────────── */
  const [drawerOpen, setDrawerOpen] = useState(false)

  /* ── LOADING SCREEN ─────────────────────────────── */
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center
                      bg-gradient-to-br from-rose-100 via-sky-100 to-emerald-100
                      dark:bg-[#121212]">
        <div className="animate-spin h-12 w-12 rounded-full
                        border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  /* ── UI ─────────────────────────────────────────── */
  return (
    <div className="flex h-screen text-gray-900 dark:text-gray-100
                    bg-gradient-to-br from-rose-50 via-sky-50 to-emerald-50
                    dark:bg-[#0f0f0f]">
      {/* ── SIDEBAR ─────────── */}
      <aside className="hidden md:flex w-64 flex-col backdrop-blur-lg
                        bg-white/80 dark:bg-[#1b1b1b]/80 border-r">
        <header className="flex items-center gap-2 px-4 py-5 border-b">
          <span className="text-2xl font-extrabold bg-gradient-to-r
                           from-sky-500 to-emerald-500 bg-clip-text text-transparent">
            RAGpedia
          </span>
        </header>

        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          <NewChatButton />

          <button
            onClick={() => setDrawerOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg border
                       px-3 py-2 text-sm font-medium hover:bg-muted/50
                       dark:hover:bg-[#2b2b2b] transition"
          >
            <UploadCloudIcon className="h-4 w-4" />
            Upload Docs
          </button>
        </nav>

        <footer className="mt-auto px-4 py-4 border-t flex items-center justify-between text-xs">
          © {new Date().getFullYear()} RAGpedia
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-muted/40"
            aria-label="Toggle theme"
          >
            {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </footer>
      </aside>

      {/* ── MAIN CHAT ──────── */}
      <main className="flex-1 flex flex-col h-full">
        {/* Mobile top‑bar */}
        <div className="md:hidden flex items-center justify-between gap-2
                        px-4 py-3 border-b backdrop-blur-md
                        bg-white/80 dark:bg-[#1b1b1b]/80">
          <span className="text-lg font-bold bg-gradient-to-r
                           from-sky-500 to-emerald-500 bg-clip-text text-transparent">
            RAGpedia
          </span>
          <div className="flex gap-2">
            <button onClick={() => setDrawerOpen(true)} className="p-2 rounded-full hover:bg-muted/40">
              <UploadCloudIcon className="h-5 w-5" />
            </button>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-muted/40">
              {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Chat content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow />
          <ChatInput />
        </div>
      </main>

      {/* ── UPLOAD DRAWER (opens LEFT) ─────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Drawer panel */}
          <div className="w-80 bg-white dark:bg-[#1e1e1e] border-r shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Upload Documents</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-2xl leading-none">×</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FileUploader />
            </div>
          </div>

          {/* Click‑away overlay */}
          <div className="flex-1 bg-black/50" onClick={() => setDrawerOpen(false)} />
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  )
}
