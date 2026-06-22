import { ProductUpdateReference } from '@/components/docs/ProductUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar producto' }

export default function ActualizarProductPage() {
  const module = getModule('product')!

  const endpoint = {
    slug: 'update-product',
    title: 'Actualizar producto',
    method: 'PATCH' as const,
    path: '/products/:id',
    definition: 'Actualiza parcialmente los datos editables de un producto, incluyendo sus relaciones, precios, inventario, imagen y estado, dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita modificar cualquiera de los datos de un producto existente: cambiar su categoría, marca, proveedor o medida, corregir código o nombre, ajustar precios, modificar niveles de stock, actualizar la imagen o cambiar el estado. Al usarlo, el usuario obtiene los datos completos del producto actualizado con sus relaciones resueltas.',
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del producto.' },
    ],
    body: [
      { name: 'prdtoctgriaid', type: 'string', required: false, description: 'Nuevo identificador de la categoría del producto.' },
      { name: 'prdtomrcid', type: 'string', required: false, description: 'Nuevo identificador de la marca del producto.' },
      { name: 'prdtoprovid', type: 'string', required: false, description: 'Nuevo identificador del proveedor del producto.' },
      { name: 'prdtomdiaid', type: 'string', required: false, description: 'Nuevo identificador de la medida del producto.' },
      { name: 'prdtocodigo', type: 'string', required: false, description: 'Nuevo código del producto; debe ser único dentro de la empresa.' },
      { name: 'prdtonombre', type: 'string', required: false, description: 'Nuevo nombre del producto; debe ser único dentro de la empresa.' },
      { name: 'prdtopreciocompra', type: 'number', required: false, description: 'Nuevo precio de compra del producto.' },
      { name: 'prdtoprecioventa', type: 'number', required: false, description: 'Nuevo precio de venta del producto.' },
      { name: 'prdtostockminimo', type: 'number', required: false, description: 'Nuevo nivel mínimo de stock.' },
      { name: 'prdtostockmaximo', type: 'number', required: false, description: 'Nuevo nivel máximo de stock.' },
      { name: 'prdtoestado', type: 'string', required: false, description: 'Nuevo estado del producto; acepta activo, inactivo o eliminado.' },
      { name: 'imagen', type: 'file', required: false, description: 'Nueva imagen del producto; solo se aceptan .png o .jpg de hasta 5 MB.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede actualizar productos.' },
      { title: 'Solo permite actualizar productos de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El producto debe existir dentro de la empresa autenticada.' },
      { title: 'Un producto con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envían prdtoctgriaid, prdtomrcid, prdtoprovid o prdtomdiaid, deben corresponder a entidades existentes dentro de la misma empresa.' },
      { title: 'Si se envía prdtocodigo, no puede estar vacío ni repetirse.' },
      { title: 'Si se envía prdtonombre, no puede estar vacío ni repetirse.' },
      { title: 'Si se envían campos numéricos, deben ser valores válidos.' },
      { title: 'Si se envía prdtoestado, solo puede ser activo, inactivo o eliminado.' },
      { title: 'Si se envía imagen, solo se aceptan archivos .png y .jpg de hasta 5 MB.' },
      { title: 'La respuesta incluye las relaciones resueltas como objetos anidados.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de producto es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Producto no encontrado', message: 'El producto no existe dentro de la empresa del usuario autenticado o la actualización no devolvió resultados.' },
      { status: 500, title: 'El id de categoría de producto es requerido', message: 'prdtoctgriaid fue enviado vacío.' },
      { status: 500, title: 'El id de marca de producto es requerido', message: 'prdtomrcid fue enviado vacío.' },
      { status: 500, title: 'El id de proveedor de producto es requerido', message: 'prdtoprovid fue enviado vacío.' },
      { status: 500, title: 'El id de medida de producto es requerido', message: 'prdtomdiaid fue enviado vacío.' },
      { status: 500, title: 'El código de producto es requerido', message: 'prdtocodigo fue enviado vacío.' },
      { status: 500, title: 'El nombre de producto es requerido', message: 'prdtonombre fue enviado vacío.' },
      { status: 500, title: 'El estado de producto es requerido', message: 'prdtoestado fue enviado vacío.' },
      { status: 500, title: 'El estado de producto debe ser activo, inactivo o eliminado', message: 'prdtoestado tiene un valor no permitido.' },
      { status: 500, title: 'El número es requerido', message: 'Uno de los campos numéricos fue enviado vacío.' },
      { status: 500, title: 'El valor debe ser un número válido', message: 'Uno de los campos numéricos no es un número válido.' },
      { status: 500, title: 'El tamaño de la imagen excede el límite permitido', message: 'La imagen enviada supera los 5 MB.' },
      { status: 500, title: 'Solo se permiten imágenes PNG y JPG', message: 'La imagen enviada no tiene extensión .png o .jpg.' },
      { status: 500, title: 'Error al guardar la imagen', message: 'Ocurrió un error interno al guardar la imagen en el servidor.' },
      { status: 500, title: 'El producto eliminado no puede ser actualizado', message: 'El producto existe, pero está en estado eliminado.' },
      { status: 500, title: 'La categoría de producto no existe', message: 'El prdtoctgriaid enviado no corresponde a una categoría existente.' },
      { status: 500, title: 'La marca de producto no existe', message: 'El prdtomrcid enviado no corresponde a una marca existente.' },
      { status: 500, title: 'El proveedor de producto no existe', message: 'El prdtoprovid enviado no corresponde a un proveedor existente.' },
      { status: 500, title: 'La medida de producto no existe', message: 'El prdtomdiaid enviado no corresponde a una medida existente.' },
      { status: 500, title: 'Ya existe un producto con ese código', message: 'Otro producto de la misma empresa ya usa el prdtocodigo enviado.' },
      { status: 500, title: 'Ya existe un producto con ese nombre', message: 'Otro producto de la misma empresa ya usa el prdtonombre enviado.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar el producto', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de productos.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para actualizar productos.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "prdtoid": "f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410",
  "prdtoemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "categoria": {
    "ctgriaid": "d9475c59-4fcc-469a-ad8f-3f9f28190058",
    "ctgnombre": "Herramientas Pequeñas",
    "ctgriadescripcion": "Descripcion actualizada"
  },
  "marca": {
    "mrcid": "4ba16156-e626-4fe3-8b5c-0d8ab3f19674",
    "mrcnombre": "Acme Tools"
  },
  "proveedor": {
    "provid": "6d50fa31-54c0-4ea3-a798-19f4801b70de",
    "provnombre": "Proveedor Centro"
  },
  "medida": {
    "mdiaid": "51ed3597-837e-42d1-9bf7-79a30e00f51d",
    "mdianombre": "Unidad",
    "mdiaabreviatura": "UND"
  },
  "prdtocodigo": "012345678901",
  "prdtonombre": "Brocha 1\\\"",
  "prdtopreciocompra": 1.25,
  "prdtoprecioventa": 1.8,
  "prdtostockminimo": 10,
  "prdtostockmaximo": 50,
  "prdtoimagen": "http://localhost:3000/uploads/productos/cemento_test.png",
  "prdtofchregistro": "2026-05-23T23:21:23.477Z",
  "prdtoestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/products/f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "prdtoctgriaid": "d9475c59-4fcc-469a-ad8f-3f9f28190058",
    "prdtomrcid": "4ba16156-e626-4fe3-8b5c-0d8ab3f19674",
    "prdtoprovid": "6d50fa31-54c0-4ea3-a798-19f4801b70de",
    "prdtomdiaid": "51ed3597-837e-42d1-9bf7-79a30e00f51d",
    "prdtocodigo": "012345678901",
    "prdtonombre": "Brocha 1\\\"",
    "prdtopreciocompra": 1.25,
    "prdtoprecioventa": 1.8,
    "prdtostockminimo": 10,
    "prdtostockmaximo": 50,
    "prdtoestado": "activo"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'Si no se envía imagen, usa Content-Type: application/json.',
      'Si se envía imagen, usa Content-Type: multipart/form-data con el archivo en el campo imagen.',
      'prdtoestado permite el valor eliminado para eliminación lógica del producto.',
      'La respuesta ya incluye las relaciones anidadas listas para usar en la interfaz.',
    ],
  }

  return <ProductUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
