import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "shagga.org — G'day mate",
  description: "G'day Shagga. Welcome to the dot org.",
  icons: {
    icon: "/favicon.ico",
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
