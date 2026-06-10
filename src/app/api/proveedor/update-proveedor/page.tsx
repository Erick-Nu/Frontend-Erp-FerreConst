import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar Proveedor' }

export default function ActualizarProveedorPage() {
  const module = getModule('proveedor')!
  
  const endpoint = {
    slug: 'update-proveedor',
    title: 'Actualizar Proveedor',
    method: 'PATCH' as const,
    path: '/proveedores/:id',
    summary: 'Actualiza un proveedor por su identificador, limitado a la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador del proveedor.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/proveedores/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "provctgriaid": "85cdca30-3008-466b-b896-52d588cdda10",
  "provmrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
  "provnombre": "DeWalt Centro Norte",
  "provtelefono": "0984653471",
  "provcorreo": "contacto@dewalt-centro.com",
  "provestado": "activo"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "provid": "a052ef32-3c4b-41da-871a-dfec99d8afa3",
  "provemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "categoria": {
    "ctgriaid": "85cdca30-3008-466b-b896-52d588cdda10",
    "ctgnombre": "Pintura",
    "ctgriadescripcion": null
  },
  "marca": {
    "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
    "mrcnombre": "Truper"
  },
  "provnombre": "DeWalt Centro Norte",
  "provtelefono": "0984653471",
  "provcorreo": "contacto@dewalt-centro.com",
  "provfchregistro": "2026-05-23T17:29:01.621Z",
  "provestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite actualizar proveedores de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Solo un usuario con rol jefe o empleado puede actualizar un proveedor.',
    'Si el proveedor está en estado eliminado, no se permite actualizar.',
    'Si se envía provnombre, se valida que no exista duplicado dentro de la misma empresa.',
    'Si se envía provctgriaid (no null), se valida que la categoría exista en la misma empresa y esté activa.',
    'Si se envía provmrcid (no null), se valida que la marca exista en la misma empresa y esté activa.',
    'Debe enviarse al menos un campo para actualizar.',
    'provctgriaid, provmrcid, provtelefono y provcorreo pueden enviarse como null.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'Proveedor id is required', message: 'id inválido o ausente' },
    { status: 500, title: 'At least one field is required to update proveedor', message: 'Body vacío o sin cambios aplicables' },
    { status: 500, title: 'Proveedor name is required', message: 'provnombre vacío' },
    { status: 500, title: 'Proveedor phone is required', message: 'provtelefono vacío' },
    { status: 500, title: 'Proveedor phone must be valid', message: 'provtelefono inválido' },
    { status: 500, title: 'Proveedor email must be valid', message: 'provcorreo inválido' },
    { status: 500, title: 'Proveedor category id is required', message: 'provctgriaid vacío' },
    { status: 500, title: 'Proveedor brand id is required', message: 'provmrcid vacío' },
    { status: 500, title: 'Proveedor status must be activo, inactivo or eliminado', message: 'provestado inválido' },
    { status: 500, title: 'Proveedor already exists with that name', message: 'Proveedor duplicado por nombre en la misma empresa' },
    { status: 500, title: 'Proveedor category does not exist', message: 'Categoría inexistente' },
    { status: 500, title: 'Proveedor category is not active', message: 'Categoría inactiva o eliminada' },
    { status: 500, title: 'Proveedor brand does not exist', message: 'Marca inexistente' },
    { status: 500, title: 'Proveedor brand is not active', message: 'Marca inactiva o eliminada' },
    { status: 500, title: 'Deleted proveedor cannot be updated', message: 'Proveedor en estado eliminado' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'Proveedor not found', message: 'Proveedor no encontrado' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
