import { ClientCreateReference } from '@/components/docs/ClientCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear cliente' }

export default function CrearClientPage() {
  const module = getModule('client')!

  const endpoint = {
    slug: 'register-client',
    title: 'Crear cliente',
    method: 'POST' as const,
    path: '/clients',
    definition: 'Crea un nuevo cliente dentro de la empresa indicada.',
    whenToUse:
      'Se usa cuando la aplicación necesita registrar un cliente para ventas, proformas u otros procesos comerciales. Al usarlo, el usuario obtiene el cliente creado con sus datos de identificación, contacto, estado y fecha de registro.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    body: [
      { name: 'clnteemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá el cliente.' },
      { name: 'clntetipoidentificacion', type: 'string', required: true, description: 'Tipo de identificación del cliente; acepta cedula o ruc.' },
      { name: 'clnteidentificacion', type: 'string', required: true, description: 'Número de identificación válido según clntetipoidentificacion.' },
      { name: 'clntenombre', type: 'string', required: true, description: 'Nombre del cliente.' },
      { name: 'clntecorreo', type: 'string', required: true, description: 'Correo electrónico válido del cliente.' },
      { name: 'clntedireccion', type: 'string', required: true, description: 'Dirección del cliente.' },
      { name: 'clntetelefono', type: 'string', required: true, description: 'Teléfono móvil válido de 10 dígitos.' },
    ],
    businessRules: [
      { title: 'Solo permite crear clientes en la misma empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'Todos los campos del body son obligatorios.' },
      { title: 'clntetipoidentificacion solo acepta cedula o ruc.' },
      { title: 'Si clntetipoidentificacion es cedula, clnteidentificacion debe tener 10 dígitos.' },
      { title: 'Si clntetipoidentificacion es ruc, clnteidentificacion debe tener 13 dígitos.' },
      { title: 'clntecorreo debe tener formato de correo válido.' },
      { title: 'clntetelefono debe ser un número móvil válido de 10 dígitos.' },
      { title: 'clnteidentificacion no puede repetirse dentro de la misma empresa.' },
      { title: 'clntecorreo no puede repetirse dentro de la misma empresa.' },
      { title: 'El cliente se crea con estado activo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'No se envió clnteemid o se envió vacío.' },
      { status: 500, title: 'El tipo de identificación de cliente es requerido', message: 'No se envió clntetipoidentificacion o se envió vacío.' },
      { status: 500, title: 'El tipo de identificación debe ser cedula o ruc', message: 'clntetipoidentificacion tiene un valor distinto de cedula o ruc.' },
      { status: 500, title: 'La identificación de cliente es requerida', message: 'No se envió clnteidentificacion o se envió vacío.' },
      { status: 500, title: 'La identificación debe ser válida para el tipo seleccionado', message: 'clnteidentificacion no cumple el formato requerido para cedula o ruc.' },
      { status: 500, title: 'El nombre de cliente es requerido', message: 'No se envió clntenombre o se envió vacío.' },
      { status: 500, title: 'El correo de cliente es requerido', message: 'No se envió clntecorreo o se envió vacío.' },
      { status: 500, title: 'El correo de cliente debe ser válido', message: 'clntecorreo no tiene formato de correo válido.' },
      { status: 500, title: 'La dirección de cliente es requerida', message: 'No se envió clntedireccion o se envió vacía.' },
      { status: 500, title: 'El teléfono de cliente es requerido', message: 'No se envió clntetelefono o se envió vacío.' },
      { status: 500, title: 'El teléfono de cliente debe ser válido', message: 'clntetelefono no cumple el formato de teléfono móvil requerido.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa indicada en clnteemid o la empresa del usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada a la solicitud está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'clnteemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de clientes.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para crear clientes.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Ya existe un cliente con esa identificación', message: 'Ya hay un cliente registrado con la misma clnteidentificacion dentro de la empresa.' },
      { status: 500, title: 'Ya existe un cliente con ese correo', message: 'Ya hay un cliente registrado con el mismo clntecorreo dentro de la empresa.' },
      { status: 500, title: 'Error saving client', message: 'Ocurrió un error interno al guardar el cliente.' },
      { status: 500, title: 'El cliente no fue creado', message: 'El cliente fue guardado, pero no pudo consultarse para devolver la respuesta.' },
    ],
    responseExample: `{
  "clnteid": "9a4d1377-c64c-4fd7-bf7e-f23d2d9fd5f9",
  "clnteemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "clntetipoidentificacion": "cedula",
  "clnteidentificacion": "1712345678",
  "clntenombre": "Juan Pérez",
  "clntecorreo": "juan.perez@email.com",
  "clntedireccion": "Av. Principal y Calle 10",
  "clntetelefono": "0987654321",
  "clntefchregistro": "2026-05-24T03:10:15.000Z",
  "clnteestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/clients" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "clnteemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "clntetipoidentificacion": "cedula",
    "clnteidentificacion": "1712345678",
    "clntenombre": "Juan Pérez",
    "clntecorreo": "juan.perez@email.com",
    "clntedireccion": "Av. Principal y Calle 10",
    "clntetelefono": "0987654321"
  }'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta.',
      'Envía el body en formato JSON con el header Content-Type: application/json.',
      'Envía identificaciones y teléfonos como texto para conservar ceros iniciales.',
      'Todos los campos son obligatorios en la creación.',
      'La validación de clnteidentificacion depende de clntetipoidentificacion.',
      'La respuesta devuelve los datos guardados del cliente creado.',
    ],
  }

  return <ClientCreateReference moduleSlug={module.slug} moduleTitle={module.title} endpoint={endpoint} />
}
