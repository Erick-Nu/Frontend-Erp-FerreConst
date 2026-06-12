import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear stock' }

export default function CrearStockPage() {
  const module = getModule('stock')!
  
  const endpoint = {
    slug: 'register-stock',
    title: 'Crear Stock',
    method: 'POST' as const,
    path: '/stocks',
    summary: 'Registra un stock para una sucursal y producto de una empresa.',
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
          { name: 'stckemid', type: 'string', required: true, description: 'id de la empresa.' },
          { name: 'stcksuid', type: 'string', required: true, description: 'id de la sucursal.' },
          { name: 'stckprdtoid', type: 'string', required: true, description: 'id del producto.' },
          { name: 'stckcantidad', type: 'number', required: true, description: 'cantidad de stock (numero).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/stocks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "stckemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "stcksuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "stckprdtoid": "f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410",
  "stckcantidad": 25
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
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
  "stckcantidad": 25,
  "stckfchregistro": "2026-05-23T23:21:23.477Z",
  "stckfchactualizacion": "2026-05-23T23:21:23.477Z",
  "stckestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite registrar stock en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'stcksuid debe existir como sucursal dentro de la empresa indicada.',
    'stckprdtoid debe existir como producto dentro de la empresa indicada.',
    'No permite crear dos stocks para la misma combinacion sucursal + producto.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'stckemid ausente o vacío' },
    { status: 500, title: 'Stock branch id is required', message: 'stcksuid ausente o vacío' },
    { status: 500, title: 'Stock product id is required', message: 'stckprdtoid ausente o vacío' },
    { status: 500, title: 'Number is required, Value must be a valid number', message: 'stckcantidad vacío o inválido' },
    { status: 500, title: 'User cannot access another company', message: 'Intento de registrar para otra empresa distinta a la del usuario autenticado' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'Stock branch does not exist', message: 'Sucursal inexistente para la empresa indicada' },
    { status: 500, title: 'Stock product does not exist', message: 'Producto inexistente para la empresa indicada' },
    { status: 500, title: 'Stock already exists for this branch and product', message: 'Stock duplicado para la misma sucursal y producto' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
