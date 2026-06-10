import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener Category' }

export default function ObtenerCategoryPage() {
  const module = getModule('category')!
  
  const endpoint = {
    slug: 'get-category-by-id',
    title: 'Obtener Category',
    method: 'GET' as const,
    path: '/categories/:id',
    summary: 'Obtiene una categoría por su identificador, limitada a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador de la categoría.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/categories/:id \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "ctgriaid": "3c871a9e-0f6b-4ac9-a18f-0ecfe8b96d90",
  "ctgriaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "ctgnombre": "Herramientas Manuales",
  "ctgriadescripcion": "Productos para uso manual en ferretería",
  "ctgriafchregistro": "2026-05-21T18:40:00.000Z",
  "ctgriaestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite ver categorías de la misma empresa del usuario autenticado.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe estar activa.',
    'Solo un usuario con rol jefe o empleado puede consultar una categoría.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Category not found', message: 'Categoría no encontrada' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
