import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear configuración' }

export default function CrearConfigPage() {
  const module = getModule('config')!
  
  const endpoint = {
    slug: 'register-config',
    title: 'Crear configuración',
    method: 'POST' as const,
    path: '/configs',
    summary: 'Crea una configuración para una empresa.',
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
          { name: 'cfemid', type: 'string', required: true, description: 'id de la empresa a la que pertenecerá la configuración.' },
          { name: 'cfclave', type: 'string', required: true, description: 'clave única de configuración.' },
          { name: 'cfvalor', type: 'string', required: true, description: 'valor asociado a la clave.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/configs \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "cfclave": "iva_porcentaje",
  "cfvalor": "15"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "cfid": "5b9d0e5e-fd3f-451d-bf68-4db51f52f6b0",
  "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "cfclave": "iva_porcentaje",
  "cfvalor": "15"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite crear configuraciones a un usuario con rol administrador.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe ser empresa padre (empadre = true).',
    'No permite duplicar cfclave dentro de la misma empresa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'cfemid, cfclave o cfvalor ausentes: error de validación' },
    { status: 500, title: 'Usuario sin rol administrador: User is not admin' },
    { status: 500, title: 'Empresa no activa o no padre: error de negocio' },
    { status: 500, title: 'Clave duplicada: Config already exists with that key' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
