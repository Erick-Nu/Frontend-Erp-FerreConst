import LangTabs from '@/components/LangTabs'

export const metadata = { title: 'Primeros Pasos' }

export default function GettingStartedPage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-app-text-muted sm:tracking-[0.2em]">Documentacion</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">Consumo de la API</h1>
        <p className="mt-4 text-base leading-7 text-app-text-secondary sm:text-lg sm:leading-8">
          Ejemplos de como consumir los endpoints de la API REST en diferentes lenguajes de programacion.
          Todos los ejemplos usan el mismo flujo: login, obtener token y consultar recursos protegidos.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.1em] text-app-text-muted">Paso 1</div>
          <p className="mt-2 text-sm font-bold text-app-text">Autenticarse</p>
          <p className="mt-1 text-sm leading-6 text-app-text-muted">
            Envia las credenciales a POST /auth/login para obtener el accessToken.
          </p>
        </div>
        <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.1em] text-app-text-muted">Paso 2</div>
          <p className="mt-2 text-sm font-bold text-app-text">Usar el token</p>
          <p className="mt-1 text-sm leading-6 text-app-text-muted">
            Envia el accessToken en el header Authorization: Bearer &lt;token&gt;.
          </p>
        </div>
        <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.1em] text-app-text-muted">Paso 3</div>
          <p className="mt-2 text-sm font-bold text-app-text">Consultar recursos</p>
          <p className="mt-1 text-sm leading-6 text-app-text-muted">
            Accede a endpoints protegidos como GET /branches, /products, etc.
          </p>
        </div>
      </div>

      <LangTabs />
    </div>
  )
}
