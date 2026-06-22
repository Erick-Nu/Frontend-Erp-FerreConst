import { ClientByIdReference } from '@/components/docs/ClientByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener cliente' }

export default function ObtenerClientPage() {
  const module = getModule('client')!

  const endpoint = {
    slug: 'get-client-by-id',
    title: 'Obtener cliente',
    method: 'GET' as const,
    path: '/clients/:id',
    definition: 'Obtiene el detalle de un cliente por su identificador dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita consultar la información completa de un cliente, por ejemplo para mostrar su detalle, usar sus datos comerciales o cargar un formulario de edición. Al usarlo, el usuario obtiene los datos registrados del cliente solicitado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del cliente. Corresponde al campo clnteid.' },
    ],
    businessRules: [
      { title: 'Solo permite consultar clientes de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'El cliente debe existir dentro de la empresa autenticada.' },
      { title: 'El identificador id corresponde al campo clnteid del cliente.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de cliente es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'Cliente no encontrado', message: 'El cliente no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a información de una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de clientes.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar clientes.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
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
    requestExample: `curl -X GET "${getApiBaseUrl()}/clients/9a4d1377-c64c-4fd7-bf7e-f23d2d9fd5f9" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body.',
      'Envía el identificador interno del cliente en la ruta, reemplazando :id.',
      'Usa este endpoint para consultar un solo cliente; para listados paginados usa GET /clients.',
      'La respuesta incluye el estado actual del cliente en clnteestado.',
    ],
  }

  return <ClientByIdReference moduleSlug={module.slug} moduleTitle={module.title} endpoint={endpoint} />
}
