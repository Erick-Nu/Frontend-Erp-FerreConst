import Link from 'next/link'
import { MethodBadge } from './MethodBadge'

type EndpointCardProps = {
  moduleSlug: string
  endpoint: {
    slug: string
    title: string
    method: string
    path: string
    summary: string
    status: string
  }
}

export function EndpointCard({ moduleSlug, endpoint }: EndpointCardProps) {
  return (
    <Link
      href={`/api/${moduleSlug}/${endpoint.slug}`}
      className="block rounded-[1rem] border border-app-border bg-app-surface p-4 transition hover:border-app-border-hover hover:bg-app-surface-hover sm:p-5"
    >
      <div className="mb-3 flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center">
        <MethodBadge method={endpoint.method} />
        <code className="block w-full break-all text-xs text-app-text-secondary">{endpoint.path}</code>
      </div>
      <h3 className="text-base font-bold text-app-text">{endpoint.title}</h3>
      <p className="text-clamp-2 mt-1.5 text-sm leading-6 text-app-text-muted">{endpoint.summary}</p>
      <span className="mt-3 inline-flex rounded-full border border-app-border bg-app-surface px-2.5 py-1 text-[11px] font-semibold text-app-text-muted">
        {endpoint.status === 'documented' ? 'Documentado' : 'Pendiente'}
      </span>
    </Link>
  )
}
