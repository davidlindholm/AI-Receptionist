import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Receptionist",
  description: "AI-powered receptionist dashboard for small businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
