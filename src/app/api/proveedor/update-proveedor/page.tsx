import { ProveedorUpdateReference } from '@/components/docs/ProveedorUpdateReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar Proveedor' }

export default function ActualizarProveedorPage() {
  const module = getModule('proveedor')!

  const endpoint = {
    slug: 'update-proveedor',
    title: 'Actualizar Proveedor',
    method: 'PATCH' as const,
    path: '/proveedores/:id',
    definition: 'Actualiza parcialmente los datos editables de un proveedor, dentro de la empresa del usuario autenticado, incluyendo sus relaciones de categoría y marca.',
    whenToUse: 'Se usa cuando la aplicación necesita modificar el nombre, teléfono, correo, categoría, marca o estado de un proveedor existente. Al usarlo, el usuario obtiene los datos completos del proveedor actualizado con las relaciones resueltas.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del proveedor.' },
    ],
    body: [
      { name: 'provctgriaid', type: 'string | null', required: false, description: 'Nuevo identificador de la categoría asociada; puede enviarse como null para desasignarla.' },
      { name: 'provmrcid', type: 'string | null', required: false, description: 'Nuevo identificador de la marca asociada; puede enviarse como null para desasignarla.' },
      { name: 'provnombre', type: 'string', required: false, description: 'Nuevo nombre del proveedor; debe ser único dentro de la empresa.' },
      { name: 'provtelefono', type: 'string | null', required: false, description: 'Nuevo teléfono móvil de 10 dígitos; puede enviarse como null.' },
      { name: 'provcorreo', type: 'string | null', required: false, description: 'Nuevo correo electrónico; puede enviarse como null.' },
      { name: 'provestado', type: 'string', required: false, description: 'Nuevo estado del proveedor; acepta activo, inactivo o eliminado.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede actualizar proveedores.' },
      { title: 'Solo permite actualizar proveedores de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El proveedor debe existir dentro de la empresa autenticada.' },
      { title: 'Un proveedor con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envía provnombre, no puede estar vacío ni repetirse.' },
      { title: 'Si se envía provtelefono como texto, debe ser un número móvil válido de 10 dígitos.' },
      { title: 'Si se envía provcorreo como texto, debe tener formato de correo válido.' },
      { title: 'Si se envía provctgriaid como texto, la categoría debe existir y estar activa.' },
      { title: 'Si se envía provmrcid como texto, la marca debe existir y estar activa.' },
      { title: 'Si se envía provestado, solo puede ser activo, inactivo o eliminado.' },
    ],
    expectedErrors: [
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
      { status: 500, title: 'Proveedor not found', message: 'Proveedor no encontrado' },
      { status: 400, title: 'Invalid request body format', message: 'El cuerpo de la solicitud no es un JSON válido' },
      { status: 400, title: 'No changes detected in the request', message: 'Ningún campo tiene un valor diferente al actual' },
      { status: 500, title: 'Proveedor category does not belong to the company', message: 'La categoría no pertenece a la empresa autenticada' },
      { status: 500, title: 'Proveedor brand does not belong to the company', message: 'La marca no pertenece a la empresa autenticada' },
      { status: 401, title: 'Token expirado', message: 'El token ha expirado, inicie sesión nuevamente' },
      { status: 400, title: 'Invalid UUID format', message: 'El formato del id del proveedor no es válido' },
      { status: 500, title: 'Internal server error', message: 'Error interno del servidor' },
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
  "provnombre": "DeWalt Centro Norte",
  "provtelefono": "0984653471",
  "provcorreo": "contacto@dewalt-centro.com",
  "provfchregistro": "2026-05-23T17:29:01.621Z",
  "provestado": "activo"
}`,
    requestExample: `curl -X PATCH https://api.tudominio.com/proveedores/:id \
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
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'provctgriaid, provmrcid, provtelefono y provcorreo pueden enviarse como null para limpiar sus valores.',
      'provestado permite el valor eliminado para eliminación lógica del proveedor.',
      'Las relaciones categoria y marca pueden devolverse como null en la respuesta.',
    ],
  }

  return <ProveedorUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
