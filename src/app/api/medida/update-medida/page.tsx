import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar Medida' }

export default function ActualizarMedidaPage() {
  const module = getModule('medida')!
  
  const endpoint = {
    slug: 'update-medida',
    title: 'Actualizar Medida',
    method: 'PATCH' as const,
    path: '/medidas/:id',
    summary: 'Actualiza una medida por su identificador, limitada a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador de la medida.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/medidas/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "mdianombre": "Unidad Comercial",
  "mdiaabreviatura": "UND",
  "mdiaestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "mdiaid": "7f4f7a99-f7dc-4b10-9326-9e4ec8300e89",
  "mdiaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mdianombre": "Unidad Comercial",
  "mdiaabreviatura": "UND",
  "mdiafchregistro": "2026-05-23T17:29:01.621Z",
  "mdiaestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar medidas de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede actualizar una medida.',
    'Si la medida está en estado eliminado, no se permite actualizar.',
    'Si se envía mdianombre, se valida que no exista duplicado dentro de la misma empresa.',
    'Si se envía mdiaabreviatura, se valida que no exista duplicado dentro de la misma empresa.',
    'Debe enviarse al menos un campo para actualizar.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Medida name is required', message: 'mdianombre vacío' },
    { status: 500, title: 'Medida abbreviation is required', message: 'mdiaabreviatura vacía' },
    { status: 500, title: 'Medida status must be activo, inactivo or eliminado', message: 'mdiaestado inválido' },
    { status: 500, title: 'At least one field is required to update medida', message: 'Body sin cambios efectivos' },
    { status: 500, title: 'Medida already exists with that name', message: 'Medida duplicada por nombre en la misma empresa' },
    { status: 500, title: 'Medida already exists with that abbreviation', message: 'Medida duplicada por abreviatura en la misma empresa' },
    { status: 404, title: 'Medida no encontrada' },
    { status: 500, title: 'Deleted medida cannot be updated', message: 'Medida eliminada' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Intento de actualización sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
