import { ProformaReplaceReference } from '@/components/docs/ProformaReplaceReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Reemplazar proforma' }

export default function ReemplazarProformaPage() {
  const module = getModule('proforma')!

  const endpoint = {
    slug: 'replace-proforma',
    title: 'Reemplazar proforma',
    method: 'PUT' as const,
    path: '/proformas/:id',
    definition: 'Reemplaza completamente el contenido editable de una proforma emitida en una sola operación atómica, incluyendo cliente, método de pago, montos y detalle de items.',
    whenToUse: 'Se usa cuando la aplicación necesita guardar la edición completa de una proforma desde el formulario de edición, enviando el estado final del detalle. Al usarlo, el usuario obtiene la proforma actualizada con su nuevo contenido y el PDF regenerado.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la proforma a reemplazar.' },
    ],
    body: [
      { name: 'prfmaclnteid', type: 'string', required: true, description: 'Identificador del cliente receptor; debe existir y estar activo.' },
      { name: 'prfmampid', type: 'string', required: true, description: 'Identificador del método de pago; debe existir y estar activo.' },
      { name: 'prfmasubtotal', type: 'number', required: true, description: 'Subtotal de la proforma; debe ser mayor o igual a cero y coincidir con la suma de los totales de los items.' },
      { name: 'prfmadescuento', type: 'number', required: true, description: 'Descuento total aplicado; debe ser mayor o igual a cero.' },
      { name: 'prfmatotal', type: 'number', required: true, description: 'Total de la proforma; debe ser igual a subtotal - descuento y no puede ser negativo.' },
      { name: 'dprfmaproductos', type: 'array', required: true, description: 'Arreglo completo del detalle final; representa el estado final de los items. Cada item contiene: dprfmaid (opcional), dprfmaesinventariable (boolean), dprfmacodigo (string, condicional), dprfmadescripcion (string), dprfmacantidad (number > 0), dprfmapreciounitario (number > 0), dprfmapreciototal (number > 0).' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede reemplazar proformas.' },
      { title: 'Solo permite reemplazar proformas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Solo una proforma en estado emitida puede editarse.' },
      { title: 'El body representa el detalle completo final; no es una lista parcial de cambios.' },
      { title: 'Una línea con dprfmaid enviado se actualiza; sin dprfmaid se inserta como nueva.' },
      { title: 'Una línea existente que no aparece en el arreglo se elimina.' },
      { title: 'No se permiten dprfmaid duplicados en el arreglo.' },
      { title: 'Todo dprfmaid enviado debe pertenecer a la proforma indicada.' },
      { title: 'El cliente y el método de pago deben existir y estar activos.' },
      { title: 'No se permiten códigos de producto inventariable duplicados entre los items.' },
      { title: 'Todo item inventariable requiere dprfmacodigo, que debe corresponder a un producto existente y activo.' },
      { title: 'El backend no recalcula los totales; valida la consistencia de los montos.' },
      { title: 'Esta operación no descuenta stock ni afecta el inventario.' },
      { title: 'Al completar el reemplazo se regenera el PDF con el contenido actualizado.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de proforma es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 400, title: 'El id de proforma es requerido', message: 'prfmaid en el body fue enviado vacío.' },
      { status: 400, title: 'El id de cliente es requerido', message: 'prfmaclnteid fue enviado vacío o no es un texto.' },
      { status: 400, title: 'El id de método de pago es requerido', message: 'prfmampid fue enviado vacío o no es un texto.' },
      { status: 400, title: 'El valor debe ser un número válido', message: 'Uno de los campos numéricos no es un número ni texto numérico.' },
      { status: 400, title: 'El número es requerido', message: 'Uno de los campos numéricos fue enviado vacío.' },
      { status: 400, title: 'El subtotal debe ser mayor o igual a cero', message: 'prfmasubtotal tiene un valor negativo.' },
      { status: 400, title: 'El descuento debe ser mayor o igual a cero', message: 'prfmadescuento tiene un valor negativo.' },
      { status: 400, title: 'El total debe ser mayor o igual a cero', message: 'prfmatotal tiene un valor negativo.' },
      { status: 400, title: 'Los items de proforma son requeridos', message: 'dprfmaproductos no es un arreglo o está vacío.' },
      { status: 400, title: 'dprfmaesinventariable debe ser un booleano', message: 'dprfmaesinventariable en un item no es un valor booleano.' },
      { status: 400, title: 'La cantidad debe ser mayor a cero', message: 'dprfmacantidad de un item es menor o igual a 0.' },
      { status: 400, title: 'El precio unitario debe ser mayor a cero', message: 'dprfmapreciounitario de un item es menor o igual a 0.' },
      { status: 400, title: 'El nombre de producto es requerido', message: 'dprfmadescripcion de un item fue enviado vacío.' },
      { status: 400, title: 'El total del item debe ser mayor a cero', message: 'dprfmapreciototal de un item es menor o igual a 0.' },
      { status: 400, title: 'El código de producto debe ser un texto', message: 'dprfmacodigo de un item no es un texto válido.' },
      { status: 400, title: 'El código de producto es requerido para items inventariables', message: 'Un item tiene dprfmaesinventariable: true pero dprfmacodigo está vacío.' },
      { status: 400, title: 'El código de producto es requerido', message: 'Un item no inventariable tiene dprfmacodigo enviado pero vacío.' },
      { status: 404, title: 'Proforma no encontrada', message: 'No existe una proforma con el id indicado dentro de la empresa del usuario autenticado.' },
      { status: 409, title: 'Solo las proformas emitidas pueden editarse', message: 'La proforma no está en estado emitida; las proformas pagadas o anuladas no pueden editarse.' },
      { status: 409, title: 'El subtotal no coincide con la suma de los items', message: 'La suma de dprfmapreciototal de todos los items no coincide con prfmasubtotal.' },
      { status: 409, title: 'El total no coincide con el subtotal menos el descuento', message: 'prfmatotal no es igual a prfmasubtotal - prfmadescuento.' },
      { status: 409, title: 'El total de la proforma no puede ser negativo', message: 'prfmasubtotal - prfmadescuento da un valor negativo.' },
      { status: 409, title: 'El detalle de proforma no pertenece a esta proforma', message: 'Uno o más dprfmaid enviados no pertenecen a la proforma indicada.' },
      { status: 409, title: 'La proforma tiene ids de detalle duplicados', message: 'Hay dprfmaid repetidos en el arreglo de items.' },
      { status: 409, title: 'La proforma tiene productos duplicados en los items', message: 'Hay dos o más items inventariables con el mismo dprfmacodigo.' },
      { status: 409, title: 'El código de producto inventariable no existe', message: 'El dprfmacodigo de un item inventariable no corresponde a un producto existente.' },
      { status: 409, title: 'El producto inventariable no está activo', message: 'El producto referenciado por dprfmacodigo no está en estado activo.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para reemplazar proformas.' },
    ],
    responseExample: `{
  "proforma": {
    "prfmaid": "66ff3afe-65bb-49f2-80cf-ae279b7fcf5b",
    "prfmaidentificador": "FE01-002-001-34",
    "prfmaestado": "emitida",
    "prfmafchregistro": "2026-05-25T04:35:56.719Z",
    "prfmafchactualizacion": "2026-05-25T14:40:00.000Z",
    "emisor": {
      "empresa": {
        "emid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
        "emlogo": "https://api.tudominio.com/uploads/empresas/Mujer_portada.png",
        "emrznsocial": "Ferreconst ElectroLuz K y B",
        "emruc": "1709639106001",
        "emcorreo": "electrokyb@gmail.com",
        "emcodigo": "FE01"
      },
      "sucursal": {
        "suid": "2079f9a4-2676-4601-9c87-cfb81edb70e4",
        "sunombre": "Sucursal Centro Historico Basilica",
        "suidentificador": "002"
      },
      "caja": {
        "cjid": "2dbe2030-46d6-4960-bd5e-fafb6719540f",
        "cjidentificador": "001"
      },
      "usuario": {
        "usid": "428331bb-b892-4bff-b9dc-26260c68e7f4",
        "usnombre": "Erick Nunez",
        "usrol": "jefe"
      }
    },
    "receptor": {
      "cliente": {
        "clnteid": "f969e3c1-cd5f-4286-8b5a-81ae9badfa3e",
        "clntenombre": "Juan Perez",
        "clnteidentificacion": "1712345678",
        "clntecorreo": "juan.perez@email.com",
        "clntetelefono": "0987654321",
        "clntedireccion": "Av. Principal y Calle 10"
      }
    },
    "metodoPago": {
      "mpid": "12421636-dde1-44f1-b36c-9bd81bee22af",
      "mpnombre": "Efectivo"
    },
    "detalle": [
      {
        "dprfmaid": "560214e7-69d2-487d-b959-aecc358582a9",
        "dprfmatipoitem": "manual",
        "producto": {
          "dprfmacodigo": null,
          "dprfmadescripcion": "Servicio de instalacion y ajuste",
          "dprfmacantidad": 1,
          "dprfmapreciounitario": 10,
          "dprfmapreciototal": 10
        }
      },
      {
        "dprfmaid": "a0aee57a-277e-41d9-987d-4da410746a3b",
        "dprfmatipoitem": "inventariable",
        "producto": {
          "dprfmacodigo": "012344678901",
          "dprfmadescripcion": "Brocha 2\\u0022",
          "dprfmacantidad": 1,
          "dprfmapreciounitario": 25,
          "dprfmapreciototal": 25
        }
      }
    ],
    "total": {
      "prfmasubtotal": 35,
      "prfmadescuento": 3,
      "prfmatotal": 32
    },
    "documento": {
      "docnombre": "FE01-002-001-34_2026-05-25.pdf",
      "docurl": "https://api.tudominio.com/uploads/proformas/1709639106001/FE01-002-001-34_2026-05-25.pdf"
    }
  }
}`,
    requestExample: `curl -X PUT ${getApiBaseUrl()}/proformas/:id \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
  "prfmaclnteid": "f969e3c1-cd5f-4286-8b5a-81ae9badfa3e",
  "prfmampid": "12421636-dde1-44f1-b36c-9bd81bee22af",
  "prfmasubtotal": 35,
  "prfmadescuento": 3,
  "prfmatotal": 32,
  "dprfmaproductos": [
    {
      "dprfmaid": "560214e7-69d2-487d-b959-aecc358582a9",
      "dprfmaesinventariable": false,
      "dprfmadescripcion": "Servicio de instalacion y ajuste",
      "dprfmacantidad": 1,
      "dprfmapreciounitario": 10,
      "dprfmapreciototal": 10
    },
    {
      "dprfmaesinventariable": true,
      "dprfmacodigo": "012344678901",
      "dprfmadescripcion": "Brocha 2\\u0022",
      "dprfmacantidad": 1,
      "dprfmapreciounitario": 25,
      "dprfmapreciototal": 25
    }
  ]
}'`,
    notes: [
      'Este endpoint no recibe query params.',
      'El body debe contener el estado final completo del detalle; no envíes solo cambios parciales.',
      'Las líneas sin dprfmaid se insertan como nuevas; las líneas con dprfmaid se actualizan.',
      'Las líneas existentes que no aparecen en el arreglo se eliminan.',
      'Esta operación no descuenta stock; el descuento de inventario ocurre al pagar la proforma.',
      'El PDF se regenera automáticamente al completar el reemplazo.',
    ],
  }

  return <ProformaReplaceReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
