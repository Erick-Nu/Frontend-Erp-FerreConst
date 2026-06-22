import type { ReactNode } from 'react'
import { replaceApiBaseUrl } from '@/config/public-env'
import { CodeBlock } from './CodeBlock'
import { MethodBadge } from '@/components/MethodBadge'

type FieldRow = { campo: string; tipo: string; descripcion: string }
type EndpointRow = { endpoint: string; method: string; code: string; response: string }

const fullStructure = `{
  "proforma": {
    "prfmaid": "66ff3afe-...",
    "prfmaidentificador": "FE01-002-001-34",
    "prfmaestado": "emitida",
    "prfmafchregistro": "2026-05-25T04:35:56.719Z",
    "prfmafchactualizacion": "2026-05-25T04:35:56.719Z",
    "emisor": {
      "empresa": { "emid": "...", "emruc": "1709639106001", "emcodigo": "FE01", "emrznsocial": "Ferreconst ElectroLuz K y B", "emlogo": "http://.../logo.png", "emcorreo": "..." },
      "sucursal": { "suid": "...", "suidentificador": "002", "sunombre": "Sucursal Centro" },
      "caja": { "cjid": "...", "cjidentificador": "001" },
      "usuario": { "usid": "...", "usnombre": "Erick Nuñez", "usrol": "jefe" }
    },
    "receptor": {
      "cliente": { "clnteid": "...", "clntenombre": "Juan Perez", "clnteidentificacion": "1712345678", "clntecorreo": "juan@email.com", "clntetelefono": "0987654321", "clntedireccion": "Av. Principal y Calle 10" }
    },
    "metodoPago": {
      "mpid": "...", "mpnombre": "Efectivo"
    },
    "detalle": [
      { "dprfmaid": "...", "dprfmatipoitem": "inventariable", "producto": { "dprfmacodigo": "012344678901", "dprfmadescripcion": "Brocha 2\\\"", "dprfmacantidad": 1, "dprfmapreciounitario": 25, "dprfmapreciototal": 25 } }
    ],
    "total": { "prfmasubtotal": 35, "prfmadescuento": 3, "prfmatotal": 32 },
    "documento": { "docnombre": "FE01-002-001-34_2026-05-25.pdf", "docurl": "http://.../FE01-002-001-34_2026-05-25.pdf" }
  }
}`

const paginatedStructure = `{
  "items": [
    { "proforma": { ... } },
    { "proforma": { ... } }
  ],
  "page": 1,
  "pageSize": 10,
  "totalItems": 34,
  "totalPages": 4
}`

const pdfStructure = `{
  "proforma": {
    "prfmaid": "66ff3afe-...",
    "prfmaidentificador": "FE01-002-001-34",
    "documento": {
      "docnombre": "FE01-002-001-34_2026-05-25.pdf",
      "docurl": "http://.../FE01-002-001-34_2026-05-25.pdf"
    }
  }
}`

