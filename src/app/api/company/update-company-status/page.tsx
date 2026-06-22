import { CompanyStatusReference } from '@/components/docs/CompanyStatusReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar estado de empresa' }

export default function ActualizarCompanyPage() {
  const module = getModule('company')!

  const endpoint = {
    slug: 'update-company-status',
    title: 'Actualizar estado de empresa',
    method: 'PATCH' as const,
    path: '/companies/:id/status',
    definition: 'Actualiza el estado de una empresa, permitiendo activar, inactivar o eliminar lógicamente desde administración central.',
    whenToUse:
      'Se usa cuando un administrador necesita cambiar el estado de una empresa hija, ya sea para activarla, inactivarla temporalmente o marcarla como eliminada. Al usarlo, el usuario obtiene un mensaje de confirmación del cambio de estado.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Solo permite acceso a usuarios con rol administrador. La empresa del usuario autenticado debe estar activa y ser empresa padre.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la empresa.' },
    ],
    body: [
      { name: 'emestado', type: 'string', required: true, description: 'Nuevo estado de la empresa; acepta activo, inactivo o eliminado.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol administrador puede cambiar el estado de una empresa.' },
      { title: 'La empresa del usuario autenticado debe ser empresa padre.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'emestado es obligatorio y solo acepta activo, inactivo o eliminado.' },
      { title: 'Si la empresa objetivo está en estado eliminado, no puede cambiarse su estado nuevamente.' },
      { title: 'Este endpoint puede operar sobre cualquier empresa hija, no solo sobre la del usuario autenticado.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de empresa es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Empresa no encontrada', message: 'La empresa objetivo no existe o la actualización no se completó.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'El id enviado al servicio fue vacío.' },
      { status: 500, title: 'El estado de empresa es requerido', message: 'emestado fue enviado vacío.' },
      { status: 500, title: 'El estado de empresa debe ser activo, inactivo o eliminado', message: 'emestado tiene un valor no permitido.' },
      { status: 500, title: 'La empresa eliminada no puede cambiar de estado', message: 'La empresa objetivo ya está en estado eliminado.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'La empresa del usuario autenticado no es empresa padre.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no es administrador', message: 'El usuario autenticado no tiene el rol requerido para cambiar el estado de una empresa.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "message": "Estado de empresa actualizado"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/companies/0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a/status" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "emestado": "inactivo"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Es un endpoint administrativo y no reemplaza la actualización de datos generales de empresa.',
      'La respuesta exitosa no devuelve el objeto empresa completo, solo un mensaje de confirmación.',
    ],
  }

  return <CompanyStatusReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
