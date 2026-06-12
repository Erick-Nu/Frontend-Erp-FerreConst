import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar sucursales' }

export default function ListarBranchesPage() {
  const module = getModule('branch')!
  
  const endpoint = {
    slug: 'get-branches',
    title: 'Listar sucursales',
    method: 'GET' as const,
    path: '/branches',
    summary: 'Obtiene el listado paginado de sucursales de la empresa del usuario autenticado.',
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
    curlExample: `curl -X GET https://api.tudominio.com/branches \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
      "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
      "suemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
      "sunombre": "Sucursal Centro",
      "sudireccion": "Av. Principal y Calle 10",
      "sucorreo": "sucursal.centro@empresa.com",
      "suidentificador": "001",
      "sufchregistro": "2026-05-19T22:10:00.000Z",
      "suestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 3,
  "totalPages": 1
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo retorna sucursales de la misma empresa del usuario autenticado.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe estar activa.',
    'Roles permitidos para este endpoint: jefe, empleado o administrador.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Page must be a positive integer', message: 'page inválido (no entero positivo)' },
    { status: 500, title: 'Page size must be a positive integer', message: 'pageSize inválido (no entero positivo)' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
