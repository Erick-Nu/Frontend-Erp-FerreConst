import { AlertSummaryReference } from '@/components/docs/AlertSummaryReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Resumen de alertas' }

export default function AlertSummaryPage() {
  const module = getModule('alert')

  if (!module) {
    throw new Error('Alert module not found')
  }

  const endpoint = {
    title: 'Resumen de alertas',
    slug: 'get-alert-summary',
    method: 'GET' as const,
    path: '/alerts/summary',
    definition: 'Obtiene un resumen agregado de alertas visibles y no vistas de la empresa del usuario autenticado.',
    whenToUse:
      'Usa este endpoint cuando la aplicación necesita mostrar contadores, indicadores o paneles resumidos de alertas sin cargar el listado completo. Al usarlo, el usuario obtiene totales generales, totales por tipo de alerta y totales por sucursal.',
    authentication: 'Requiere token JWT en el header Authorization: Bearer <token>.',
    businessRules: [
      { title: 'Solo resume alertas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'totalVisible cuenta todas las alertas visibles.' },
      { title: 'totalUnseen cuenta las alertas visibles que aún no han sido vistas.' },
      { title: 'byType agrupa los totales por tipo de alerta.' },
      { title: 'byBranch agrupa los totales por sucursal.' },
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
        message: 'El rol del usuario no tiene permiso para consultar el resumen de alertas.',
      },
      {
        status: 403,
        title: 'El usuario no está activo',
        message: 'El usuario autenticado está inactivo y no puede usar el sistema.',
      },
    ],
    responseExample: `{
  "totalVisible": 4,
  "totalUnseen": 2,
  "byType": [
    {
      "type": "stock_bajo",
      "totalVisible": 4,
      "totalUnseen": 2
    }
  ],
  "byBranch": [
    {
      "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
      "sunombre": "Sucursal Centro",
      "suidentificador": "001",
      "totalVisible": 4,
      "totalUnseen": 2
    }
  ]
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/alerts/summary" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe parámetros de ruta, query params ni body.',
      'Úsalo para contadores, badges y dashboards rápidos.',
      'Este endpoint no reemplaza GET /alerts, porque devuelve solo información agregada.',
      'Los totales se calculan sobre alertas visibles de la empresa autenticada.',
    ],
  }

  return <AlertSummaryReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
