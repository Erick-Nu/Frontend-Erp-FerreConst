import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar Stocks' }

export default function ListarStocksPage() {
  const module = getModule('stock')!
  
  const endpoint = {
    slug: 'get-stocks',
    title: 'Listar Stocks',
    method: 'GET' as const,
    path: '/stocks',
    summary: 'Obtiene el listado paginado de stocks para una sucursal de la empresa del usuario autenticado.',
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
          { name: 'pageSize', type: 'number', required: true, description: 'cantidad de registros por página (entero positivo).' },
          { name: 'Uno', type: 'string', required: true, description: 'de estos dos filtros de sucursal:' },
          { name: 'stcksuid', type: 'string', required: true, description: 'id de la sucursal.' },
          { name: 'suidentificador', type: 'string', required: true, description: 'identificador de la sucursal (por ejemplo 001).' }
    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/stocks \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
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
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 1,
  "totalPages": 1
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Si envías stcksuid, ese valor tiene prioridad.',
    'Si no envías stcksuid, puedes enviar suidentificador.',
    'Si no envías ninguno, responde error.',
    'Solo retorna stocks de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'Si envías suidentificador y no existe en la empresa autenticada, responde 404 Branch not found.',
    'Si envías stcksuid, el servicio valida que la sucursal exista en la empresa autenticada.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Page must be a positive integer', message: 'page inválido (no entero positivo)' },
    { status: 500, title: 'Page size must be a positive integer', message: 'pageSize inválido (no entero positivo)' },
    { status: 400, title: 'Stock branch id or branch identifier is required', message: 'Filtro de sucursal ausente (stcksuid o suidentificador)' },
    { status: 404, title: 'Branch not found', message: 'Sucursal no encontrada por suidentificador' },
    { status: 500, title: 'Stock branch does not exist', message: 'stcksuid inexistente en la empresa autenticada' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
