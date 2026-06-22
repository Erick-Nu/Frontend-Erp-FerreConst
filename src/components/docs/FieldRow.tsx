import type { FieldSpec } from '@/types/docs'

type FieldRowProps = {
  field: FieldSpec
  compact?: boolean
}

export function FieldRow({ field, compact = false }: FieldRowProps) {
  return (
    <div className={`border-t border-app-border first:border-t-0 ${compact ? 'py-4' : 'py-6'}`}>
      <div className="flex flex-wrap items-start gap-2 sm:items-center">
        <code className="break-all text-sm font-bold text-app-text sm:break-normal">{field.name}</code>
        <span className="rounded-md border border-app-border bg-app-surface px-2 py-1 text-xs font-bold text-app-text-secondary">{field.type}</span>
        {field.required ? (
          <span className="rounded-md border border-[var(--tone-required-border)] bg-[var(--tone-required-bg)] px-2 py-1 text-xs font-bold text-[var(--tone-required)]">
            obligatorio
          </span>
        ) : (
          <span className="rounded-md border border-app-border bg-app-surface px-2 py-1 text-xs font-bold text-app-text-muted">            opcional</span>
        )}
      </div>
      <p className={compact ? 'mt-2 text-[15px] leading-7 text-app-text-secondary' : 'mt-4 text-[15px] leading-7 text-app-text-secondary'}>{field.description}</p>
    </div>
  )
}
