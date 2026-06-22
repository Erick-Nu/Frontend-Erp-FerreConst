'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import type { HttpMethod } from '@/types/docs'
import { getApiBaseUrl } from '@/config/public-env'
import { KeyValueEditor } from './KeyValueEditor'
import { BodyEditor } from './BodyEditor'
import { AuthEditor } from './AuthEditor'
import { ResponseViewer } from './ResponseViewer'
import { RequestTabBar, type RequestTabData, type ResponseData } from './RequestTabBar'

type ApiPlaygroundProps = {
  initialMethod?: string | null
  initialPath?: string | null
}

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

type EditorTab = 'headers' | 'params' | 'auth' | 'body' | 'scripts'

const MAX_TABS = 5
const STORAGE_KEY = 'api-playground-tabs'
const INITIAL_TAB_ID = 'initial-request'
const MIN_REQUEST_PANE_WIDTH = 34
const MAX_REQUEST_PANE_WIDTH = 70

function createDefaultTab(overrides?: Partial<RequestTabData>): RequestTabData {
  return {
    id: overrides?.id ?? crypto.randomUUID(),
    name: 'Nueva solicitud',
    method: 'GET',
    path: '',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    queryParams: [],
    auth: { type: 'none', token: '', username: '', password: '', keyName: '' },
    body: '',
    ...overrides,
  }
}

function loadTabs(): RequestTabData[] {
  if (typeof window === 'undefined') return [createDefaultTab()]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as RequestTabData[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return [createDefaultTab()]
}

function createInitialTabs(initialMethod?: string | null, initialPath?: string | null): RequestTabData[] {
  return [
    createDefaultTab({
      id: INITIAL_TAB_ID,
      method: (initialMethod as HttpMethod) ?? 'GET',
      path: initialPath ?? '',
    }),
  ]
}

function saveTabs(tabs: RequestTabData[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs))
  } catch {}
}

function createEmptyResponse(): ResponseData {
  return {
    loading: false,
    status: null,
    statusText: '',
    headers: {},
    body: '',
    duration: null,
    size: null,
    error: null,
  }
}

const EDITOR_TABS: { key: EditorTab; label: string }[] = [
  { key: 'headers', label: 'Headers' },
  { key: 'params', label: 'Params' },
  { key: 'auth', label: 'Auth' },
  { key: 'body', label: 'Body' },
  { key: 'scripts', label: 'Scripts' },
]

