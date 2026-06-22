import { UserPasswordReference } from '@/components/docs/UserPasswordReference'
import { getApiBaseUrl } from '@/config/public-env'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar contraseña de usuario' }

export default function ActualizarUserPasswordPage() {
  const module = getModule('user')!

  const endpoint = {
    slug: 'update-user-password',
    title: 'Actualizar contraseña de usuario',
    method: 'PATCH' as const,
    path: '/users/:id/password',
    definition: 'Actualiza la contraseña de un usuario de la empresa autenticada sin devolver la contraseña ni el hash generado.',
    whenToUse: 'Se usa cuando un usuario con rol jefe necesita cambiar o restablecer la contraseña de otro usuario de su misma empresa. Al usarlo, el usuario obtiene una confirmación de que la contraseña fue actualizada correctamente.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del usuario al que se le actualizará la contraseña.' },
    ],
    body: [
      { name: 'uspassword', type: 'string', required: true, description: 'Nueva contraseña del usuario; debe tener al menos 8 caracteres.' },
    ],
    businessRules: [
      { title: 'Solo un usuario autenticado con rol jefe puede actualizar contraseñas.' },
      { title: 'El usuario autenticado debe pertenecer a una empresa activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario objetivo debe existir en la misma empresa del usuario autenticado.' },
      { title: 'No se permite actualizar la contraseña de usuarios de otra empresa.' },
      { title: 'La contraseña es obligatoria.' },
      { title: 'La contraseña debe tener al menos 8 caracteres.' },
      { title: 'La contraseña se cifra antes de guardarse.' },
      { title: 'La respuesta no incluye la contraseña ni el hash generado.' },
    ],
    expectedErrors: [
      { status: 400, title: 'El id de usuario es requerido', message: 'No se envió un identificador de usuario válido en la ruta.' },
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no fue aceptado.' },
      { status: 404, title: 'Usuario no encontrado', message: 'No existe un usuario con el id indicado dentro de la empresa autenticada.' },
      { status: 500, title: 'La contraseña es requerida', message: 'No se envió el campo uspassword en el body.' },
      { status: 500, title: 'La contraseña debe tener al menos 8 caracteres', message: 'La contraseña enviada no cumple con la longitud mínima requerida.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'No se encontró la empresa asociada al usuario autenticado.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa del usuario autenticado no está en estado activo.' },
      { status: 500, title: 'El usuario no existe', message: 'No se encontró el usuario autenticado en la empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa asociada al token.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intenta operar sobre una empresa diferente.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario autenticado no está permitido para acceder al módulo de usuarios.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado no está en estado activo.' },
      { status: 500, title: 'El usuario no es jefe', message: 'El usuario autenticado no tiene el rol requerido para actualizar contraseñas.' },
      { status: 500, title: 'Error updating user by id', message: 'Ocurrió un error interno al guardar la nueva contraseña.' },
    ],
    responseExample: `{
  "message": "Contrasena de usuario actualizada"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/users/:id/password" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "uspassword": "nuevaClave123"
  }'`,
    notes: [
      'Envía el id del usuario en la ruta, no en el body.',
      'Envía el body en formato JSON con el header Content-Type: application/json.',
      'Usa una contraseña de al menos 8 caracteres.',
      'Guarda el token JWT de forma segura y envíalo en cada solicitud protegida.',
      'La respuesta confirma la actualización, pero no devuelve información sensible.',
    ],
  }

  return <UserPasswordReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
