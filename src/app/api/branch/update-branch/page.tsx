import { BranchUpdateReference } from '@/components/docs/BranchUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar sucursal' }

export default function ActualizarBranchPage() {
  const module = getModule('branch')!

  const endpoint = {
    slug: 'update-branch',
    title: 'Actualizar sucursal',
    method: 'PATCH' as const,
    path: '/branches/:id',
    definition: 'Actualiza parcialmente los datos editables de una sucursal de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita modificar el nombre, dirección, correo, identificador o estado de una sucursal existente. Al usarlo, el usuario obtiene la sucursal actualizada con sus datos vigentes.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la sucursal.' },
    ],
    body: [
      { name: 'sunombre', type: 'string', required: false, description: 'Nuevo nombre de la sucursal.' },
      { name: 'sudireccion', type: 'string | null', required: false, description: 'Nueva dirección física de la sucursal; puede enviarse como null.' },
      { name: 'sucorreo', type: 'string | null', required: false, description: 'Nuevo correo electrónico de contacto; puede enviarse como null.' },
      { name: 'suidentificador', type: 'string', required: false, description: 'Nuevo código único de 3 dígitos para identificar la sucursal dentro de la empresa.' },
      { name: 'suestado', type: 'string', required: false, description: 'Nuevo estado de la sucursal; acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe puede actualizar sucursales.' },
      { title: 'Solo permite actualizar sucursales de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La sucursal debe existir dentro de la empresa autenticada.' },
      { title: 'Una sucursal con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envía sunombre, no puede estar vacío.' },
      { title: 'Si se envía sudireccion como texto, no puede estar vacía.' },
      { title: 'Si se envía sucorreo como texto, debe tener formato de correo válido.' },
      { title: 'Si se envía suidentificador, debe tener exactamente 3 dígitos.' },
      { title: 'suidentificador no puede repetirse en otra sucursal de la misma empresa.' },
      { title: 'Si se envía suestado, solo puede ser activo o inactivo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de sucursal es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Sucursal no encontrada', message: 'La actualización no devolvió una sucursal actualizada.' },
      { status: 500, title: 'El nombre de sucursal es requerido', message: 'sunombre fue enviado vacío.' },
      { status: 500, title: 'La dirección de sucursal es requerida', message: 'sudireccion fue enviada como texto vacío.' },
      { status: 500, title: 'El correo de sucursal es requerido', message: 'sucorreo fue enviado como texto vacío.' },
      { status: 500, title: 'El correo de sucursal debe ser válido', message: 'sucorreo fue enviado, pero no tiene formato de correo válido.' },
      { status: 500, title: 'El identificador de sucursal es requerido', message: 'suidentificador fue enviado vacío.' },
      { status: 500, title: 'El identificador de sucursal debe ser exactamente 3 digitos', message: 'suidentificador no cumple el formato de 3 dígitos.' },
      { status: 500, title: 'El estado de sucursal es requerido', message: 'suestado fue enviado vacío.' },
      { status: 500, title: 'El estado de sucursal debe ser activo, inactivo o eliminado', message: 'suestado tiene un valor no permitido.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar la sucursal', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'Sucursal no encontrada', message: 'La sucursal no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'La sucursal eliminada no puede ser actualizada', message: 'La sucursal existe, pero está en estado eliminado.' },
      { status: 500, title: 'Ya existe una sucursal con ese identificador', message: 'Otra sucursal de la misma empresa ya usa el suidentificador enviado.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede crear sucursales para otra empresa', message: 'El usuario autenticado intentó operar sobre una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de sucursales.' },
      { status: 500, title: 'El usuario no es jefe', message: 'El usuario autenticado no tiene el rol requerido para actualizar sucursales.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error updating branch by id', message: 'Ocurrió un error interno al actualizar la sucursal.' },
    ],
    responseExample: `{
  "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "suemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "sunombre": "Sucursal Norte",
  "sudireccion": "Av. Norte 123 y Calle 8",
  "sucorreo": "norte@empresa.com",
  "suidentificador": "002",
  "sufchregistro": "2026-05-19T22:10:00.000Z",
  "suestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/branches/30d3385c-445d-4f2f-97f9-3d3f88c052f1" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sunombre": "Sucursal Norte",
    "sudireccion": "Av. Norte 123 y Calle 8",
    "sucorreo": "norte@empresa.com",
    "suidentificador": "002",
    "suestado": "activo"
}'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'El body debe incluir al menos un campo editable con un valor distinto al actual.',
      'sudireccion y sucorreo pueden enviarse como null para limpiar esos datos.',
      'suidentificador debe enviarse como texto para conservar ceros iniciales, por ejemplo "002".',
      'Aunque el mensaje de validación menciona eliminado, la validación actual solo acepta activo o inactivo para suestado.',
    ],
  }

  return <BranchUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
