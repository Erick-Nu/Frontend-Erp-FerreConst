import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Logout' }

export default function LogoutPage() {
  const module = getModule('auth')!
  
  const endpoint = {
    slug: 'logout',
    title: 'Logout',
    method: 'POST' as const,
    path: '/auth/logout',
    summary: 'Cierra la sesión revocando el refreshToken recibido.',
    status: 'documented' as const,
    authentication: 'No requiere Authorization header.',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [

    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [
          { name: 'refreshToken', type: 'string', required: true, description: 'token de refresco que se desea revocar.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/auth/logout \
  -H "Content-Type: application/json" \
  -d '{
  "refreshToken": "<opaque_refresh_token>"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "message": "Session closed successfully"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'El backend revoca el refresh token por hash.',
    'Si el token ya estaba revocado o no existe, el endpoint mantiene respuesta de éxito para no filtrar estado de sesión.'
    ],
    errors: [
    { status: 500, title: 'Refresh token is required', message: 'Body sin refreshToken' },
    { status: 500, title: 'Error inesperado' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
