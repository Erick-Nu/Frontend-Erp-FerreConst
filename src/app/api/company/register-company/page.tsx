import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear Company' }

export default function CrearCompanyPage() {
  const module = getModule('company')!
  
  const endpoint = {
    slug: 'register-company',
    title: 'Crear Company',
    method: 'POST' as const,
    path: '/companies',
    summary: 'Registra una nueva empresa.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json","multipart/form-data"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [
          { name: 'emruc', type: 'string', required: false, description: 'RUC de la empresa.' },
          { name: 'emrznsocial', type: 'string', required: false, description: 'razón social.' },
          { name: 'emcorreo', type: 'string', required: false, description: 'correo de la empresa.' },
          { name: 'emcodigo', type: 'string', required: false, description: 'código alfanumérico de 4 caracteres.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/companies \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "emruc": "1790012345001",
  "emrznsocial": "Ferreteria Central S.A.",
  "emcorreo": "contacto@ferreteriacentral.com",
  "emcodigo": "FC01"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "emid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "emruc": "1790012345001",
  "emrznsocial": "Ferreteria Central S.A.",
  "emcorreo": "contacto@ferreteriacentral.com",
  "emlogo": "https://api.tudominio.com/uploads/empresas/company.png",
  "emcodigo": "FC01",
  "emfchregistro": "2026-05-23T17:29:01.621Z",
  "emestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Campo: imagen',
    'Formatos permitidos: .png, .jpg',
    'Tamaño máximo: 5MB',
    'Si no se envía, se usa logo por defecto.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company RUC is required', message: 'emruc ausente' },
    { status: 500, title: 'RUC must be valid', message: 'emruc inválido' },
    { status: 500, title: 'Company social reason is required', message: 'emrznsocial ausente' },
    { status: 500, title: 'Company email must be valid', message: 'emcorreo ausente o inválido' },
    { status: 500, title: 'Company code must be exactly 4 alphanumeric characters', message: 'emcodigo ausente o inválido' },
    { status: 500, title: 'Image size exceeds the allowed limit', message: 'imagen inválida por tamaño' },
    { status: 500, title: 'Only PNG and JPG images are allowed', message: 'imagen inválida por tipo' },
    { status: 500, title: 'User is not admin', message: 'Usuario sin rol administrador' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not parent', message: 'Empresa autenticada no es empresa padre' },
    { status: 500, title: 'Company already exists with that RUC', message: 'Empresa duplicada por RUC' },
    { status: 500, title: 'Company already exists with that email', message: 'Empresa duplicada por correo' },
    { status: 500, title: 'Company already exists with that code', message: 'Empresa duplicada por código' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
