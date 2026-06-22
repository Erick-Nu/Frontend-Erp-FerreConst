'use client'

import { useState } from 'react'

export type KeyValuePair = { key: string; value: string }

type KeyValueEditorProps = {
  pairs: KeyValuePair[]
  onChange: (pairs: KeyValuePair[]) => void
  keyPlaceholder?: string
  valuePlaceholder?: string
  addButtonLabel?: string
  disabled?: boolean
}

const inputClass =
  'min-w-0 flex-1 rounded-xl border border-app-border bg-app-code px-3 py-2.5 text-sm text-app-text placeholder:text-app-text-dim focus:border-app-border-hover focus:outline-none disabled:opacity-50'

type RowProps = {
  index: number
  pair: KeyValuePair
  keyPlaceholder: string
  valuePlaceholder: string
  disabled: boolean
  onUpdate: (index: number, field: 'key' | 'value', value: string) => void
  onRemove: (index: number) => void
}

function Row({ index, pair, keyPlaceholder, valuePlaceholder, disabled, onUpdate, onRemove }: RowProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-2">
        <input
          type="text"
          value={pair.key}
          onChange={(e) => onUpdate(index, 'key', e.target.value)}
          placeholder={keyPlaceholder}
          disabled={disabled}
          className={inputClass}
        />
        <input
          type="text"
          value={pair.value}
          onChange={(e) => onUpdate(index, 'value', e.target.value)}
          placeholder={valuePlaceholder}
          disabled={disabled}
          className={`${inputClass} sm:flex-[2]`}
        />
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        disabled={disabled}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-xl border border-app-border text-app-text-muted transition hover:border-[var(--tone-error-border)] hover:text-[var(--tone-error)] disabled:opacity-50 sm:self-start sm:min-h-[2.625rem] sm:min-w-[2.625rem]"
        aria-label="Eliminar"
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </div>
  )
}

export function KeyValueEditor({
  pairs,
  onChange,
  keyPlaceholder = 'Clave',
  valuePlaceholder = 'Valor',
  addButtonLabel = 'Agregar',
  disabled = false,
}: KeyValueEditorProps) {
  const [showNew, setShowNew] = useState(false)

  function updatePair(index: number, field: 'key' | 'value', value: string) {
    const next = pairs.map((pair, i) => (i === index ? { ...pair, [field]: value } : pair))
    onChange(next)
  }

  function removePair(index: number) {
    onChange(pairs.filter((_, i) => i !== index))
  }

  function addPair(key = '', value = '') {
    onChange([...pairs, { key, value }])
    setShowNew(false)
  }

  const visiblePairs = pairs.filter((p) => p.key !== '' || p.value !== '')

  return (
    <div className="space-y-2">
      {visiblePairs.map((pair, index) => (
        <Row
          key={`${pair.key}-${pair.value}-${index}`}
          index={index}
          pair={pair}
          keyPlaceholder={keyPlaceholder}
          valuePlaceholder={valuePlaceholder}
          disabled={disabled}
          onUpdate={updatePair}
          onRemove={removePair}
        />
      ))}

      {showNew ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-2">
            <input
              type="text"
              placeholder={keyPlaceholder}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const target = e.currentTarget
                  const nextInput = target.parentElement?.querySelector<HTMLInputElement>('input:last-of-type')
                  nextInput?.focus()
                }
                if (e.key === 'Escape') setShowNew(false)
              }}
              onBlur={(e) => {
                const val = e.currentTarget.value
                if (!val) {
                  setShowNew(false)
                  return
                }
                const sibling = e.currentTarget.parentElement?.querySelector<HTMLInputElement>('input:last-of-type')
                const value = sibling?.value ?? ''
                addPair(val, value)
              }}
              className={inputClass}
            />
            <input
              type="text"
              placeholder={valuePlaceholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const parent = e.currentTarget.parentElement
                  const keyInput = parent?.querySelector<HTMLInputElement>('input:first-of-type')
                  const keyVal = keyInput?.value ?? ''
                  const val = e.currentTarget.value
                  if (keyVal) addPair(keyVal, val)
                }
                if (e.key === 'Escape') setShowNew(false)
              }}
              onBlur={(e) => {
                const parent = e.currentTarget.parentElement
                const keyInput = parent?.querySelector<HTMLInputElement>('input:first-of-type')
                const keyVal = keyInput?.value ?? ''
                const val = e.currentTarget.value
                if (keyVal) addPair(keyVal, val)
                else setShowNew(false)
              }}
              className={`${inputClass} sm:flex-[2]`}
            />
          </div>
          <div className="h-10 w-10 shrink-0 sm:hidden" />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowNew(true)}
          disabled={disabled}
          className="inline-flex w-full items-center justify-center rounded-xl px-2 py-2 text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text-secondary disabled:opacity-50 sm:w-auto"
        >
          <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v10M3 8h10" />
          </svg>
        </button>
      )}
    </div>
  )
}
