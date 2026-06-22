import { StockCreateReference } from '@/components/docs/StockCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear stock' }

export default function CrearStockPage() {
  const module = getModule('stock')!

  const endpoint = {
    slug: 'register-stock',
    title: 'Crear stock',
    method: 'POST' as const,
    path: '/stocks',
    definition: 'Registra un nuevo stock para una sucursal y un producto dentro de la empresa del usuario autenticado.',
    whenToUse: 'Se usa cuando la aplicación necesita inicializar las existencias de un producto en una sucursal específica, por ejemplo al dar de alta un producto nuevo o al configurar el inventario inicial. Al usarlo, el usuario obtiene los datos del stock creado, incluyendo las relaciones resueltas de sucursal y producto.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    body: [
      { name: 'stckemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá el stock; debe coincidir con la empresa del usuario autenticado.' },
      { name: 'stcksuid', type: 'string', required: true, description: 'Identificador de la sucursal donde se registrará el stock; debe existir en la empresa.' },
      { name: 'stckprdtoid', type: 'string', required: true, description: 'Identificador del producto para el que se registrará el stock; debe existir en la empresa.' },
      { name: 'stckcantidad', type: 'number', required: true, description: 'Cantidad inicial de existencias.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede registrar stock.' },
      { title: 'Solo permite crear stock en la misma empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Todos los campos del body son obligatorios.' },
      { title: 'stcksuid debe corresponder a una sucursal existente en la empresa.' },
      { title: 'stckprdtoid debe corresponder a un producto existente en la empresa.' },
      { title: 'stckcantidad debe ser un valor numérico válido.' },
      { title: 'No puede existir otro registro de stock para la misma combinación de sucursal y producto.' },
      { title: 'El stock se crea con estado activo.' },
      { title: 'Después de crear el stock, el backend sincroniza automáticamente las alertas de stock bajo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'stckemid fue enviado vacío.' },
      { status: 500, title: 'El id de sucursal de stock es requerido', message: 'stcksuid fue enviado vacío.' },
      { status: 500, title: 'El id de producto de stock es requerido', message: 'stckprdtoid fue enviado vacío.' },
      { status: 500, title: 'El número es requerido', message: 'stckcantidad fue enviado vacío.' },
      { status: 500, title: 'El valor debe ser un número válido', message: 'stckcantidad no es un número válido.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'stckemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de stock.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para crear stock.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La sucursal de stock no existe', message: 'stcksuid no corresponde a una sucursal existente en la empresa.' },
      { status: 500, title: 'El producto de stock no existe', message: 'stckprdtoid no corresponde a un producto existente en la empresa.' },
      { status: 500, title: 'Ya existe un stock para esta sucursal y producto', message: 'Ya hay un registro de stock para la misma combinación de sucursal y producto.' },
      { status: 500, title: 'El stock no fue creado', message: 'El stock fue guardado, pero no pudo consultarse para devolver la respuesta.' },
      { status: 500, title: 'Error saving stock', message: 'Ocurrió un error interno al guardar el stock.' },
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
    requestExample: `curl -X POST "${getApiBaseUrl()}/stocks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "stckemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "stcksuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
    "stckprdtoid": "f8a0a2ab-9fbe-4fcf-b4d4-6888e0c4f410",
    "stckcantidad": 25
  }'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'No se puede crear más de un stock para la misma sucursal y producto dentro de una empresa.',
      'La creación de stock puede disparar la sincronización de alertas de stock bajo para el producto.',
      'La respuesta incluye las relaciones resueltas de sucursal y producto.',
    ],
  }

  return <StockCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
