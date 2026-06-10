import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear Proveedor' }

export default function CrearProveedorPage() {
  const module = getModule('proveedor')!
  
  const endpoint = {
    slug: 'register-proveedor',
    title: 'Crear Proveedor',
    method: 'POST' as const,
    path: '/proveedores',
    summary: 'Crea un nuevo proveedor para la empresa indicada en el body.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [
          { name: 'provemid', type: 'string', required: false, description: 'id de la empresa.' },
          { name: 'provnombre', type: 'string', required: false, description: 'nombre del proveedor.' },
          { name: 'provtelefono', type: 'string', required: false, description: 'teléfono del proveedor (formato móvil de 10 dígitos, por ejemplo 0984653471).' },
          { name: 'provctgriaid', type: 'string', required: false, description: 'id de la categoría (opcional, puede ser null).' },
          { name: 'provmrcid', type: 'string', required: false, description: 'id de la marca (opcional, puede ser null).' },
          { name: 'provcorreo', type: 'string', required: false, description: 'correo del proveedor (opcional, puede ser null).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/proveedores \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "provemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "provctgriaid": "85cdca30-3008-466b-b896-52d588cdda10",
  "provmrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
  "provnombre": "DeWalt Centro Historico",
  "provtelefono": "0984653471",
  "provcorreo": null
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
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
  "provnombre": "DeWalt Centro Historico",
  "provtelefono": "0984653471",
  "provcorreo": null,
  "provfchregistro": "2026-05-23T17:29:01.621Z",
  "provestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite crear proveedores en la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.',
    'No permite repetir provnombre dentro de la misma empresa.',
    'Si provctgriaid es enviado, la categoría debe existir en la misma empresa y estar activa.',
    'Si provmrcid es enviado, la marca debe existir en la misma empresa y estar activa.',
    'categoria y marca pueden ser null cuando no se envían relaciones.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'provemid ausente o vacío' },
    { status: 500, title: 'Proveedor name is required', message: 'provnombre ausente o vacío' },
    { status: 500, title: 'Proveedor phone is required', message: 'provtelefono ausente o vacío' },
    { status: 500, title: 'Proveedor phone must be valid', message: 'provtelefono con formato inválido' },
    { status: 500, title: 'Proveedor email must be valid', message: 'provcorreo con formato inválido' },
    { status: 500, title: 'Proveedor category id is required', message: 'provctgriaid vacío' },
    { status: 500, title: 'Proveedor brand id is required', message: 'provmrcid vacío' },
    { status: 500, title: 'User cannot access another company', message: 'Empresa distinta a la del usuario autenticado' },
    { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'Proveedor already exists with that name', message: 'Proveedor duplicado por nombre en la misma empresa' },
    { status: 500, title: 'Proveedor category does not exist', message: 'Categoría inexistente' },
    { status: 500, title: 'Proveedor category is not active', message: 'Categoría inactiva o eliminada' },
    { status: 500, title: 'Proveedor brand does not exist', message: 'Marca inexistente' },
    { status: 500, title: 'Proveedor brand is not active', message: 'Marca inactiva o eliminada' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
