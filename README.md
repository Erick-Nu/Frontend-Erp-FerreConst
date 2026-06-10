# ESNT Frontend Doc Ferreteria

Documentación de la API REST del sistema de ferretería ESNT.

## Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
pnpm dev

# Abrir en navegador usando la URL configurada en PUBLIC_BASE_URL
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo con hot reload |
| `pnpm build` | Build de producción |
| `pnpm start` | Iniciar servidor de producción |
| `pnpm lint` | Verificar tipos TypeScript |
| `pnpm typecheck` | Verificar tipos TypeScript |

## Deploy

Para desplegar en un servidor Node.js:

```bash
pnpm install
pnpm build
pnpm start
```

La app usa estas variables de entorno:

```bash
HOST=0.0.0.0
PORT=3005
PUBLIC_BASE_URL=http://163.245.192.54:3005
NEXT_PUBLIC_API_BASE_URL=http://163.245.192.54:3000
```

Qué controla cada una:

- `HOST`: host donde levanta Next.js
- `PORT`: puerto donde levanta Next.js
- `PUBLIC_BASE_URL`: URL pública de esta documentación
- `NEXT_PUBLIC_API_BASE_URL`: URL base de la API usada en guías, cURL y respuestas de ejemplo

Con esa configuración la documentación se sirve en `http://163.245.192.54:3005` y los ejemplos apuntan a `http://163.245.192.54:3000`.

### Con PM2 (recomendado para producción)

```bash
pnpm build
pm2 start ecosystem.config.cjs
```

`NEXT_PUBLIC_API_BASE_URL` se inyecta en build/runtime del frontend. Si cambias la URL pública de la API, vuelve a ejecutar `pnpm build` antes de arrancar en producción.

## Stack Técnico

- **Framework**: Next.js 15 con App Router
- **Estilos**: Tailwind CSS 4
- **Lenguaje**: TypeScript
- **Package Manager**: pnpm
- **Linter**: ESLint + typescript-eslint

## Estructura del Proyecto

```
esnt-frontend-doc-ferreteria/
├── src/
│   ├── app/                  # Páginas Next.js (App Router)
│   │   ├── api/              # Documentación por módulo y endpoint
│   │   │   ├── auth/         # Módulo de autenticación
│   │   │   │   ├── page.tsx      # Vista general del módulo
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── logout/page.tsx
│   │   │   │   └── refresh/page.tsx
│   │   │   └── ...           # Resto de módulos (branch, brand, category, etc.)
│   │   ├── getting-started/  # Guías de inicio
│   │   ├── page.tsx          # Home
│   │   └── layout.tsx        # Layout principal
│   ├── components/           # Componentes React
│   │   ├── AppShell.tsx      # Shell con sidebar y header
│   │   ├── EndpointCard.tsx  # Tarjeta de resumen de endpoint
│   │   ├── MethodBadge.tsx   # Badge de método HTTP
│   │   └── docs/             # Componentes de documentación
│   │       ├── EndpointReference.tsx
│   │       ├── EndpointExamplePanel.tsx
│   │       ├── CodeBlock.tsx
│   │       └── FieldRow.tsx
│   ├── config/
│   │   └── navigation.ts     # Configuración de navegación estática
│   ├── styles/
│   │   └── globals.css       # Estilos globales Tailwind
│   └── types/
│       └── docs.ts           # Tipos compartidos
├── next.config.mjs           # Configuración de Next.js
├── ecosystem.config.cjs      # Configuración de PM2
└── tsconfig.json              # Configuración de TypeScript
```

## Licencia

MIT
