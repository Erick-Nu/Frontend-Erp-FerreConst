import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar configuración' }

export default function ActualizarConfigPage() {
  const module = getModule('config')!
  
  const endpoint = {
    slug: 'update-config',
    title: 'Actualizar Config',
    method: 'PATCH' as const,
    path: '/configs/:configKey',
    summary: 'Actualiza el valor de una configuración existente.',
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
          { name: 'companyId', type: 'string', required: true, description: 'id de la empresa donde se actualizará la clave.' }
    ],
    body: [
          { name: 'cfvalor', type: 'string', required: true, description: 'nuevo valor de la configuración.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/configs/:configKey \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "cfvalor": "16"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "cfid": "5b9d0e5e-fd3f-451d-bf68-4db51f52f6b0",
  "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "cfclave": "iva_porcentaje",
  "cfvalor": "16"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar configuraciones a un usuario con rol administrador.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe ser empresa padre (empadre = true).',
    'Debe enviarse cfvalor.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'configKey ausente' },
    { status: 400, title: 'companyId ausente' },
    { status: 500, title: 'cfvalor ausente: error de validación' },
    { status: 500, title: 'Usuario sin rol administrador: User is not admin' },
    { status: 404, title: 'Configuración no encontrada' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
