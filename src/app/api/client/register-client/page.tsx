import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear cliente' }

export default function CrearClientPage() {
  const module = getModule('client')!
  
  const endpoint = {
    slug: 'register-client',
    title: 'Crear cliente',
    method: 'POST' as const,
    path: '/clients',
    summary: 'Crea un nuevo cliente para la empresa indicada en el body.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [
          { name: 'clnteemid', type: 'string', required: true, description: 'id de la empresa.' },
          { name: 'clntetipoidentificacion', type: 'string', required: true, description: 'tipo de identificación (cedula o ruc).' },
          { name: 'clnteidentificacion', type: 'string', required: true, description: 'identificación válida según el tipo.' },
          { name: 'clntenombre', type: 'string', required: true, description: 'nombre del cliente.' },
          { name: 'clntecorreo', type: 'string', required: true, description: 'correo del cliente (formato válido).' },
          { name: 'clntedireccion', type: 'string', required: true, description: 'dirección del cliente.' },
          { name: 'clntetelefono', type: 'string', required: true, description: 'teléfono móvil (10 dígitos, ejemplo 0987654321).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/clients \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "clnteemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "clntetipoidentificacion": "cedula",
  "clnteidentificacion": "1712345678",
  "clntenombre": "Juan Perez",
  "clntecorreo": "juan.perez@email.com",
  "clntedireccion": "Av. Principal y Calle 10",
  "clntetelefono": "0987654321"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "clnteid": "9a4d1377-c64c-4fd7-bf7e-f23d2d9fd5f9",
  "clnteemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "clntetipoidentificacion": "cedula",
  "clnteidentificacion": "1712345678",
  "clntenombre": "Juan Perez",
  "clntecorreo": "juan.perez@email.com",
  "clntedireccion": "Av. Principal y Calle 10",
  "clntetelefono": "0987654321",
  "clntefchregistro": "2026-05-24T03:10:15.000Z",
  "clnteestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite crear clientes en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede crear clientes.',
    'No permite repetir clnteidentificacion dentro de la misma empresa.',
    'No permite repetir clntecorreo dentro de la misma empresa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'clnteemid ausente' },
    { status: 500, title: 'Client identification type is required', message: 'clntetipoidentificacion ausente' },
    { status: 500, title: 'Client identification type must be cedula or ruc', message: 'clntetipoidentificacion inválido' },
    { status: 500, title: 'Client identification must be valid for the selected type', message: 'clnteidentificacion ausente o inválida para el tipo' },
    { status: 500, title: 'Client name is required', message: 'clntenombre ausente' },
    { status: 500, title: 'Client email must be valid', message: 'clntecorreo ausente o inválido' },
    { status: 500, title: 'Client address is required', message: 'clntedireccion ausente' },
    { status: 500, title: 'Client phone must be valid', message: 'clntetelefono ausente o inválido' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'User cannot access another company', message: 'Intento de crear para otra empresa' },
    { status: 500, title: 'Client already exists with that identification', message: 'Cliente duplicado por identificación' },
    { status: 500, title: 'Client already exists with that email', message: 'Cliente duplicado por correo' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
