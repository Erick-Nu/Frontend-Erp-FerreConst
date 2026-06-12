import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener usuario' }

export default function ObtenerUserPage() {
  const module = getModule('user')!
  
  const endpoint = {
    slug: 'get-user-by-id',
    title: 'Obtener User',
    method: 'GET' as const,
    path: '/users/:id',
    summary: 'Obtiene un usuario por su identificador.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador del usuario.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/users/:id \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
  "usemid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "usnombre": "Juan Perez",
  "usapodo": "jperez",
  "uscorreo": "juan.perez@empresa.com",
  "usimagen": "https://api.tudominio.com/uploads/usuarios/user.png",
  "usrol": "empleado",
  "usfchregistro": "2026-05-18T18:20:10.000Z",
  "usestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'El backend transforma usimagen a URL pública completa.',
    'Solo retorna el usuario si pertenece a la misma empresa del usuario autenticado.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe estar activa.',
    'Los roles permitidos para este endpoint son administrador, jefe o empleado.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'User id is required', message: 'id inválido o ausente' },
    { status: 500, title: 'User not found', message: 'Usuario no encontrado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
