import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar estado de caja' }

export default function ActualizarCheckoutPage() {
  const module = getModule('checkout')!
  
  const endpoint = {
    slug: 'update-checkout-status',
    title: 'Actualizar Checkout',
    method: 'PATCH' as const,
    path: '/checkouts/:id/status',
    summary: 'Actualiza únicamente el estado de una caja por su identificador de fila (cjid), limitada a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador interno de la caja (cjid).' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/checkouts/:id/status \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "cjestado": "inactivo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "cjid": "e1b3da39-d5d5-47d6-a351-0e61e586f732",
  "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "cjidentificador": "002",
  "cjfchregistro": "2026-05-19T22:10:00.000Z",
  "cjestado": "inactivo",
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
    'Solo permite actualizar cajas de la misma empresa del usuario autenticado.',
    'Incluye en la respuesta los datos básicos de sucursal: suid, sunombre, suidentificador, suestado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe puede actualizar una caja.',
    'Si la caja está en estado eliminado, no se permite actualizar.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'cjestado inválido o ausente: error de validación' },
    { status: 404, title: 'Caja no encontrada' },
    { status: 500, title: 'Intento de actualización sin rol jefe: error de autorización' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
