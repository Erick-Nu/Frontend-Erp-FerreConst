import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear Playment Method' }

export default function CrearPlaymentMethodPage() {
  const module = getModule('playment-method')!
  
  const endpoint = {
    slug: 'register-playment-method',
    title: 'Crear Playment Method',
    method: 'POST' as const,
    path: '/playment-methods',
    summary: 'Crea un nuevo método de pago para la empresa indicada en el body.',
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
          { name: 'mpemid', type: 'string', required: true, description: 'id de la empresa.' },
          { name: 'mpnombre', type: 'string', required: true, description: 'nombre del método de pago.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/playment-methods \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "mpemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "mpnombre": "Transferencia bancaria"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "mpid": "2b2f66f5-94ad-49ff-8d43-9d7f56e8c11b",
  "mpemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "mpnombre": "Transferencia bancaria",
  "mpfchregistro": "2026-05-24T03:15:11.245Z",
  "mpestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite crear métodos de pago en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'No permite repetir mpnombre dentro de la misma empresa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'mpemid ausente o vacío' },
    { status: 500, title: 'Playment method name is required', message: 'mpnombre ausente o vacío' },
    { status: 500, title: 'User cannot access another company', message: 'Empresa distinta a la del usuario autenticado' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'Playment method already exists with that name', message: 'Método duplicado por nombre' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
