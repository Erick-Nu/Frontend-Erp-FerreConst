import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar categoría' }

export default function ActualizarCategoryPage() {
  const module = getModule('category')!
  
  const endpoint = {
    slug: 'update-category',
    title: 'Actualizar categoría',
    method: 'PATCH' as const,
    path: '/categories/:id',
    summary: 'Actualiza una categoría por su identificador, limitada a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
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
    curlExample: `curl -X PATCH https://api.tudominio.com/categories/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "ctgnombre": "Herramientas Eléctricas",
  "ctgriadescripcion": "Productos y equipos eléctricos",
  "ctgriaestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "ctgriaid": "3c871a9e-0f6b-4ac9-a18f-0ecfe8b96d90",
  "ctgriaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "ctgnombre": "Herramientas Eléctricas",
  "ctgriadescripcion": "Productos y equipos eléctricos",
  "ctgriafchregistro": "2026-05-21T18:40:00.000Z",
  "ctgriaestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar categorías de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede actualizar una categoría.',
    'Si la categoría está en estado eliminado, no se permite actualizar.',
    'Si se envía ctgnombre, se valida que no exista duplicado dentro de la misma empresa.',
    'Debe enviarse al menos un campo para actualizar.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Category name is required', message: 'ctgnombre vacío' },
    { status: 500, title: 'Category status must be activo, inactivo or eliminado', message: 'ctgriaestado inválido' },
    { status: 500, title: 'Category description is required', message: 'ctgriadescripcion inválida (vacía)' },
    { status: 500, title: 'At least one field is required to update category', message: 'Body sin cambios efectivos' },
    { status: 500, title: 'Category already exists with that name', message: 'Categoría duplicada por nombre en la misma empresa' },
    { status: 404, title: 'Categoría no encontrada' },
    { status: 500, title: 'Deleted category cannot be updated', message: 'Categoría eliminada' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Intento de actualización sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
