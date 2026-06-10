import { navigationModules as docsModules, totalEndpoints } from '@/config/navigation'
import { EndpointCard } from '@/components/EndpointCard'

export const metadata = {
  title: 'Referencia API',
}

export default function ApiPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-app-text-muted sm:tracking-[0.2em]">Referencia API</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">Modulos y endpoints</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-app-text-secondary sm:text-lg sm:leading-8">
          Hay {docsModules.length} modulos y {totalEndpoints} endpoints disponibles como rutas visibles del frontend.
        </p>
      </div>

      <div className="space-y-8">
        {docsModules.map((module) => (
          <section key={module.slug}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-app-text">{module.title}</h2>
              <p className="mt-1 text-sm text-app-text-muted">{module.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {module.endpoints.map((endpoint) => (
                <EndpointCard key={endpoint.slug} moduleSlug={module.slug} endpoint={endpoint} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
