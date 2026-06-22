import { CompanyUpdateReference } from '@/components/docs/CompanyUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar empresa' }

export default function ActualizarCompanyPage() {
  const module = getModule('company')!

  const endpoint = {
    slug: 'update-company',
    title: 'Actualizar empresa',
    method: 'PATCH' as const,
    path: '/companies/:id',
    definition: 'Actualiza parcialmente los datos editables de una empresa, limitado a la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita modificar la razón social, el correo o el logo de la empresa del usuario autenticado. Al usarlo, el usuario obtiene los datos completos de la empresa actualizada, incluyendo la URL pública del logo.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol administrador, jefe o empleado, pero solo sobre la misma empresa del usuario autenticado.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la empresa.' },
    ],
    body: [
      { name: 'emrznsocial', type: 'string', required: false, description: 'Nueva razón social de la empresa.' },
      { name: 'emcorreo', type: 'string', required: false, description: 'Nuevo correo electrónico de la empresa; debe tener formato válido.' },
      { name: 'imagen', type: 'file', required: false, description: 'Nuevo logo de la empresa; solo se aceptan .png o .jpg de hasta 5 MB.' },
    ],
    businessRules: [
      { title: 'Solo permite actualizar la empresa del usuario autenticado; no permite modificar otras empresas.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'La empresa objetivo debe estar activa; si está inactiva o eliminada, no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envía emrznsocial, no puede estar vacío.' },
      { title: 'Si se envía emcorreo, debe tener formato de correo válido.' },
      { title: 'emcorreo no puede repetirse en otra empresa.' },
      { title: 'Si se envía imagen, solo se aceptan archivos .png y .jpg.' },
      { title: 'Si se envía imagen, el tamaño máximo permitido es 5 MB.' },
      { title: 'El backend transforma emlogo a una URL pública completa.' },
      { title: 'Cuando se envía imagen, el Content-Type debe ser multipart/form-data. Si no, puede usarse application/json.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de empresa es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Empresa no encontrada', message: 'La empresa objetivo no existe o la actualización no devolvió resultados.' },
      { status: 500, title: 'La razon social de empresa es requerida', message: 'emrznsocial fue enviado vacío.' },
      { status: 500, title: 'El correo de empresa es requerido', message: 'emcorreo fue enviado vacío.' },
      { status: 500, title: 'El correo de empresa debe ser válido', message: 'emcorreo no tiene formato de correo válido.' },
      { status: 500, title: 'El logo de empresa es requerido', message: 'emlogo fue enviado vacío.' },
      { status: 500, title: 'El tamaño de la imagen excede el límite permitido', message: 'La imagen enviada supera los 5 MB.' },
      { status: 500, title: 'Solo se permiten imágenes PNG y JPG', message: 'La imagen enviada no tiene extensión .png o .jpg.' },
      { status: 500, title: 'Error al guardar la imagen', message: 'Ocurrió un error interno al guardar la imagen en el servidor.' },
      { status: 500, title: 'La empresa inactiva o eliminada no puede ser actualizada', message: 'La empresa objetivo está en estado inactivo o eliminado.' },
      { status: 500, title: 'Ya existe una empresa con ese correo', message: 'Otra empresa ya usa el emcorreo enviado.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar la empresa', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'Error al actualizar la empresa', message: 'Ocurrió un error interno al ejecutar la actualización.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El id enviado no coincide con la empresa del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de empresas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "emid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "emruc": "1790012345001",
  "emrznsocial": "Ferreteria Central Renovada",
  "emcorreo": "nuevo-correo@ferreteriacentral.com",
  "emlogo": "http://localhost:3000/uploads/empresas/company.png",
  "emcodigo": "FC01",
  "emfchregistro": "2026-05-17T15:20:10.000Z",
  "emestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/companies/0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "emrznsocial": "Ferreteria Central Renovada",
    "emcorreo": "nuevo-correo@ferreteriacentral.com"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'Si no se envía imagen, usa Content-Type: application/json.',
      'Si se envía imagen, usa Content-Type: multipart/form-data con el archivo en el campo imagen.',
      'El campo emlogo se devuelve como URL pública completa, lista para usar en etiquetas <img>.',
    ],
  }

  return <CompanyUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
