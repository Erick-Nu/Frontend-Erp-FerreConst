const FALLBACK_API_BASE_URL = 'http://localhost:3000'
const LEGACY_API_BASE_URLS = [
  'http://localhost:3000',
  'https://api.tudominio.com',
]

function trimTrailingSlash(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export function getApiBaseUrl() {
  return trimTrailingSlash(process.env.NEXT_PUBLIC_API_BASE_URL || FALLBACK_API_BASE_URL)
}

export function replaceApiBaseUrl(value: string) {
  const apiBaseUrl = getApiBaseUrl()

  return LEGACY_API_BASE_URLS.reduce(
    (result, legacyBaseUrl) => result.split(trimTrailingSlash(legacyBaseUrl)).join(apiBaseUrl),
    value
  )
}
