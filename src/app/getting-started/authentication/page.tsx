import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Autenticacion' }

export default function AuthenticationPage() {
  const apiBaseUrl = getApiBaseUrl()

  return (
    <div className="max-w-4xl space-y-8 sm:space-y-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-app-text-muted sm:tracking-[0.2em]">Autenticacion</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">Autenticacion JWT</h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-7 text-app-text-muted">
          Los endpoints protegidos requieren un access token enviado en el header <code className="text-app-text-secondary">Authorization</code>.
          El login devuelve un accessToken para consumir la API y un refreshToken para renovar la sesion.
        </p>
      </div>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Header requerido</h2>
        <pre className="code-scroll mt-5 overflow-x-auto rounded-[1.25rem] border border-app-border bg-app-surface p-4 text-sm text-app-text sm:p-5">
          Authorization: Bearer &lt;access_token&gt;
        </pre>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Flujo de autenticacion</h2>
        <div className="mt-5 space-y-4">
          <div className="flex gap-4 rounded-[1.1rem] border border-app-border bg-app-surface p-4">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-app-border text-xs font-black text-app-text-secondary">1</span>
            <div>
              <div className="text-sm font-bold text-app-text">Login</div>
              <p className="mt-1 text-sm leading-6 text-app-text-muted">El usuario inicia sesion con POST /auth/login usando RUC, apodo y contrasena.</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-[1.1rem] border border-app-border bg-app-surface p-4">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-app-border text-xs font-black text-app-text-secondary">2</span>
            <div>
              <div className="text-sm font-bold text-app-text">Tokens</div>
              <p className="mt-1 text-sm leading-6 text-app-text-muted">El backend devuelve accessToken y refreshToken cuando la empresa y el usuario estan activos.</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-[1.1rem] border border-app-border bg-app-surface p-4">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-app-border text-xs font-black text-app-text-secondary">3</span>
            <div>
              <div className="text-sm font-bold text-app-text">Consumo protegido</div>
              <p className="mt-1 text-sm leading-6 text-app-text-muted">El accessToken se envia en Authorization para consumir endpoints protegidos.</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-[1.1rem] border border-app-border bg-app-surface p-4">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-app-border text-xs font-black text-app-text-secondary">4</span>
            <div>
              <div className="text-sm font-bold text-app-text">Renovacion</div>
              <p className="mt-1 text-sm leading-6 text-app-text-muted">Cuando el accessToken expira, se renueva usando POST /auth/refresh con el refreshToken.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Ejemplo de login</h2>
        <pre className="code-scroll mt-5 overflow-x-auto rounded-[1.25rem] border border-app-border bg-app-surface p-4 text-sm text-app-text sm:p-5">{`curl -X POST ${apiBaseUrl}/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emruc": "1709639106001",
    "usapodo": "jperez",
    "uspassword": "secreto123"
  }'`}</pre>
      </section>

      <section>
        <h2 className="border-b border-app-border pb-4 text-2xl font-black text-app-text">Seguridad</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Intentos fallidos</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">El login puede bloquear temporalmente una combinacion de empresa, usuario e IP.</p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Refresh token</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">Usalo solo para renovar sesion; no debe enviarse en cada endpoint protegido.</p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Usuario activo</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">El backend valida que el usuario y la empresa se encuentren activos.</p>
          </div>
          <div className="rounded-[1rem] border border-app-border bg-app-surface p-4">
            <div className="text-sm font-bold text-app-text">Endpoints publicos</div>
            <p className="mt-2 text-sm leading-6 text-app-text-muted">Login, refresh y algunos endpoints de sistema pueden no requerir token JWT.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
