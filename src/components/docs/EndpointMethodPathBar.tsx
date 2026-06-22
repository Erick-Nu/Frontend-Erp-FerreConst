import { MethodBadge } from '@/components/MethodBadge'
import type { HttpMethod } from '@/types/docs'

type EndpointMethodPathBarProps = {
  method: HttpMethod
  path: string
}

export function EndpointMethodPathBar({ method, path }: EndpointMethodPathBarProps) {
  return (
    <section className="mt-5 rounded-[1.35rem] border border-app-border bg-app-code px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3 overflow-hidden">
        <MethodBadge method={method} />
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-sm font-semibold text-app-text-secondary sm:text-base">
          {path}
        </code>
      </div>
    </section>
  )
}
