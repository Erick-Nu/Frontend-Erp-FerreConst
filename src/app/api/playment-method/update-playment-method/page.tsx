import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar método de pago' }

export default function ActualizarPlaymentMethodPage() {
  const module = getModule('playment-method')!
  
  const endpoint = {
    slug: 'update-playment-method',
    title: 'Actualizar Playment Method',
    method: 'PATCH' as const,
    path: '/playment-methods/:id',
    summary: 'Actualiza los datos de un método de pago por su identificador, limitado a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador del método de pago.' }
    ],
    queryParams: [

    ],
    body: [
          { name: 'mpnombre', type: 'string', required: false, description: 'nuevo nombre del método de pago.' },
          { name: 'mpestado', type: 'string', required: false, description: 'nuevo estado (activo, inactivo, eliminado).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/playment-methods/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "mpnombre": "Tarjeta de crédito",
  "mpestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "mpid": "2b2f66f5-94ad-49ff-8d43-9d7f56e8c11b",
  "mpemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "mpnombre": "Tarjeta de crédito",
  "mpfchregistro": "2026-05-24T03:15:11.245Z",
  "mpestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar métodos de pago de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'No permite repetir mpnombre dentro de la misma empresa.',
    'Si el método de pago está en estado eliminado, no permite actualizarlo.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'Playment method id is required', message: 'id ausente o inválido' },
    { status: 500, title: 'At least one field is required to update playment method', message: 'Body vacío o sin cambios aplicables' },
    { status: 500, title: 'Playment method name is required', message: 'mpnombre vacío' },
    { status: 500, title: 'Playment method status must be activo, inactivo or eliminado', message: 'mpestado inválido' },
    { status: 500, title: 'Playment method already exists with that name', message: 'Nombre duplicado en la empresa' },
    { status: 500, title: 'Deleted playment method cannot be updated', message: 'Método de pago en estado eliminado' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 404, title: 'Playment method not found', message: 'Método de pago no encontrado' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
