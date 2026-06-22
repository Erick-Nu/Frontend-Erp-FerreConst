import Link from 'next/link'

type ProbarButtonProps = {
  moduleSlug: string
  endpointSlug: string
}

export function ProbarButton({ moduleSlug, endpointSlug }: ProbarButtonProps) {
  return (
    <Link
      href={`/api/playground?module=${moduleSlug}&endpoint=${endpointSlug}`}
      className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-sm font-bold text-app-text-secondary transition hover:border-app-border-hover hover:bg-app-surface-hover hover:text-app-text"
    >
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2.5 2.5l11 5.5-11 5.5V2.5z" />
      </svg>
      Probar
    </Link>
  )
}
