import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Providers from "./Providers";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "TodoApp",
  description: "Simple Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}