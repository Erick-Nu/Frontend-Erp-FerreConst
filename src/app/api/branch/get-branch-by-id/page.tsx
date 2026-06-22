import { BranchByIdReference } from '@/components/docs/BranchByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener sucursal' }

export default function ObtenerBranchPage() {
  const module = getModule('branch')!

  const endpoint = {
    slug: 'get-branch-by-id',
    title: 'Obtener sucursal',
    method: 'GET' as const,
    path: '/branches/:id',
    definition: 'Obtiene el detalle de una sucursal por su identificador dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita consultar la información completa de una sucursal específica, por ejemplo para mostrar su detalle o cargar sus datos en una pantalla de edición. Al usarlo, el usuario obtiene los datos registrados de la sucursal solicitada.',
    status: 'documented' as const,
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la sucursal.' },
    ],
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    businessRules: [
      { title: 'Solo permite consultar sucursales de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'La sucursal debe existir dentro de la empresa autenticada.' },
      { title: 'El identificador id corresponde al campo suid de la sucursal.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de sucursal es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'Sucursal no encontrada', message: 'La sucursal no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede crear sucursales para otra empresa', message: 'El usuario autenticado intentó acceder a información de una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no tiene permiso para consultar sucursales.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "suemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "sunombre": "Sucursal Centro",
  "sudireccion": "Av. Principal y Calle 10",
  "sucorreo": "sucursal.centro@empresa.com",
  "suidentificador": "001",
  "sufchregistro": "2026-05-19T22:10:00.000Z",
  "suestado": "activo"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/branches/30d3385c-445d-4f2f-97f9-3d3f88c052f1" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body.',
      'Envía el identificador de la sucursal en la ruta, reemplazando :id.',
      'Usa este endpoint para consultar una sola sucursal; para listados paginados usa GET /branches.',
      'Los campos sudireccion y sucorreo pueden venir como null si no fueron registrados.',
    ],
  }

  return <BranchByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
