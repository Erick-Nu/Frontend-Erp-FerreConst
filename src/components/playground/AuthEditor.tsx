'use client'

export type AuthType = 'none' | 'bearer' | 'basic' | 'apikey'

export type AuthState = {
  type: AuthType
  token: string
  username: string
  password: string
  keyName: string
}

type AuthEditorProps = {
  auth: AuthState
  onChange: (auth: AuthState) => void
  disabled?: boolean
}

const AUTH_OPTIONS: { value: AuthType; label: string }[] = [
  { value: 'none', label: 'Ninguno' },
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'basic', label: 'Basic Auth' },
  { value: 'apikey', label: 'API Key' },
]

export function AuthEditor({ auth, onChange, disabled = false }: AuthEditorProps) {
  const inputClass =
    'w-full rounded-xl border border-app-border bg-app-code px-3 py-2.5 text-sm text-app-text placeholder:text-app-text-dim focus:border-app-border-hover focus:outline-none disabled:opacity-50'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {AUTH_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange({ ...auth, type: opt.value })}
            disabled={disabled}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition disabled:opacity-50 ${
              auth.type === opt.value
                ? 'bg-app-text text-app-bg'
                : 'text-app-text-muted hover:bg-app-surface-hover hover:text-app-text-secondary'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {auth.type === 'bearer' ? (
        <input
          type="text"
          value={auth.token}
          onChange={(e) => onChange({ ...auth, token: e.target.value })}
          placeholder="Token"
          disabled={disabled}
          className={inputClass}
        />
      ) : auth.type === 'basic' ? (
        <div className="space-y-2">
          <input
            type="text"
            value={auth.username}
            onChange={(e) => onChange({ ...auth, username: e.target.value })}
            placeholder="Usuario"
            disabled={disabled}
            className={inputClass}
          />
          <input
            type="password"
            value={auth.password}
            onChange={(e) => onChange({ ...auth, password: e.target.value })}
            placeholder="Contraseña"
            disabled={disabled}
            className={inputClass}
          />
        </div>
      ) : auth.type === 'apikey' ? (
        <div className="space-y-2">
          <input
            type="text"
            value={auth.keyName}
            onChange={(e) => onChange({ ...auth, keyName: e.target.value })}
            placeholder="Nombre del header (ej. X-API-Key)"
            disabled={disabled}
            className={inputClass}
          />
          <input
            type="text"
            value={auth.token}
            onChange={(e) => onChange({ ...auth, token: e.target.value })}
            placeholder="Valor de la clave"
            disabled={disabled}
            className={inputClass}
          />
        </div>
      ) : null}

      {auth.type !== 'none' ? (
        <p className="text-xs leading-5 text-app-text-muted">
          Se inyectará automáticamente en los headers de la solicitud.
        </p>
      ) : null}
    </div>
  )
}
