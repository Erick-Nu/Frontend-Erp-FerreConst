import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Introduccion' }

export default function IntroductionPage() {
  const apiBaseUrl = getApiBaseUrl()

  return (
    <div className="max-w-4xl space-y-8 sm:space-y-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-app-text-muted sm:tracking-[0.2em]">Introduccion</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">API Ferreconst</h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-7 text-app-text-muted">
          API REST multi-empresa para operar un sistema de ferreteria: empresas, sucursales, cajas, usuarios,
          productos, inventario, proformas, clientes, proveedores, metodos de pago y configuracion general.
          El backend expone 71 endpoints organizados en 17 modulos con autenticacion JWT y control de acceso
          por empresa.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.1rem] border border-app-border bg-app-surface p-4">
          <div className="text-sm font-black text-app-text">REST multi-empresa</div>
          <p className="mt-2 text-sm leading-6 text-app-text-muted">
            Arquitectura jerarquica: empresa padre gestiona empresas hijas, cada una con sucursales,
            cajas y usuarios independientes.
          </p>
        </div>
        <div className="rounded-[1.1rem] border border-app-border bg-app-surface p-4">
          <div className="text-sm font-black text-app-text">Autenticacion JWT</div>
          <p className="mt-2 text-sm leading-6 text-app-text-muted">
            Login con RUC, apodo y contrasena. Bloqueo temporal tras 3 intentos fallidos.
            Access token para endpoints protegidos y refresh token para renovar sesion.
          </p>
        </div>
        <div className="rounded-[1.1rem] border border-app-border bg-app-surface p-4">
          <div className="text-sm font-black text-app-text">71 endpoints documentados</div>
          <p className="mt-2 text-sm leading-6 text-app-text-muted">
            17 modulos con operaciones CRUD, ejemplos cURL con URL base configurable,
            reglas de negocio y respuestas JSON reales en cada pagina.
          </p>
        </div>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Base URL</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">
          Usa esta URL como referencia para probar los endpoints del backend.
          Los ejemplos cURL en cada pagina se adaptan automaticamente a esta URL.
        </p>
        <pre className="code-scroll mt-5 overflow-x-auto rounded-[1.25rem] border border-app-border bg-app-surface p-4 text-sm text-app-text sm:p-5">{apiBaseUrl}</pre>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Como esta organizada</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Modulos por dominio</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">
              Cada modulo agrupa endpoints de un area funcional: Autenticacion, Alertas, Sucursales, Marcas,
              Categorias, Cajas, Clientes, Empresas, Configuracion, Medidas, Metodos de Pago, Productos,
              Proformas, Proveedores, Stock, Usuarios y Health Check.
            </p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Operaciones CRUD</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">
              Cada modulo expone POST para crear, GET para listar, GET /:id para obtener detalle
              y PATCH para actualizar. Algunos incluyen operaciones adicionales como DELETE, PUT o
              acciones de negocio especificas (pagar, anular, enviar).
            </p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Reglas de negocio</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">
              Cada endpoint documenta validaciones, restricciones de estado y efectos secundarios:
              descuento de stock al pagar, bloqueo por intentos fallidos, estados permitidos para
              cada operacion, y mas.
            </p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Ejemplos y respuestas</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">
              Cada pagina incluye un ejemplo cURL y la respuesta JSON esperada en el panel derecho.
              Los ejemplos usan la URL base configurada automaticamente.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Formato de autenticacion</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-app-text-muted">
          El login devuelve accessToken, refreshToken y los datos de la empresa y el usuario autenticado.
          Los endpoints protegidos requieren el accessToken en el header <code className="text-app-text-secondary">Authorization: Bearer &lt;token&gt;</code>.
        </p>
        <pre className="code-scroll mt-5 overflow-x-auto rounded-[1.25rem] border border-app-border bg-app-surface p-4 text-sm text-app-text sm:p-5">{`{
  "accessToken": "<jwt_access_token>",
  "refreshToken": "<opaque_refresh_token>",
  "company": {
    "emid": "uuid",
    "emruc": "1709639106001",
    "emrznsocial": "Ferreconst ElectroLuz K y B",
    "emlogo": "http://.../uploads/empresas/company.png",
    "emestado": "activo",
    "empadre": false
  },
  "user": {
    "usid": "uuid",
    "usnombre": "Juan Perez",
    "usapodo": "jperez",
    "uscorreo": "juan.perez@empresa.com",
    "usimagen": "http://.../uploads/usuarios/user.png",
    "usrol": "jefe",
    "usestado": "activo"
  }
}`}</pre>

      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Lectura recomendada</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-[15px] leading-7 text-app-text-secondary">
          <li>Revisa la pagina de autenticacion para entender el flujo: login con RUC + apodo, tokens JWT, rate limiting y renovacion de sesion.</li>
          <li>Identifica el RUC de tu empresa y las credenciales de un usuario activo para comenzar a probar.</li>
          <li>Explora los modulos desde el sidebar: cada uno agrupa endpoints de un dominio especifico con sus reglas de negocio.</li>
          <li>Antes de integrar un endpoint, valida campos requeridos, tipos de datos, reglas de negocio y codigos de error documentados.</li>
        </ol>
      </section>
    </div>
  )
}
