'use client'

import { useState } from 'react'

type ResponseViewerProps = {
  status: number | null
  statusText: string
  headers: Record<string, string>
  body: string
  duration: number | null
  size: number | null
  error: string | null
  loading: boolean
  className?: string
  bodyClassName?: string
}

export function ResponseViewer({
  status,
  statusText,
  headers,
  body,
  duration,
  size,
  error,
  loading,
  className = '',
  bodyClassName = '',
}: ResponseViewerProps) {
  const [showHeaders, setShowHeaders] = useState(false)
  const sectionClassName = `rounded-[1.35rem] border border-app-border bg-app-surface ${className}`

  if (loading) {
    return (
      <section className={sectionClassName}>
        <div className="flex items-center gap-3 px-5 py-4">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-app-border border-b-app-text" />
          <span className="text-sm font-semibold text-app-text-secondary">Enviando solicitud...</span>
        </div>
      </section>
    )
  }

  if (!status && !error) {
    return (
      <section className={sectionClassName}>
        <div className="px-5 py-12 text-center">
          <p className="text-sm text-app-text-dim">Configura tu solicitud y presiona Enviar</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={`rounded-[1.35rem] border border-[var(--tone-error-border)] bg-app-surface ${className}`}>
        <div className="flex items-center gap-3 border-b border-[var(--tone-error-border)] px-5 py-3">
          <span className="rounded-md border border-[var(--tone-error-border)] bg-[var(--tone-error-bg)] px-2.5 py-1 text-xs font-black text-[var(--tone-error)]">
            Error
          </span>
          <span className="text-sm font-semibold text-app-text">{error}</span>
        </div>
        {body ? (
          <pre className={`code-scroll bg-app-code p-4 text-[13px] leading-6 ${bodyClassName}`}>
            <code>{body}</code>
          </pre>
        ) : null}
      </section>
    )
  }

  const statusColor =
    status! >= 200 && status! < 300
      ? 'tone-success'
      : status! >= 300 && status! < 400
        ? 'tone-pending'
        : 'tone-error'

  const formattedBody = tryFormatJson(body)

  return (
    <section className={sectionClassName}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-app-border px-4 py-3 sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <span
            className={`rounded-md border px-2.5 py-1 text-xs font-black`}
            style={{
              borderColor: `var(--${statusColor}-border)`,
              backgroundColor: `var(--${statusColor}-bg)`,
              color: `var(--${statusColor})`,
            }}
          >
            {status} {statusText}
          </span>
          {duration !== null ? (
            <span className="text-xs font-semibold text-app-text-muted">
              {duration}ms
            </span>
          ) : null}
          {size !== null ? (
            <span className="text-xs font-semibold text-app-text-muted">
              {formatSize(size)}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setShowHeaders(!showHeaders)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text-secondary"
        >
          {showHeaders ? 'Ocultar' : 'Mostrar'} headers
          <svg
            className={`h-3 w-3 transition ${showHeaders ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      {showHeaders ? (
        <div className="border-b border-app-border bg-app-code px-5 py-3">
          <div className="space-y-1">
            {Object.entries(headers).map(([key, value]) => (
              <div key={key} className="flex gap-3 text-xs leading-6">
                <span className="min-w-0 shrink-0 font-semibold text-app-text-secondary">{key}:</span>
                <span className="break-all text-app-text-muted">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <pre className={`code-scroll whitespace-pre-wrap break-all bg-app-code p-4 text-[13px] leading-6 sm:p-5 ${bodyClassName}`}>
        <code>
          {formattedBody.split('\n').map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {renderJsonLine(line)}
            </span>
          ))}
        </code>
      </pre>
    </section>
  )
}

function tryFormatJson(value: string) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2)
  } catch {
    return value
  }
}

function renderJsonLine(line: string) {
  const keyMatch = line.match(/^(\s*)"([^"\\]*(?:\\.[^"\\]*)*)"(\s*:\s*)(.*)$/)

  if (!keyMatch) {
    return <span className="text-[var(--syn-default)]">{line || ' '}</span>
  }

  const [, indent, key, separator, value] = keyMatch

  return (
    <>
      <span className="text-[var(--syn-default)]">{indent}</span>
      <span className="text-[var(--syn-key)]">&quot;{key}&quot;</span>
      <span className="text-[var(--syn-punctuation)]">{separator}</span>
      {renderJsonValue(value)}
    </>
  )
}

function renderJsonValue(value: string) {
  const match = value.match(/^(.*?)(,?)$/)
  const rawValue = match?.[1] ?? value
  const comma = match?.[2] ?? ''
  const trimmed = rawValue.trim()
  const leading = rawValue.slice(0, rawValue.length - rawValue.trimStart().length)

  let className = 'text-[var(--syn-default)]'

  if (trimmed.startsWith('"')) {
    className = 'text-[var(--syn-string)]'
  } else if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    className = 'text-[var(--syn-number)]'
  } else if (trimmed === 'true' || trimmed === 'false') {
    className = 'text-[var(--syn-boolean)]'
  } else if (trimmed === 'null') {
    className = 'text-[var(--syn-null)]'
  }

  return (
    <>
      <span className="text-[var(--syn-default)]">{leading}</span>
      <span className={className}>{trimmed}</span>
      <span className="text-[var(--syn-punctuation)]">{comma}</span>
    </>
  )
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
