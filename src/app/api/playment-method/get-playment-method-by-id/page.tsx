import { PlaymentMethodByIdReference } from '@/components/docs/PlaymentMethodByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener método de pago' }

export default function ObtenerPlaymentMethodPage() {
  const module = getModule('playment-method')!

  const endpoint = {
    slug: 'get-playment-method-by-id',
    title: 'Obtener método de pago',
    method: 'GET' as const,
    path: '/playment-methods/:id',
    definition: 'Obtiene el detalle de un método de pago por su identificador, dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita cargar los datos completos de un método de pago para una vista de detalle, un formulario de edición o una consulta puntual. Al usarlo, el usuario obtiene los datos del método de pago incluyendo su nombre, estado y fecha de registro.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del método de pago.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede consultar métodos de pago.' },
      { title: 'Solo permite consultar métodos de pago de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La búsqueda se realiza por la combinación de id y la empresa del usuario autenticado.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de método de pago es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de métodos de pago.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar métodos de pago.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Método de pago no encontrado', message: 'No existe un método de pago con el id indicado dentro de la empresa del usuario autenticado.' },
    ],
    responseExample: `{
  "mpid": "2b2f66f5-94ad-49ff-8d43-9d7f56e8c11b",
  "mpemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "mpnombre": "Transferencia bancaria",
  "mpfchregistro": "2026-05-24T03:15:11.245Z",
  "mpestado": "activo"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/playment-methods/2b2f66f5-94ad-49ff-8d43-9d7f56e8c11b" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe query params ni body.',
      'Solo devuelve métodos de pago que pertenecen a la empresa del usuario autenticado.',
    ],
  }

  return <PlaymentMethodByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
