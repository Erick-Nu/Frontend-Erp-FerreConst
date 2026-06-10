import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Introduccion' }

export default function IntroductionPage() {
  const apiBaseUrl = getApiBaseUrl()

  return (
    <div className="max-w-4xl space-y-8 sm:space-y-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-app-text-muted sm:tracking-[0.2em]">Introduccion</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">API ESNT Ferreteria</h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-7 text-app-text-muted">
          Esta API expone los recursos necesarios para operar un sistema de ferreteria: empresas, usuarios,
          productos, inventario, proformas, clientes, proveedores, cajas y configuracion general.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.1rem] border border-app-border bg-app-surface p-4">
          <div className="text-sm font-black text-app-text">REST API</div>
          <p className="mt-2 text-sm leading-6 text-app-text-muted">Endpoints organizados por modulo y accion de negocio.</p>
        </div>
        <div className="rounded-[1.1rem] border border-app-border bg-app-surface p-4">
          <div className="text-sm font-black text-app-text">Autenticacion JWT</div>
          <p className="mt-2 text-sm leading-6 text-app-text-muted">Los endpoints protegidos usan Authorization: Bearer &lt;token&gt;.</p>
        </div>
        <div className="rounded-[1.1rem] border border-app-border bg-app-surface p-4">
          <div className="text-sm font-black text-app-text">Documentacion oficial</div>
          <p className="mt-2 text-sm leading-6 text-app-text-muted">Referencia completa de la API con ejemplos y reglas de negocio.</p>
        </div>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Base URL</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">
          Usa esta URL como referencia para probar los endpoints del backend.
        </p>
        <pre className="code-scroll mt-5 overflow-x-auto rounded-[1.25rem] border border-app-border bg-app-surface p-4 text-sm text-app-text sm:p-5">{apiBaseUrl}</pre>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Como esta organizada</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Modulos</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">Cada modulo agrupa endpoints de un dominio: Auth, Product, Stock, Proforma, Company, User y mas.</p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">CRUD</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">Los endpoints se ordenan por POST, GET, PATCH, PUT y DELETE para facilitar la lectura.</p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Reglas de negocio</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">Cada pagina muestra validaciones y restricciones importantes cuando aplican.</p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Ejemplos</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">Cada endpoint incluye cURL y ejemplo de respuesta en el panel derecho.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Formato general de respuesta</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">
          La respuesta puede variar por endpoint, pero suele incluir datos del recurso y mensajes de estado del backend.
        </p>
        <pre className="code-scroll mt-5 overflow-x-auto rounded-[1.25rem] border border-app-border bg-app-surface p-4 text-sm text-app-text sm:p-5">{`{
  "success": true,
  "data": {},
  "message": "Operacion completada"
}`}</pre>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Lectura recomendada</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-[15px] leading-7 text-app-text-secondary">
          <li>Revisa primero la autenticacion para entender access token y refresh token.</li>
          <li>Consulta la referencia API desde el sidebar y abre el modulo que necesitas.</li>
          <li>Valida body, reglas de negocio y errores antes de integrar un endpoint.</li>
        </ol>
      </section>
    </div>
  )
}
