import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar estado de empresa' }

export default function ActualizarCompanyPage() {
  const module = getModule('company')!
  
  const endpoint = {
    slug: 'update-company-status',
    title: 'Actualizar Company',
    method: 'PATCH' as const,
    path: '/companies/:id/status',
    summary: 'Actualiza el estado de una empresa.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador de la empresa.' }
    ],
    queryParams: [

    ],
    body: [
          { name: 'emestado', type: 'string', required: false, description: 'nuevo estado de la empresa.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/companies/:id/status \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "emestado": "inactivo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "message": "Company status updated"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo un usuario con rol administrador puede actualizar el estado de una empresa.',
    'El usuario debe estar activo.',
    'El usuario debe tener rol administrador.',
    'La empresa del usuario debe estar activa y marcada como empresa padre.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Company status must be activo, inactivo or eliminado', message: 'emestado inválido o ausente' },
    { status: 404, title: 'Empresa no encontrada' },
    { status: 500, title: 'User is not admin', message: 'Usuario sin rol administrador' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa autenticada no activa' },
    { status: 500, title: 'Company is not parent', message: 'Empresa autenticada no es empresa padre' },
    { status: 500, title: 'Deleted company status cannot be changed', message: 'Empresa objetivo eliminada' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
