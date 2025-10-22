import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

// Import your local MangoGrotesque font files
const mangoGrotesque = localFont({
  src: [
    {
      path: "../public/fonts/MangoGrotesque-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MangoGrotesque-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mango-grotesque", // CSS variable name
  display: "swap",
})

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
    <html lang="en" className={mangoGrotesque.variable} suppressHydrationWarning={true}>
      <body className="bg-[#F7F5E9]">{children}</body>
    </html>
  )
}
