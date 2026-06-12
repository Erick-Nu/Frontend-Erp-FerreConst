import type { EndpointDoc } from '@/types/docs'
import { MethodBadge } from '@/components/MethodBadge'
import { EndpointExamplePanel } from './EndpointExamplePanel'
import { FieldRow } from './FieldRow'

type EndpointReferenceProps = {
  module: { title: string }
  endpoint: EndpointDoc
}

export function EndpointReference({ module, endpoint }: EndpointReferenceProps) {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_500px]">
      <article className="min-w-0 pb-16 sm:pb-20">
        <p className="text-[15px] text-app-text-secondary">Endpoints / {module.title}</p>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">{endpoint.title}</h1>
          </div>
        </div>

        <section className="mt-6">
          <p className="max-w-3xl text-[15px] leading-7 text-app-text-muted">{endpoint.summary}</p>
        </section>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-[1.35rem] border border-app-border bg-app-code px-4 py-3 sm:flex-row sm:items-center">
          <MethodBadge method={endpoint.method} />
          <code className="block w-full overflow-x-auto whitespace-nowrap text-sm font-semibold text-app-text sm:text-base">
            {endpoint.path}
          </code>
        </div>

        <div className="mt-8 xl:hidden">
          <EndpointExamplePanel endpoint={endpoint} />
        </div>

        {endpoint.status === 'pending' ? (
          <div className="mt-8 rounded-[1.35rem] border border-[var(--tone-pending-border)] bg-[var(--tone-pending-bg)] p-5">
            <h2 className="font-bold text-[var(--tone-pending)]">Documentacion pendiente</h2>
            <p className="mt-2 text-sm leading-6 text-app-text-secondary">
              Esta pagina ya esta disponible y muestra una estructura base. Falta completar campos exactos,
              validaciones, errores y ejemplos finales desde el backend.
            </p>
          </div>
        ) : null}

        {endpoint.authentication ? (
          <section className="mt-14">
            <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Autenticación</h2>
            <p className="mt-5 rounded-[1.25rem] border border-app-border bg-app-surface p-5 text-[15px] leading-7 text-app-text-secondary">
              {endpoint.authentication}
            </p>
          </section>
        ) : null}

        {endpoint.contentTypes?.length ? (
          <section className="mt-14">
            <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Content-Type</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {endpoint.contentTypes.map((type) => (
                <code key={type} className="rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text-secondary">
                  {type}
                </code>
              ))}
            </div>
          </section>
        ) : null}

        <FieldsSection title="Headers" fields={endpoint.headers} />
        <FieldsSection title="Parámetros de ruta" fields={endpoint.pathParams} />
        <FieldsSection title="Parámetros de consulta" fields={endpoint.queryParams} />
        {endpoint.bodyGroups?.length ? (
          endpoint.bodyGroups.map((group) => (
            <FieldsSection key={group.title} title={group.title} fields={group.fields} contentType={endpoint.contentType} />
          ))
        ) : (
          <FieldsSection title="Cuerpo" fields={endpoint.body} contentType={endpoint.contentType} />
        )}

        <ListSection
          title="Reglas de negocio"
          tone="rules"
          description="Condiciones que el backend aplica antes, durante o despues de ejecutar este endpoint. Sirven para entender validaciones, restricciones y efectos secundarios de la operacion."
          items={endpoint.businessRules?.length ? endpoint.businessRules : ['No aplica.']}
        />

        {endpoint.errors?.length ? (
          <section className="mt-14">
            <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Errores</h2>
            <div className="mt-5 divide-y divide-app-border rounded-[1.25rem] border border-app-border bg-app-surface">
              {endpoint.errors.map((error, index) => (
                <div key={`${error.status}-${error.title}-${index}`} className="p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md border border-[var(--tone-error-border)] bg-[var(--tone-error-bg)] px-2.5 py-1 text-sm font-black text-[var(--tone-error)]">
                      {error.status}
                    </span>
                    <span className="font-bold text-app-text">{error.title}</span>
                  </div>
                  {error.message ? (
                    <code className="mt-3 block text-sm leading-6 text-app-text-muted">{error.message}</code>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14">
          <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Respuestas</h2>
          {endpoint.responseContentType ? (
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">
                Tipo de contenido: <code className="text-app-text-secondary">{endpoint.responseContentType}</code>
            </p>
          ) : null}
          <div className="mt-4 divide-y divide-app-border">
            {endpoint.responses.map((response) => (
              <div key={`${response.status}-${response.label}`} className="py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md border border-[var(--tone-success-border)] bg-[var(--tone-success-bg)] px-2.5 py-1 text-sm font-black text-[var(--tone-success)]">
                    {response.status}
                  </span>
                  <span className="font-semibold text-app-text-secondary">{response.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {endpoint.notes?.length ? (
          <ListSection
            title="Notas"
            tone="notes"
            description="Consideraciones adicionales para consumir este endpoint correctamente y evitar errores de integracion."
            items={endpoint.notes}
          />
        ) : null}
      </article>

      <div className="hidden xl:block">
        <EndpointExamplePanel endpoint={endpoint} />
      </div>
    </div>
  )
}

function ListSection({
  title,
  items,
  description,
  tone = 'default',
}: {
  title: string
  items: string[]
  description?: string
  tone?: 'default' | 'rules' | 'notes'
}) {
  const toneStyles = {
    default: {
      marker: 'bg-app-border text-app-text-secondary',
      card: 'border-app-border bg-app-surface',
    },
    rules: {
      marker: 'bg-[var(--tone-rules-bg)] text-[var(--tone-rules)] ring-1 ring-[var(--tone-rules-ring)]',
      card: 'border-[var(--tone-rules-border)] bg-[var(--tone-rules-bg)]',
    },
    notes: {
      marker: 'bg-[var(--tone-notes-bg)] text-[var(--tone-notes)] ring-1 ring-[var(--tone-notes-ring)]',
      card: 'border-[var(--tone-notes-border)] bg-[var(--tone-notes-bg)]',
    },
  }[tone]

  return (
    <section className="mt-14">
      <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">{title}</h2>
      {description ? <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">{description}</p> : null}
      <ul className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li key={item} className={`flex gap-4 rounded-[1.1rem] border p-4 ${toneStyles.card}`}>
            <span className={`mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-full text-xs font-black ${toneStyles.marker}`}>
              {index + 1}
            </span>
            <span className="text-[15px] leading-7 text-app-text-secondary">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FieldsSection({
  title,
  fields,
  contentType,
}: {
  title: string
  fields?: EndpointDoc['body']
  contentType?: string
}) {
  if (!fields?.length) {
    return null
  }

  return (
    <section className="mt-14">
      <div className="flex flex-col items-start gap-2 border-b border-app-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-app-text">{title}</h2>
        {contentType ? <code className="text-sm text-app-text-secondary">{contentType}</code> : null}
      </div>
      <div className="mt-5">
        {fields.map((field) => (
          <FieldRow key={field.name} field={field} />
        ))}
      </div>
    </section>
  )
}
