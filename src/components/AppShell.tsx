'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navigationModules as docsModules } from '@/config/navigation'
import { MethodBadge } from './MethodBadge'
import { ThemeToggle } from './ThemeToggle'

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <header className="sticky top-0 z-40 border-b border-app-border bg-app-bg/90 backdrop-blur-xl">
        <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-5 lg:hidden">
          <Link href="/" className="min-w-0 text-sm font-black tracking-tight text-app-text sm:text-base">
            <span className="block truncate">Documentación API Ferretería ESNT</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-app-border bg-app-surface text-app-text transition hover:border-app-border-hover hover:bg-app-surface-hover"
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden min-h-14 lg:grid lg:grid-cols-[340px_minmax(0,1fr)_auto] lg:items-center lg:px-0">
          <Link href="/" className="text-base font-black tracking-tight text-app-text lg:px-10">
            Documentación API Ferretería ESNT
          </Link>
          <nav className="flex h-full items-center gap-7 text-sm font-bold text-app-text-muted lg:px-10">
            <TopNavLink href="/getting-started" label="Documentación" active={pathname.startsWith('/getting-started')} />
            <TopNavLink href="/api" label="Referencia API" active={pathname.startsWith('/api')} />
          </nav>
          <div className="flex items-center justify-end pr-10">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="hidden border-r border-app-border bg-app-sidebar lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
          <SidebarContent pathname={pathname} />
        </aside>

        <main className="min-w-0 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 xl:px-12">{children}</main>
      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menu"
          />
          <div
            className="absolute inset-y-0 left-0 flex w-full max-w-[22rem] flex-col overflow-y-auto border-r border-app-border bg-app-sidebar px-4 pb-6 pt-4 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegacion"
          >
            <div className="flex items-center justify-between gap-3 border-b border-app-border pb-4">
              <div className="min-w-0">
                <div className="truncate text-sm font-black tracking-tight text-app-text">Documentación API Ferretería ESNT</div>
                <p className="mt-1 text-xs text-app-text-muted">Navegacion y referencia API</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-app-border bg-app-surface text-app-text transition hover:border-app-border-hover hover:bg-app-surface-hover"
                aria-label="Cerrar menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="mt-5 grid gap-2">
              <MobileTopNavLink
                href="/getting-started"
                label="Documentación"
                active={pathname.startsWith('/getting-started')}
                onNavigate={() => setMobileMenuOpen(false)}
              />
              <MobileTopNavLink
                href="/api"
                label="Referencia API"
                active={pathname.startsWith('/api')}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </nav>

            <div className="mt-6 border-t border-app-border pt-6">
              <SidebarContent pathname={pathname} compact onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function SidebarContent({
  pathname,
  compact = false,
  onNavigate,
}: {
  pathname: string
  compact?: boolean
  onNavigate?: () => void
}) {
  const activeModule = docsModules.find((module) => pathname.startsWith(`/api/${module.slug}`))?.slug
  const [openModule, setOpenModule] = useState<string | null>(activeModule ?? null)

  useEffect(() => {
    setOpenModule(activeModule ?? null)
  }, [activeModule])

  return (
    <div className={compact ? 'px-1 pb-2' : 'px-10 py-8'}>
      <div className="space-y-2 border-l border-app-border pl-4">
        <SidebarLink
          href="/getting-started/introduction"
          label="Introduccion"
          active={pathname === '/getting-started/introduction'}
          onNavigate={onNavigate}
        />
        <SidebarLink
          href="/getting-started/authentication"
          label="Autenticacion"
          active={pathname === '/getting-started/authentication'}
          onNavigate={onNavigate}
        />
        <SidebarLink href="/api" label="Vista general" active={pathname === '/api'} onNavigate={onNavigate} />
      </div>

      <div className="mt-8 border-l border-app-border pl-4">
        <div className="mb-4 text-sm font-black text-app-text">Endpoints</div>
        <div className="space-y-2">
          {docsModules.map((module) => {
            const expanded = openModule === module.slug
            const moduleActive = pathname === `/api/${module.slug}` || pathname.startsWith(`/api/${module.slug}/`)

            return (
              <div key={module.slug}>
                <button
                  type="button"
                  onClick={() => setOpenModule(expanded ? null : module.slug)}
                  className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
                    moduleActive || expanded
                      ? 'bg-app-surface text-app-text'
                      : 'text-app-text-muted hover:bg-app-surface hover:text-app-text-secondary'
                  }`}
                >
                  <span>{module.title}</span>
                  <span className={`text-xs text-app-text-dim transition ${expanded ? 'rotate-90' : ''}`}>›</span>
                </button>

                {expanded ? (
                  <div className="mb-3 mt-2 space-y-1.5 border-l border-app-border pl-3">
                    <Link
                      href={`/api/${module.slug}`}
                      onClick={onNavigate}
                      className={`block rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        pathname === `/api/${module.slug}`
                          ? 'bg-app-surface text-app-text'
                          : 'text-app-text-dim hover:bg-app-surface hover:text-app-text-secondary'
                      }`}
                    >
                      Ver modulo
                    </Link>
                    {module.endpoints.map((endpoint) => {
                      const href = `/api/${module.slug}/${endpoint.slug}`
                      const active = pathname === href

                      return (
                        <Link
                          key={endpoint.slug}
                          href={href}
                          onClick={onNavigate}
                          className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                            active
                              ? 'bg-app-surface text-app-text'
                              : 'text-app-text-muted hover:bg-app-surface hover:text-app-text-secondary'
                          }`}
                        >
                          <MethodBadge method={endpoint.method} />
                          <span className="min-w-0 truncate">{endpoint.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TopNavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex h-full items-center border-b transition ${
        active ? 'border-app-text text-app-text' : 'border-transparent hover:text-app-text'
      }`}
    >
      {label}
    </Link>
  )
}

function MobileTopNavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string
  label: string
  active: boolean
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex min-h-11 items-center rounded-xl px-4 py-3 text-sm font-bold transition ${
        active ? 'bg-app-surface text-app-text' : 'text-app-text-muted hover:bg-app-surface hover:text-app-text'
      }`}
    >
      {label}
    </Link>
  )
}

function SidebarLink({ href, label, active, onNavigate }: { href: string; label: string; active: boolean; onNavigate?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`block rounded-xl px-3 py-2 text-sm transition ${
        active ? 'bg-app-surface font-bold text-app-text' : 'text-app-text-muted hover:bg-app-surface hover:text-app-text-secondary'
      }`}
    >
      {label}
    </Link>
  )
}
