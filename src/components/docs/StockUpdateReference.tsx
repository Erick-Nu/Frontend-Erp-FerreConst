import type { ReactNode } from 'react'
import { replaceApiBaseUrl } from '@/config/public-env'
import { MethodBadge } from '@/components/MethodBadge'
import type { FieldSpec } from '@/types/docs'
import { CodeBlock } from './CodeBlock'
import { EndpointMethodPathBar } from './EndpointMethodPathBar'
import { ProbarButton } from './ProbarButton'
import { FieldRow } from './FieldRow'

type StockUpdateEndpoint = {
  slug: string
  title: string
  method: 'PATCH'
  path: string
  definition: string
  whenToUse: string
  authentication: string
  pathParams: FieldSpec[]
  body: FieldSpec[]
  businessRules: Array<{ title: string; description?: string }>
  expectedErrors: Array<{ status: number; title: string; message?: string }>
  responseExample: string
  requestExample: string
  notes: string[]
}

type StockUpdateReferenceProps = {
  moduleTitle: string
  moduleSlug: string
  endpoint: StockUpdateEndpoint
}

export function StockUpdateReference({ moduleTitle, moduleSlug, endpoint }: StockUpdateReferenceProps) {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_500px]">
      <article className="min-w-0 pb-16 sm:pb-20">
        <div>
          <p className="text-[15px] text-app-text-secondary">Endpoints / {moduleTitle}</p>

          <div className="mt-4 flex items-start justify-between gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <MethodBadge method={endpoint.method} />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">{endpoint.title}</h1>
            </div>
            <ProbarButton moduleSlug={moduleSlug} endpointSlug={endpoint.slug} />
          </div>

          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">{endpoint.definition}</p>
        </div>

        <EndpointMethodPathBar method={endpoint.method} path={endpoint.path} />

        <div className="mt-8 xl:hidden">
          <StockUpdatePreviewPanel endpoint={endpoint} />
        </div>

        <Section title="Caso de Uso">
          <p className="text-[15px] leading-7 text-app-text-secondary">{endpoint.whenToUse}</p>
        </Section>

        <Section title="Autenticación">
          <p className="text-[15px] leading-7 text-app-text-secondary">{endpoint.authentication}</p>
        </Section>

        <Section title="Parámetros de ruta">
          <div className="space-y-2">
            {endpoint.pathParams.map((field) => (
              <FieldRow key={field.name} field={field} compact />
            ))}
          </div>
        </Section>

        <Section title="Body">
          <div className="space-y-2">
            {endpoint.body.map((field) => (
              <FieldRow key={field.name} field={field} compact />
            ))}
          </div>
        </Section>

        <Section title="Reglas de negocio">
          <div className="space-y-3">
            {endpoint.businessRules.map((rule, index) => (
              <div
                key={`${rule.title}-${index}`}
                className="rounded-[1.15rem] border border-[var(--tone-rules-border)] bg-[var(--tone-rules-bg)] px-4 py-3 sm:px-5 sm:py-3.5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-md border border-[var(--tone-rules-border)] bg-app-surface text-[11px] font-black text-[var(--tone-rules)]">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold leading-6 text-app-text">{rule.title}</p>
                  </div>
                </div>
                {rule.description ? (
                  <p className="mt-1.5 pl-9 text-[13px] leading-6 text-app-text-secondary sm:max-w-3xl">{rule.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Errores esperados">
          <div className="space-y-3">
            {endpoint.expectedErrors.map((error) => (
              <div key={`${error.status}-${error.title}`} className="rounded-[1.1rem] border border-app-border bg-app-surface p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md border border-[var(--tone-error-border)] bg-[var(--tone-error-bg)] px-2.5 py-1 text-sm font-black text-[var(--tone-error)]">
                    {error.status}
                  </span>
                  <span className="font-semibold text-app-text">{error.title}</span>
                </div>
                {error.message ? <p className="mt-2 text-[15px] leading-7 text-app-text-secondary">{error.message}</p> : null}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Notas de uso">
          <NotesPanel items={endpoint.notes} />
        </Section>
      </article>

      <div className="hidden xl:block">
        <StockUpdatePreviewPanel endpoint={endpoint} />
      </div>
    </div>
  )
}

function StockUpdatePreviewPanel({ endpoint }: { endpoint: StockUpdateEndpoint }) {
  const curlExample = replaceApiBaseUrl(endpoint.requestExample)
  const responseExample = replaceApiBaseUrl(endpoint.responseExample)

  return (
    <aside className="space-y-5 sm:space-y-7 xl:sticky xl:top-24 xl:self-start">
      <CodeBlock title="cURL" label="Por defecto" language="bash" code={curlExample} maxHeight="18rem" />
      <CodeBlock title="Respuesta" label="200 OK" language="json" code={responseExample} maxHeight="30rem" />
    </aside>
  )
}

function Section({ title, children, className = 'mt-8' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function NotesPanel({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="rounded-[1.15rem] border border-[var(--tone-notes-border)] bg-[var(--tone-notes-bg)] px-4 py-3 sm:px-5 sm:py-3.5"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-md border border-[var(--tone-notes-border)] bg-app-surface text-[11px] font-black text-[var(--tone-notes)]">
              {index + 1}
            </span>
            <p className="text-[14px] font-semibold leading-6 text-app-text-secondary">{item}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
