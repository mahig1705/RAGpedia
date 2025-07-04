import { create } from "zustand"
import { createNewSession, uploadFile, queryAssistant } from "@/lib/api"
import toast from "react-hot-toast"

export interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface UploadedFile {
  name: string
  status: "uploading" | "success" | "error"
  progress: number
}

interface SessionState {
  // ——— State ———
  sessionId: string | null
  isInitialized: boolean
  messages: Message[]
  uploadedFiles: UploadedFile[]
  isQuerying: boolean
  hasUploadedFiles: boolean

  // ——— Actions ———
  initializeSession: () => Promise<void>
  newChat: () => Promise<void>                      // ★ NEW
  addMessage: (msg: Omit<Message, "id" | "timestamp">) => void
  uploadFiles: (files: File[]) => Promise<void>
  sendQuery: (query: string) => Promise<void>
  updateFileStatus: (
    fileName: string,
    status: UploadedFile["status"],
    progress?: number
  ) => void
}

export const useSessionStore = create<SessionState>((set, get) => ({
  // ---------- State ----------
  sessionId: null,
  isInitialized: false,
  messages: [],
  uploadedFiles: [],
  isQuerying: false,
  hasUploadedFiles: false,

  // ---------- Actions ----------
  initializeSession: async () => {
    try {
      const res = await createNewSession()
      set({ sessionId: res.session_id, isInitialized: true })
    } catch (err) {
      console.error("Failed to initialize session:", err)
      toast.error("Failed to initialize session. Please refresh.")
    }
  },

  // ★ NEW CHAT: resets everything and starts a fresh session
  newChat: async () => {
    try {
      const res = await createNewSession()
      set({
        sessionId: res.session_id,
        messages: [],
        uploadedFiles: [],
        hasUploadedFiles: false,
      })
      toast.success("Started a new chat")
    } catch (err) {
      console.error("Failed to start new chat:", err)
      toast.error("Could not start a new chat. Please try again.")
    }
  },

  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...msg, id: Date.now().toString(), timestamp: new Date() },
      ],
    })),

  updateFileStatus: (name, status, progress = 0) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.map((f) =>
        f.name === name ? { ...f, status, progress } : f
      ),
    })),

  uploadFiles: async (files) => {
    const { sessionId } = get()
    if (!sessionId) {
      toast.error("No active session")
      return
    }

    const newFiles: UploadedFile[] = files.map((file) => ({
      name: file.name,
      status: "uploading",
      progress: 0,
    }))
    set((s) => ({ uploadedFiles: [...s.uploadedFiles, ...newFiles] }))

    await Promise.all(
      files.map(async (file) => {
        try {
          get().updateFileStatus(file.name, "uploading", 50)
          await uploadFile(sessionId, file)
          get().updateFileStatus(file.name, "success", 100)
          toast.success(`${file.name} uploaded`)
        } catch (err) {
          console.error(`Upload failed: ${file.name}`, err)
          get().updateFileStatus(file.name, "error")
          toast.error(`Failed to upload ${file.name}`)
        }
      })
    )

    const ok = get().uploadedFiles.some((f) => f.status === "success")
    set({ hasUploadedFiles: ok })
  },

  sendQuery: async (query) => {
    const { sessionId, addMessage } = get()
    if (!sessionId) {
      toast.error("No active session")
      return
    }

    addMessage({ type: "user", content: query })

    set({ isQuerying: true })
    try {
      const res = await queryAssistant(sessionId, query)
      addMessage({ type: "assistant", content: res.response })
    } catch (err) {
      console.error("Query failed:", err)
      toast.error("Error fetching response. Try again.")
      addMessage({
        type: "assistant",
        content: "Sorry, I hit an error. Please try again.",
      })
    } finally {
      set({ isQuerying: false })
    }
  },
}))
