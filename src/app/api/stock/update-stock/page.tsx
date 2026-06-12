import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar stock' }

export default function ActualizarStockPage() {
  const module = getModule('stock')!
  
  const endpoint = {
    slug: 'update-stock',
    title: 'Actualizar stock',
    method: 'PATCH' as const,
    path: '/stocks/:id',
    summary: 'Actualiza un stock por su identificador, limitado a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'number', required: false, description: 'identificador del stock.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/stocks/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "stcksuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "stckcantidad": 40,
  "stckestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
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
  "stckcantidad": 40,
  "stckfchregistro": "2026-05-23T23:21:23.477Z",
  "stckfchactualizacion": "2026-05-24T02:43:31.452Z",
  "stckestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Debes enviar al menos un campo a actualizar (stckcantidad o stckestado).',
    'No se permite cambiar el producto del stock en este endpoint.',
    'stcksuid debe coincidir con la sucursal del stock enviado en :id.',
    'Solo permite actualizar stocks de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'Si el stock está en estado eliminado, no se permite actualizar.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'Stock id is required', message: 'id ausente o inválido' },
    { status: 400, title: 'Stock branch id is required', message: 'stcksuid ausente o inválido' },
    { status: 500, title: 'Number is required, Value must be a valid number', message: 'stckcantidad inválido' },
    { status: 500, title: 'Stock status must be activo, inactivo or eliminado', message: 'stckestado inválido' },
    { status: 500, title: 'At least one field is required to update stock', message: 'No enviar campos para actualizar' },
    { status: 500, title: 'Deleted stock cannot be updated', message: 'Intento de actualizar un stock eliminado' },
    { status: 500, title: 'Stock branch does not exist', message: 'Sucursal inexistente para stcksuid' },
    { status: 500, title: 'Stock not found', message: 'Stock no encontrado o sucursal no coincide' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
