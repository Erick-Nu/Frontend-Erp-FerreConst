# ESNT Frontend Doc Ferreteria

Documentación de la API REST del sistema de ferretería ESNT.

## Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Abrir en navegador
open http://localhost:3000
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo con hot reload |
| `pnpm build` | Build de producción |
| `pnpm start` | Iniciar servidor de producción |
| `pnpm lint` | Verificar código con ESLint |
| `pnpm typecheck` | Verificar tipos TypeScript |

## Stack Técnico

- **Framework**: Next.js 15 con App Router
- **Theme**: Nextra 4.0 (Docs Theme)
- **Estilos**: Tailwind CSS
- **Lenguaje**: TypeScript
- **Package Manager**: pnpm

## Estructura del Proyecto

```
esnt-frontend-doc-ferreteria/
├── content/              # Documentación MDX
│   ├── getting-started/  # Guías de inicio
│   └── api/              # Referencia de endpoints
│       ├── auth/
│       ├── products/
│       └── ...
├── src/
│   ├── app/              # Páginas Next.js
│   ├── components/       # Componentes React
│   ├── styles/           # Estilos globales
│   └── lib/              # Utilidades
├── public/               # Archivos estáticos
├── theme.config.tsx      # Configuración del theme
├── next.config.mjs       # Configuración de Next.js
├── tailwind.config.ts    # Configuración de Tailwind
└── tsconfig.json         # Configuración de TypeScript
```

## Contribución

1. Crear una rama para tu feature
2. Hacer cambios en los archivos `.mdx` de `content/`
3. Verificar con `pnpm dev`
4. Crear un pull request

## Licencia

MIT
