import { AlertListReference } from '@/components/docs/AlertListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar alertas' }

export default function ListarAlertsPage() {
  const module = getModule('alert')

  if (!module) {
    throw new Error('Alert module not found')
  }

  const endpoint = {
    title: 'Listar alertas',
    slug: 'get-alerts',
    method: 'GET' as const,
    path: '/alerts',
    definition: 'Lista alertas de forma paginada dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita mostrar una bandeja o tabla de alertas, con opción de filtrar por sucursal, tipo, visibilidad o estado de visto. Al usarlo, el usuario obtiene una página de alertas y los datos de paginación necesarios para navegar el listado.',
    authentication: 'Requiere token JWT en el header Authorization: Bearer <token>.',
    queryParams: [
      { name: 'page', type: 'number', required: false, description: 'Número de página. Si no se envía, se usa 1.' },
      { name: 'pageSize', type: 'number', required: false, description: 'Tamaño de página. Si no se envía, se usa 20.' },
      { name: 'suid', type: 'string', required: false, description: 'Identificador de sucursal para filtrar alertas.' },
      { name: 'tipo', type: 'string', required: false, description: 'Tipo de alerta a filtrar por coincidencia exacta.' },
      { name: 'visible', type: 'boolean', required: false, description: 'Filtra alertas visibles. Si no se envía, solo se devuelven alertas visibles.' },
      { name: 'visto', type: 'boolean', required: false, description: 'Filtra alertas vistas o no vistas.' },
    ],
    businessRules: [
      { title: 'Solo lista alertas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'Si page no se envía, se usa 1.' },
      { title: 'Si pageSize no se envía, se usa 20.' },
      { title: 'page debe ser un entero positivo.' },
      { title: 'pageSize debe ser un entero positivo.' },
      { title: 'Si visible no se envía, solo se devuelven alertas visibles.' },
      { title: 'visible solo acepta true o false.' },
      { title: 'visto solo acepta true o false.' },
      { title: 'Si se envía suid, la sucursal debe pertenecer a la empresa autenticada.' },
      { title: 'Si se envía tipo, se filtra por coincidencia exacta del tipo de alerta.' },
      { title: 'Las alertas se ordenan por fecha de actualización descendente y luego por fecha de creación descendente.' },
    ],
    expectedErrors: [
      {
        status: 401,
        title: 'No autorizado',
        message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.',
      },
      {
        status: 400,
        title: 'Visible debe ser verdadero o falso',
        message: 'El parámetro visible tiene un valor distinto de true o false.',
      },
      {
        status: 400,
        title: 'Visto debe ser verdadero o falso',
        message: 'El parámetro visto tiene un valor distinto de true o false.',
      },
      {
        status: 400,
        title: 'La página debe ser un entero positivo',
        message: 'El parámetro page no es un número entero mayor o igual a 1.',
      },
      {
        status: 400,
        title: 'El tamaño de página debe ser un entero positivo',
        message: 'El parámetro pageSize no es un número entero mayor o igual a 1.',
      },
      {
        status: 404,
        title: 'La sucursal no existe',
        message: 'La sucursal indicada en suid no existe o no pertenece a la empresa autenticada.',
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
        message: 'El rol del usuario no tiene permiso para consultar alertas.',
      },
      {
        status: 403,
        title: 'El usuario no está activo',
        message: 'El usuario autenticado está inactivo y no puede usar el sistema.',
      },
    ],
    responseExample: `{
  "items": [
    {
      "alid": "8b6e1f4a-4ad8-4d9e-9a0f-8e58b0df1111",
      "alemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
      "branch": {
        "suid": "9a9fbc8e-1ed5-45a5-8e4d-7e5c31790001",
        "sunombre": "Sucursal Norte",
        "suidentificador": "NORTE-01"
      },
      "product": {
        "prdtoid": "0b8f4ef4-cd8c-4ebf-a385-16ef7f380001",
        "prdtocodigo": "MART-001",
        "prdtonombre": "Martillo 16oz"
      },
      "altipo": "stock_bajo",
      "almensaje": "Stock bajo en Sucursal Norte: Martillo 16oz (MART-001) - Actual: 2, Mínimo: 5",
      "alcantidadactual": 2,
      "alstockminimo": 5,
      "alstockmaximo": 20,
      "alvisible": true,
      "alvisto": false,
      "alfchcreacion": "2026-06-06T22:55:11.000Z"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 1,
  "totalPages": 1
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/alerts?page=1&pageSize=20&suid=30d3385c-445d-4f2f-97f9-3d3f88c052f1&tipo=stock_bajo&visible=true&visto=false" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body.',
      'Los filtros se envían como query params opcionales: page, pageSize, suid, tipo, visible y visto.',
      'Usa visible=true para consultar alertas visibles y visible=false para consultar alertas ocultas o resueltas.',
      'Usa visto=false para consultar alertas pendientes de revisión.',
      'La respuesta incluye items, page, pageSize, totalItems y totalPages.',
      'Si no envías filtros, el endpoint devuelve la primera página de alertas visibles.',
    ],
  }

  return <AlertListReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
