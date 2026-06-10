import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Eliminar Config' }

export default function EliminarConfigPage() {
  const module = getModule('config')!
  
  const endpoint = {
    slug: 'delete-config',
    title: 'Eliminar Config',
    method: 'DELETE' as const,
    path: '/configs/:configKey',
    summary: 'Elimina una configuración usando su clave.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'configKey', type: 'string', required: false, description: 'clave de configuración.' }
    ],
    queryParams: [
          { name: 'companyId', type: 'string', required: true, description: 'id de la empresa donde se eliminará la clave.' }
    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X DELETE https://api.tudominio.com/configs/:configKey \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "cfclave": "iva_porcentaje"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite eliminar configuraciones a un usuario con rol administrador.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe ser empresa padre (empadre = true).',
    'La respuesta solo devuelve la clave eliminada.'
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
