import { ProductListReference } from '@/components/docs/ProductListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar productos' }

export default function ListarProductsPage() {
  const module = getModule('product')!

  const endpoint = {
    slug: 'get-products',
    title: 'Listar productos',
    method: 'GET' as const,
    path: '/products',
    definition: 'Lista productos de forma paginada, con búsqueda por código o nombre y filtro por estado, dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita mostrar una tabla de productos, buscar por código o nombre, o filtrar por estado. Al usarlo, el usuario obtiene una página de resultados con el conteo total de productos de su empresa, incluyendo las relaciones anidadas de categoría, marca, proveedor y medida.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por prdtocodigo o prdtonombre.' },
      { name: 'status', type: 'string', required: false, description: 'Estado del producto. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede listar productos.' },
      { title: 'Solo permite listar productos de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'page y pageSize son obligatorios y deben ser enteros positivos.' },
      { title: 'Si no se envía status, se excluyen los productos con estado eliminado.' },
      { title: 'Si se envía status, solo acepta activo o inactivo.' },
      { title: 'search busca coincidencias parciales en prdtocodigo y prdtonombre.' },
      { title: 'La respuesta incluye las relaciones resueltas como objetos anidados (categoria, marca, proveedor, medida).' },
      { title: 'El campo prdtoimagen se devuelve como URL pública completa.' },
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
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de productos.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para listar productos.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "items": [
    {
      "prdtoid": "f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410",
      "prdtoemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
      "categoria": {
        "ctgriaid": "85cdca30-3008-466b-b896-52d588cdda10",
        "ctgnombre": "Pintura",
        "ctgriadescripcion": null
      },
      "marca": {
        "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
        "mrcnombre": "Truper"
      },
      "proveedor": {
        "provid": "a052ef32-3c4b-41da-871a-dfec99d8afa3",
        "provnombre": "DeWalt Centro Historico"
      },
      "medida": {
        "mdiaid": "7f4f7a99-f7dc-4b10-9326-9e4ec8300e89",
        "mdianombre": "Unidad",
        "mdiaabreviatura": "UND"
      },
      "prdtocodigo": "PRD-0001",
      "prdtonombre": "Taladro Inalambrico 20V",
      "prdtopreciocompra": 120.5,
      "prdtoprecioventa": 165.99,
      "prdtostockminimo": 5,
      "prdtostockmaximo": 50,
      "prdtoimagen": "http://localhost:3000/uploads/productos/product.png",
      "prdtofchregistro": "2026-05-23T17:29:01.621Z",
      "prdtoestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 5,
  "totalPages": 1
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/products?page=1&pageSize=20&search=taladro&status=activo" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'search y status son query params opcionales.',
      'Si no hay resultados para la página solicitada, items se devuelve como arreglo vacío.',
      'El listado está restringido a la empresa del usuario autenticado.',
      'La respuesta ya incluye las relaciones anidadas listas para usar en la interfaz.',
    ],
  }

  return <ProductListReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
