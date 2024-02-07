import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WikiCountry - A simple wiki for countries',
  description:
    'A simple wiki for countries. Select a country and get some info about it.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto min-h-screen lg:px-16`}>
        {children}
      </body>
    </html>
  )
}
