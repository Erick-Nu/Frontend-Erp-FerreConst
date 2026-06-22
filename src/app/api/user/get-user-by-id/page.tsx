import { UserByIdReference } from '@/components/docs/UserByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener usuario' }

export default function ObtenerUserPage() {
  const module = getModule('user')!

  const endpoint = {
    slug: 'get-user-by-id',
    title: 'Obtener usuario',
    method: 'GET' as const,
    path: '/users/:id',
    definition: 'Obtiene el detalle de un usuario por su identificador, dentro de la empresa del usuario autenticado.',
    whenToUse: 'Se usa cuando la aplicación necesita cargar los datos completos de un usuario para una vista de detalle, un formulario de edición o la administración de personal. Al usarlo, el usuario obtiene los datos del usuario incluyendo su nombre, apodo, correo, rol, estado y la URL pública de su imagen de perfil.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol administrador, jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del usuario.' },
    ],
    businessRules: [
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'Solo permite consultar usuarios de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El campo usimagen se devuelve como URL pública completa.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de usuario es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de usuarios.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Usuario no encontrado', message: 'No existe un usuario con el id indicado dentro de la empresa del usuario autenticado.' },
    ],
    responseExample: `{
  "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
  "usemid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "usnombre": "Juan Perez",
  "usapodo": "jperez",
  "uscorreo": "juan.perez@empresa.com",
  "usimagen": "http://localhost:3000/uploads/usuarios/user.png",
  "usrol": "empleado",
  "usfchregistro": "2026-05-18T18:20:10.000Z",
  "usestado": "activo"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/users/2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe query params ni body.',
      'Solo devuelve usuarios que pertenecen a la empresa del usuario autenticado.',
      'usimagen se devuelve como URL pública completa, lista para usar en etiquetas <img>.',
    ],
  }

  return <UserByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
