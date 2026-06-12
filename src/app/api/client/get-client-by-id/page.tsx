import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener cliente' }

export default function ObtenerClientPage() {
  const module = getModule('client')!
  
  const endpoint = {
    slug: 'get-client-by-id',
    title: 'Obtener Client',
    method: 'GET' as const,
    path: '/clients/:id',
    summary: 'Obtiene un cliente por su identificador, limitado a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador del cliente.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/clients/:id \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "clnteid": "9a4d1377-c64c-4fd7-bf7e-f23d2d9fd5f9",
  "clnteemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "clntetipoidentificacion": "cedula",
  "clnteidentificacion": "1712345678",
  "clntenombre": "Juan Perez",
  "clntecorreo": "juan.perez@email.com",
  "clntedireccion": "Av. Principal y Calle 10",
  "clntetelefono": "0987654321",
  "clntefchregistro": "2026-05-24T03:10:15.000Z",
  "clnteestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite ver clientes de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede consultar un cliente.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id ausente o inválido' },
    { status: 500, title: 'Client not found', message: 'Cliente no encontrado' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