export function ApiPlayground({ initialMethod, initialPath }: ApiPlaygroundProps) {
  const apiBaseUrl = getApiBaseUrl()
  const [tabs, setTabs] = useState<RequestTabData[]>(() => createInitialTabs(initialMethod, initialPath))
  const [activeIndex, setActiveIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, ResponseData>>({})
  const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>('headers')
  const [methodOpen, setMethodOpen] = useState(false)
  const [storageReady, setStorageReady] = useState(false)
  const [requestPaneWidth, setRequestPaneWidth] = useState(56)
  const [isResizingPanes, setIsResizingPanes] = useState(false)
  const methodRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (methodRef.current && !methodRef.current.contains(e.target as Node)) {
        setMethodOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    const loaded = loadTabs()
    if (initialMethod || initialPath) {
      loaded[0] = {
        ...loaded[0],
        method: (initialMethod as HttpMethod) ?? loaded[0].method,
        path: initialPath ?? loaded[0].path,
      }
    }
    setTabs(loaded)
    setActiveIndex(0)
    setStorageReady(true)
  }, [initialMethod, initialPath])

  useEffect(() => {
    if (storageReady) saveTabs(tabs)
  }, [storageReady, tabs])

  const activeTab = tabs[activeIndex]

  function updateActiveTab(update: Partial<RequestTabData>) {
    setTabs((prev) => prev.map((t, i) => (i === activeIndex ? { ...t, ...update } : t)))
  }

  function handleTabSelect(index: number) {
    setActiveIndex(index)
    setActiveEditorTab('headers')
    setMethodOpen(false)
  }

  function handleAddTab() {
    if (tabs.length >= MAX_TABS) return
    const newTab = createDefaultTab()
    setTabs((prev) => [...prev, newTab])
    setActiveIndex(tabs.length)
  }

  function handleCloseTab(index: number) {
    if (tabs.length <= 1) return
    setTabs((prev) => prev.filter((_, i) => i !== index))
    if (index <= activeIndex) {
      setActiveIndex((prev) => Math.max(0, prev - 1))
    }
  }

  function handleRename(index: number, name: string) {
    setTabs((prev) => prev.map((t, i) => (i === index ? { ...t, name } : t)))
  }

  const canSend = activeTab && activeTab.path.trim().length > 0

  const activeResponse = activeTab ? responses[activeTab.id] ?? createEmptyResponse() : createEmptyResponse()

  const sendRequest = useCallback(async () => {
    if (!activeTab || !canSend) return

    const { method, path, headers, queryParams, body, auth } = activeTab

    setResponses((prev) => ({
      ...prev,
      [activeTab.id]: { ...createEmptyResponse(), loading: true },
    }))

    const activeHeaders: Record<string, string> = {}
    for (const h of headers) {
      if (h.key) activeHeaders[h.key] = h.value
    }

    if (auth.type === 'bearer' && auth.token) {
      activeHeaders['Authorization'] = `Bearer ${auth.token}`
    } else if (auth.type === 'basic' && auth.username && auth.password) {
      activeHeaders['Authorization'] = `Basic ${btoa(`${auth.username}:${auth.password}`)}`
    } else if (auth.type === 'apikey' && auth.token) {
      const headerName = auth.keyName || 'X-API-Key'
      activeHeaders[headerName] = auth.token
    }

    const fetchOptions: RequestInit = { method, headers: activeHeaders }

    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && body.trim()) {
      fetchOptions.body = body
    }

    const base = path.startsWith('http') ? '' : apiBaseUrl
    const url = `${base}${path}`
    const activeParams = queryParams.filter((p) => p.key)
    const fullUrl = activeParams.length === 0
      ? url
      : `${url}?${new URLSearchParams(activeParams.map((p) => [p.key, p.value])).toString()}`

    const start = performance.now()

    try {
      const res = await fetch(fullUrl, fetchOptions)
      const end = performance.now()
      const resHeaders: Record<string, string> = {}
      res.headers.forEach((value, key) => { resHeaders[key] = value })
      const text = await res.text()
      setResponses((prev) => ({
        ...prev,
        [activeTab.id]: {
          loading: false,
          status: res.status,
          statusText: res.statusText,
          headers: resHeaders,
          body: text,
          duration: Math.round(end - start),
          size: new Blob([text]).size,
          error: null,
        },
      }))
    } catch (err) {
      const end = performance.now()
      setResponses((prev) => ({
        ...prev,
        [activeTab.id]: {
          loading: false,
          status: null,
          statusText: '',
          headers: {},
          body: '',
          duration: Math.round(end - start),
          size: null,
          error: err instanceof TypeError
            ? 'No se pudo conectar al servidor. Verifica la URL y que el servidor esté accesible.'
            : 'Ocurrió un error inesperado al realizar la solicitud.',
        },
      }))
    }
  }, [activeTab, canSend, apiBaseUrl])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      sendRequest()
    }
  }

  function updatePaneWidth(clientX: number) {
    if (!splitRef.current) return
    const rect = splitRef.current.getBoundingClientRect()
    const nextWidth = ((clientX - rect.left) / rect.width) * 100
    setRequestPaneWidth(Math.min(MAX_REQUEST_PANE_WIDTH, Math.max(MIN_REQUEST_PANE_WIDTH, nextWidth)))
  }

  function handleResizePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsResizingPanes(true)
    updatePaneWidth(e.clientX)
  }

  function handleResizePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (isResizingPanes) updatePaneWidth(e.clientX)
  }

  function handleResizePointerEnd(e: React.PointerEvent<HTMLButtonElement>) {
    setIsResizingPanes(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  function handleResizeKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const delta = e.key === 'ArrowLeft' ? -2 : 2
    setRequestPaneWidth((current) => Math.min(MAX_REQUEST_PANE_WIDTH, Math.max(MIN_REQUEST_PANE_WIDTH, current + delta)))
  }

  if (!activeTab) return null

  const splitStyle = {
    '--request-pane-width': `${requestPaneWidth}%`,
  } as CSSProperties

  return (
    <div className={`space-y-6 ${isResizingPanes ? 'cursor-col-resize select-none' : ''}`} onKeyDown={handleKeyDown}>
      <div>
        <h1 className="text-3xl font-black tracking-tight text-app-text sm:text-4xl lg:text-5xl">
          Probador de API
        </h1>
        <p className="mt-2 max-w-3xl text-[15px] leading-7 text-app-text-muted">
          Ejecuta solicitudes HTTP reales contra la API. Usa{' '}
          <kbd className="rounded-md border border-app-border bg-app-surface px-1.5 py-0.5 text-xs font-semibold text-app-text-secondary">
            Ctrl+Enter
          </kbd>{' '}
          para enviar rápido.
        </p>
      </div>

      <div ref={splitRef} className="api-playground-split" style={splitStyle}>
        <div className="api-playground-request-pane">
          <div className="overflow-visible rounded-[1.35rem] border border-app-border bg-app-surface">
            <RequestTabBar
              tabs={tabs}
              activeIndex={activeIndex}
              onSelect={handleTabSelect}
              onClose={handleCloseTab}
              onAdd={handleAddTab}
              onRename={handleRename}
              canAdd={tabs.length < MAX_TABS}
            />

            <div className="flex flex-col gap-3 border-b border-app-border px-4 py-4 sm:flex-row sm:items-stretch sm:px-5">
              <div className="relative shrink-0 sm:w-28" ref={methodRef}>
                <button
                  type="button"
                  onClick={() => setMethodOpen(!methodOpen)}
                  className={`method-option method-option-${activeTab.method.toLowerCase()} method-option-active h-11 w-full justify-between px-3`}
                  aria-expanded={methodOpen}
                  aria-haspopup="listbox"
                >
                  <span>{activeTab.method}</span>
                  <span className="method-option-chevron" aria-hidden="true">
                    <svg
                      className={`h-3.5 w-3.5 shrink-0 transition ${methodOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
                    </svg>
                  </span>
                </button>
                {methodOpen ? (
                  <div
                    className="absolute left-0 top-full z-30 mt-2 w-full min-w-[9rem] overflow-hidden rounded-2xl border border-app-border bg-app-elevated p-1.5 shadow-xl"
                    role="listbox"
                  >
                    {METHODS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          updateActiveTab({ method: m })
                          setMethodOpen(false)
                        }}
                        className={`method-option method-option-${m.toLowerCase()} h-10 w-full justify-between px-3 ${
                          activeTab.method === m ? 'method-option-active' : ''
                        }`}
                        role="option"
                        aria-selected={activeTab.method === m}
                      >
                        <span>{m}</span>
                        {activeTab.method === m ? (
                          <svg
                            className="h-3.5 w-3.5 shrink-0"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-7" />
                          </svg>
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-app-border bg-app-code px-3">
                <span className="shrink-0 text-xs font-semibold text-app-text-dim">
                  {apiBaseUrl.replace(/^https?:\/\//, '')}
                </span>
                <input
                  type="text"
                  value={activeTab.path}
                  onChange={(e) => updateActiveTab({ path: e.target.value })}
                  placeholder="/api/endpoint"
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-app-text placeholder:text-app-text-dim focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={sendRequest}
                disabled={!canSend || activeResponse.loading}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--method-post)] px-5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {activeResponse.loading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2.5 2.5l11 5.5-11 5.5V2.5z" />
                  </svg>
                )}
                {activeResponse.loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>

            <div className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
              <div className="flex flex-wrap gap-1.5">
                {EDITOR_TABS.map((et) => (
                  <button
                    key={et.key}
                    type="button"
                    onClick={() => setActiveEditorTab(et.key)}
                    className={`segmented-btn ${activeEditorTab === et.key ? 'segmented-btn-active' : ''}`}
                  >
                    {et.label}
                    {et.key === 'headers' && activeTab.headers.filter((h) => h.key).length > 0 ? (
                      <span className="rounded-full bg-app-border px-1.5 py-0.5 text-[11px] font-bold text-inherit">
                        {activeTab.headers.filter((h) => h.key).length}
                      </span>
                    ) : null}
                    {et.key === 'params' && activeTab.queryParams.filter((p) => p.key).length > 0 ? (
                      <span className="rounded-full bg-app-border px-1.5 py-0.5 text-[11px] font-bold text-inherit">
                        {activeTab.queryParams.filter((p) => p.key).length}
                      </span>
                    ) : null}
                    {et.key === 'auth' && activeTab.auth.type !== 'none' ? (
                      <span className="rounded-full bg-app-border px-1.5 py-0.5 text-[11px] font-bold text-inherit">
                        1
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {activeEditorTab === 'headers' ? (
                  <KeyValueEditor
                    key={activeTab.id}
                    pairs={activeTab.headers}
                    onChange={(pairs) => updateActiveTab({ headers: pairs })}
                    keyPlaceholder="Nombre del header"
                    valuePlaceholder="Valor"
                    addButtonLabel="Agregar header"
                  />
                ) : null}
                {activeEditorTab === 'params' ? (
                  <KeyValueEditor
                    key={activeTab.id}
                    pairs={activeTab.queryParams}
                    onChange={(pairs) => updateActiveTab({ queryParams: pairs })}
                    keyPlaceholder="Parámetro"
                    valuePlaceholder="Valor"
                    addButtonLabel="Agregar parámetro"
                  />
                ) : null}
                {activeEditorTab === 'auth' ? (
                  <AuthEditor
                    key={activeTab.id}
                    auth={activeTab.auth}
                    onChange={(auth) => updateActiveTab({ auth })}
                  />
                ) : null}
                {activeEditorTab === 'body' ? (
                  <BodyEditor
                    key={activeTab.id}
                    value={activeTab.body}
                    onChange={(value) => updateActiveTab({ body: value })}
                  />
                ) : null}
                {activeEditorTab === 'scripts' ? (
                  <div className="py-12 text-center text-sm text-app-text-dim">
                    Scripts pre-solicitud estarán disponibles próximamente.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="api-playground-resize-handle"
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerEnd}
          onPointerCancel={handleResizePointerEnd}
          onLostPointerCapture={() => setIsResizingPanes(false)}
          onKeyDown={handleResizeKeyDown}
          role="separator"
          aria-orientation="vertical"
          aria-label="Redimensionar paneles del probador"
          aria-valuemin={MIN_REQUEST_PANE_WIDTH}
          aria-valuemax={MAX_REQUEST_PANE_WIDTH}
          aria-valuenow={Math.round(requestPaneWidth)}
        >
          <span aria-hidden="true" />
        </button>

        <div className="api-playground-response-pane">
          <ResponseViewer
            status={activeResponse.status}
            statusText={activeResponse.statusText}
            headers={activeResponse.headers}
            body={activeResponse.body}
            duration={activeResponse.duration}
            size={activeResponse.size}
            error={activeResponse.error}
            loading={activeResponse.loading}
            className="api-playground-response-card"
            bodyClassName="api-playground-response-body"
          />
        </div>
      </div>
    </div>
  )
}
