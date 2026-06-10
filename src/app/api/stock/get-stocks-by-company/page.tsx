import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar Stocks By Company' }

export default function ListarStocksByCompanyPage() {
  const module = getModule('stock')!
  
  const endpoint = {
    slug: 'get-stocks-by-company',
    title: 'Listar Stocks By Company',
    method: 'GET' as const,
    path: '/stocks/all',
    summary: 'Obtiene el listado paginado de todos los stocks de la empresa del usuario autenticado, sin filtrar por sucursal.',
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
    curlExample: `curl -X GET https://api.tudominio.com/stocks/all \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
      "stckid": "d5c2b3dc-1a80-46f6-b7ce-9894ea31fd87",
      "stckemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
      "sucursal": {
        "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
        "sunombre": "Sucursal Centro",
        "suidentificador": "001"
      },
      "producto": {
        "prdtoid": "f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410",
        "prdtocodigo": "PRD-0001",
        "prdtonombre": "Taladro Inalambrico 20V"
      },
      "stckcantidad": 25,
      "stckfchregistro": "2026-05-23T23:21:23.477Z",
      "stckfchactualizacion": "2026-05-23T23:21:23.477Z",
      "stckestado": "activo"
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
    'Solo retorna stocks de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'El identificador del producto se retorna en producto.prdtoid (no se repite como campo raíz).'
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
