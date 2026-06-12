import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener configuración por clave' }

export default function ListarConfigByKeyPage() {
  const module = getModule('config')!
  
  const endpoint = {
    slug: 'get-config-by-key',
    title: 'Obtener configuración por clave',
    method: 'GET' as const,
    path: '/configs/:configKey',
    summary: 'Obtiene una configuración puntual usando su clave.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'configKey', type: 'string', required: false, description: 'clave de configuración.' }
    ],
    queryParams: [
          { name: 'companyId', type: 'string', required: true, description: 'id de la empresa donde se buscará la clave.' }
    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/configs/:configKey \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "cfid": "5b9d0e5e-fd3f-451d-bf68-4db51f52f6b0",
  "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "cfclave": "iva_porcentaje",
  "cfvalor": "15"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite consultar configuraciones a un usuario con rol administrador.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe ser empresa padre (empadre = true).',
    'Si la clave no existe para la empresa indicada, responde 404.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'configKey ausente' },
    { status: 400, title: 'companyId ausente' },
    { status: 500, title: 'Usuario sin rol administrador: User is not admin' },
    { status: 404, title: 'Configuración no encontrada' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
