import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ToastContainer from "@/components/Toast";
import { AppProvider } from "@/lib/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RecruitAI — AI-Assisted Resume Screening & Interview Prep",
  description:
    "AI-powered resume screening, interview generation, mock interviews and feedback reports.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-gray-200 min-h-screen font-sans">
        <AppProvider>
          <Sidebar />
          <main className="md:ml-[260px] pb-16 md:pb-0 min-h-screen">
            <div className="max-w-[1600px] mx-auto p-4 md:p-8">{children}</div>
          </main>
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
