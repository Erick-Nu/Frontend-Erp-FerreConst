import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear categoría' }

export default function CrearCategoryPage() {
  const module = getModule('category')!
  
  const endpoint = {
    slug: 'register-category',
    title: 'Crear categoría',
    method: 'POST' as const,
    path: '/categories',
    summary: 'Crea una nueva categoría para la empresa indicada en el body.',
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
          { name: 'ctgriaemid', type: 'string', required: false, description: 'id de la empresa.' },
          { name: 'ctgnombre', type: 'string', required: false, description: 'nombre de la categoría.' },
          { name: 'ctgriadescripcion', type: 'string', required: false, description: 'descripción de la categoría (opcional).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/categories \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "ctgriaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "ctgnombre": "Herramientas Manuales",
  "ctgriadescripcion": "Productos para uso manual en ferretería"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
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
    'Solo permite crear categorías en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede crear categorías.',
    'No permite repetir ctgnombre dentro de la misma empresa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'ctgriaemid ausente' },
    { status: 500, title: 'Category name is required', message: 'ctgnombre ausente' },
    { status: 500, title: 'User cannot access another company', message: 'Intento de crear para otra empresa' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'Category already exists with that name', message: 'Categoría duplicada por nombre en la misma empresa' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
