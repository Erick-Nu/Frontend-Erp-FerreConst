import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar contraseña de usuario' }

export default function ActualizarUserPasswordPage() {
  const module = getModule('user')!
  
  const endpoint = {
    slug: 'update-user-password',
    title: 'Actualizar contraseña de usuario',
    method: 'PATCH' as const,
    path: '/users/:id/password',
    summary: 'Actualiza la contraseña de un usuario y no retorna el hash actualizado.',
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
          { name: 'uspassword', type: 'string', required: true, description: 'nueva contraseña del usuario (mínimo 8 caracteres).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/users/:id/password \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "uspassword": "nuevaClave123"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "message": "User password updated"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar contraseñas dentro de la misma empresa del usuario autenticado.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe estar activa.',
    'Solo un usuario con rol jefe puede ejecutar este endpoint.',
    'La contraseña se valida con mínimo de 8 caracteres y se almacena cifrada.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'User id is required', message: 'id ausente o inválido' },
    { status: 500, title: 'Password is required, Password must be at least 8 characters', message: 'uspassword ausente o inválida' },
    { status: 500, title: 'User is not jefe', message: 'Usuario sin rol jefe' },
    { status: 404, title: 'User not found', message: 'Usuario no encontrado' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'User is not active', message: 'Usuario autenticado inactivo' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
