import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar estado de usuario' }

export default function ActualizarUserPage() {
  const module = getModule('user')!
  
  const endpoint = {
    slug: 'update-user-status',
    title: 'Actualizar User',
    method: 'PATCH' as const,
    path: '/users/:id/status',
    summary: 'Actualiza el estado de un usuario.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador del usuario.' }
    ],
    queryParams: [

    ],
    body: [
          { name: 'usestado', type: 'string', required: false, description: 'nuevo estado del usuario.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/users/:id/status \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "usestado": "inactivo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "message": "User status updated"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar usuarios de la misma empresa del usuario autenticado.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe estar activa.',
    'Los roles permitidos para este endpoint son jefe, empleado o administrador.',
    'Si el usuario objetivo ya está en estado eliminado, no se permite cambiar su estado.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'User id is required', message: 'id inválido o ausente' },
    { status: 500, title: 'User status is required', message: 'usestado ausente' },
    { status: 500, title: 'User status must be activo, inactivo or eliminado', message: 'usestado inválido' },
    { status: 404, title: 'User not found', message: 'Usuario no encontrado' },
    { status: 500, title: 'Deleted user status cannot be changed', message: 'Usuario objetivo en estado eliminado' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'User is not active', message: 'Usuario autenticado inactivo' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
