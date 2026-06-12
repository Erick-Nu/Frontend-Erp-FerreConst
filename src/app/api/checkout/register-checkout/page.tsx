import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear caja' }

export default function CrearCheckoutPage() {
  const module = getModule('checkout')!
  
  const endpoint = {
    slug: 'register-checkout',
    title: 'Crear caja',
    method: 'POST' as const,
    path: '/checkouts',
    summary: 'Crea una caja en una sucursal de la empresa indicada en el body.',
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
          { name: 'cjemid', type: 'string', required: false, description: 'id de la empresa.' },
          { name: 'cjsuid', type: 'string', required: false, description: 'id de la sucursal.' },
          { name: 'cjidentificador', type: 'string', required: false, description: 'identificador de caja (exactamente 3 dígitos).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/checkouts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "cjidentificador": "001"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "cjid": "e1b3da39-d5d5-47d6-a351-0e61e586f732",
  "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "cjidentificador": "001",
  "cjfchregistro": "2026-05-19T22:10:00.000Z",
  "cjestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite crear cajas en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'La sucursal debe existir y estar activa.',
    'Roles permitidos para este endpoint: jefe, empleado o administrador.',
    'No permite repetir cjidentificador dentro de la misma sucursal (409 Conflict).'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'cjemid, cjsuid o cjidentificador ausentes: error de validación' },
    { status: 500, title: 'cjidentificador inválido (no 3 dígitos): error de validación' },
    { status: 500, title: 'Sucursal no encontrada o inactiva: error de negocio' },
    { status: 409, title: 'Checkout identifier already exists in this branch', message: 'Caja duplicada en la misma sucursal' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
