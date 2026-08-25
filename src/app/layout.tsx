import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const BASE_URL = 'https://nitinkumar.dev'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Nitin Kumar R',
    template: '%s · Nitin Kumar R',
  },
  description:
    'Backend Engineer and Consultant at Deloitte. Building thoughtful enterprise software with a focus on clean architecture and developer experience.',
  keywords: ['Nitin Kumar', 'Backend Engineer', 'Software Engineer', 'Deloitte', 'Portfolio', 'TypeScript', 'React', 'Next.js'],
  authors: [{ name: 'Nitin Kumar R', url: BASE_URL }],
  creator: 'Nitin Kumar R',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Nitin Kumar R',
    title: 'Nitin Kumar R — Backend Engineer',
    description:
      'Backend Engineer and Consultant at Deloitte. Building thoughtful enterprise software with a focus on clean architecture and developer experience.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nitin Kumar R' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nitin Kumar R — Backend Engineer',
    description:
      'Backend Engineer and Consultant at Deloitte. Building thoughtful enterprise software with a focus on clean architecture and developer experience.',
    creator: '@thenitinkumar',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ overflowX: 'hidden', maxWidth: '100vw' }}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        style={{ overflowX: 'hidden', overscrollBehaviorX: 'none', maxWidth: '100vw' }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
