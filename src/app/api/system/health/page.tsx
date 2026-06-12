import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Verificación de salud' }

export default function HealthCheckPage() {
  const module = getModule('system')!
  
  const endpoint = {
    slug: 'health',
    title: 'Verificación de salud',
    method: 'GET' as const,
    path: '/',
    summary: 'Endpoint base de verificación del servicio. Permite validar que la API está levantada.',
    status: 'documented' as const,
    authentication: 'No requiere autenticación.',
    contentTypes: [],
    contentType: '',
    headers: [

    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "name": "esnt-backend-ferreteria",
  "version": "1.0.0"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'No aplica.'
    ],
    errors: [
    { status: 500, title: 'error inesperado en el servidor' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
