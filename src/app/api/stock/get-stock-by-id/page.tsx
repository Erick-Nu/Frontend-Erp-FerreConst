import { StockByIdReference } from '@/components/docs/StockByIdReference'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener stock' }

export default function ObtenerStockPage() {
  const endpoint = {
    slug: 'get-stock-by-id',
    title: 'Obtener stock',
    method: 'GET' as const,
    path: '/stocks/:id',
    definition: 'Obtiene el detalle de un registro de stock por su identificador, dentro de la empresa del usuario autenticado, incluyendo las relaciones de sucursal y producto.',
    whenToUse: 'Se usa cuando la aplicación necesita cargar los datos completos de un stock para una vista de detalle, un formulario de edición o una consulta de existencias. Al usarlo, el usuario obtiene los datos del stock con las relaciones resueltas de sucursal y producto.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del stock.' }
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede consultar stock.' },
      { title: 'Solo permite consultar stock de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La respuesta incluye las relaciones resueltas de sucursal y producto.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de stock es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de stock.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar stock.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Stock no encontrado', message: 'No existe un registro de stock con el id indicado dentro de la empresa del usuario autenticado.' },
    ],
    responseExample: `{
  "stckid": "d5c2b3dc-1a80-46f6-b7ce-9894ea31fd87",
  "stckemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "sucursal": {
    "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
    "sunombre": "Sucursal Centro",
    "suidentificador": "001"
  },
  "producto": {
    "prdtoid": "f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410",
    "prdtocodigo": "PRD-0001",
    "prdtonombre": "Taladro Inalambrico 20V"
  },
  "stckcantidad": 25,
  "stckfchregistro": "2026-05-23T23:21:23.477Z",
  "stckfchactualizacion": "2026-05-23T23:21:23.477Z",
  "stckestado": "activo"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/stocks/d5c2b3dc-1a80-46f6-b7ce-9894ea31fd87" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe query params ni body.',
      'Solo devuelve stock que pertenece a la empresa del usuario autenticado.',
      'La respuesta incluye las relaciones anidadas de sucursal y producto.',
    ]
  }

  return <StockByIdReference moduleTitle="Stock" moduleSlug="stock" endpoint={endpoint} />
}
