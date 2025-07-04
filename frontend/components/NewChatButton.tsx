// components/NewChatButton.tsx
"use client";

import { PlusIcon } from "lucide-react";
import { useSessionStore } from "@/hooks/useSession";
import { cn } from "@/lib/utils"; // optional: your clsx helper

interface Props {
  className?: string;
}

/**
 * A minimal button that clears current chat state and requests a fresh session ID.
 * Usage: <NewChatButton /> — or pass className to tweak styling.
 */
export default function NewChatButton({ className }: Props) {
  const newChat = useSessionStore((s) => s.newChat);

  return (
    <button
      onClick={newChat}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm font-medium hover:bg-muted transition",
        className
      )}
      aria-label="Start a new chat"
    >
      <PlusIcon className="h-4 w-4" />
      New Chat
    </button>
  );
}
