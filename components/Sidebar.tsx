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
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[280px] bg-[#030406]/80 backdrop-blur-2xl border-r border-white/5 flex-col z-40">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center font-black text-white text-2xl shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              R
            </div>
            <div>
              <div className="font-black text-white text-xl tracking-tighter transition-colors group-hover:text-accent">
                Recruit<span className="text-gray-500 group-hover:text-white transition-colors duration-500">AI</span>
              </div>
              <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mt-0.5">
                 Intelligence
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 group relative ${
                  active
                    ? "bg-white/[0.03] text-white border border-white/5 shadow-glow"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.02] border border-transparent"
                }`}
              >
                <span className={`text-xl transition-transform duration-500 group-hover:scale-125 ${active ? "opacity-100" : "opacity-50"}`}>{item.icon}</span>
                <span>{item.label}</span>
                {active && (
                  <>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-glow" />
                    <div className="absolute inset-0 rounded-2xl bg-accent opacity-[0.03] animate-pulse-slow" />
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="glass-panel p-4 space-y-4">
            {demoMode && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="flex w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-accent animate-ping opacity-40" />
                </div>
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">
                  Live System
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    n8nConnected === null
                      ? "bg-gray-500"
                      : n8nConnected
                      ? "bg-success"
                      : "bg-danger"
                  } shadow-sm`}
                />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Engine: {n8nConnected === null ? "..." : n8nConnected ? "online" : "error"}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/5 flex items-center justify-center text-xs">
                👤
              </div>
            </div>
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
