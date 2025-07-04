const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface NewSessionResponse {
  session_id: string
}

interface QueryResponse {
  response: string
}

export async function createNewSession(): Promise<NewSessionResponse> {
  const response = await fetch(`${API_BASE_URL}/new-session`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to create session: ${response.statusText}`)
  }

  return response.json()
}

export async function uploadFile(sessionId: string, file: File): Promise<any> {
  const formData = new FormData()
  formData.append("session_id", sessionId)
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`)
  }

  return response.json()
}

export async function queryAssistant(sessionId: string, userQuery: string): Promise<QueryResponse> {
  const formData = new FormData()
  formData.append("session_id", sessionId)
  formData.append("user_query", userQuery)

  const response = await fetch(`${API_BASE_URL}/query`, {
    method: "POST",
    credentials: "include",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Failed to query assistant: ${response.statusText}`)
  }

  return response.json()
}
