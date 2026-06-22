import { UserUpdateReference } from '@/components/docs/UserUpdateReference'
import { getApiBaseUrl } from '@/config/public-env'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar usuario' }

export default function ActualizarUserPage() {
  const module = getModule('user')!

  const endpoint = {
    slug: 'update-user',
    title: 'Actualizar usuario',
    method: 'PATCH' as const,
    path: '/users/:id',
    definition: 'Actualiza parcialmente los datos editables de un usuario, dentro de la empresa del usuario autenticado, incluyendo nombre, correo, imagen, rol y estado.',
    whenToUse: 'Se usa cuando la aplicación necesita modificar el nombre, correo, imagen de perfil, rol o estado de un usuario existente. Al usarlo, el usuario obtiene los datos completos del usuario actualizado, con la URL pública de su imagen de perfil.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol administrador, jefe o empleado, con reglas adicionales para cambiar usrol o usestado.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del usuario a actualizar.' },
    ],
    body: [
      { name: 'usnombre', type: 'string', required: false, description: 'Nuevo nombre del usuario; debe contener solo letras y espacios.' },
      { name: 'uscorreo', type: 'string', required: false, description: 'Nuevo correo electrónico del usuario; debe tener formato válido y ser único globalmente.' },
      { name: 'usestado', type: 'string', required: false, description: 'Nuevo estado del usuario. Valores: activo, inactivo, eliminado.' },
      { name: 'usrol', type: 'string', required: false, description: 'Nuevo rol del usuario. Valores: administrador, jefe, empleado.' },
      { name: 'imagen', type: 'file', required: false, description: 'Nueva imagen de perfil del usuario; solo se aceptan .png o .jpg de hasta 5 MB.' },
    ],
    businessRules: [
      { title: 'Solo permite actualizar usuarios de la misma empresa del usuario autenticado.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'Los roles permitidos para este endpoint son jefe, empleado o administrador.' },
      { title: 'Si se envía usrol o usestado, solo un usuario con rol jefe puede cambiarlo.' },
      { title: 'Si se envía usrol o usestado, el usuario objetivo debe tener rol jefe o empleado (no administrador).' },
      { title: 'Si el usuario objetivo está en estado eliminado, no se permite actualizar.' },
      { title: 'Debe enviarse al menos un campo para actualizar.' },
      { title: 'Si se envía uscorreo y ya existe, se retorna error de negocio.' },
      { title: 'El backend transforma usimagen a URL pública completa.' },
      { title: 'Campo: imagen' },
      { title: 'Formatos permitidos: .png, .jpg' },
      { title: 'Tamaño máximo: 5MB' },
    ],
    expectedErrors: [
      { status: 401, title: 'Token inválido o ausente' },
      { status: 400, title: 'ID de usuario requerido', message: 'id inválido o ausente' },
      { status: 500, title: 'Se requiere al menos un campo para actualizar', message: 'Body sin campos para actualizar' },
      { status: 500, title: 'Nombre requerido, El nombre debe contener solo letras y espacios', message: 'usnombre ausente o inválido' },
      { status: 500, title: 'Correo requerido, El correo debe ser válido', message: 'uscorreo ausente o inválido' },
      { status: 500, title: 'Imagen de usuario requerida', message: 'usimagen vacía' },
      { status: 500, title: 'Estado de usuario requerido', message: 'usestado vacío' },
      { status: 500, title: 'El usuario no está activo (estado inválido)', message: 'usestado inválido' },
      { status: 500, title: 'Rol requerido, El rol debe ser válido', message: 'usrol ausente o inválido' },
      { status: 500, title: 'El tamaño de la imagen excede el límite permitido, Solo se permiten imágenes PNG y JPG', message: 'Imagen inválida' },
      { status: 500, title: 'El usuario ya existe con ese correo', message: 'Correo duplicado' },
      { status: 500, title: 'Usuario no encontrado', message: 'Usuario objetivo no encontrado' },
      { status: 500, title: 'No se puede actualizar un usuario eliminado', message: 'Usuario objetivo eliminado' },
      { status: 500, title: 'El usuario no es jefe', message: 'Usuario autenticado sin rol jefe al cambiar usrol o usestado' },
      { status: 500, title: 'El rol debe ser jefe o empleado', message: 'Usuario objetivo con rol fuera de jefe o empleado al cambiar usrol o usestado' },
      { status: 500, title: 'La empresa no está activa', message: 'Empresa inactiva' },
      { status: 500, title: 'El usuario no está activo', message: 'Usuario autenticado inactivo' },
    ],
    responseExample: `{
  "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
  "usemid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "usnombre": "Juan Perez",
  "usapodo": "jperez",
  "uscorreo": "juan.perez@empresa.com",
  "usimagen": "https://api.tudominio.com/uploads/usuarios/user.png",
  "usrol": "empleado",
  "usfchregistro": "2026-05-18T18:20:10.000Z",
  "usestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/users/2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "usnombre": "Juan Perez",
    "uscorreo": "juan.perez@empresa.com",
    "usrol": "empleado"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'Si no se envía imagen, usa Content-Type: application/json.',
      'Si se envía imagen, usa Content-Type: multipart/form-data con el archivo en el campo imagen.',
      'No se permite cambiar el apodo (usapodo) mediante este endpoint.',
      'Para cambiar solo el estado, existe el endpoint PATCH /users/:id/status.',
      'Para cambiar solo la contraseña, existe el endpoint PATCH /users/:id/password.',
    ],
  }

  return <UserUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
