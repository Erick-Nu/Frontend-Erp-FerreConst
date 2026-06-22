import { ProductCreateReference } from '@/components/docs/ProductCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear producto' }

export default function CrearProductPage() {
  const module = getModule('product')!

  const endpoint = {
    slug: 'register-product',
    title: 'Crear producto',
    method: 'POST' as const,
    path: '/products',
    definition: 'Registra un nuevo producto dentro de la empresa del usuario autenticado, incluyendo sus relaciones comerciales y datos de inventario.',
    whenToUse:
      'Se usa cuando la aplicación necesita crear un nuevo producto con su categoría, marca, proveedor y medida asociados, además de sus precios y niveles de stock. Al usarlo, el usuario obtiene los datos completos del producto creado, con las relaciones resueltas y la URL pública de la imagen.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    body: [
      { name: 'prdtoemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá el producto; debe coincidir con la empresa del usuario autenticado.' },
      { name: 'prdtoctgriaid', type: 'string', required: true, description: 'Identificador de la categoría del producto.' },
      { name: 'prdtomrcid', type: 'string', required: true, description: 'Identificador de la marca del producto.' },
      { name: 'prdtoprovid', type: 'string', required: true, description: 'Identificador del proveedor del producto.' },
      { name: 'prdtomdiaid', type: 'string', required: true, description: 'Identificador de la medida del producto.' },
      { name: 'prdtocodigo', type: 'string', required: true, description: 'Código del producto; debe ser único dentro de la empresa.' },
      { name: 'prdtonombre', type: 'string', required: true, description: 'Nombre del producto; debe ser único dentro de la empresa.' },
      { name: 'prdtopreciocompra', type: 'number', required: true, description: 'Precio de compra del producto.' },
      { name: 'prdtoprecioventa', type: 'number', required: true, description: 'Precio de venta del producto.' },
      { name: 'prdtostockminimo', type: 'number', required: true, description: 'Nivel mínimo de stock.' },
      { name: 'prdtostockmaximo', type: 'number', required: true, description: 'Nivel máximo de stock.' },
      { name: 'imagen', type: 'file', required: false, description: 'Imagen del producto; solo se aceptan .png o .jpg de hasta 5 MB. Si no se envía, se asigna una imagen por defecto.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede registrar productos.' },
      { title: 'Solo permite crear productos en la misma empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Todos los campos del body, excepto imagen, son obligatorios.' },
      { title: 'prdtoctgriaid, prdtomrcid, prdtoprovid y prdtomdiaid deben corresponder a entidades existentes dentro de la misma empresa.' },
      { title: 'prdtocodigo no puede repetirse dentro de la misma empresa.' },
      { title: 'prdtonombre no puede repetirse dentro de la misma empresa.' },
      { title: 'prdtopreciocompra, prdtoprecioventa, prdtostockminimo y prdtostockmaximo deben ser valores numéricos válidos.' },
      { title: 'Si se envía imagen, solo se aceptan archivos .png y .jpg de hasta 5 MB.' },
      { title: 'Si no se envía imagen, se asigna una imagen por defecto.' },
      { title: 'El producto se crea con estado activo.' },
      { title: 'Cuando se envía imagen, el Content-Type debe ser multipart/form-data. Si no, puede usarse application/json.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'prdtoemid fue enviado vacío.' },
      { status: 500, title: 'El id de categoría de producto es requerido', message: 'prdtoctgriaid fue enviado vacío.' },
      { status: 500, title: 'El id de marca de producto es requerido', message: 'prdtomrcid fue enviado vacío.' },
      { status: 500, title: 'El id de proveedor de producto es requerido', message: 'prdtoprovid fue enviado vacío.' },
      { status: 500, title: 'El id de medida de producto es requerido', message: 'prdtomdiaid fue enviado vacío.' },
      { status: 500, title: 'El código de producto es requerido', message: 'prdtocodigo fue enviado vacío.' },
      { status: 500, title: 'El nombre de producto es requerido', message: 'prdtonombre fue enviado vacío.' },
      { status: 500, title: 'El número es requerido', message: 'Uno de los campos numéricos fue enviado vacío.' },
      { status: 500, title: 'El valor debe ser un número válido', message: 'Uno de los campos numéricos no es un número válido.' },
      { status: 500, title: 'El tamaño de la imagen excede el límite permitido', message: 'La imagen enviada supera los 5 MB.' },
      { status: 500, title: 'Solo se permiten imágenes PNG y JPG', message: 'La imagen enviada no tiene extensión .png o .jpg.' },
      { status: 500, title: 'Error al guardar la imagen', message: 'Ocurrió un error interno al guardar la imagen en el servidor.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'prdtoemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de productos.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para crear productos.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La categoría de producto no existe', message: 'prdtoctgriaid no corresponde a una categoría existente en la empresa.' },
      { status: 500, title: 'La marca de producto no existe', message: 'prdtomrcid no corresponde a una marca existente en la empresa.' },
      { status: 500, title: 'El proveedor de producto no existe', message: 'prdtoprovid no corresponde a un proveedor existente en la empresa.' },
      { status: 500, title: 'La medida de producto no existe', message: 'prdtomdiaid no corresponde a una medida existente en la empresa.' },
      { status: 500, title: 'Ya existe un producto con ese código', message: 'Ya hay un producto registrado con el mismo prdtocodigo dentro de la empresa.' },
      { status: 500, title: 'Ya existe un producto con ese nombre', message: 'Ya hay un producto registrado con el mismo prdtonombre dentro de la empresa.' },
      { status: 500, title: 'El producto no fue creado', message: 'El producto fue guardado, pero no pudo consultarse para devolver la respuesta.' },
      { status: 500, title: 'Error saving product', message: 'Ocurrió un error interno al guardar el producto.' },
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
    requestExample: `curl -X POST "${getApiBaseUrl()}/products" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "prdtoemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "prdtoctgriaid": "85cdca30-3008-466b-b896-52d588cdda10",
    "prdtomrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
    "prdtoprovid": "a052ef32-3c4b-41da-871a-dfec99d8afa3",
    "prdtomdiaid": "7f4f7a99-f7dc-4b10-9326-9e4ec8300e89",
    "prdtocodigo": "PRD-0001",
    "prdtonombre": "Taladro Inalambrico 20V",
    "prdtopreciocompra": 120.5,
    "prdtoprecioventa": 165.99,
    "prdtostockminimo": 5,
    "prdtostockmaximo": 50
  }'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'Si no se envía imagen, usa Content-Type: application/json.',
      'Si se envía imagen, usa Content-Type: multipart/form-data con el archivo en el campo imagen.',
      'Los campos prdtocodigo y prdtonombre deben ser únicos dentro de la empresa.',
      'La respuesta incluye las relaciones resueltas como objetos anidados (categoria, marca, proveedor, medida).',
      'El campo prdtoimagen se devuelve como URL pública completa.',
    ],
  }

  return <ProductCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
