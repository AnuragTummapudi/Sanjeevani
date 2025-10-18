import type { Metadata } from 'next'
import { Inter, Playfair_Display, Poppins, Space_Grotesk, Outfit, Orbitron, Creepster } from 'next/font/google'
import './globals.css'
import AIAssistantPanel from '../components/AIAssistantPanel'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
})

const creepster = Creepster({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-creepster',
})

export const metadata: Metadata = {
  title: 'Sanjeevan - AI-Powered Health Diagnostics',
  description: 'Advanced, Accessible and Precise Medical Intelligence. Transforming Healthcare. Intelligently.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${spaceGrotesk.variable} ${outfit.variable} ${orbitron.variable} ${creepster.variable} antialiased`}>
        {children}
        <AIAssistantPanel />
      </body>
    </html>
  )
}
