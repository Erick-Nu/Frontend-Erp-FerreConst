import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar marcas' }

export default function ListarBrandsPage() {
  const module = getModule('brand')!
  
  const endpoint = {
    slug: 'get-brands',
    title: 'Listar Brands',
    method: 'GET' as const,
    path: '/brands',
    summary: 'Obtiene el listado paginado de marcas de la empresa del usuario autenticado.',
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
    curlExample: `curl -X GET https://api.tudominio.com/brands \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
      "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
      "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
      "mrcnombre": "Truper",
      "mrcfchregistro": "2026-05-21T20:30:00.000Z",
      "mrcestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 5,
  "totalPages": 1
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo retorna marcas de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede listar marcas.'
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
