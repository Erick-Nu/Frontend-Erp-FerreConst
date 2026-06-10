import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar Playment Methods' }

export default function ListarPlaymentMethodsPage() {
  const module = getModule('playment-method')!
  
  const endpoint = {
    slug: 'get-playment-methods',
    title: 'Listar Playment Methods',
    method: 'GET' as const,
    path: '/playment-methods',
    summary: 'Obtiene el listado paginado de métodos de pago de la empresa del usuario autenticado.',
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
    curlExample: `curl -X GET https://api.tudominio.com/playment-methods \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
      "mpid": "2b2f66f5-94ad-49ff-8d43-9d7f56e8c11b",
      "mpemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
      "mpnombre": "Transferencia bancaria",
      "mpfchregistro": "2026-05-24T03:15:11.245Z",
      "mpestado": "activo"
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
    'Solo retorna métodos de pago de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Page must be a positive integer', message: 'page inválido (no entero positivo)' },
    { status: 500, title: 'Page size must be a positive integer', message: 'pageSize inválido (no entero positivo)' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
