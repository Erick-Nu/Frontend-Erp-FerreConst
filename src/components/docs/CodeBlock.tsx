'use client'

import { useState } from 'react'

type CodeBlockProps = {
  title: string
  code: string
  language?: string
  label?: string
  maxHeight?: string
}

export function CodeBlock({ title, code, language = 'json', label, maxHeight = '34rem' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <section className="overflow-hidden rounded-[1.35rem] border border-app-border bg-app-elevated">
      <div className="flex flex-col gap-3 border-b border-app-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-sm font-bold text-app-text">{title}</span>
          {label ? <span className="rounded-md border border-app-border bg-app-surface px-2 py-1 text-xs font-semibold text-app-text-secondary">{label}</span> : null}
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-app-border px-3 py-2 text-xs font-semibold text-app-text-secondary transition hover:border-app-border-hover hover:bg-app-surface hover:text-app-text sm:min-h-0 sm:px-2.5 sm:py-1.5"
        >
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="code-scroll overflow-auto bg-app-code p-4 text-[13px] leading-6 sm:p-5" style={{ maxHeight }}>
        <code data-language={language}>
          {language === 'json' ? <JsonCode code={code} /> : code}
        </code>
      </pre>
    </section>
  )
}

function JsonCode({ code }: { code: string }) {
  return (
    <>
      {code.split('\n').map((line, index) => (
        <span key={`${line}-${index}`} className="block min-w-max">
          {renderJsonLine(line)}
        </span>
      ))}
    </>
  )
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
