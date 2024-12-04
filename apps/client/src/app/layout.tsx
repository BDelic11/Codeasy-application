import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "../components/ReactQueryClientProvider";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codeasy",
  description: "Codeasy job aplication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
