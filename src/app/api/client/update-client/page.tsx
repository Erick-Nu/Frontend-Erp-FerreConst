import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar Client' }

export default function ActualizarClientPage() {
  const module = getModule('client')!
  
  const endpoint = {
    slug: 'update-client',
    title: 'Actualizar Client',
    method: 'PATCH' as const,
    path: '/clients/:id',
    summary: 'Actualiza un cliente por su identificador, limitado a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador del cliente.' }
    ],
    queryParams: [

    ],
    body: [
          { name: 'clntetipoidentificacion', type: 'string', required: false, description: 'tipo de identificación (cedula o ruc).' },
          { name: 'clnteidentificacion', type: 'string', required: false, description: 'identificación válida según el tipo final del cliente.' },
          { name: 'clntenombre', type: 'string', required: false, description: 'nombre del cliente.' },
          { name: 'clntecorreo', type: 'string', required: false, description: 'correo del cliente (formato válido). También puede enviarse null.' },
          { name: 'clntedireccion', type: 'string', required: false, description: 'dirección del cliente. También puede enviarse null.' },
          { name: 'clntetelefono', type: 'string', required: false, description: 'teléfono móvil (10 dígitos, ejemplo 0987654321). También puede enviarse null.' },
          { name: 'clnteestado', type: 'string', required: false, description: 'estado del cliente (activo, inactivo, eliminado).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/clients/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "clntetipoidentificacion": "cedula",
  "clnteidentificacion": "1712345678",
  "clntenombre": "Juan Perez Actualizado",
  "clntecorreo": "juan.perez.actualizado@email.com",
  "clntedireccion": "Av. Amazonas y Naciones Unidas",
  "clntetelefono": "0991234567",
  "clnteestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "clnteid": "9a4d1377-c64c-4fd7-bf7e-f23d2d9fd5f9",
  "clnteemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "clntetipoidentificacion": "cedula",
  "clnteidentificacion": "1712345678",
  "clntenombre": "Juan Perez Actualizado",
  "clntecorreo": "juan.perez.actualizado@email.com",
  "clntedireccion": "Av. Amazonas y Naciones Unidas",
  "clntetelefono": "0991234567",
  "clntefchregistro": "2026-05-24T03:10:15.000Z",
  "clnteestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Debes enviar al menos un campo para actualizar.',
    'Si cambias clntetipoidentificacion, la clnteidentificacion resultante debe ser válida para ese tipo.',
    'No permite duplicar clnteidentificacion dentro de la misma empresa.',
    'No permite duplicar clntecorreo dentro de la misma empresa.',
    'Solo permite actualizar clientes de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede actualizar clientes.',
    'Si el cliente está en estado eliminado, no se permite actualizar.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id ausente o inválido' },
    { status: 500, title: 'Client identification type must be cedula or ruc', message: 'clntetipoidentificacion inválido' },
    { status: 500, title: 'Client identification must be valid for the selected type', message: 'clnteidentificacion inválida para el tipo' },
    { status: 500, title: 'Client name is required', message: 'clntenombre vacío' },
    { status: 500, title: 'Client email must be valid', message: 'clntecorreo inválido' },
    { status: 500, title: 'Client address is required', message: 'clntedireccion vacía' },
    { status: 500, title: 'Client phone must be valid', message: 'clntetelefono inválido' },
    { status: 500, title: 'Client status must be activo, inactivo or eliminado', message: 'clnteestado inválido' },
    { status: 500, title: 'At least one field is required to update client', message: 'No enviar campos para actualizar' },
    { status: 500, title: 'Deleted client cannot be updated', message: 'Intento de actualizar un cliente eliminado' },
    { status: 500, title: 'Client already exists with that identification', message: 'Cliente duplicado por identificación' },
    { status: 500, title: 'Client already exists with that email', message: 'Cliente duplicado por correo' },
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
