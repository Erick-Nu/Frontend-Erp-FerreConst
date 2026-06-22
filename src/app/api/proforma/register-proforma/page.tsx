import { ProformaCreateReference } from '@/components/docs/ProformaCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear Proforma' }

export default function CrearProformaPage() {
  const module = getModule('proforma')!

  const endpoint = {
    slug: 'register-proforma',
    title: 'Crear proforma',
    method: 'POST' as const,
    path: '/proformas',
    definition: 'Registra una nueva proforma en estado emitida para la empresa del usuario autenticado, con detalle completo de items, y genera su documento PDF inicial.',
    whenToUse: 'Se usa cuando la aplicación necesita emitir una nueva proforma desde el punto de venta con los productos o servicios seleccionados, los datos del cliente, sucursal, caja y método de pago. Al usarlo, el usuario obtiene la estructura completa de la proforma creada, incluyendo el identificador generado, los datos del emisor y receptor, y el documento PDF.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    body: [
      { name: 'prfmasuid', type: 'string', required: true, description: 'Identificador de la sucursal emisora; debe existir y estar activa.' },
      { name: 'prfmacjid', type: 'string', required: true, description: 'Identificador de la caja emisora; debe existir, pertenecer a la sucursal y estar activa.' },
      { name: 'prfmaclnteid', type: 'string', required: true, description: 'Identificador del cliente receptor; debe existir y estar activo.' },
      { name: 'prfmampid', type: 'string', required: true, description: 'Identificador del método de pago; debe existir y estar activo.' },
      { name: 'prfmasubtotal', type: 'number', required: true, description: 'Subtotal de la proforma; debe ser mayor o igual a cero y coincidir con la suma de los totales de los items.' },
      { name: 'prfmadescuento', type: 'number', required: false, description: 'Descuento total aplicado a la proforma; debe ser mayor o igual a cero. Si no se envía, se asume 0.' },
      { name: 'prfmatotal', type: 'number', required: true, description: 'Total de la proforma; debe ser igual a subtotal - descuento y no puede ser negativo.' },
      { name: 'dprfmaproductos', type: 'array', required: true, description: 'Arreglo no vacío de items de la proforma. Cada item contiene: dprfmaesinventariable (boolean), dprfmacodigo (string, condicional), dprfmadescripcion (string), dprfmacantidad (number > 0), dprfmapreciounitario (number > 0), dprfmapreciototal (number > 0).' },
    ],
    businessRules: [
      { title: 'La proforma siempre se crea en estado emitida.' },
      { title: 'Solo un usuario con rol jefe o empleado puede crear proformas.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La sucursal debe existir y estar activa dentro de la empresa.' },
      { title: 'La caja debe existir, estar activa y pertenecer a la sucursal indicada.' },
      { title: 'El cliente debe existir y estar activo dentro de la empresa.' },
      { title: 'El método de pago debe existir y estar activo dentro de la empresa.' },
      { title: 'Debe existir una secuencia configurada para la combinación empresa + sucursal.' },
      { title: 'No se permiten códigos de producto inventariable duplicados entre los items.' },
      { title: 'Todo item inventariable requiere dprfmacodigo, que debe corresponder a un producto existente y activo.' },
      { title: 'El backend no recalcula los totales; valida la consistencia de los montos enviados por el frontend.' },
      { title: 'La suma de dprfmapreciototal de todos los items debe coincidir con prfmasubtotal.' },
      { title: 'prfmasubtotal - prfmadescuento debe coincidir con prfmatotal.' },
      { title: 'Se genera un documento PDF automáticamente al crear la proforma.' },
      { title: 'prfmaidentificador se genera como {códigoEmpresa}-{identificadorSucursal}-{identificadorCaja}-{secuencia}.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de sucursal es requerido', message: 'prfmasuid fue enviado vacío.' },
      { status: 500, title: 'El id de caja es requerido', message: 'prfmacjid fue enviado vacío.' },
      { status: 500, title: 'El id de cliente es requerido', message: 'prfmaclnteid fue enviado vacío.' },
      { status: 500, title: 'El id de método de pago es requerido', message: 'prfmampid fue enviado vacío.' },
      { status: 500, title: 'El número es requerido', message: 'prfmasubtotal, prfmatotal o un campo numérico de item fue enviado vacío.' },
      { status: 500, title: 'El valor debe ser un número válido', message: 'Uno de los campos numéricos no es un número válido.' },
      { status: 500, title: 'El subtotal debe ser mayor o igual a cero', message: 'prfmasubtotal tiene un valor negativo.' },
      { status: 500, title: 'El descuento debe ser mayor o igual a cero', message: 'prfmadescuento tiene un valor negativo.' },
      { status: 500, title: 'El total debe ser mayor o igual a cero', message: 'prfmatotal tiene un valor negativo.' },
      { status: 500, title: 'Los items de proforma son requeridos', message: 'dprfmaproductos fue enviado vacío o no es un arreglo.' },
      { status: 500, title: 'dprfmaesinventariable debe ser un booleano', message: 'dprfmaesinventariable en un item no es un valor booleano.' },
      { status: 500, title: 'La cantidad debe ser mayor a cero', message: 'dprfmacantidad de un item es menor o igual a 0.' },
      { status: 500, title: 'El precio unitario debe ser mayor a cero', message: 'dprfmapreciounitario de un item es menor o igual a 0.' },
      { status: 500, title: 'El nombre de producto es requerido', message: 'dprfmadescripcion de un item fue enviado vacío.' },
      { status: 500, title: 'El total del item debe ser mayor a cero', message: 'dprfmapreciototal de un item es menor o igual a 0.' },
      { status: 500, title: 'El código de producto es requerido para items inventariables', message: 'Un item tiene dprfmaesinventariable: true pero dprfmacodigo está vacío.' },
      { status: 500, title: 'El código de producto es requerido', message: 'Un item no inventariable tiene dprfmacodigo enviado pero vacío.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para crear proformas.' },
      { status: 500, title: 'La sucursal no existe', message: 'prfmasuid no corresponde a una sucursal existente en la empresa.' },
      { status: 500, title: 'La sucursal no está activa', message: 'La sucursal indicada no está en estado activo.' },
      { status: 500, title: 'La caja no existe', message: 'prfmacjid no corresponde a una caja existente en la empresa.' },
      { status: 500, title: 'La caja no pertenece a la sucursal seleccionada', message: 'La caja indicada no está asociada a la sucursal enviada.' },
      { status: 500, title: 'La caja no está activa', message: 'La caja indicada no está en estado activo.' },
      { status: 500, title: 'El cliente no existe', message: 'prfmaclnteid no corresponde a un cliente existente en la empresa.' },
      { status: 500, title: 'El cliente no está activo', message: 'El cliente indicado no está en estado activo.' },
      { status: 500, title: 'El método de pago no existe', message: 'prfmampid no corresponde a un método de pago existente en la empresa.' },
      { status: 500, title: 'El método de pago no está activo', message: 'El método de pago indicado no está en estado activo.' },
      { status: 409, title: 'La proforma tiene productos duplicados en los items', message: 'Hay dos o más items inventariables con el mismo dprfmacodigo.' },
      { status: 409, title: 'El código de producto inventariable no existe', message: 'El dprfmacodigo de un item inventariable no corresponde a un producto existente.' },
      { status: 409, title: 'El producto inventariable no está activo', message: 'El producto referenciado por dprfmacodigo no está en estado activo.' },
      { status: 409, title: 'El subtotal no coincide con la suma de los items', message: 'La suma de dprfmapreciototal de todos los items no coincide con prfmasubtotal.' },
      { status: 409, title: 'El total no coincide con el subtotal menos el descuento', message: 'prfmatotal no es igual a prfmasubtotal - prfmadescuento.' },
      { status: 409, title: 'El total de la proforma no puede ser negativo', message: 'prfmasubtotal - prfmadescuento da un valor negativo.' },
      { status: 409, title: 'La secuencia no existe para esta empresa y sucursal', message: 'No hay una secuencia configurada para la combinación de empresa y sucursal.' },
      { status: 500, title: 'La proforma no fue creada', message: 'Ocurrió un error interno al guardar la cabecera de la proforma.' },
      { status: 500, title: 'El item de proforma no fue creado', message: 'Ocurrió un error interno al guardar un item de la proforma.' },
    ],
    responseExample: `{
  "proforma": {
    "prfmaid": "ce3bb915-e4e2-4649-8e82-9dff0e5e7946",
    "prfmaidentificador": "FE01-002-001-23",
    "prfmaestado": "emitida",
    "prfmafchregistro": "2026-05-25T02:18:46.630Z",
    "prfmafchactualizacion": "2026-05-25T02:18:46.630Z",
    "emisor": {
      "empresa": { "emid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e", "emlogo": "http://localhost:3000/uploads/empresas/logo.png", "emrznsocial": "Ferreconst ElectroLuz K y B", "emruc": "1709639106001", "emcorreo": "electrokyb@gmail.com", "emcodigo": "FE01" },
      "sucursal": { "suid": "2079f9a4-2676-4601-9c87-cfb81edb70e4", "sunombre": "Sucursal Centro", "suidentificador": "002" },
      "caja": { "cjid": "2dbe2030-46d6-4960-bd5e-fafb6719540f", "cjidentificador": "001" },
      "usuario": { "usid": "428331bb-b892-4bff-b9dc-26260c68e7f4", "usnombre": "Erick Nuñez", "usrol": "jefe" }
    },
    "receptor": { "cliente": { "clnteid": "f969e3c1-cd5f-4286-8b5a-81ae9badfa3e", "clntenombre": "Juan Perez", "clnteidentificacion": "1712345678", "clntecorreo": "juan.perez@email.com", "clntetelefono": "0987654321", "clntedireccion": "Av. Principal y Calle 10" } },
    "metodoPago": { "mpid": "12421636-dde1-44f1-b36c-9bd81bee22af", "mpnombre": "Efectivo" },
    "detalle": [ { "dprfmaid": "560214e7-69d2-487d-b959-aecc358582a9", "dprfmatipoitem": "manual", "producto": { "dprfmacodigo": null, "dprfmadescripcion": "Servicio de instalación y ajuste", "dprfmacantidad": 1, "dprfmapreciounitario": 10, "dprfmapreciototal": 10 } } ],
    "total": { "prfmasubtotal": 35, "prfmadescuento": 0, "prfmatotal": 35 },
    "documento": { "docnombre": "FE01-002-001-23_2026-05-25.pdf", "docurl": "http://localhost:3000/uploads/proformas/1709639106001/FE01-002-001-23_2026-05-25.pdf" }
  }
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/proformas" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "prfmasuid": "2079f9a4-2676-4601-9c87-cfb81edb70e4",
    "prfmacjid": "2dbe2030-46d6-4960-bd5e-fafb6719540f",
    "prfmaclnteid": "f969e3c1-cd5f-4286-8b5a-81ae9badfa3e",
    "prfmampid": "12421636-dde1-44f1-b36c-9bd81bee22af",
    "prfmasubtotal": 35,
    "prfmadescuento": 0,
    "prfmatotal": 35,
    "dprfmaproductos": [
      { "dprfmaesinventariable": true, "dprfmacodigo": "012344678901", "dprfmadescripcion": "Brocha 2\\"", "dprfmacantidad": 1, "dprfmapreciounitario": 25, "dprfmapreciototal": 25 },
      { "dprfmaesinventariable": false, "dprfmadescripcion": "Servicio de instalación y ajuste", "dprfmacantidad": 1, "dprfmapreciounitario": 10, "dprfmapreciototal": 10 }
    ]
  }'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'El backend no recalcula los importes; el frontend debe enviar un payload consistente.',
      'La respuesta incluye el documento PDF generado automáticamente en proforma.documento.',
      'prfmaidentificador se genera automáticamente con el formato {códigoEmpresa}-{identificadorSucursal}-{identificadorCaja}-{secuencia}.',
    ],
  }

  return <ProformaCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
