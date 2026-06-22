import { ProductByIdReference } from '@/components/docs/ProductByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener producto' }

export default function ObtenerProductPage() {
  const module = getModule('product')!

  const endpoint = {
    slug: 'get-product-by-id',
    title: 'Obtener producto',
    method: 'GET' as const,
    path: '/products/:id',
    definition: 'Obtiene el detalle completo de un producto por su identificador, dentro de la empresa del usuario autenticado, incluyendo sus relaciones comerciales.',
    whenToUse:
      'Se usa cuando la aplicación necesita cargar la información completa de un producto para una vista de detalle, un formulario de edición o una consulta de inventario. Al usarlo, el usuario obtiene los datos del producto con sus relaciones anidadas de categoría, marca, proveedor y medida, más la URL pública de la imagen.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del producto.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede consultar productos.' },
      { title: 'Solo permite consultar productos de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La respuesta incluye las relaciones resueltas como objetos anidados (categoria, marca, proveedor, medida).' },
      { title: 'El campo prdtoimagen se devuelve como URL pública completa.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de producto es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de productos.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar productos.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Producto no encontrado', message: 'No existe un producto con el id indicado dentro de la empresa del usuario autenticado.' },
    ],
    responseExample: `{
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
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/products/f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe query params ni body.',
      'Solo devuelve productos que pertenecen a la empresa del usuario autenticado.',
      'La respuesta ya incluye las relaciones anidadas listas para usar en la interfaz.',
    ],
  }

  return <ProductByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
