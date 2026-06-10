import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear Medida' }

export default function CrearMedidaPage() {
  const module = getModule('medida')!
  
  const endpoint = {
    slug: 'register-medida',
    title: 'Crear Medida',
    method: 'POST' as const,
    path: '/medidas',
    summary: 'Crea una nueva medida para la empresa indicada en el body.',
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
          { name: 'mdiaemid', type: 'string', required: false, description: 'id de la empresa.' },
          { name: 'mdianombre', type: 'string', required: false, description: 'nombre de la medida.' },
          { name: 'mdiaabreviatura', type: 'string', required: false, description: 'abreviatura de la medida.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/medidas \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "mdiaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mdianombre": "Unidad",
  "mdiaabreviatura": "UND"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
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
    'Solo permite crear medidas en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede crear medidas.',
    'No permite repetir mdianombre dentro de la misma empresa.',
    'No permite repetir mdiaabreviatura dentro de la misma empresa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'mdiaemid ausente' },
    { status: 500, title: 'Medida name is required', message: 'mdianombre ausente' },
    { status: 500, title: 'Medida abbreviation is required', message: 'mdiaabreviatura ausente' },
    { status: 500, title: 'User cannot access another company', message: 'Intento de crear para otra empresa' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'Medida already exists with that name', message: 'Medida duplicada por nombre en la misma empresa' },
    { status: 500, title: 'Medida already exists with that abbreviation', message: 'Medida duplicada por abreviatura en la misma empresa' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
