"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context";

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/submit", label: "Submit Resume", icon: "📝" },
  { href: "/interview", label: "Interview", icon: "💬" },
  { href: "/feedback", label: "Feedback", icon: "📋" },
  { href: "/setup", label: "Setup", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { n8nConnected, demoMode } = useApp();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] bg-[#0a0e17] border-r border-border flex-col z-40">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center font-bold text-white text-lg">
              R
            </div>
            <div>
              <div className="font-bold text-white text-lg tracking-tight">
                Recruit<span className="text-accent">AI</span>
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                AI-assisted hiring
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "text-gray-400 hover:text-white hover:bg-surface-2 border border-transparent"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          {demoMode && (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-ai/10 border border-ai/30">
              <span className="w-1.5 h-1.5 rounded-full bg-ai animate-pulse" />
              <span className="text-[11px] font-semibold text-ai uppercase tracking-wider">
                Demo Mode
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-[11px]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                n8nConnected === null
                  ? "bg-gray-500"
                  : n8nConnected
                  ? "bg-success"
                  : "bg-danger"
              }`}
            />
            <span className="text-gray-500">
              n8n: {n8nConnected === null ? "checking" : n8nConnected ? "connected" : "offline"}
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0e17] border-t border-border z-40">
        <div className="grid grid-cols-5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 text-[10px] ${
                  active ? "text-accent" : "text-gray-500"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
