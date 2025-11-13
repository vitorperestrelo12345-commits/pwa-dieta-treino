import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'MINDHABIT+ - Bem-estar & Produtividade',
  description: 'App completo de bem-estar combinando diário emocional, rastreamento de hábitos, meditação guiada e treino físico',
  manifest: '/manifest.json',
  themeColor: '#06B6D4',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MINDHABIT+'
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon-192.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MINDHABIT+" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="font-inter bg-[#0A0E14] text-white overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  )
}
