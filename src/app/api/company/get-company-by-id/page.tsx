import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener empresa' }

export default function ObtenerCompanyPage() {
  const module = getModule('company')!
  
  const endpoint = {
    slug: 'get-company-by-id',
    title: 'Obtener empresa',
    method: 'GET' as const,
    path: '/companies/:id',
    summary: 'Obtiene una empresa por su identificador.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador de la empresa.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/companies/:id \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "emid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "emruc": "1790012345001",
  "emrznsocial": "Ferreteria Central S.A.",
  "emcorreo": "contacto@ferreteriacentral.com",
  "emlogo": "https://api.tudominio.com/uploads/empresas/company.png",
  "emcodigo": "FC01",
  "emfchregistro": "2026-05-17T15:20:10.000Z",
  "emestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'El backend transforma emlogo a URL pública completa.',
    'El usuario autenticado debe pertenecer a la empresa y estar activo.',
    'Solo permite consultar la misma empresa del usuario autenticado.',
    'Los roles permitidos para este endpoint son jefe, empleado o administrador.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Company not found', message: 'Empresa no encontrada' },
    { status: 500, title: 'User cannot access another company', message: 'Intento de consultar otra empresa' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa no activa' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
