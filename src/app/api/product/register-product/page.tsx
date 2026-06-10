import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear Product' }

export default function CrearProductPage() {
  const module = getModule('product')!
  
  const endpoint = {
    slug: 'register-product',
    title: 'Crear Product',
    method: 'POST' as const,
    path: '/products',
    summary: 'Crea un nuevo producto para la empresa indicada en el body.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json","multipart/form-data"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [
          { name: 'prdtoemid', type: 'string', required: true, description: 'id de la empresa.' },
          { name: 'prdtoctgriaid', type: 'string', required: true, description: 'id de la categoría.' },
          { name: 'prdtomrcid', type: 'string', required: true, description: 'id de la marca.' },
          { name: 'prdtoprovid', type: 'string', required: true, description: 'id del proveedor.' },
          { name: 'prdtomdiaid', type: 'string', required: true, description: 'id de la medida.' },
          { name: 'prdtocodigo', type: 'string', required: true, description: 'código del producto.' },
          { name: 'prdtonombre', type: 'string', required: true, description: 'nombre del producto.' },
          { name: 'prdtopreciocompra', type: 'number', required: true, description: 'precio de compra.' },
          { name: 'prdtoprecioventa', type: 'number', required: true, description: 'precio de venta.' },
          { name: 'prdtostockminimo', type: 'number', required: true, description: 'stock mínimo.' },
          { name: 'prdtostockmaximo', type: 'number', required: true, description: 'stock máximo.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/products \
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
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
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
  "prdtoimagen": "https://api.tudominio.com/uploads/productos/product.png",
  "prdtofchregistro": "2026-05-23T17:29:01.621Z",
  "prdtoestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Campo: imagen',
    'Formatos permitidos: .png, .jpg',
    'Tamaño máximo: 5MB',
    'Si no se envía, se usa imagen por defecto.',
    'Solo permite crear productos en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'prdtoctgriaid, prdtomrcid, prdtoprovid y prdtomdiaid deben existir en la misma empresa.',
    'No permite repetir prdtocodigo dentro de la misma empresa.',
    'No permite repetir prdtonombre dentro de la misma empresa.',
    'Si no se envía imagen, el backend guarda la ruta por defecto /uploads/productos/product.png.',
    'prdtoimagen en la respuesta se entrega como URL pública del backend.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'prdtoemid ausente o vacío' },
    { status: 500, title: 'Product category id is required', message: 'prdtoctgriaid ausente o vacío' },
    { status: 500, title: 'Product brand id is required', message: 'prdtomrcid ausente o vacío' },
    { status: 500, title: 'Product proveedor id is required', message: 'prdtoprovid ausente o vacío' },
    { status: 500, title: 'Product medida id is required', message: 'prdtomdiaid ausente o vacío' },
    { status: 500, title: 'Product code is required', message: 'prdtocodigo ausente o vacío' },
    { status: 500, title: 'Product name is required', message: 'prdtonombre ausente o vacío' },
    { status: 500, title: 'Number is required, Value must be a valid number', message: 'Campos numéricos vacíos o inválidos' },
    { status: 500, title: 'Image size exceeds the allowed limit, Only PNG and JPG images are allowed', message: 'Imagen inválida' },
    { status: 500, title: 'User cannot access another company', message: 'Empresa distinta a la del usuario autenticado' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'Product category does not exist', message: 'Categoría inexistente' },
    { status: 500, title: 'Product brand does not exist', message: 'Marca inexistente' },
    { status: 500, title: 'Product proveedor does not exist', message: 'Proveedor inexistente' },
    { status: 500, title: 'Product medida does not exist', message: 'Medida inexistente' },
    { status: 500, title: 'Product already exists with that code', message: 'Producto duplicado por código' },
    { status: 500, title: 'Product already exists with that name', message: 'Producto duplicado por nombre' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
