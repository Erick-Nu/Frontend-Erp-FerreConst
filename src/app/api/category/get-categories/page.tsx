import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar Categories' }

export default function ListarCategoriesPage() {
  const module = getModule('category')!
  
  const endpoint = {
    slug: 'get-categories',
    title: 'Listar Categories',
    method: 'GET' as const,
    path: '/categories',
    summary: 'Obtiene el listado paginado de categorías de la empresa del usuario autenticado.',
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
    curlExample: `curl -X GET https://api.tudominio.com/categories \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
      "ctgriaid": "3c871a9e-0f6b-4ac9-a18f-0ecfe8b96d90",
      "ctgriaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
      "ctgnombre": "Herramientas Manuales",
      "ctgriadescripcion": "Productos para uso manual en ferretería",
      "ctgriafchregistro": "2026-05-21T18:40:00.000Z",
      "ctgriaestado": "activo"
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
    'Solo retorna categorías de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede listar categorías.'
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
