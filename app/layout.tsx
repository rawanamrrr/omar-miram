import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Great_Vibes, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { RomanticAudio } from "@/components/romantic-audio"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/language-toggle"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://omar-miram.digitivaa.com"),
  title: "Omar & Miram - Engagement Celebration",
  description: "Join us in celebrating Omar & Miram's engagement",
  generator: "Digitiva",
  openGraph: {
    url: "https://omar-miram.digitivaa.com/",
    type: "website",
    title: "Omar & Miram - Engagement Celebration",
    description: "Join us in celebrating Omar & Miram's engagement",
    images: [
      {
        url: "https://omar-miram.digitivaa.com/Preview.webp",
        width: 1200,
        height: 630,
        alt: "Omar & Miram Engagement Celebration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar & Miram - Engagement Celebration",
    description: "Join us in celebrating Omar & Miram's engagement",
    images: ["https://omar-miram.digitivaa.com/Preview.webp"],
  },
  icons: {
    icon: "/invitation-design.jpg",
    apple: "/invitation-design.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Open Graph tags for Facebook & WhatsApp previews */}
        <meta property="og:url" content="https://omar-miram.digitivaa.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Omar & Miram - Engagement Celebration" />
        <meta property="og:description" content="Join us in celebrating Omar & Miram's engagement" />
        <meta
          property="og:image"
          content="https://omar-miram.digitivaa.com/Preview.webp"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Omar & Miram Engagement Celebration" />
        {/* Removed invalid fb:app_id since it's not needed for basic sharing */}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Omar & Miram - Engagement Celebration" />
        <meta name="twitter:description" content="Join us in celebrating Omar & Miram's engagement" />
        <meta name="twitter:image" content="https://omar-miram.digitivaa.com/Preview.webp" />

        {/* Preload background image */}
        <link
          rel="preload"
          href="/bg.jpg"
          as="image"
          type="image/jpeg"
        />
        {/* Preload Preview image */}
        <link
          rel="preload"
          href="/Preview.webp"
          as="image"
          type="image/webp"
        />
        {/* Preload video and poster for faster intro */}
        <link
          rel="preload"
          href="/engagement-video.mp4"
          as="video"
          type="video/mp4"
        />
        {/* Preconnect to domains for faster loading */}
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        {/* Preload Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        />
        {/* Mobile Safari viewport height fix */}
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            function setViewportHeight() {
              const vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            }
            setViewportHeight();
            window.addEventListener('resize', setViewportHeight);
            window.addEventListener('orientationchange', setViewportHeight);
          })();
        `}} />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${greatVibes.variable} relative`}>
        <LanguageProvider>
          <Suspense fallback={null}>
            <LanguageToggle />
            {children}
            <RomanticAudio />
          </Suspense>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}