'use client'

import { useMemo, useState } from 'react'

type BodyEditorProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function BodyEditor({ value, onChange, disabled = false }: BodyEditorProps) {
  const [touched, setTouched] = useState(false)

  const validation = useMemo(() => {
    if (!value.trim()) return { valid: true, error: null }
    try {
      JSON.parse(value)
      return { valid: true, error: null }
    } catch {
      return { valid: false, error: 'JSON inválido' }
    }
  }, [value])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-app-text-secondary">Cuerpo de la solicitud</span>
        {validation.error && touched ? (
          <span className="text-xs font-semibold text-[var(--tone-error)]">{validation.error}</span>
        ) : null}
      </div>
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          if (!touched) setTouched(true)
        }}
        onBlur={() => setTouched(true)}
        disabled={disabled}
        placeholder='{&#10;  "key": "value"&#10;}'
        spellCheck={false}
        className="code-scroll min-h-[10rem] w-full resize-y rounded-[1.35rem] border border-app-border bg-app-code p-4 font-mono text-[13px] leading-6 text-app-text placeholder:text-app-text-dim focus:border-app-border-hover focus:outline-none disabled:opacity-50"
      />
      {value && !validation.valid ? (
        <p className="text-xs leading-5 text-[var(--tone-error)]">
          Revisa la sintaxis JSON antes de enviar la solicitud.
        </p>
      ) : null}
    </div>
  )
}
