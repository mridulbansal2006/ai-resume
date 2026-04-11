import type { ChatMessage as Msg } from "@/lib/types";

export default function ChatMessage({ message }: { message: Msg }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-ai/20 border border-ai/40 flex items-center justify-center text-ai text-sm font-bold flex-shrink-0">
          AI
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-accent/15 border border-accent/30 text-gray-100 rounded-br-sm"
            : "bg-surface-2 border border-border text-gray-200 rounded-bl-sm"
        }`}
      >
        {!isUser && (
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold mb-1">
            Interviewer
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-sm font-bold flex-shrink-0">
          You
        </div>
      )}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-ai/20 border border-ai/40 flex items-center justify-center text-ai text-sm font-bold flex-shrink-0">
        AI
      </div>
      <div className="bg-surface-2 border border-border rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="typing-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
