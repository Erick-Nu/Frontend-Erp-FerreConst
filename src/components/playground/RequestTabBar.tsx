'use client'

import { useState, useRef, useEffect } from 'react'
import type { HttpMethod } from '@/types/docs'

export type RequestTabData = {
  id: string
  name: string
  method: HttpMethod
  path: string
  headers: { key: string; value: string }[]
  queryParams: { key: string; value: string }[]
  auth: { type: 'none' | 'bearer' | 'basic' | 'apikey'; token: string; username: string; password: string; keyName: string }
  body: string
}

export type ResponseData = {
  loading: boolean
  status: number | null
  statusText: string
  headers: Record<string, string>
  body: string
  duration: number | null
  size: number | null
  error: string | null
}

type RequestTabBarProps = {
  tabs: RequestTabData[]
  activeIndex: number
  onSelect: (index: number) => void
  onClose: (index: number) => void
  onAdd: () => void
  onRename: (index: number, name: string) => void
  canAdd: boolean
}

export function RequestTabBar({ tabs, activeIndex, onSelect, onClose, onAdd, onRename, canAdd }: RequestTabBarProps) {
  return (
    <div className="flex gap-0 overflow-x-auto overflow-y-hidden rounded-t-[1.35rem] border-b border-app-border bg-app-bg">
      {tabs.map((tab, index) => (
        <RequestTab
          key={tab.id}
          tab={tab}
          active={index === activeIndex}
          onSelect={() => onSelect(index)}
          onClose={() => onClose(index)}
          onRename={(name) => onRename(index, name)}
          canClose={tabs.length > 1}
        />
      ))}
      {canAdd ? (
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex shrink-0 items-center gap-1 px-3 py-2 text-sm font-semibold text-app-text-muted transition hover:text-app-text-secondary"
        >
          <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v10M3 8h10" />
          </svg>
        </button>
      ) : null}
    </div>
  )
}

function RequestTab({
  tab,
  active,
  onSelect,
  onClose,
  onRename,
  canClose,
}: {
  tab: RequestTabData
  active: boolean
  onSelect: () => void
  onClose: () => void
  onRename: (name: string) => void
  canClose: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(tab.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  function commitRename() {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== tab.name) {
      onRename(trimmed)
    }
    setEditing(false)
  }

  return (
    <div
      className={`group relative flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm font-semibold transition ${
        active
          ? 'bg-app-surface text-app-text shadow-sm'
          : 'bg-transparent text-app-text-muted hover:bg-app-surface-hover hover:text-app-text-secondary'
      }`}
    >
      <span className={`method-badge method-${tab.method.toLowerCase()}`} style={{ fontSize: '0.6rem', padding: '0.15rem 0.35rem', minHeight: '1rem' }}>
        {tab.method}
      </span>

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitRename()
            if (e.key === 'Escape') {
              setEditValue(tab.name)
              setEditing(false)
            }
          }}
          onClick={(e) => e.stopPropagation()}
          className="min-w-0 max-w-[8rem] bg-transparent text-sm font-semibold text-app-text outline-none sm:max-w-[10rem]"
        />
      ) : (
        <button
          type="button"
          onClick={onSelect}
          onDoubleClick={(e) => {
            e.stopPropagation()
            setEditValue(tab.name)
            setEditing(true)
          }}
          className="min-w-0 max-w-[6rem] truncate bg-transparent text-left text-sm font-semibold text-inherit sm:max-w-[10rem]"
        >
          {tab.name}
        </button>
      )}

      {canClose ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text"
          aria-label="Cerrar tab"
        >
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      ) : null}
    </div>
  )
}
