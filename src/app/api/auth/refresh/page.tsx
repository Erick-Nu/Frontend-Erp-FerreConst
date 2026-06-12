import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Renovar sesión' }

export default function RefreshSessionPage() {
  const module = getModule('auth')!
  
  const endpoint = {
    slug: 'refresh',
    title: 'Refresh Session',
    method: 'POST' as const,
    path: '/auth/refresh',
    summary: 'Renueva la sesión usando el refreshToken y retorna un nuevo par de tokens.',
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
          { name: 'refreshToken', type: 'string', required: true, description: 'token de refresco vigente.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
  "refreshToken": "<opaque_refresh_token>"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "accessToken": "<new_jwt_access_token>",
  "refreshToken": "<new_opaque_refresh_token>"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'El refresh token se valida por hash en base de datos.',
    'Si el token es válido, se revoca el token actual y se genera uno nuevo (rotación).',
    'Se valida que usuario y empresa estén activos.',
    'El nuevo refresh token se emite guardando ip y user-agent del request cuando están disponibles.',
    'Si el refresh token ya expiró, primero se revoca y luego se responde 401.'
    ],
    errors: [
    { status: 401, title: 'Refresh token inválido/revocado/expirado' },
    { status: 500, title: 'Refresh token is required', message: 'refreshToken ausente' },
    { status: 401, title: 'Usuario inactivo' },
    { status: 401, title: 'Empresa inactiva' },
    { status: 500, title: 'Error inesperado' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
