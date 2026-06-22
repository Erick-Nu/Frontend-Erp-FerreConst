import { ClientUpdateReference } from '@/components/docs/ClientUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar cliente' }

export default function ActualizarClientPage() {
  const module = getModule('client')!

  const endpoint = {
    slug: 'update-client',
    title: 'Actualizar cliente',
    method: 'PATCH' as const,
    path: '/clients/:id',
    definition: 'Actualiza parcialmente los datos editables de un cliente de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita modificar el tipo de identificación, nombre, correo, dirección, teléfono o estado de un cliente existente. Al usarlo, el usuario obtiene el cliente actualizado con sus datos vigentes.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del cliente.' },
    ],
    body: [
      { name: 'clntetipoidentificacion', type: 'string', required: false, description: 'Nuevo tipo de identificación; acepta cedula o ruc.' },
      { name: 'clnteidentificacion', type: 'string', required: false, description: 'Nuevo número de identificación válido según clntetipoidentificacion.' },
      { name: 'clntenombre', type: 'string', required: false, description: 'Nuevo nombre del cliente.' },
      { name: 'clntecorreo', type: 'string | null', required: false, description: 'Nuevo correo electrónico; puede enviarse como null para limpiarlo.' },
      { name: 'clntedireccion', type: 'string | null', required: false, description: 'Nueva dirección; puede enviarse como null para limpiarla.' },
      { name: 'clntetelefono', type: 'string | null', required: false, description: 'Nuevo teléfono móvil de 10 dígitos; puede enviarse como null para limpiarlo.' },
      { name: 'clnteestado', type: 'string', required: false, description: 'Nuevo estado del cliente; acepta activo, inactivo o eliminado.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede actualizar clientes.' },
      { title: 'Solo permite actualizar clientes de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El cliente debe existir dentro de la empresa autenticada.' },
      { title: 'Un cliente con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envía clntetipoidentificacion, solo acepta cedula o ruc.' },
      { title: 'Si se envía clnteidentificacion, debe ser válida según clntetipoidentificacion.' },
      { title: 'clnteidentificacion no puede repetirse en otro cliente de la misma empresa.' },
      { title: 'Si se envía clntenombre, no puede estar vacío.' },
      { title: 'Si se envía clntecorreo como texto, debe tener formato de correo válido; puede ser null.' },
      { title: 'clntecorreo no puede repetirse en otro cliente de la misma empresa.' },
      { title: 'Si se envía clntedireccion como texto, no puede estar vacía; puede ser null.' },
      { title: 'Si se envía clntetelefono como texto, debe ser de 10 dígitos; puede ser null.' },
      { title: 'Si se envía clnteestado, solo puede ser activo, inactivo o eliminado.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de cliente es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Cliente no encontrado', message: 'La actualización no devolvió un cliente actualizado.' },
      { status: 500, title: 'El tipo de identificación de cliente es requerido', message: 'clntetipoidentificacion fue enviado vacío.' },
      { status: 500, title: 'El tipo de identificación debe ser cedula o ruc', message: 'clntetipoidentificacion tiene un valor distinto de cedula o ruc.' },
      { status: 500, title: 'La identificación de cliente es requerida', message: 'clnteidentificacion fue enviado vacío.' },
      { status: 500, title: 'La identificación debe ser válida para el tipo seleccionado', message: 'clnteidentificacion no cumple el formato requerido para cedula o ruc.' },
      { status: 500, title: 'El nombre de cliente es requerido', message: 'clntenombre fue enviado vacío.' },
      { status: 500, title: 'El correo de cliente es requerido', message: 'clntecorreo fue enviado como texto vacío.' },
      { status: 500, title: 'El correo de cliente debe ser válido', message: 'clntecorreo fue enviado, pero no tiene formato de correo válido.' },
      { status: 500, title: 'La dirección de cliente es requerida', message: 'clntedireccion fue enviada como texto vacío.' },
      { status: 500, title: 'El teléfono de cliente es requerido', message: 'clntetelefono fue enviado como texto vacío.' },
      { status: 500, title: 'El teléfono de cliente debe ser válido', message: 'clntetelefono no cumple el formato de teléfono móvil requerido.' },
      { status: 500, title: 'El estado de cliente es requerido', message: 'clnteestado fue enviado vacío.' },
      { status: 500, title: 'El estado de cliente debe ser activo, inactivo o eliminado', message: 'clnteestado tiene un valor no permitido.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar el cliente', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'Cliente no encontrado', message: 'El cliente no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'El cliente eliminado no puede ser actualizado', message: 'El cliente existe, pero está en estado eliminado.' },
      { status: 500, title: 'Ya existe un cliente con esa identificación', message: 'Otro cliente de la misma empresa ya usa la clnteidentificacion enviada.' },
      { status: 500, title: 'Ya existe un cliente con ese correo', message: 'Otro cliente de la misma empresa ya usa el clntecorreo enviado.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó operar sobre una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de clientes.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para actualizar clientes.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error updating client', message: 'Ocurrió un error interno al actualizar el cliente.' },
    ],
    responseExample: `{
  "clnteid": "9a4d1377-c64c-4fd7-bf7e-f23d2d9fd5f9",
  "clnteemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "clntetipoidentificacion": "cedula",
  "clnteidentificacion": "1712345678",
  "clntenombre": "Juan Carlos Pérez",
  "clntecorreo": "juan.perez@email.com",
  "clntedireccion": "Av. Principal y Calle 10",
  "clntetelefono": "0991234567",
  "clntefchregistro": "2026-05-24T03:10:15.000Z",
  "clnteestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/clients/9a4d1377-c64c-4fd7-bf7e-f23d2d9fd5f9" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "clntenombre": "Juan Carlos Pérez",
    "clntetelefono": "0991234567",
    "clnteestado": "activo"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'El body debe incluir al menos un campo editable con un valor distinto al actual.',
      'clntecorreo, clntedireccion y clntetelefono pueden enviarse como null para limpiar esos datos.',
      'clnteidentificacion y clntetelefono deben enviarse como texto para conservar ceros iniciales.',
    ],
  }

  return <ClientUpdateReference moduleSlug={module.slug} moduleTitle={module.title} endpoint={endpoint} />
}
