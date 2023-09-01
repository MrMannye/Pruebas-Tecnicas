import './globals.css'
import type { Metadata } from 'next'
import Header from './components/header'

export const metadata: Metadata = {
  title: 'Mercado Libre',
  description: 'Compre productos con Envío Gratis en el día en Mercado Libre México. Encuentre miles de marcas y productos a precios increíbles',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  )
}
