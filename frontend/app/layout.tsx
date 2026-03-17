import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "agents.room — Build your personal AI agent",
  description:
    "Type a task. Set a schedule. Receive results on WhatsApp, Email, or Telegram. Your personal AI agent, running every day — no code, no setup.",
  openGraph: {
    title: "agents.room",
    description: "The AI agent you always wanted. No code. No setup.",
    url: "https://agents.room",
    siteName: "agents.room",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "agents.room",
    description: "The AI agent you always wanted. No code. No setup.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}
