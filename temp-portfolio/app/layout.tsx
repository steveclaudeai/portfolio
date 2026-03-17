import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Steve Rios — Web Dev · Security · AI',
  description: 'I build websites, secure systems, and automate businesses with AI.',
  openGraph: {
    title: 'Steve Rios — Full-Stack Tech Professional',
    description: 'Web Development, Cybersecurity & AI Automation. Available for hire on Upwork.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
