import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EndpointCard } from '@/components/EndpointCard'
import { getModule, navigationModules } from '@/config/navigation'

export const dynamicParams = false

export function generateStaticParams() {
  return navigationModules.map((m) => ({ module: m.slug }))
}

export async function generateMetadata(props: { params: Promise<{ module: string }> }) {
  const params = await props.params
  const module = getModule(params.module)
  return { title: module ? module.title : 'Módulo no encontrado' }
}

export default async function ApiModulePage(props: { params: Promise<{ module: string }> }) {
  const params = await props.params
  const module = getModule(params.module)

  if (!module) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-app-text-muted sm:tracking-[0.2em]">Módulo API</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">{module.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-app-text-secondary sm:text-lg sm:leading-8">{module.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {module.endpoints.map((endpoint) => (
          <EndpointCard key={endpoint.slug} moduleSlug={module.slug} endpoint={endpoint} />
        ))}
      </div>
      {module.infoPages && module.infoPages.length > 0 ? (
        <section>
          <h2 className="border-b border-app-border pb-3 text-xl font-black text-app-text">Información del módulo</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {module.infoPages.map((info) => (
              <Link
                key={info.slug}
                href={`/api/${module.slug}/${info.slug}`}
                className="block rounded-[1rem] border border-app-border bg-app-surface p-4 transition hover:border-app-border-hover hover:bg-app-surface-hover sm:p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <svg className="h-4 w-4 text-app-text-secondary" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 5h2v1H7V5zm0 2h2v4H7V7z" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">Información</span>
                </div>
                <h3 className="text-base font-bold text-app-text">{info.title}</h3>
                <p className="text-clamp-2 mt-1.5 text-sm leading-6 text-app-text-muted">{info.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
