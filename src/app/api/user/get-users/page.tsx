import { UserListReference } from '@/components/docs/UserListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar usuarios' }

export default function ListarUsersPage() {
  const module = getModule('user')!

  const endpoint = {
    slug: 'get-users',
    title: 'Listar usuarios',
    method: 'GET' as const,
    path: '/users',
    definition: 'Lista usuarios de forma paginada, con búsqueda por nombre, apodo o correo y filtro por estado, dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita mostrar una tabla de usuarios, buscar por nombre, apodo o correo, o filtrar por estado. Al usarlo, el usuario obtiene una página de resultados con el conteo total de usuarios de su empresa.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol administrador, jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por usnombre, usapodo o uscorreo.' },
      { name: 'status', type: 'string', required: false, description: 'Estado del usuario. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'Solo permite listar usuarios de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'page y pageSize son obligatorios y deben ser enteros positivos.' },
      { title: 'Si no se envía status, se excluyen los usuarios con estado eliminado.' },
      { title: 'Si se envía status, solo acepta activo o inactivo.' },
      { title: 'search busca coincidencias parciales en usnombre, usapodo y uscorreo.' },
      { title: 'El campo usimagen se devuelve como URL pública completa.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La búsqueda debe ser un texto', message: 'El query param search fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser un texto', message: 'El query param status fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser activo o inactivo', message: 'El query param status tiene un valor distinto de activo o inactivo.' },
      { status: 500, title: 'La página debe ser un entero positivo', message: 'page no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'El tamaño de página debe ser un entero positivo', message: 'pageSize no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de usuarios.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "items": [
    {
      "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
      "usemid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
      "usnombre": "Juan Perez",
      "usapodo": "jperez",
      "uscorreo": "juan.perez@empresa.com",
      "usimagen": "https://api.tudominio.com/uploads/usuarios/user.png",
      "usrol": "empleado",
      "usfchregistro": "2026-05-18T18:20:10.000Z",
      "usestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 5,
  "totalPages": 1
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/users?page=1&pageSize=20&search=juan&status=activo" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'search y status son query params opcionales.',
      'Si no hay resultados para la página solicitada, items se devuelve como arreglo vacío.',
      'El listado está restringido a la empresa del usuario autenticado.',
      'usimagen se devuelve como URL pública completa, lista para usar en etiquetas <img>.',
    ],
  }

  return <UserListReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
