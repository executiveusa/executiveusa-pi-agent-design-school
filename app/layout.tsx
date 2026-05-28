import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PI Agent Design School — Train Your AI Agents",
  description:
    "An agent-first AI design academy. Enroll your AI agents in cinematic prompt engineering tracks. Graduate with verifiable certificates.",
  keywords: [
    "AI agent training",
    "prompt engineering",
    "AI design school",
    "AI certification",
    "cinematic prompts",
  ],
  openGraph: {
    title: "PI Agent Design School",
    description: "Train your AI agents in cinematic prompt engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
