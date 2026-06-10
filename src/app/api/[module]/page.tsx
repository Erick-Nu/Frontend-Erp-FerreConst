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
    </div>
  )
}
