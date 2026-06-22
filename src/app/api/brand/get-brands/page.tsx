import { BrandListReference } from '@/components/docs/BrandListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar marcas' }

export default function ListarBrandsPage() {
  const module = getModule('brand')!

  const endpoint = {
    slug: 'get-brands',
    title: 'Listar marcas',
    method: 'GET' as const,
    path: '/brands',
    definition: 'Lista marcas de forma paginada dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita mostrar una tabla de marcas, buscar por nombre o filtrar por estado. Al usarlo, el usuario obtiene una página de marcas y los datos de paginación necesarios para navegar el listado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [],
    queryParams: [
      { name: 'page', type: 'number', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'number', required: true, description: 'Tamaño de página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por nombre de marca.' },
      { name: 'status', type: 'string', required: false, description: 'Estado opcional. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo lista marcas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'page es un query param obligatorio y debe ser un entero positivo.' },
      { title: 'pageSize es un query param obligatorio y debe ser un entero positivo.' },
      { title: 'search es un query param opcional y debe enviarse como texto.' },
      { title: 'search busca coincidencias por mrcnombre.' },
      { title: 'status es un query param opcional y solo acepta activo o inactivo.' },
      { title: 'Si status no se envía, se excluyen las marcas con estado eliminado.' },
      { title: 'Las marcas se ordenan por fecha de registro descendente.' },
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
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de marcas.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar marcas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error finding brands', message: 'Ocurrió un error interno al consultar el listado de marcas.' },
    ],
    responseExample: `{
  "items": [
    {
      "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
      "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
      "mrcnombre": "Truper",
      "mrcfchregistro": "2026-05-21T20:30:00.000Z",
      "mrcestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 1,
  "totalPages": 1
 }`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/brands?page=1&pageSize=20&search=truper&status=activo" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni body.',
      'Los filtros se envían como query params: page, pageSize, search y status.',
      'Envía siempre page y pageSize para evitar errores de validación.',
      'Usa search para buscar por nombre de marca.',
      'Si no envías status, el listado devuelve marcas activas e inactivas, pero no eliminadas.',
      'Si no hay coincidencias, items se devuelve como un arreglo vacío.',
    ]
  }

  return <BrandListReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
