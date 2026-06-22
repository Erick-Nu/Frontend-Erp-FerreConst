import type { ReactNode } from 'react'
import { replaceApiBaseUrl } from '@/config/public-env'
import { MethodBadge } from '@/components/MethodBadge'
import { CodeBlock } from './CodeBlock'
import { EndpointMethodPathBar } from './EndpointMethodPathBar'
import { ProbarButton } from './ProbarButton'

const healthResponse = `{
  "name": "esnt-backend-ferreteria",
  "version": "1.0.0"
}`

export function HealthCheckReference() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_500px]">
      <article className="min-w-0 pb-16 sm:pb-20">
        <div>
          <p className="text-[15px] text-app-text-secondary">Endpoints / Health Check</p>
          <div className="mt-4 flex items-start justify-between gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <MethodBadge method="GET" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">
                Health Check
              </h1>
            </div>
            <ProbarButton moduleSlug="health" endpointSlug="health" />
          </div>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">
            Endpoint base de verificación del servicio que devuelve el nombre y la versión de la API.
          </p>
        </div>

        <div className="mt-8">
          <EndpointMethodPathBar method="GET" path="/" />
        </div>

        <div className="mt-8 xl:hidden">
          <aside className="space-y-5 sm:space-y-7">
            <CodeBlock title="cURL" label="Por defecto" language="bash" code={replaceApiBaseUrl('curl -X GET https://api.tudominio.com/')} maxHeight="8rem" />
            <CodeBlock title="Respuesta" label="200 OK" language="json" code={replaceApiBaseUrl(healthResponse)} maxHeight="10rem" />
          </aside>
        </div>

        <Section title="Caso de Uso">
          <p className="text-[15px] leading-7 text-app-text-secondary">
            Se usa para validar que la API está operativa, por ejemplo en health checks, monitoreo, pruebas de conectividad o verificación de despliegue. Al usarlo, el usuario obtiene el nombre y la versión de la aplicación.
          </p>
        </Section>

        <Section title="Autenticación">
          <div className="rounded-[1.15rem] border border-[var(--tone-notes-border)] bg-[var(--tone-notes-bg)] px-4 py-3 sm:px-5 sm:py-3.5">
            <p className="text-[15px] font-semibold leading-7 text-app-text">No requiere autenticación.</p>
          </div>
        </Section>

        <Section title="Parámetros de ruta">
          <p className="text-[15px] leading-7 text-app-text-secondary">Este endpoint no recibe parámetros de ruta.</p>
        </Section>

        <Section title="Query params">
          <p className="text-[15px] leading-7 text-app-text-secondary">Este endpoint no recibe query params.</p>
        </Section>

        <Section title="Body">
          <p className="text-[15px] leading-7 text-app-text-secondary">No aplica.</p>
        </Section>

        <Section title="Reglas de negocio">
          <div className="space-y-3">
            <RuleCard number={1} title="No requiere token JWT ni ningún tipo de autenticación." />
            <RuleCard number={2} title="Es el único endpoint público del sistema." />
            <RuleCard number={3} title="Responde siempre con código 200 y los datos de la aplicación mientras el servidor esté en ejecución." />
          </div>
        </Section>

        <Section title="Errores esperados">
          <div className="space-y-3">
            <div className="rounded-[1.1rem] border border-app-border bg-app-surface p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-[var(--tone-error-border)] bg-[var(--tone-error-bg)] px-2.5 py-1 text-sm font-black text-[var(--tone-error)]">500</span>
                <span className="font-semibold text-app-text">Internal server error</span>
              </div>
              <p className="mt-2 text-[15px] leading-7 text-app-text-secondary">Error inesperado del servidor que impide responder al health check.</p>
            </div>
          </div>
        </Section>

        <Section title="Notas de uso">
          <NotesPanel items={[
            'Este endpoint no requiere headers especiales ni autenticación.',
            'Úsalo para validar la disponibilidad de la API antes de intentar el login u otras operaciones.',
          ]} />
        </Section>
      </article>

      <div className="hidden xl:block">
        <aside className="space-y-5 sm:space-y-7 xl:sticky xl:top-24 xl:self-start">
          <CodeBlock title="cURL" label="Por defecto" language="bash" code={replaceApiBaseUrl('curl -X GET https://api.tudominio.com/')} maxHeight="8rem" />
          <CodeBlock title="Respuesta" label="200 OK" language="json" code={replaceApiBaseUrl(healthResponse)} maxHeight="10rem" />
        </aside>
      </div>
    </div>
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

function RuleCard({ number, title }: { number: number; title: string }) {
  return (
    <div className="rounded-[1.15rem] border border-[var(--tone-rules-border)] bg-[var(--tone-rules-bg)] px-4 py-3 sm:px-5 sm:py-3.5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-md border border-[var(--tone-rules-border)] bg-app-surface text-[11px] font-black text-[var(--tone-rules)]">{number}</span>
        <p className="text-[14px] font-semibold leading-6 text-app-text">{title}</p>
      </div>
    </div>
  )
}

function NotesPanel({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="rounded-[1.15rem] border border-[var(--tone-notes-border)] bg-[var(--tone-notes-bg)] px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-md border border-[var(--tone-notes-border)] bg-app-surface text-[11px] font-black text-[var(--tone-notes)]">{index + 1}</span>
            <p className="text-[14px] font-semibold leading-6 text-app-text-secondary">{item}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
