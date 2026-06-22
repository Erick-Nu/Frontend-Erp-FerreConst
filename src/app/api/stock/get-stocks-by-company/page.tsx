import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'
import { StockListCompanyReference } from '@/components/docs/StockListCompanyReference'

export const metadata = { title: 'Listar stock por empresa' }

export default function ListarStocksByCompanyPage() {
  const module = getModule('stock')!

  const endpoint = {
    slug: 'get-stocks-by-company',
    title: 'Listar stock por empresa',
    method: 'GET' as const,
    path: '/stocks/all',
    definition: 'Lista todos los stocks de la empresa del usuario autenticado de forma paginada, sin filtrar por sucursal, con búsqueda por código o nombre de producto y filtro por estado.',
    whenToUse: 'Se usa cuando la aplicación necesita mostrar un inventario consolidado de toda la empresa, buscar productos por código o nombre en todas las sucursales, o filtrar por estado. Al usarlo, el usuario obtiene una página de resultados con el conteo total de stocks de la empresa, incluyendo las relaciones resueltas de sucursal y producto.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por prdtocodigo o prdtonombre del producto.' },
      { name: 'status', type: 'string', required: false, description: 'Estado del stock. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede listar stock.' },
      { title: 'Solo permite listar stock de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'page y pageSize son obligatorios y deben ser enteros positivos.' },
      { title: 'Este endpoint no filtra por sucursal; devuelve registros de todas las sucursales.' },
      { title: 'Si no se envía status, se excluyen los registros con estado eliminado.' },
      { title: 'Si se envía status, solo acepta activo o inactivo.' },
      { title: 'search busca coincidencias en prdtocodigo y prdtonombre del producto asociado.' },
      { title: 'La respuesta incluye las relaciones resueltas de sucursal y producto.' },
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
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de stock.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para listar stock.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "items": [
    {
      "stckid": "d5c2b3dc-1a80-46f6-b7ce-9894ea31fd87",
      "stckemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
      "sucursal": {
        "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
        "sunombre": "Sucursal Centro",
        "suidentificador": "001"
      },
      "producto": {
        "prdtoid": "f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410",
        "prdtocodigo": "PRD-0001",
        "prdtonombre": "Taladro Inalambrico 20V"
      },
      "stckcantidad": 25,
      "stckfchregistro": "2026-05-23T23:21:23.477Z",
      "stckfchactualizacion": "2026-05-23T23:21:23.477Z",
      "stckestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 1,
  "totalPages": 1
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/stocks/all?page=1&pageSize=20&search=taladro&status=activo" \\n  -H "Authorization: Bearer <token>"`,
    notes: [
      'search y status son query params opcionales.',
      'Si no hay resultados para la página solicitada, items se devuelve como arreglo vacío.',
      'Este endpoint no requiere stcksuid ni suidentificador; lista stocks de todas las sucursales.',
      'La respuesta incluye las relaciones anidadas de sucursal y producto.',
    ],
  }

  return (
    <StockListCompanyReference
      moduleTitle={module.title}
      moduleSlug={module.slug}
      endpoint={endpoint}
    />
  )
}
