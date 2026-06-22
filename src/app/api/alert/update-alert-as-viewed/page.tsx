import { AlertViewedReference } from '@/components/docs/AlertViewedReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Marcar alerta como vista' }

export default function ActualizarAlertAsViewedPage() {
  const module = getModule('alert')!

  const endpoint = {
    slug: 'update-alert-as-viewed',
    title: 'Marcar alerta como vista',
    method: 'PATCH' as const,
    path: '/alerts/:id/visto',
    definition: 'Marca una alerta visible como vista dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando el usuario ya revisó una alerta y la aplicación necesita quitarla del estado pendiente. Al usarlo, el usuario obtiene una confirmación de que la alerta fue marcada como vista.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la alerta.' },
    ],
    businessRules: [
      { title: 'Solo permite marcar alertas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'La alerta debe existir dentro de la empresa autenticada.' },
      { title: 'Solo se pueden marcar como vistas las alertas visibles.' },
      { title: 'Si la alerta ya estaba vista, el endpoint responde correctamente y mantiene la alerta como vista.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de alerta es requerido', message: 'No se envió el parámetro id o se envió vacío.' },
      { status: 404, title: 'Alerta no encontrada', message: 'La alerta no existe, no pertenece a la empresa autenticada o no está visible.' },
      { status: 404, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 404, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 403, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 403, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 403, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a información de una empresa distinta a la suya.' },
      { status: 403, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no tiene permiso para marcar alertas como vistas.' },
      { status: 403, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "message": "Alerta marcada como vista"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/alerts/0f0c77b4-94a8-4b3f-9ee8-4db5f7b2dc43/visto" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'No recibe body ni query params.',
      'Envía el identificador de la alerta en la ruta, reemplazando :id.',
      'La operación actualiza el campo alvisto a true.',
      'Si necesitas consultar alertas no vistas después de marcar una alerta, usa GET /alerts?visto=false.',
      'Si la alerta ya no está visible, el endpoint responde como alerta no encontrada.',
    ]
  }

  return <AlertViewedReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
