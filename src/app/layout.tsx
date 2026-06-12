import type { Metadata } from 'next'
import { AppShell } from '@/components/AppShell'
import { getMetadataBase } from '@/config/server-env'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Documentación API Ferretería ESNT',
    template: '%s | Documentación API Ferretería ESNT',
  },
  description: 'Documentacion de la API REST del sistema de ferreteria ESNT',
  metadataBase: getMetadataBase(),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
