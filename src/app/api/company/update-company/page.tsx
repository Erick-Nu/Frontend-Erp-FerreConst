import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar empresa' }

export default function ActualizarCompanyPage() {
  const module = getModule('company')!
  
  const endpoint = {
    slug: 'update-company',
    title: 'Actualizar Company',
    method: 'PATCH' as const,
    path: '/companies/:id',
    summary: 'Actualiza los datos de una empresa y retorna la empresa con los valores actualizados.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json","multipart/form-data"],
    contentType: 'application/json',
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
    curlExample: `curl -X PATCH https://api.tudominio.com/companies/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "emrznsocial": "Ferreteria Central S.A.",
  "emcorreo": "contacto@ferreteriacentral.com"
}'`,
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
    'Campo: imagen',
    'Formatos permitidos: .png, .jpg',
    'Tamaño máximo: 5MB',
    'El endpoint solo permite actualizar la misma empresa del usuario autenticado.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe estar activa.',
    'Los roles permitidos para este endpoint son jefe, empleado o administrador.',
    'Si la empresa objetivo está inactivo o eliminado, no se permite actualizar.',
    'Debe enviarse al menos un campo para actualizar (emrznsocial, emcorreo o imagen).',
    'Si se envía emcorreo y ese correo ya existe, se retorna error.',
    'El backend transforma emlogo a URL pública completa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'id inválido o ausente' },
    { status: 500, title: 'Company social reason is required', message: 'emrznsocial vacía' },
    { status: 500, title: 'Company email must be valid', message: 'emcorreo inválido' },
    { status: 500, title: 'Image size exceeds the allowed limit', message: 'imagen inválida por tamaño' },
    { status: 500, title: 'Only PNG and JPG images are allowed', message: 'imagen inválida por tipo' },
    { status: 500, title: 'At least one field is required to update company', message: 'Body sin campos para actualizar' },
    { status: 500, title: 'Company already exists with that email', message: 'Correo duplicado' },
    { status: 404, title: 'Empresa no encontrada' },
    { status: 500, title: 'Inactive or deleted company cannot be updated', message: 'Empresa inactiva o eliminada' },
    { status: 500, title: 'User cannot access another company', message: 'Intento de actualizar otra empresa' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
