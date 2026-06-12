import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar configuraciones' }

export default function ListarConfigsPage() {
  const module = getModule('config')!
  
  const endpoint = {
    slug: 'get-configs',
    title: 'Listar configuraciones',
    method: 'GET' as const,
    path: '/configs',
    summary: 'Obtiene todas las configuraciones de una empresa.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/configs \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `[
  {
    "cfid": "5b9d0e5e-fd3f-451d-bf68-4db51f52f6b0",
    "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "cfclave": "iva_porcentaje",
    "cfvalor": "15"
  },
  {
    "cfid": "6c3f8e47-cd2a-4f25-91d2-94cc2b8a6b1d",
    "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "cfclave": "moneda",
    "cfvalor": "USD"
  }
]`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite consultar configuraciones a un usuario con rol administrador.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe ser empresa padre (empadre = true).',
    'Si envías companyId, la consulta se ejecuta para esa empresa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Usuario sin rol administrador: User is not admin' },
    { status: 500, title: 'Empresa no activa o no padre: error de negocio' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
