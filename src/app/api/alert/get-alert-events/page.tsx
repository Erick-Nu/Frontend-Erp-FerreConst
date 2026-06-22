import { AlertEventsReference } from '@/components/docs/AlertEventsReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar eventos de alerta' }

export default function ListarAlertEventsPage() {
  const module = getModule('alert')

  if (!module) {
    throw new Error('Alert module not found')
  }

  const endpoint = {
    title: 'Listar eventos de alerta',
    slug: 'get-alert-events',
    method: 'GET' as const,
    path: '/alerts/events',
    definition: 'Abre una conexión de eventos en tiempo real para recibir cambios de alertas de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita mostrar alertas nuevas, actualizadas o resueltas sin consultar repetidamente el listado de alertas. Al consumirlo, el usuario recibe eventos en tiempo real mientras la conexión permanezca abierta.',
    authentication: 'Requiere token JWT en el header Authorization: Bearer <token>.',
    businessRules: [
      { title: 'Solo se envían alertas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'La conexión se mantiene abierta hasta que el cliente la cierre.' },
      { title: 'El servidor revisa cambios de alertas cada 5 segundos.' },
      { title: 'El servidor envía un evento connected al abrir la conexión.' },
      { title: 'El servidor puede enviar eventos alert-created, alert-updated o alert-resolved.' },
      { title: 'El servidor envía señales de mantenimiento :keepalive para conservar activa la conexión.' },
    ],
    expectedErrors: [
      {
        status: 401,
        title: 'No autorizado',
        message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.',
      },
      {
        status: 404,
        title: 'La empresa no existe',
        message: 'La empresa asociada al usuario autenticado no fue encontrada.',
      },
      {
        status: 404,
        title: 'El usuario no existe',
        message: 'El usuario autenticado no fue encontrado dentro de su empresa.',
      },
      {
        status: 403,
        title: 'La empresa no está activa',
        message: 'La empresa asociada al usuario autenticado está inactiva.',
      },
      {
        status: 403,
        title: 'El usuario no pertenece a la empresa',
        message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.',
      },
      {
        status: 403,
        title: 'El usuario no puede acceder a otra empresa',
        message: 'El usuario autenticado intentó acceder a información de una empresa distinta a la suya.',
      },
      {
        status: 403,
        title: 'El usuario no es jefe, empleado o administrador',
        message: 'El rol del usuario no tiene permiso para escuchar eventos de alertas.',
      },
      {
        status: 403,
        title: 'El usuario no está activo',
        message: 'El usuario autenticado está inactivo y no puede usar el sistema.',
      },
    ],
    responseExample: `event: connected
data: {}

:keepalive

event: alert-created
data: {"alid":"0f0c77b4-94a8-4b3f-9ee8-4db5f7b2dc43","alemid":"4ff4db6b-f18f-4ecd-83b3-b997fa77a01e","branch":{"suid":"30d3385c-445d-4f2f-97f9-3d3f88c052f1","sunombre":"Sucursal Centro","suidentificador":"001"},"product":{"prdtoid":"f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410","prdtocodigo":"PRD-0001","prdtonombre":"Taladro Inalámbrico 20V"},"altipo":"stock_bajo","almensaje":"Stock bajo en Sucursal Centro: Taladro Inalámbrico 20V (PRD-0001)","alcantidadactual":2,"alstockminimo":5,"alstockmaximo":50,"alvisible":true,"alvisto":false,"alfchcreacion":"2026-06-19T14:10:00.000Z","alfchactualizacion":"2026-06-19T14:10:00.000Z","alfchnotificacion":"2026-06-19T14:10:00.000Z"}`,
    requestExample: `curl -N -X GET "${getApiBaseUrl()}/alerts/events" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint usa Server-Sent Events, por lo que la respuesta tiene formato text/event-stream.',
      'Usa una conexión persistente y ciérrala cuando el usuario salga de la pantalla o cierre sesión.',
      'Para pruebas con cURL, usa -N para ver los eventos a medida que llegan.',
      'Si el token expira, abre una nueva conexión después de renovar la sesión.',
      'El evento connected confirma que la suscripción quedó abierta correctamente.',
    ],
  }

  return <AlertEventsReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
