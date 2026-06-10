type MethodBadgeProps = {
  method: string
}

export function MethodBadge({ method }: MethodBadgeProps) {
  const normalized = method.toLowerCase()
  const variant = ['get', 'post', 'put', 'patch', 'delete'].includes(normalized) ? normalized : 'default'

  return <span className={`method-badge method-${variant}`}>{method}</span>
}
