import { ProveedorCreateReference } from '@/components/docs/ProveedorCreateReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear Proveedor' }

export default function CrearProveedorPage() {
  const module = getModule('proveedor')!

  const endpoint = {
    slug: 'register-proveedor',
    title: 'Crear Proveedor',
    method: 'POST' as const,
    path: '/proveedores',
    definition: 'Registra un nuevo proveedor dentro de la empresa del usuario autenticado, con sus datos de contacto y relaciones opcionales de categoría y marca.',
    whenToUse: 'Se usa cuando la aplicación necesita crear un nuevo proveedor para compras, abastecimiento o gestión de inventario, opcionalmente asociándolo a una categoría o marca. Al usarlo, el usuario obtiene los datos completos del proveedor creado, con las relaciones resueltas.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    body: [
      { name: 'provemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá el proveedor; debe coincidir con la empresa del usuario autenticado.' },
      { name: 'provnombre', type: 'string', required: true, description: 'Nombre del proveedor; debe ser único dentro de la empresa.' },
      { name: 'provtelefono', type: 'string', required: true, description: 'Teléfono móvil del proveedor; debe ser un número válido de 10 dígitos (ej. 0984653471).' },
      { name: 'provctgriaid', type: 'string | null', required: false, description: 'Identificador de la categoría asociada; puede enviarse como null. Si se envía un valor, la categoría debe existir y estar activa.' },
      { name: 'provmrcid', type: 'string | null', required: false, description: 'Identificador de la marca asociada; puede enviarse como null. Si se envía un valor, la marca debe existir y estar activa.' },
      { name: 'provcorreo', type: 'string | null', required: false, description: 'Correo electrónico del proveedor; puede enviarse como null. Si se envía un valor, debe tener formato de correo válido.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede registrar proveedores.' },
      { title: 'Solo permite crear proveedores en la misma empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'provemid, provnombre y provtelefono son obligatorios.' },
      { title: 'provnombre no puede repetirse dentro de la misma empresa.' },
      { title: 'provtelefono debe ser un número móvil válido de 10 dígitos que inicie con 09.' },
      { title: 'provctgriaid, provmrcid y provcorreo son opcionales y pueden enviarse como null.' },
      { title: 'Si se envía provctgriaid, la categoría debe existir y estar activa.' },
      { title: 'Si se envía provmrcid, la marca debe existir y estar activa.' },
      { title: 'Si se envía provcorreo, debe tener formato de correo válido.' },
      { title: 'El proveedor se crea con estado activo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'Token inválido o ausente', message: 'No se proporcionó un token JWT o el token es inválido o ha expirado.' },
      { status: 403, title: 'Usuario sin permisos', message: 'El usuario no tiene el rol requerido (jefe o empleado) para realizar esta acción.' },
      { status: 400, title: 'Cuerpo de solicitud inválido', message: 'El cuerpo de la solicitud no es un JSON válido o está malformado.' },
      { status: 500, title: 'Company id is required', message: 'provemid ausente o vacío.' },
      { status: 400, title: 'provemid inválido', message: 'El formato de provemid no es un UUID válido.' },
      { status: 500, title: 'Proveedor name is required', message: 'provnombre ausente o vacío.' },
      { status: 400, title: 'provnombre inválido', message: 'provnombre excede la longitud máxima permitida.' },
      { status: 500, title: 'Proveedor phone is required', message: 'provtelefono ausente o vacío.' },
      { status: 500, title: 'Proveedor phone must be valid', message: 'provtelefono con formato inválido.' },
      { status: 400, title: 'provtelefono inválido', message: 'El formato de provtelefono no corresponde a un número móvil ecuatoriano.' },
      { status: 500, title: 'Proveedor email must be valid', message: 'provcorreo con formato inválido.' },
      { status: 400, title: 'provcorreo inválido', message: 'El formato de provcorreo no es una dirección de correo válida.' },
      { status: 500, title: 'Proveedor category id is required', message: 'provctgriaid enviado como string vacío en lugar de null.' },
      { status: 500, title: 'Proveedor brand id is required', message: 'provmrcid enviado como string vacío en lugar de null.' },
      { status: 500, title: 'User cannot access another company', message: 'Empresa distinta a la del usuario autenticado.' },
      { status: 400, title: 'Empresa no coincide', message: 'El usuario autenticado no pertenece a la empresa especificada en provemid.' },
      { status: 500, title: 'User is not jefe or empleado', message: 'Usuario sin rol permitido.' },
      { status: 500, title: 'User is not active', message: 'Usuario inactivo.' },
      { status: 500, title: 'Company is not active', message: 'Empresa inactiva.' },
      { status: 500, title: 'Proveedor already exists with that name', message: 'Proveedor duplicado por nombre en la misma empresa.' },
      { status: 400, title: 'provnombre duplicado', message: 'Ya existe un proveedor con el mismo nombre en la empresa.' },
      { status: 500, title: 'Proveedor category does not exist', message: 'Categoría inexistente.' },
      { status: 500, title: 'Proveedor category is not active', message: 'Categoría inactiva o eliminada.' },
      { status: 500, title: 'Proveedor brand does not exist', message: 'Marca inexistente.' },
      { status: 500, title: 'Proveedor brand is not active', message: 'Marca inactiva o eliminada.' },
      { status: 500, title: 'Database error', message: 'Error interno de base de datos al crear el proveedor.' },
      { status: 500, title: 'Internal server error', message: 'Error inesperado del servidor.' },
      { status: 400, title: 'provctgriaid inválido', message: 'El formato de provctgriaid no es un UUID válido.' },
    ],
    responseExample: `{
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
}`,
    requestExample: `curl -X POST https://api.tudominio.com/proveedores \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
  "provemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "provctgriaid": "85cdca30-3008-466b-b896-52d588cdda10",
  "provmrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
  "provnombre": "DeWalt Centro Historico",
  "provtelefono": "0984653471",
  "provcorreo": null
}'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'provctgriaid, provmrcid y provcorreo pueden enviarse como null o simplemente omitirse del body.',
      'provtelefono debe ser un número móvil ecuatoriano válido (10 dígitos, iniciando con 09).',
      'Las relaciones categoria y marca pueden devolverse como null en la respuesta si no fueron enviadas.',
    ],
  }

  return <ProveedorCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