export function ProformaStructureReference() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_500px]">
      <article className="min-w-0 pb-16 sm:pb-20">
        <div>
          <p className="text-[15px] text-app-text-secondary">Documentación / Proformas</p>
          <div className="mt-4 flex items-start justify-between gap-6">
            <h1 className="text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">
              Estructura de Respuesta: Proforma
            </h1>
          </div>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">
            Todas las estructuras JSON de respuesta del módulo de proformas, incluyendo los tipos de cada campo, sus valores
            posibles y los endpoints que las devuelven, para que el frontend y la generación de PDF usen referencias estables.
          </p>
        </div>

        {/* Mobile preview */}
        <div className="mt-8 xl:hidden">
          <aside className="space-y-5 sm:space-y-7">
            <CodeBlock title="ProformaResponseDto" label="POST/GET/PUT/PATCH" language="json" code={replaceApiBaseUrl(fullStructure)} maxHeight="22rem" />
            <CodeBlock title="FindProformasResponseDto" label="GET /proformas" language="json" code={replaceApiBaseUrl(paginatedStructure)} maxHeight="16rem" />
            <CodeBlock title="ProformaPdfResponseDto" label="GET /proformas/:id/pdf" language="json" code={replaceApiBaseUrl(pdfStructure)} maxHeight="14rem" />
          </aside>
        </div>

        <Section title="ProformaResponseDto — Proforma completa">
          <p className="text-[15px] leading-7 text-app-text-secondary">
            Esta estructura es devuelta por los endpoints <code className="text-app-text">POST /proformas</code>,{' '}
            <code className="text-app-text">GET /proformas/:id</code>,{' '}
            <code className="text-app-text">PATCH /proformas/:id/pay</code>,{' '}
            <code className="text-app-text">PATCH /proformas/:id/cancel</code> y{' '}
            <code className="text-app-text">PUT /proformas/:id</code>. La respuesta usa un objeto raíz{' '}
            <code className="text-app-text">proforma</code>.
          </p>
        </Section>

        <Section title="Datos principales">
          <FieldsTable
            rows={[
              { campo: 'prfmaid', tipo: 'string', descripcion: 'ID único (UUID) de la proforma.' },
              { campo: 'prfmaidentificador', tipo: 'string', descripcion: 'Identificador legible generado como `{emcodigo}-{suidentificador}-{cjidentificador}-{secuencia}`.' },
              { campo: 'prfmaestado', tipo: 'string', descripcion: 'Estado actual. Valores: `emitida`, `pagada`, `anulada`.' },
              { campo: 'prfmafchregistro', tipo: 'Date', descripcion: 'Fecha y hora de creación.' },
              { campo: 'prfmafchactualizacion', tipo: 'Date', descripcion: 'Fecha de última modificación.' },
            ]}
          />
        </Section>

        <Section title="Emisor — Quién emite">
          <SubSection title="empresa">
            <FieldsTable
              rows={[
                { campo: 'emid', tipo: 'string', descripcion: 'ID único de la empresa.' },
                { campo: 'emruc', tipo: 'string | null', descripcion: 'RUC de la empresa.' },
                { campo: 'emcodigo', tipo: 'string | null', descripcion: 'Código interno.' },
                { campo: 'emcorreo', tipo: 'string | null', descripcion: 'Correo electrónico.' },
                { campo: 'emlogo', tipo: 'string | null', descripcion: 'URL pública del logo.' },
                { campo: 'emrznsocial', tipo: 'string | null', descripcion: 'Razón social.' },
              ]}
            />
          </SubSection>
          <SubSection title="sucursal">
            <FieldsTable
              rows={[
                { campo: 'suid', tipo: 'string', descripcion: 'ID único de la sucursal.' },
                { campo: 'suidentificador', tipo: 'string | null', descripcion: 'Identificador (3 dígitos).' },
                { campo: 'sunombre', tipo: 'string | null', descripcion: 'Nombre de la sucursal.' },
              ]}
            />
          </SubSection>
          <SubSection title="caja">
            <FieldsTable
              rows={[
                { campo: 'cjid', tipo: 'string', descripcion: 'ID único de la caja.' },
                { campo: 'cjidentificador', tipo: 'string | null', descripcion: 'Identificador de la caja.' },
              ]}
            />
          </SubSection>
          <SubSection title="usuario">
            <FieldsTable
              rows={[
                { campo: 'usid', tipo: 'string', descripcion: 'ID único del usuario.' },
                { campo: 'usnombre', tipo: 'string | null', descripcion: 'Nombre del usuario.' },
                { campo: 'usrol', tipo: 'string | null', descripcion: 'Rol: `administrador`, `jefe`, `empleado`.' },
              ]}
            />
          </SubSection>
        </Section>

        <Section title="Receptor — Información del cliente">
          <FieldsTable
            rows={[
              { campo: 'clnteid', tipo: 'string', descripcion: 'ID único del cliente.' },
              { campo: 'clnteidentificacion', tipo: 'string | null', descripcion: 'Cédula o RUC.' },
              { campo: 'clntenombre', tipo: 'string | null', descripcion: 'Nombre o razón social.' },
              { campo: 'clntecorreo', tipo: 'string | null', descripcion: 'Correo electrónico.' },
              { campo: 'clntedireccion', tipo: 'string | null', descripcion: 'Dirección física.' },
              { campo: 'clntetelefono', tipo: 'string | null', descripcion: 'Teléfono.' },
            ]}
          />
        </Section>

        <Section title="Método de pago">
          <FieldsTable
            rows={[
              { campo: 'mpid', tipo: 'string', descripcion: 'ID único del método de pago.' },
              { campo: 'mpnombre', tipo: 'string | null', descripcion: 'Nombre del método de pago.' },
            ]}
          />
        </Section>

        <Section title="Total — Resumen monetario">
          <FieldsTable
            rows={[
              { campo: 'prfmasubtotal', tipo: 'number', descripcion: 'Suma de totales de todas las líneas.' },
              { campo: 'prfmadescuento', tipo: 'number', descripcion: 'Descuento total. Si no hay, vale 0.' },
              { campo: 'prfmatotal', tipo: 'number', descripcion: 'Total final (`subtotal - descuento`).' },
            ]}
          />
        </Section>

        <Section title="Detalle — Items">
          <p className="mb-3 text-[15px] leading-7 text-app-text-secondary">
            Arreglo de objetos. Cada elemento representa una línea del detalle.
          </p>
          <FieldsTable
            rows={[
              { campo: 'dprfmaid', tipo: 'string', descripcion: 'ID único de la línea.' },
              { campo: 'dprfmatipoitem', tipo: 'string', descripcion: '`inventariable` o `manual`.' },
              { campo: 'producto', tipo: 'object', descripcion: 'Datos del producto (ver abajo).' },
            ]}
          />
          <SubSection title="producto">
            <FieldsTable
              rows={[
                { campo: 'dprfmacodigo', tipo: 'string | null', descripcion: 'Código del producto. `null` si es manual.' },
                { campo: 'dprfmadescripcion', tipo: 'string | null', descripcion: 'Descripción del producto o servicio.' },
                { campo: 'dprfmacantidad', tipo: 'number', descripcion: 'Cantidad. Siempre mayor a 0.' },
                { campo: 'dprfmapreciounitario', tipo: 'number', descripcion: 'Precio unitario.' },
                { campo: 'dprfmapreciototal', tipo: 'number', descripcion: 'Total de la línea.' },
              ]}
            />
          </SubSection>
        </Section>

        <Section title="Documento — PDF asociado">
          <FieldsTable
            rows={[
              { campo: 'docnombre', tipo: 'string | null', descripcion: 'Nombre del archivo PDF.' },
              { campo: 'docurl', tipo: 'string | null', descripcion: 'URL pública completa del PDF.' },
            ]}
          />
        </Section>

        <Section title="FindProformasResponseDto — Listado paginado">
          <p className="mb-3 text-[15px] leading-7 text-app-text-secondary">
            Devuelto por <code className="text-app-text">GET /proformas</code>. Cada elemento de{' '}
            <code className="text-app-text">items</code> es un <code className="text-app-text">ProformaResponseDto</code> completo.
          </p>
          <FieldsTable
            rows={[
              { campo: 'items', tipo: 'ProformaResponseDto[]', descripcion: 'Arreglo de proformas completas.' },
              { campo: 'page', tipo: 'number', descripcion: 'Página actual.' },
              { campo: 'pageSize', tipo: 'number', descripcion: 'Tamaño de página.' },
              { campo: 'totalItems', tipo: 'number', descripcion: 'Total de proformas.' },
              { campo: 'totalPages', tipo: 'number', descripcion: 'Total de páginas.' },
            ]}
          />
        </Section>

        <Section title="ProformaPdfResponseDto — Referencia del PDF">
          <p className="mb-3 text-[15px] leading-7 text-app-text-secondary">
            Devuelto por <code className="text-app-text">GET /proformas/:id/pdf</code>. Versión reducida que solo incluye
            los datos del documento.
          </p>
          <FieldsTable
            rows={[
              { campo: 'proforma.prfmaid', tipo: 'string', descripcion: 'ID único de la proforma.' },
              { campo: 'proforma.prfmaidentificador', tipo: 'string', descripcion: 'Identificador legible.' },
              { campo: 'proforma.documento.docnombre', tipo: 'string | null', descripcion: 'Nombre del archivo PDF.' },
              { campo: 'proforma.documento.docurl', tipo: 'string | null', descripcion: 'URL pública del PDF.' },
            ]}
          />
        </Section>

        <Section title="Endpoints y respuestas">
          <EndpointsTable
            rows={[
              { endpoint: '/proformas', method: 'POST', code: '201', response: 'ProformaResponseDto' },
              { endpoint: '/proformas', method: 'GET', code: '200', response: 'FindProformasResponseDto' },
              { endpoint: '/proformas/:id', method: 'GET', code: '200', response: 'ProformaResponseDto' },
              { endpoint: '/proformas/:id', method: 'PUT', code: '200', response: 'ProformaResponseDto' },
              { endpoint: '/proformas/:id/pay', method: 'PATCH', code: '200', response: 'ProformaResponseDto' },
              { endpoint: '/proformas/:id/cancel', method: 'PATCH', code: '200', response: 'ProformaResponseDto' },
              { endpoint: '/proformas/:id/pdf', method: 'GET', code: '200', response: 'ProformaPdfResponseDto' },
              { endpoint: '/proformas/:id/send', method: 'POST', code: '200', response: '{ message }' },
            ]}
          />
        </Section>

        <Section title="Notas importantes">
          <NotesPanel
            items={[
              'Raíz `proforma`: todas las respuestas envuelven los datos en un objeto con clave `proforma`. Accede siempre como `response.proforma.*`.',
              '`emlogo` y `docurl`: son URLs públicas completas. No necesitas concatenar una URL base.',
              '`dprfmatipoitem`: se deriva de `dprfmaesinventariable`: `true` → `"inventariable"`, `false` → `"manual"`.',
              '`producto.dprfmacodigo`: es `null` para items manuales.',
              'Listado paginado: `GET /proformas` devuelve la estructura completa en `items[]`, no un resumen.',
              'Fechas: `prfmafchregistro` y `prfmafchactualizacion` son ISO 8601.',
              '`prfmaidentificador`: se genera automáticamente al crear la proforma y no cambia.',
              'PDF: se genera automáticamente al crear, pagar, anular o reemplazar una proforma.',
              '`docnombre` y `docurl`: pueden ser `null` si el PDF no se ha generado.',
            ]}
          />
        </Section>
      </article>

      {/* Desktop preview panel */}
      <div className="hidden xl:block">
        <aside className="space-y-5 sm:space-y-7 xl:sticky xl:top-24 xl:self-start">
          <CodeBlock title="ProformaResponseDto" label="POST / GET / PUT / PATCH" language="json" code={replaceApiBaseUrl(fullStructure)} maxHeight="35rem" />
          <CodeBlock title="FindProformasResponseDto" label="GET /proformas" language="json" code={replaceApiBaseUrl(paginatedStructure)} maxHeight="16rem" />
          <CodeBlock title="ProformaPdfResponseDto" label="GET /proformas/:id/pdf" language="json" code={replaceApiBaseUrl(pdfStructure)} maxHeight="14rem" />
        </aside>
      </div>
    </div>
  )
}

