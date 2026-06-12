import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear sucursal' }

export default function CrearBranchPage() {
  const module = getModule('branch')!
  
  const endpoint = {
    slug: 'register-branch',
    title: 'Crear Branch',
    method: 'POST' as const,
    path: '/branches',
    summary: 'Crea una sucursal para la empresa enviada en el body, siempre que coincida con la empresa del usuario autenticado.',
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
          { name: 'suemid', type: 'string', required: false, description: 'id de la empresa.' },
          { name: 'sunombre', type: 'string', required: false, description: 'nombre de la sucursal.' },
          { name: 'suidentificador', type: 'string', required: false, description: 'identificador de sucursal (exactamente 3 dígitos).' },
          { name: 'sudireccion', type: 'string', required: false, description: 'dirección de la sucursal (opcional).' },
          { name: 'sucorreo', type: 'string', required: false, description: 'correo de la sucursal (opcional, formato válido).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/branches \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "suemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "sunombre": "Sucursal Centro",
  "suidentificador": "001",
  "sudireccion": "Av. Principal y Calle 10",
  "sucorreo": "sucursal.centro@empresa.com"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "suemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "sunombre": "Sucursal Centro",
  "sudireccion": "Av. Principal y Calle 10",
  "sucorreo": "sucursal.centro@empresa.com",
  "suidentificador": "001",
  "sufchregistro": "2026-05-19T22:10:00.000Z",
  "suestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite crear sucursales en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe puede crear sucursales.',
    'No permite repetir suidentificador dentro de la misma empresa.',
    'Al crear la sucursal, también intenta crear su secuencia asociada.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'suemid ausente' },
    { status: 500, title: 'Branch name is required', message: 'sunombre ausente' },
    { status: 500, title: 'Branch identifier is required', message: 'suidentificador ausente' },
    { status: 500, title: 'Branch identifier must be exactly 3 digits number', message: 'suidentificador inválido' },
    { status: 500, title: 'Branch email must be valid', message: 'sucorreo inválido' },
    { status: 500, title: 'User is not jefe', message: 'Usuario sin rol jefe' },
    { status: 500, title: 'User cannot create branch for another company', message: 'Intento de crear para otra empresa' },
    { status: 500, title: 'Branch already exists with that identifier', message: 'Identificador duplicado' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
