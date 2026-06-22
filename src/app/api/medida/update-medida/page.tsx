import { MedidaUpdateReference } from '@/components/docs/MedidaUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar Medida' }

export default function ActualizarMedidaPage() {
  const module = getModule('medida')!

  const endpoint = {
    slug: 'update-medida',
    title: 'Actualizar Medida',
    method: 'PATCH' as const,
    path: '/medidas/:id',
    definition: 'Actualiza parcialmente los datos editables de una medida, dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita modificar el nombre, la abreviatura o el estado de una medida existente. Al usarlo, el usuario obtiene los datos completos de la medida actualizada.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la medida.' },
    ],
    body: [
      { name: 'mdianombre', type: 'string', required: false, description: 'Nuevo nombre de la medida; debe ser único dentro de la empresa.' },
      { name: 'mdiaabreviatura', type: 'string', required: false, description: 'Nueva abreviatura de la medida; debe ser única dentro de la empresa.' },
      { name: 'mdiaestado', type: 'string', required: false, description: 'Nuevo estado de la medida; acepta activo, inactivo o eliminado.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede actualizar medidas.' },
      { title: 'Solo permite actualizar medidas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La medida debe existir dentro de la empresa autenticada.' },
      { title: 'Una medida con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envía mdianombre, no puede estar vacío.' },
      { title: 'Si se envía mdiaabreviatura, no puede estar vacía.' },
      { title: 'mdianombre no puede repetirse en otra medida de la misma empresa.' },
      { title: 'mdiaabreviatura no puede repetirse en otra medida de la misma empresa.' },
      { title: 'Si se envía mdiaestado, solo puede ser activo, inactivo o eliminado.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de medida es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Medida no encontrada', message: 'La medida no existe dentro de la empresa del usuario autenticado o la actualización no devolvió resultados.' },
      { status: 500, title: 'El nombre de medida es requerido', message: 'mdianombre fue enviado vacío.' },
      { status: 500, title: 'La abreviatura de medida es requerida', message: 'mdiaabreviatura fue enviado vacío.' },
      { status: 500, title: 'El estado de medida es requerido', message: 'mdiaestado fue enviado vacío.' },
      { status: 500, title: 'El estado de medida debe ser activo, inactivo o eliminado', message: 'mdiaestado tiene un valor no permitido.' },
      { status: 500, title: 'La medida eliminada no puede ser actualizada', message: 'La medida existe, pero está en estado eliminado.' },
      { status: 500, title: 'Ya existe una medida con ese nombre', message: 'Otra medida de la misma empresa ya usa el mdianombre enviado.' },
      { status: 500, title: 'Ya existe una medida con esa abreviatura', message: 'Otra medida de la misma empresa ya usa la mdiaabreviatura enviada.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar la medida', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de medidas.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para actualizar medidas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "mdiaid": "7f4f7a99-f7dc-4b10-9326-9e4ec8300e89",
  "mdiaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mdianombre": "Unidad Comercial",
  "mdiaabreviatura": "UND",
  "mdiafchregistro": "2026-05-23T17:29:01.621Z",
  "mdiaestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/medidas/7f4f7a99-f7dc-4b10-9326-9e4ec8300e89" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "mdianombre": "Unidad Comercial",
    "mdiaabreviatura": "UND",
    "mdiaestado": "activo"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'El body debe incluir al menos un campo editable con un valor distinto al actual.',
      'mdiaestado permite el valor eliminado para eliminación lógica de la medida.',
    ],
  }

  return <MedidaUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
