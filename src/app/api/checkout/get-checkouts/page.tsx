import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar cajas' }

export default function ListarCheckoutsPage() {
  const module = getModule('checkout')!
  
  const endpoint = {
    slug: 'get-checkouts',
    title: 'Listar cajas',
    method: 'GET' as const,
    path: '/checkouts',
    summary: 'Obtiene el listado paginado de cajas de la empresa del usuario autenticado, incluyendo datos básicos de su sucursal.',
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
    curlExample: `curl -X GET https://api.tudominio.com/checkouts \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
      "cjid": "e1b3da39-d5d5-47d6-a351-0e61e586f732",
      "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
      "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
      "cjidentificador": "001",
      "cjfchregistro": "2026-05-19T22:10:00.000Z",
      "cjestado": "activo",
      "sucursal": {
        "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
        "sunombre": "Sucursal Centro",
        "suidentificador": "001",
        "suestado": "activo"
      }
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
    'Solo retorna cajas de la misma empresa del usuario autenticado.',
    'Incluye por cada caja los datos básicos de sucursal: suid, sunombre, suidentificador, suestado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe, empleado o administrador.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'page o pageSize inválidos (no entero positivo): error de validación' },
    { status: 500, title: 'Usuario sin permisos para el endpoint: error de autorización' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
