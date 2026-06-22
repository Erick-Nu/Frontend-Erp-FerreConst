import { StockUpdateReference } from '@/components/docs/StockUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar stock' }

export default function ActualizarStockPage() {
  const module = getModule('stock')!

  const endpoint = {
    slug: 'update-stock',
    title: 'Actualizar stock',
    method: 'PATCH' as const,
    path: '/stocks/:id',
    definition: 'Actualiza parcialmente la cantidad o el estado de un stock existente, dentro de la empresa del usuario autenticado.',
    whenToUse: 'Se usa cuando la aplicación necesita ajustar manualmente la cantidad disponible de un producto en una sucursal, o cambiar su estado operativo. Al usarlo, el usuario obtiene los datos del stock actualizado con las relaciones resueltas de sucursal y producto.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del stock a actualizar.' },
    ],
    body: [
      { name: 'stcksuid', type: 'string', required: true, description: 'Identificador de la sucursal; debe existir en la empresa y coincidir con la sucursal real del stock.' },
      { name: 'stckcantidad', type: 'number', required: false, description: 'Nueva cantidad de existencias.' },
      { name: 'stckestado', type: 'string', required: false, description: 'Nuevo estado del stock; acepta activo, inactivo o eliminado.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede actualizar stock.' },
      { title: 'Solo permite actualizar stock de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'stcksuid es obligatorio y debe corresponder a una sucursal existente en la empresa.' },
      { title: 'El id de la ruta y el stcksuid del body deben coincidir con la sucursal real del stock.' },
      { title: 'No se permite cambiar el producto asociado al stock mediante este endpoint.' },
      { title: 'Un stock con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos stckcantidad o stckestado con un valor diferente al actual.' },
      { title: 'Si se envía stckcantidad, debe ser un número válido.' },
      { title: 'Si se envía stckestado, solo puede ser activo, inactivo o eliminado.' },
      { title: 'Después de actualizar, el backend sincroniza automáticamente las alertas de stock bajo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de stock es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 400, title: 'El id de sucursal de stock es requerido', message: 'No se envió stcksuid en el body.' },
      { status: 500, title: 'El número es requerido', message: 'stckcantidad fue enviado vacío.' },
      { status: 500, title: 'El valor debe ser un número válido', message: 'stckcantidad no es un número válido.' },
      { status: 500, title: 'El estado de stock es requerido', message: 'stckestado fue enviado vacío.' },
      { status: 500, title: 'El estado de stock debe ser activo, inactivo o eliminado', message: 'stckestado tiene un valor no permitido.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar el stock', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'Stock no encontrado', message: 'El stock no existe dentro de la empresa del usuario autenticado, o no coincide con la sucursal enviada.' },
      { status: 500, title: 'El stock eliminado no puede ser actualizado', message: 'El stock existe, pero está en estado eliminado.' },
      { status: 500, title: 'La sucursal de stock no existe', message: 'stcksuid no corresponde a una sucursal existente en la empresa.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de stock.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para actualizar stock.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
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
  "stckcantidad": 40,
  "stckfchregistro": "2026-05-23T23:21:23.477Z",
  "stckfchactualizacion": "2026-05-24T02:43:31.452Z",
  "stckestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/stocks/d5c2b3dc-1a80-46f6-b7ce-9894ea31fd87" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "stcksuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "stckcantidad": 40,
  "stckestado": "activo"
}'`,
    notes: [
      'Este endpoint no recibe query params.',
      'stcksuid es obligatorio y debe coincidir con la sucursal real del stock.',
      'No se puede cambiar el producto del stock mediante este endpoint.',
      'stckestado permite el valor eliminado para eliminación lógica.',
      'La actualización puede disparar la sincronización de alertas de stock bajo.',
    ],
  }

  return <StockUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
