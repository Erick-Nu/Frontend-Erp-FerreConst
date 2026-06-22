import { PlaymentMethodCreateReference } from '@/components/docs/PlaymentMethodCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear método de pago' }

export default function CrearPlaymentMethodPage() {
  const module = getModule('playment-method')!

  const endpoint = {
    slug: 'register-playment-method',
    title: 'Crear método de pago',
    method: 'POST' as const,
    path: '/playment-methods',
    definition: 'Registra un nuevo método de pago dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita crear un nuevo método de pago para usarlo en proformas, ventas y otros procesos comerciales. Al usarlo, el usuario obtiene los datos completos del método de pago creado, incluyendo su identificador único y fecha de registro.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    body: [
      { name: 'mpemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá el método de pago; debe coincidir con la empresa del usuario autenticado.' },
      { name: 'mpnombre', type: 'string', required: true, description: 'Nombre del método de pago; debe ser único dentro de la empresa.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede registrar métodos de pago.' },
      { title: 'Solo permite crear métodos de pago en la misma empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Todos los campos del body son obligatorios.' },
      { title: 'mpnombre no puede repetirse dentro de la misma empresa.' },
      { title: 'El método de pago se crea con estado activo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'mpemid fue enviado vacío.' },
      { status: 500, title: 'El nombre de método de pago es requerido', message: 'mpnombre fue enviado vacío.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'mpemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de métodos de pago.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para crear métodos de pago.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Ya existe un método de pago con ese nombre', message: 'Ya hay un método de pago registrado con el mismo mpnombre dentro de la empresa.' },
      { status: 500, title: 'El método de pago no fue creado', message: 'El método de pago fue guardado, pero no pudo consultarse para devolver la respuesta.' },
      { status: 500, title: 'Error saving playment method', message: 'Ocurrió un error interno al guardar el método de pago.' },
    ],
    responseExample: `{
  "mpid": "2b2f66f5-94ad-49ff-8d43-9d7f56e8c11b",
  "mpemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "mpnombre": "Transferencia bancaria",
  "mpfchregistro": "2026-05-24T03:15:11.245Z",
  "mpestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/playment-methods" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "mpemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "mpnombre": "Transferencia bancaria"
  }'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'mpnombre debe ser único dentro de la empresa; puede repetirse entre empresas distintas.',
      'mpemid debe coincidir con la empresa del usuario autenticado; no se permite crear métodos de pago para otras empresas.',
    ],
  }

  return <PlaymentMethodCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
