import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar eventos de alerta' }

export default function ListarAlertEventsPage() {
  const module = getModule('alert')!
  
  const endpoint = {
    slug: 'get-alert-events',
    title: 'Listar eventos de alerta',
    method: 'GET' as const,
    path: '/alerts/events',
    summary: 'Abre una conexión SSE (Server-Sent Events) para recibir alertas nuevas de la empresa del usuario autenticado en tiempo real.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/alerts/events \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `event: connected
data: {}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo emite alertas de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe, empleado o administrador.',
    'La conexión queda abierta hasta que el cliente la cierre.',
    'El servidor hace polling interno de alertas recientes cada 5 segundos.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'User is not jefe, empleado or admin', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
