function trimTrailingSlash(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export function getPublicBaseUrl() {
  const value = process.env.PUBLIC_BASE_URL

  if (!value) {
    return undefined
  }

  return trimTrailingSlash(value)
}

export function getMetadataBase() {
  const value = getPublicBaseUrl()

  if (!value) {
    return undefined
  }

  try {
    return new URL(value)
  } catch {
    return undefined
  }
}
