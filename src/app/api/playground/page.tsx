import { getEndpoint } from '@/config/navigation'
import { ApiPlayground } from '@/components/playground/ApiPlayground'

export const metadata = { title: 'Probador de API' }

export default async function PlaygroundPage(props: {
  searchParams: Promise<{ module?: string; endpoint?: string; method?: string; path?: string }>
}) {
  const searchParams = await props.searchParams
  const { module: moduleSlug, endpoint: endpointSlug, method: methodParam, path: pathParam } = searchParams

  let initialMethod: string | null = null
  let initialPath: string | null = null

  if (methodParam && pathParam) {
    initialMethod = methodParam
    initialPath = pathParam
  } else if (moduleSlug && endpointSlug) {
    const endpoint = getEndpoint(moduleSlug, endpointSlug)
    if (endpoint) {
      initialMethod = endpoint.method
      initialPath = endpoint.path
    }
  }

  return <ApiPlayground initialMethod={initialMethod} initialPath={initialPath} />
}
