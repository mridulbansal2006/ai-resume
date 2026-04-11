"use client";

import { useApp } from "@/lib/context";

const typeStyles: Record<string, string> = {
  success: "border-success/40 bg-success/10 text-success",
  error: "border-danger/40 bg-danger/10 text-danger",
  info: "border-info/40 bg-info/10 text-info",
  warning: "border-warn/40 bg-warn/10 text-warn",
};

const icons: Record<string, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
};

export default function ToastContainer() {
  const { notifications, dismissNotification } = useApp();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`pointer-events-auto card border px-4 py-3 flex items-start gap-3 animate-fade-in ${typeStyles[n.type]}`}
          role="status"
        >
          <span className="font-bold text-base leading-none mt-0.5">{icons[n.type]}</span>
          <div className="flex-1 text-sm text-gray-100">{n.message}</div>
          <button
            onClick={() => dismissNotification(n.id)}
            className="text-gray-500 hover:text-white text-xs"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
