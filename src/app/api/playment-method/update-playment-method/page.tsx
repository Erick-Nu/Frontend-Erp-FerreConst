import { PlaymentMethodUpdateReference } from '@/components/docs/PlaymentMethodUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar método de pago' }

export default function ActualizarPlaymentMethodPage() {
  const module = getModule('playment-method')!

  const endpoint = {
    slug: 'update-playment-method',
    title: 'Actualizar método de pago',
    method: 'PATCH' as const,
    path: '/playment-methods/:id',
    definition: 'Actualiza parcialmente los datos editables de un método de pago, dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita modificar el nombre o el estado de un método de pago existente. Al usarlo, el usuario obtiene los datos completos del método de pago actualizado.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del método de pago.' },
    ],
    body: [
      { name: 'mpnombre', type: 'string', required: false, description: 'Nuevo nombre del método de pago; debe ser único dentro de la empresa.' },
      { name: 'mpestado', type: 'string', required: false, description: 'Nuevo estado del método de pago; acepta activo, inactivo o eliminado.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede actualizar métodos de pago.' },
      { title: 'Solo permite actualizar métodos de pago de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El método de pago debe existir dentro de la empresa autenticada.' },
      { title: 'Un método de pago con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envía mpnombre, no puede estar vacío.' },
      { title: 'mpnombre no puede repetirse en otro método de pago de la misma empresa.' },
      { title: 'Si se envía mpestado, solo puede ser activo, inactivo o eliminado.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de método de pago es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Método de pago no encontrado', message: 'El método de pago no existe dentro de la empresa del usuario autenticado o la actualización no devolvió resultados.' },
      { status: 500, title: 'El nombre de método de pago es requerido', message: 'mpnombre fue enviado vacío.' },
      { status: 500, title: 'El estado de método de pago es requerido', message: 'mpestado fue enviado vacío.' },
      { status: 500, title: 'El estado de método de pago debe ser activo, inactivo o eliminado', message: 'mpestado tiene un valor no permitido.' },
      { status: 500, title: 'El método de pago eliminado no puede ser actualizado', message: 'El método de pago existe, pero está en estado eliminado.' },
      { status: 500, title: 'Ya existe un método de pago con ese nombre', message: 'Otro método de pago de la misma empresa ya usa el mpnombre enviado.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar el método de pago', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de métodos de pago.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para actualizar métodos de pago.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "mpid": "2b2f66f5-94ad-49ff-8d43-9d7f56e8c11b",
  "mpemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "mpnombre": "Tarjeta de crédito",
  "mpfchregistro": "2026-05-24T03:15:11.245Z",
  "mpestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/playment-methods/2b2f66f5-94ad-49ff-8d43-9d7f56e8c11b" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "mpnombre": "Tarjeta de crédito",
    "mpestado": "activo"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'El body debe incluir al menos un campo editable con un valor distinto al actual.',
      'mpestado permite el valor eliminado para eliminación lógica del método de pago.',
    ],
  }

  return <PlaymentMethodUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
