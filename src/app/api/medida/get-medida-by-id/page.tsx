import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener Medida' }

export default function ObtenerMedidaPage() {
  const module = getModule('medida')!
  
  const endpoint = {
    slug: 'get-medida-by-id',
    title: 'Obtener Medida',
    method: 'GET' as const,
    path: '/medidas/:id',
    summary: 'Obtiene una medida por su identificador, limitada a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador de la medida.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/medidas/:id \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "mdiaid": "7f4f7a99-f7dc-4b10-9326-9e4ec8300e89",
  "mdiaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mdianombre": "Unidad",
  "mdiaabreviatura": "UND",
  "mdiafchregistro": "2026-05-23T17:29:01.621Z",
  "mdiaestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite ver medidas de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede consultar una medida.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Medida not found', message: 'Medida no encontrada' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
