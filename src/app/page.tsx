import { documentedEndpoints, navigationModules, totalEndpoints } from '@/config/navigation'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-app-text-muted sm:tracking-[0.2em]">Documentacion API REST</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">
          Documentación API Ferretería ESNT
        </h1>
        <p className="mt-4 text-base leading-7 text-app-text-secondary sm:text-lg sm:leading-8">
          Documentacion API con rutas reales, sidebar de endpoints y ejemplos cURL/response para cada recurso.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Modulos" value={navigationModules.length} />
        <Stat label="Endpoints" value={totalEndpoints} />
        <Stat label="Documentados" value={documentedEndpoints} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {navigationModules.slice(0, 9).map((module) => (
          <Link key={module.slug} href={`/api/${module.slug}`} className="rounded-[1.25rem] border border-app-border bg-app-surface p-5 hover:border-app-border-hover hover:bg-app-surface-hover">
            <p className="font-bold text-app-text">{module.title}</p>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">{module.description}</p>
            <p className="mt-4 text-xs font-semibold text-app-text-dim">{module.endpoints.length} endpoints</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.25rem] border border-app-border bg-app-surface p-4 sm:p-5">
      <div className="text-3xl font-black text-app-text">{value}</div>
      <div className="mt-1 text-sm text-app-text-muted">{label}</div>
    </div>
  )
}
