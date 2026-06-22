import { CheckoutListReference } from '@/components/docs/CheckoutListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar cajas' }

export default function ListarCheckoutsPage() {
  const module = getModule('checkout')!

  const endpoint = {
    slug: 'get-checkouts',
    title: 'Listar cajas',
    method: 'GET' as const,
    path: '/checkouts',
    definition: 'Lista cajas de forma paginada dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita mostrar una tabla de cajas, buscar por identificador o nombre de sucursal, o filtrar por estado. Al usarlo, el usuario obtiene una página de cajas con datos de paginación y un resumen de la sucursal asociada a cada caja.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por cjidentificador o sunombre.' },
      { name: 'status', type: 'string', required: false, description: 'Estado de la caja. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo lista cajas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'page es obligatorio y debe ser un entero positivo.' },
      { title: 'pageSize es obligatorio y debe ser un entero positivo.' },
      { title: 'search es opcional y se usa como texto para buscar por cjidentificador o sunombre.' },
      { title: 'status es opcional y solo acepta activo o inactivo.' },
      { title: 'Si no se envía status, se excluyen las cajas con estado eliminado.' },
      { title: 'Las cajas se ordenan por fecha de registro descendente.' },
      { title: 'Cada caja incluye un resumen de sucursal en la propiedad sucursal.' },
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
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no tiene permiso para consultar cajas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error finding checkouts', message: 'Ocurrió un error interno al consultar el listado de cajas.' },
    ],
    responseExample: `{
  "items": [
    {
      "cjid": "e1b3da39-d5d5-47d6-a351-0e61e586f732",
      "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
      "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
      "cjidentificador": "001",
      "cjfchregistro": "2026-05-19T22:10:00.000Z",
      "cjestado": "activo",
      "sucursal": {
        "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
        "sunombre": "Sucursal Centro",
        "suidentificador": "001",
        "suestado": "activo"
      }
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 1,
  "totalPages": 1
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/checkouts?page=1&pageSize=20&search=centro&status=activo" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni body.',
      'Los filtros se envían como query params: page, pageSize, search y status.',
      'Envía siempre page y pageSize para evitar errores de validación.',
      'Usa search para buscar por identificador de caja o nombre de sucursal.',
      'Si no envías status, el listado devuelve cajas activas e inactivas, pero no eliminadas.',
      'Si no hay coincidencias, items se devuelve como un arreglo vacío.',
    ],
  }

  return <CheckoutListReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
