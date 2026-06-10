import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear Brand' }

export default function CrearBrandPage() {
  const module = getModule('brand')!
  
  const endpoint = {
    slug: 'register-brand',
    title: 'Crear Brand',
    method: 'POST' as const,
    path: '/brands',
    summary: 'Crea una nueva marca para la empresa indicada en el body.',
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
          { name: 'mrcemid', type: 'string', required: false, description: 'id de la empresa.' },
          { name: 'mrcnombre', type: 'string', required: false, description: 'nombre de la marca.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/brands \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mrcnombre": "Truper"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
  "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mrcnombre": "Truper",
  "mrcfchregistro": "2026-05-21T20:30:00.000Z",
  "mrcestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite crear marcas en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede crear marcas.',
    'No permite repetir mrcnombre dentro de la misma empresa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'mrcemid ausente' },
    { status: 500, title: 'Brand name is required', message: 'mrcnombre ausente' },
    { status: 500, title: 'User cannot access another company', message: 'Intento de crear para otra empresa' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol jefe o empleado' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'Brand already exists with that name', message: 'Marca duplicada por nombre en la misma empresa' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
