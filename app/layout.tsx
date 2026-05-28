import type { Metadata, Viewport } from 'next'
import { Roboto, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/context/cart-context'
import { AuthProvider } from '@/context/auth-context'
import { IntroLoader } from '@/components/intro-loader'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'NOTT | Luxury Handmade Crochet',
  description: 'Discover premium handcrafted crochet pieces. Each NOTT creation is a unique work of art, blending traditional craftsmanship with modern elegance.',
  keywords: ['crochet', 'handmade', 'luxury', 'bags', 'accessories', 'artisan'],
  authors: [{ name: 'NOTT' }],
  openGraph: {
    title: 'NOTT | Luxury Handmade Crochet',
    description: 'Discover premium handcrafted crochet pieces.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#212121',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${roboto.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <IntroLoader />
            {children}
          </CartProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
