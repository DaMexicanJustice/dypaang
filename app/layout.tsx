import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const poppins = Poppins({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-heading" })

export const metadata: Metadata = {
  title: "BotanicCanvas - Portal",
  description: "Craft perfect prompts for generative AI models",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
