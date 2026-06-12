import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar alertas' }

export default function ListarAlertsPage() {
  const module = getModule('alert')!
  
  const endpoint = {
    slug: 'get-alerts',
    title: 'Listar Alerts',
    method: 'GET' as const,
    path: '/alerts',
    summary: 'Obtiene el listado paginado de alertas visibles de la empresa del usuario autenticado.',
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

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/alerts \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
      "alid": "8b6e1f4a-4ad8-4d9e-9a0f-8e58b0df1111",
      "alemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
      "branch": {
        "suid": "9a9fbc8e-1ed5-45a5-8e4d-7e5c31790001",
        "sunombre": "Sucursal Norte",
        "suidentificador": "NORTE-01"
      },
      "product": {
        "prdtoid": "0b8f4ef4-cd8c-4ebf-a385-16ef7f380001",
        "prdtocodigo": "MART-001",
        "prdtonombre": "Martillo 16oz"
      },
      "altipo": "stock_bajo",
      "almensaje": "Stock bajo en Sucursal Norte: Martillo 16oz (MART-001) - Actual: 2, Mínimo: 5",
      "alcantidadactual": 2,
      "alstockminimo": 5,
      "alstockmaximo": 20,
      "alvisible": true,
      "alvisto": false,
      "alfchcreacion": "2026-06-06T22:55:11.000Z"
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
    'Solo retorna alertas de la misma empresa del usuario autenticado.',
    'Si envías suid, el servicio valida que la sucursal exista en la empresa autenticada.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe, empleado o administrador.',
    'Solo retorna alertas con alvisible = true.',
    'El resultado se ordena por alfchcreacion descendente.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Page must be a positive integer', message: 'page inválido (no entero positivo)' },
    { status: 500, title: 'Page size must be a positive integer', message: 'pageSize inválido (no entero positivo)' },
    { status: 500, title: 'Branch does not exist', message: 'suid inexistente en la empresa autenticada' },
    { status: 500, title: 'User is not jefe, empleado or admin', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
