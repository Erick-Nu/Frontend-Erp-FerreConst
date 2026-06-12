import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar producto' }

export default function ActualizarProductPage() {
  const module = getModule('product')!
  
  const endpoint = {
    slug: 'update-product',
    title: 'Actualizar Product',
    method: 'PATCH' as const,
    path: '/products/:id',
    summary: 'Actualiza un producto por su identificador, limitado a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json","multipart/form-data"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador del producto.' }
    ],
    queryParams: [

    ],
    body: [
          { name: 'prdtoctgriaid', type: 'string', required: false, description: 'id de la categoría.' },
          { name: 'prdtomrcid', type: 'string', required: false, description: 'id de la marca.' },
          { name: 'prdtoprovid', type: 'string', required: false, description: 'id del proveedor.' },
          { name: 'prdtomdiaid', type: 'string', required: false, description: 'id de la medida.' },
          { name: 'prdtocodigo', type: 'string', required: false, description: 'código del producto.' },
          { name: 'prdtonombre', type: 'string', required: false, description: 'nombre del producto.' },
          { name: 'prdtopreciocompra', type: 'number', required: false, description: 'precio de compra.' },
          { name: 'prdtoprecioventa', type: 'number', required: false, description: 'precio de venta.' },
          { name: 'prdtostockminimo', type: 'number', required: false, description: 'stock mínimo.' },
          { name: 'prdtostockmaximo', type: 'number', required: false, description: 'stock máximo.' },
          { name: 'prdtoestado', type: 'string', required: false, description: 'estado del producto (activo, inactivo, eliminado).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/products/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "prdtoctgriaid": "d9475c59-4fcc-469a-ad8f-3f9f28190058",
  "prdtomrcid": "4ba16156-e626-4fe3-8b5c-0d8ab3f19674",
  "prdtoprovid": "6d50fa31-54c0-4ea3-a798-19f4801b70de",
  "prdtomdiaid": "51ed3597-837e-42d1-9bf7-79a30e00f51d",
  "prdtocodigo": "012345678901",
  "prdtonombre": "Brocha 1\"",
  "prdtopreciocompra": 1.25,
  "prdtoprecioventa": 1.8,
  "prdtostockminimo": 10,
  "prdtostockmaximo": 50,
  "prdtoestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "prdtoid": "46ab42f3-60fc-42af-8d52-ff769ea40c78",
  "prdtoemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "categoria": {
    "ctgriaid": "d9475c59-4fcc-469a-ad8f-3f9f28190058",
    "ctgnombre": "Herramientas Pequeñas",
    "ctgriadescripcion": "Descripción actualizada"
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
  "prdtonombre": "Brocha 1\"",
  "prdtopreciocompra": 1.25,
  "prdtoprecioventa": 1.8,
  "prdtostockminimo": 10,
  "prdtostockmaximo": 50,
  "prdtoimagen": "https://api.tudominio.com/uploads/productos/cemento_test.png",
  "prdtofchregistro": "2026-05-23T23:21:23.477Z",
  "prdtoestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Campo: imagen',
    'Formatos permitidos: .png, .jpg',
    'Tamaño máximo: 5MB',
    'Solo permite actualizar productos de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'Si el producto está en estado eliminado, no se permite actualizar.',
    'Si se envía prdtoctgriaid, prdtomrcid, prdtoprovid o prdtomdiaid, se valida que existan en la misma empresa.',
    'Si se envía prdtocodigo, se valida que no exista duplicado dentro de la misma empresa.',
    'Si se envía prdtonombre, se valida que no exista duplicado dentro de la misma empresa.',
    'Debe enviarse al menos un campo para actualizar.',
    'prdtoimagen en la respuesta se entrega como URL pública del backend.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'Product id is required', message: 'id inválido o ausente' },
    { status: 500, title: 'At least one field is required to update product', message: 'Body vacío o sin cambios aplicables' },
    { status: 500, title: 'Product category id is required', message: 'prdtoctgriaid vacío' },
    { status: 500, title: 'Product brand id is required', message: 'prdtomrcid vacío' },
    { status: 500, title: 'Product proveedor id is required', message: 'prdtoprovid vacío' },
    { status: 500, title: 'Product medida id is required', message: 'prdtomdiaid vacío' },
    { status: 500, title: 'Product code is required', message: 'prdtocodigo vacío' },
    { status: 500, title: 'Product name is required', message: 'prdtonombre vacío' },
    { status: 500, title: 'Product status must be activo, inactivo or eliminado', message: 'prdtoestado inválido' },
    { status: 500, title: 'Number is required, Value must be a valid number', message: 'Campos numéricos vacíos o inválidos' },
    { status: 500, title: 'Image size exceeds the allowed limit, Only PNG and JPG images are allowed', message: 'Imagen inválida' },
    { status: 500, title: 'Product category does not exist', message: 'Categoría inexistente' },
    { status: 500, title: 'Product brand does not exist', message: 'Marca inexistente' },
    { status: 500, title: 'Product proveedor does not exist', message: 'Proveedor inexistente' },
    { status: 500, title: 'Product medida does not exist', message: 'Medida inexistente' },
    { status: 500, title: 'Product already exists with that code', message: 'Producto duplicado por código' },
    { status: 500, title: 'Product already exists with that name', message: 'Producto duplicado por nombre' },
    { status: 500, title: 'Deleted product cannot be updated', message: 'Producto en estado eliminado' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 404, title: 'Product not found', message: 'Producto no encontrado' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
