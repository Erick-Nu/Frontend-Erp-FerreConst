import { MedidaListReference } from '@/components/docs/MedidaListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar Medidas' }

export default function ListarMedidasPage() {
  const module = getModule('medida')!

  const endpoint = {
    slug: 'get-medidas',
    title: 'Listar Medidas',
    method: 'GET' as const,
    path: '/medidas',
    definition: 'Lista medidas de forma paginada, con búsqueda por nombre y filtro por estado, dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita mostrar una tabla de medidas, buscar por nombre o filtrar por estado. Al usarlo, el usuario obtiene una página de resultados con el conteo total de medidas de su empresa.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por mdianombre.' },
      { name: 'status', type: 'string', required: false, description: 'Estado de la medida. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede listar medidas.' },
      { title: 'Solo permite listar medidas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'page y pageSize son obligatorios y deben ser enteros positivos.' },
      { title: 'Si no se envía status, se excluyen las medidas con estado eliminado.' },
      { title: 'Si se envía status, solo acepta activo o inactivo.' },
      { title: 'search busca coincidencias parciales en mdianombre.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La búsqueda debe ser un texto', message: 'El query param search fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser un texto', message: 'El query param status fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser activo o inactivo', message: 'El query param status tiene un valor distinto de activo o inactivo.' },
      { status: 500, title: 'La página debe ser un entero positivo', message: 'page no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'El tamaño de página debe ser un entero positivo', message: 'pageSize no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de medidas.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para listar medidas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "items": [
    {
      "mdiaid": "7f4f7a99-f7dc-4b10-9326-9e4ec8300e89",
      "mdiaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
      "mdianombre": "Unidad",
      "mdiaabreviatura": "UND",
      "mdiafchregistro": "2026-05-23T17:29:01.621Z",
      "mdiaestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 5,
  "totalPages": 1
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/medidas?page=1&pageSize=20&search=unidad&status=activo" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'search y status son query params opcionales.',
      'Si no hay resultados para la página solicitada, items se devuelve como arreglo vacío.',
      'El listado está restringido a la empresa del usuario autenticado.',
    ],
  }

  return <MedidaListReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
