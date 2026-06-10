import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar Clients' }

export default function ListarClientsPage() {
  const module = getModule('client')!
  
  const endpoint = {
    slug: 'get-clients',
    title: 'Listar Clients',
    method: 'GET' as const,
    path: '/clients',
    summary: 'Obtiene el listado paginado de clientes de la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [
          { name: 'page', type: 'string', required: true, description: 'número de página (entero positivo).' },
          { name: 'pageSize', type: 'number', required: true, description: 'cantidad de registros por página (entero positivo).' }
    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/clients \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
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
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 1,
  "totalPages": 1
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo retorna clientes de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede listar clientes.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Page must be a positive integer', message: 'page inválido (no entero positivo)' },
    { status: 500, title: 'Page size must be a positive integer', message: 'pageSize inválido (no entero positivo)' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
