import type { EndpointDoc } from '@/types/docs'
import { replaceApiBaseUrl } from '@/config/public-env'
import { CodeBlock } from './CodeBlock'

type EndpointExamplePanelProps = {
  endpoint: EndpointDoc
}

export function EndpointExamplePanel({ endpoint }: EndpointExamplePanelProps) {
  const primaryResponse = endpoint.responses[0]
  const curlExample = replaceApiBaseUrl(endpoint.curlExample)
  const primaryResponseExample = primaryResponse ? replaceApiBaseUrl(primaryResponse.example) : null

  return (
    <aside className="space-y-5 sm:space-y-7 xl:sticky xl:top-24 xl:self-start">
      <CodeBlock title="cURL" label="Por defecto" language="bash" code={curlExample} maxHeight="18rem" />
      {primaryResponse ? (
        <CodeBlock
          title={`${primaryResponse.status}`}
          label={endpoint.responseContentType || primaryResponse.label}
          language={endpoint.responseLanguage || 'json'}
          code={endpoint.responseLanguage === 'text' ? primaryResponseExample || '' : formatJson(primaryResponseExample || '')}
          maxHeight="30rem"
        />
      ) : null}
    </aside>
  )
}

function formatJson(value: string) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2)
  } catch {
    return value
  }
}
