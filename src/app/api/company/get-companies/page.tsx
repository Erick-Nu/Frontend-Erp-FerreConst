import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar empresas' }

export default function ListarCompaniesPage() {
  const module = getModule('company')!
  
  const endpoint = {
    slug: 'get-companies',
    title: 'Listar empresas',
    method: 'GET' as const,
    path: '/companies',
    summary: 'Obtiene el listado paginado de empresas.',
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
          { name: 'page', type: 'string', required: true, description: 'número de página (entero positivo).' },
          { name: 'pageSize', type: 'number', required: true, description: 'cantidad de registros por página (entero positivo).' }
    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/companies \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "items": [
    {
      "emid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
      "emruc": "1790012345001",
      "emrznsocial": "Ferreteria Central S.A.",
      "emcorreo": "contacto@ferreteriacentral.com",
      "emlogo": "https://api.tudominio.com/uploads/empresas/company.png",
      "emcodigo": "FC01",
      "emfchregistro": "2026-05-17T15:20:10.000Z",
      "emestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 57,
  "totalPages": 3
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'El backend transforma emlogo a URL pública completa.',
    'Solo un usuario con rol administrador puede listar empresas.',
    'La empresa del usuario autenticado debe estar activa.',
    'La empresa del usuario autenticado debe ser empresa padre.',
    'Si no hay registros en la página solicitada, items puede venir vacío.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Page must be a positive integer', message: 'page inválido (no entero positivo)' },
    { status: 500, title: 'Page size must be a positive integer', message: 'pageSize inválido (no entero positivo)' },
    { status: 500, title: 'User is not admin', message: 'Usuario sin rol administrador' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa no activa' },
    { status: 500, title: 'Company is not parent', message: 'Empresa autenticada no es empresa padre' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
