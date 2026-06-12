import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar marca' }

export default function ActualizarBrandPage() {
  const module = getModule('brand')!
  
  const endpoint = {
    slug: 'update-brand',
    title: 'Actualizar Brand',
    method: 'PATCH' as const,
    path: '/brands/:id',
    summary: 'Actualiza una marca por su identificador, limitada a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador de la marca.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/brands/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "mrcnombre": "Truper Pro",
  "mrcestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
  "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mrcnombre": "Truper Pro",
  "mrcfchregistro": "2026-05-21T20:30:00.000Z",
  "mrcestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar marcas de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede actualizar una marca.',
    'Si la marca está en estado eliminado, no se permite actualizar.',
    'Si se envía mrcnombre, se valida que no exista duplicado dentro de la misma empresa.',
    'Debe enviarse al menos un campo para actualizar.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Brand name is required', message: 'mrcnombre vacío' },
    { status: 500, title: 'Brand status must be activo, inactivo or eliminado', message: 'mrcestado inválido' },
    { status: 500, title: 'At least one field is required to update brand', message: 'Body sin cambios efectivos' },
    { status: 500, title: 'Brand already exists with that name', message: 'Marca duplicada por nombre en la misma empresa' },
    { status: 404, title: 'Marca no encontrada' },
    { status: 500, title: 'Deleted brand cannot be updated', message: 'Marca eliminada' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Intento de actualización sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
