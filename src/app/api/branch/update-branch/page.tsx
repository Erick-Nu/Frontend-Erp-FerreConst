import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar sucursal' }

export default function ActualizarBranchPage() {
  const module = getModule('branch')!
  
  const endpoint = {
    slug: 'update-branch',
    title: 'Actualizar Branch',
    method: 'PATCH' as const,
    path: '/branches/:id',
    summary: 'Actualiza una sucursal por su identificador, limitada a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador de la sucursal.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/branches/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "sunombre": "Sucursal Norte",
  "sudireccion": "Av. Norte 123 y Calle 8",
  "sucorreo": "norte@empresa.com",
  "suidentificador": "002",
  "suestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "suemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "sunombre": "Sucursal Norte",
  "sudireccion": "Av. Norte 123 y Calle 8",
  "sucorreo": "norte@empresa.com",
  "suidentificador": "002",
  "sufchregistro": "2026-05-19T22:10:00.000Z",
  "suestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar sucursales de la misma empresa del usuario autenticado.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe tener rol jefe para actualizar sucursales.',
    'Si la sucursal está en estado eliminado, no se permite actualizar.',
    'Si se envía suidentificador, se valida que no exista duplicado dentro de la misma empresa.',
    'Debe enviarse al menos un campo para actualizar.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Branch name is required', message: 'sunombre vacío' },
    { status: 500, title: 'Branch address is required', message: 'sudireccion vacía' },
    { status: 500, title: 'Branch identifier must be exactly 3 digits number', message: 'suidentificador inválido' },
    { status: 500, title: 'Branch email must be valid', message: 'sucorreo inválido' },
    { status: 500, title: 'Branch status must be activo, inactivo or eliminado', message: 'suestado inválido' },
    { status: 500, title: 'At least one field is required to update branch', message: 'Body sin cambios efectivos' },
    { status: 500, title: 'Branch not found', message: 'Sucursal no encontrada' },
    { status: 500, title: 'Deleted branch cannot be updated', message: 'Sucursal eliminada' },
    { status: 500, title: 'User is not jefe', message: 'Intento de actualización sin rol jefe' },
    { status: 500, title: 'Branch already exists with that identifier', message: 'Identificador duplicado' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
