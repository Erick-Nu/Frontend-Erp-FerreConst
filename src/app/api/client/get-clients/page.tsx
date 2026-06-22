import { ClientListReference } from '@/components/docs/ClientListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar clientes' }

export default function ListarClientsPage() {
  const module = getModule('client')!

  const endpoint = {
    slug: 'get-clients',
    title: 'Listar clientes',
    method: 'GET' as const,
    path: '/clients',
    definition: 'Lista clientes de forma paginada dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita mostrar una tabla de clientes, buscar por nombre o identificación, o filtrar por estado. Al usarlo, el usuario obtiene una página de clientes y los datos de paginación necesarios para navegar el listado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por clntenombre o clnteidentificacion.' },
      { name: 'status', type: 'string', required: false, description: 'Estado del cliente. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo lista clientes de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'page es obligatorio y debe ser un entero positivo.' },
      { title: 'pageSize es obligatorio y debe ser un entero positivo.' },
      { title: 'search es opcional y se usa como texto para buscar por nombre o identificación.' },
      { title: 'status es opcional y solo acepta activo o inactivo.' },
      { title: 'Si no se envía status, se excluyen los clientes con estado eliminado.' },
      { title: 'Los clientes se ordenan por fecha de registro descendente.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La búsqueda debe ser un texto', message: 'El parámetro search se envió más de una vez o con un formato no válido.' },
      { status: 400, title: 'El estado debe ser un texto', message: 'El parámetro status se envió más de una vez o con un formato no válido.' },
      { status: 400, title: 'El estado debe ser activo o inactivo', message: 'El parámetro status tiene un valor distinto de activo o inactivo.' },
      { status: 500, title: 'La página debe ser un entero positivo', message: 'El parámetro page no se envió o no es un número entero mayor o igual a 1.' },
      { status: 500, title: 'El tamaño de página debe ser un entero positivo', message: 'El parámetro pageSize no se envió o no es un número entero mayor o igual a 1.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a información de una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de clientes.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar clientes.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error finding clients', message: 'Ocurrió un error interno al consultar el listado de clientes.' },
    ],
    responseExample: `{
  "items": [
    {
      "clnteid": "9a4d1377-c64c-4fd7-bf7e-f23d2d9fd5f9",
      "clnteemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
      "clntetipoidentificacion": "cedula",
      "clnteidentificacion": "1712345678",
      "clntenombre": "Juan Pérez",
      "clntecorreo": "juan.perez@email.com",
      "clntedireccion": "Av. Principal y Calle 10",
      "clntetelefono": "0987654321",
      "clntefchregistro": "2026-05-24T03:10:15.000Z",
      "clnteestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 1,
  "totalPages": 1
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/clients?page=1&pageSize=20&search=juan&status=activo" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni body.',
      'Los filtros se envían como query params: page, pageSize, search y status.',
      'Envía siempre page y pageSize para evitar errores de validación.',
      'Usa search para buscar por nombre o identificación del cliente.',
      'Si no envías status, el listado devuelve clientes activos e inactivos, pero no eliminados.',
      'Si no hay coincidencias, items se devuelve como un arreglo vacío.',
    ],
  }

  return <ClientListReference moduleSlug={module.slug} moduleTitle={module.title} endpoint={endpoint} />
}
