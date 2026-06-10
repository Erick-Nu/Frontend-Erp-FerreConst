import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar Alert As Viewed' }

export default function ActualizarAlertAsViewedPage() {
  const module = getModule('alert')!
  
  const endpoint = {
    slug: 'update-alert-as-viewed',
    title: 'Actualizar Alert As Viewed',
    method: 'PATCH' as const,
    path: '/alerts/:id/visto',
    summary: 'Marca una alerta como vista dentro de la empresa del usuario autenticado.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
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
    curlExample: `curl -X PATCH https://api.tudominio.com/alerts/:id/visto \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "message": "Alert marked as viewed"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "message": "Alert marked as viewed"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo permite marcar alertas de la misma empresa del usuario autenticado.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe, empleado o administrador.',
    'Si la alerta no existe en la empresa autenticada, el servicio responde error.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'Alert id is required', message: 'id ausente o vacío' },
    { status: 500, title: 'Alert not found', message: 'Alerta inexistente en la empresa autenticada' },
    { status: 500, title: 'User is not jefe, empleado or admin', message: 'Usuario sin rol permitido' },
    { status: 500, title: 'User is not active', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
