import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'

export const metadata = {
  title: {
    default: 'ESNT Ferreteria Documentation',
    template: '%s – ESNT Ferreteria Docs',
  },
  description: 'Documentación de la API REST del sistema de ferretería ESNT',
}

const navbar = (
  <Navbar
    logo={
      <span style={{ fontWeight: 800 }}>
        ESNT Ferreteria Docs
      </span>
    }
    projectLink="https://github.com/esnt/esnt-backend-ferreteria"
  />
)

const footer = (
  <Footer>
    {new Date().getFullYear()} © ESNT Ferreteria. Documentación generada con Nextra
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <Head
        faviconGlyph="🔧"
        color={{
          hue: 210,
          saturation: 100,
          lightness: { light: 45, dark: 55 }
        }}
      >
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="es" />
        <meta
          name="description"
          content="Documentación de la API REST del sistema de ferretería ESNT"
        />
        <meta
          name="og:description"
          content="Documentación de la API REST del sistema de ferretería ESNT"
        />
        <meta name="og:title" content="ESNT Ferreteria Documentation" />
        <meta name="apple-mobile-web-app-title" content="ESNT Ferreteria Docs" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/esnt/esnt-frontend-doc-ferreteria"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ backToTop: true }}
          editLink="Editar esta página en GitHub"
          feedback={{ content: '¿Preguntas? Danos feedback →', labels: 'feedback' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
