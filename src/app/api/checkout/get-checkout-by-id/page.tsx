import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener caja' }

export default function ObtenerCheckoutPage() {
  const module = getModule('checkout')!
  
  const endpoint = {
    slug: 'get-checkout-by-id',
    title: 'Obtener Checkout',
    method: 'GET' as const,
    path: '/checkouts/:id',
    summary: 'Obtiene una caja por su identificador dentro de una sucursal específica, limitada a la empresa del usuario autenticado, incluyendo datos básicos de la sucursal.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador de la caja (cjidentificador).' }
    ],
    queryParams: [
          { name: 'cjsuid', type: 'string', required: true, description: 'id de la sucursal donde se buscará la caja.' }
    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/checkouts/:id \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
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
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'La búsqueda se hace por cjemid (empresa del usuario autenticado), cjsuid (query param) y cjidentificador (path param).',
    'Esto permite repetir cjidentificador en sucursales distintas sin colisiones.',
    'Incluye datos básicos de sucursal: suid, sunombre, suidentificador, suestado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe, empleado o administrador.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id ausente' },
    { status: 400, title: 'cjsuid ausente' },
    { status: 500, title: 'Caja no encontrada para esa empresa+sucursal+identificador: error de negocio' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
