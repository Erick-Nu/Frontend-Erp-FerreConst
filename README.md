# ESNT Frontend Doc Ferreteria

Documentación visual de la API REST del sistema de ferretería ESNT.

Este proyecto genera un **sitio estático** con Next.js (App Router + SSG) que organiza y presenta la documentación de todos los endpoints disponibles: autenticación, productos, clientes, proformas, stock, etc. Cada endpoint incluye su método HTTP, ruta, parámetros, reglas de negocio, ejemplo en cURL y respuesta JSON de ejemplo.

El sitio está pensado para consumirse desde un navegador y los ejemplos se adaptan automáticamente a la URL base de la API que configures.

## Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno (copiar y editar)
cp .env.example .env

# Iniciar servidor de desarrollo
pnpm dev
```

Abre en tu navegador la URL que hayas configurado en `PUBLIC_BASE_URL`.

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo con hot reload |
| `pnpm build` | Genera el sitio estático de producción |
| `pnpm start` | Sirve el sitio generado |
| `pnpm lint` | Verifica el código con ESLint |
| `pnpm typecheck` | Verifica tipos TypeScript |

## Variables de Entorno

| Variable | ¿Para qué sirve? |
|---|---|
| `HOST` | IP donde se levanta el servidor Next.js (por defecto `0.0.0.0`) |
| `PORT` | Puerto donde se levanta el servidor Next.js |
| `PUBLIC_BASE_URL` | URL pública de la documentación. Se usa para metadatos y SEO |
| `NEXT_PUBLIC_API_BASE_URL` | URL base de la API. Los ejemplos cURL y las respuestas JSON reemplazarán automáticamente las URLs de ejemplo por esta |

### Desarrollo

```bash
HOST=0.0.0.0
PORT=3005
PUBLIC_BASE_URL=http://localhost:3005
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Producción

Cambia los valores para que apunten a la IP o dominio real de tu servidor:

```bash
HOST=0.0.0.0
PORT=3005
PUBLIC_BASE_URL=http://tudominio.com:3005
NEXT_PUBLIC_API_BASE_URL=http://tudominio.com:3000
```

## Deploy

El sitio se genera como HTML estático en build time. Los pasos son:

```bash
pnpm install
pnpm build
pnpm start
```

### Con PM2 (recomendado)

```bash
pnpm build
pm2 start ecosystem.config.cjs
```

> `NEXT_PUBLIC_API_BASE_URL` se inyecta en build time. Si cambias la URL de la API después de hacer build, debes ejecutar `pnpm build` nuevamente.

## Stack Técnico

- **Framework**: Next.js 15 con App Router
- **Estilos**: Tailwind CSS 4
- **Lenguaje**: TypeScript
- **Package Manager**: pnpm

## Estructura del Proyecto

```
esnt-frontend-doc-ferreteria/
├── src/
│   ├── app/
│   │   ├── api/                  # Páginas de documentación por endpoint
│   │   │   ├── auth/             # Módulo de autenticación
│   │   │   └── ...               # Resto de módulos
│   │   ├── getting-started/      # Guías de inicio
│   │   ├── page.tsx              # Home
│   │   └── layout.tsx            # Layout principal
│   ├── components/               # Componentes React
│   │   ├── AppShell.tsx          # Sidebar + header
│   │   ├── EndpointCard.tsx      # Tarjeta de resumen
│   │   ├── MethodBadge.tsx       # Badge de método HTTP
│   │   └── docs/                 # Componentes de documentación
│   │       ├── EndpointReference.tsx
│   │       ├── EndpointExamplePanel.tsx
│   │       ├── CodeBlock.tsx
│   │       └── FieldRow.tsx
│   ├── config/
│   │   └── navigation.ts         # Navegación del sidebar
│   ├── styles/
│   │   └── globals.css           # Estilos globales
│   └── types/
│       └── docs.ts               # Tipos compartidos
├── .env.example                  # Plantilla de variables de entorno
├── next.config.mjs
├── ecosystem.config.cjs          # Configuración de PM2
└── tsconfig.json
```

## Licencia

MIT