function Section({ title, children, className = 'mt-10' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 rounded-lg border border-app-border bg-app-elevated px-4 py-2 text-base font-bold text-app-text">{title}</h3>
      {children}
    </div>
  )
}

function FieldsTable({ rows }: { rows: FieldRow[] }) {
  return (
    <div className="overflow-x-auto rounded-[1.15rem] border border-app-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-app-border bg-app-elevated">
            <th className="w-[30%] px-4 py-3 text-left font-bold text-app-text">Campo</th>
            <th className="w-[20%] px-4 py-3 text-left font-bold text-app-text">Tipo</th>
            <th className="w-[50%] px-4 py-3 text-left font-bold text-app-text">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-app-border last:border-b-0 hover:bg-app-surface/50">
              <td className="px-4 py-3 font-mono text-xs text-app-text">{row.campo}</td>
              <td className="px-4 py-3 font-mono text-xs text-app-text-secondary">{row.tipo}</td>
              <td className="px-4 py-3 text-xs text-app-text-secondary">{row.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EndpointsTable({ rows }: { rows: EndpointRow[] }) {
  return (
    <div className="overflow-x-auto rounded-[1.15rem] border border-app-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-app-border bg-app-elevated">
            <th className="w-[35%] px-4 py-3 text-left font-bold text-app-text">Endpoint</th>
            <th className="w-[20%] px-4 py-3 text-left font-bold text-app-text">Método</th>
            <th className="w-[15%] px-4 py-3 text-left font-bold text-app-text">Código</th>
            <th className="w-[30%] px-4 py-3 text-left font-bold text-app-text">Respuesta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-app-border last:border-b-0 hover:bg-app-surface/50">
              <td className="px-4 py-3 font-mono text-xs text-app-text">{row.endpoint}</td>
              <td className="px-4 py-3"><MethodBadge method={row.method} /></td>
              <td className="px-4 py-3 text-xs text-app-text-secondary">{row.code}</td>
              <td className="px-4 py-3 text-xs text-app-text-secondary">{row.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
