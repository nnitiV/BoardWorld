import { Toaster } from 'react-hot-toast';
import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Board World",
  description: "E-Commerce for board games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pliant:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Added flex and flex-col to establish a flexible full-height layout */}
      <body className="min-h-full bg-blue-50 flex flex-col">
        <QueryProvider>
          {/* flex-1 forces the main content area to take up all available remaining space */}
          <main className="flex-1 w-full">
            {children}
          </main>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}