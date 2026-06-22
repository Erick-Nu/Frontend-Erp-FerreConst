import { UserStatusReference } from '@/components/docs/UserStatusReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar estado de usuario' }

export default function ActualizarUserPage() {
  const module = getModule('user')!

  const endpoint = {
    slug: 'update-user-status',
    title: 'Actualizar estado de usuario',
    method: 'PATCH' as const,
    path: '/users/:id/status',
    definition: 'Actualiza el estado de un usuario de la empresa autenticada.',
    whenToUse: 'Se usa cuando se necesita activar, inactivar o eliminar lógicamente a un usuario de la misma empresa. Al usarlo, el usuario obtiene una confirmación de que el estado fue actualizado correctamente.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del usuario al que se le actualizará el estado.' }
    ],
    body: [
      { name: 'usestado', type: 'string', required: true, description: 'Nuevo estado del usuario. Valores permitidos: activo, inactivo o eliminado.' }
    ],
    businessRules: [
      { title: 'El usuario autenticado debe pertenecer a una empresa activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Solo se permite actualizar usuarios de la misma empresa del usuario autenticado.' },
      { title: 'El usuario objetivo debe existir dentro de la empresa autenticada.' },
      { title: 'Los estados permitidos son activo, inactivo y eliminado.' },
      { title: 'Si el usuario objetivo ya está eliminado, no se permite cambiar su estado.' },
      { title: 'El endpoint solo cambia el estado y no devuelve los datos actualizados del usuario.' },
    ],
    expectedErrors: [
      { status: 400, title: 'El id de usuario es requerido', message: 'No se envió un identificador de usuario válido en la ruta.' },
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no fue aceptado.' },
      { status: 404, title: 'Usuario no encontrado', message: 'No existe un usuario con el id indicado dentro de la empresa autenticada.' },
      { status: 500, title: 'El estado de usuario es requerido', message: 'No se envió el campo usestado en el body.' },
      { status: 500, title: 'El estado de usuario debe ser activo, inactivo o eliminado', message: 'El valor enviado en usestado no corresponde a un estado permitido.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'No se encontró la empresa asociada al usuario autenticado.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa del usuario autenticado no está en estado activo.' },
      { status: 500, title: 'El usuario no existe', message: 'No se encontró el usuario autenticado en la empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa asociada al token.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intenta operar sobre una empresa diferente.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario autenticado no está permitido para acceder al módulo de usuarios.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado no está en estado activo.' },
      { status: 500, title: 'El usuario eliminado no puede cambiar de estado', message: 'El usuario objetivo ya está eliminado y no puede volver a modificarse.' },
      { status: 500, title: 'Error al actualizar el estado del usuario', message: 'Ocurrió un error interno al guardar el nuevo estado.' },
    ],
    responseExample: '{\n  "message": "Estado de usuario actualizado"\n}',
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/users/2f7b9d7a-3f45-4e66-9d75-2b2d0f4d9a10/status" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "usestado": "inactivo"
  }'`,
    notes: [
      'Envía el id del usuario en la ruta, no en el body.',
      'Envía el body en formato JSON con el header Content-Type: application/json.',
      'Usa únicamente los valores activo, inactivo o eliminado para usestado.',
      'Usa eliminado para una baja lógica del usuario.',
      'Después de una actualización exitosa, consulta el usuario o la lista de usuarios si necesitas ver el estado actualizado.',
    ],
  }

  return <UserStatusReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
