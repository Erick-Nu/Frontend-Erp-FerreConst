import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar productos' }

export default function ListarProductsPage() {
  const module = getModule('product')!
  
  const endpoint = {
    slug: 'get-products',
    title: 'Listar productos',
    method: 'GET' as const,
    path: '/products',
    summary: 'Obtiene el listado paginado de productos de la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [
          { name: 'page', type: 'string', required: true, description: 'número de página (entero positivo).' },
          { name: 'pageSize', type: 'number', required: true, description: 'cantidad de registros por página (entero positivo).' }
    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/products \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
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
      "prdtoimagen": "https://api.tudominio.com/uploads/productos/product.png",
      "prdtofchregistro": "2026-05-23T17:29:01.621Z",
      "prdtoestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 5,
  "totalPages": 1
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo retorna productos de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'prdtoimagen en la respuesta se entrega como URL pública del backend.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Page must be a positive integer', message: 'page inválido (no entero positivo)' },
    { status: 500, title: 'Page size must be a positive integer', message: 'pageSize inválido (no entero positivo)' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
