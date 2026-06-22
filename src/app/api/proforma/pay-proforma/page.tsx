import { ProformaPayReference } from '@/components/docs/ProformaPayReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Pagar Proforma' }

export default function PagarProformaPage() {
  const module = getModule('proforma')!

  const endpoint = {
    slug: 'pay-proforma',
    title: 'Pagar proforma',
    method: 'PATCH' as const,
    path: '/proformas/:id/pay',
    definition: 'Marca una proforma como pagada, descuenta el stock de los items inventariables y regenera el documento PDF con el nuevo estado.',
    whenToUse: 'Se usa cuando la venta asociada a una proforma ya fue cobrada y se debe consolidar el descuento real del inventario. Al usarlo, el usuario obtiene la proforma actualizada con estado pagada, el PDF regenerado y una tarea de envío automática.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la proforma a pagar.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede pagar proformas.' },
      { title: 'Solo permite pagar proformas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Solo una proforma en estado emitida puede pagarse.' },
      { title: 'La proforma debe contener al menos un item.' },
      { title: 'Para cada item inventariable se descuenta stock de la sucursal emisora de la proforma.' },
      { title: 'El stock debe existir en la sucursal indicada, estar activo y tener cantidad suficiente.' },
      { title: 'Los items no inventariables no afectan el stock.' },
      { title: 'Al completar el pago se regenera el PDF con el nuevo estado pagada.' },
      { title: 'Se crea automáticamente una tarea de envío de la proforma para procesamiento posterior.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de proforma es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Proforma no encontrada', message: 'No existe una proforma con el id indicado dentro de la empresa del usuario autenticado.' },
      { status: 409, title: 'Solo las proformas emitidas pueden pagarse', message: 'La proforma no está en estado emitida; solo puede pagarse una proforma emitida.' },
      { status: 409, title: 'La proforma debe contener al menos un item', message: 'La proforma no tiene items en su detalle.' },
      { status: 409, title: 'El stock no existe para esta sucursal y producto', message: 'No hay un registro de stock para un item inventariable en la sucursal emisora.' },
      { status: 409, title: 'El stock no está activo', message: 'El stock asociado a un item inventariable no está en estado activo.' },
      { status: 409, title: 'Cantidad de stock insuficiente', message: 'La cantidad disponible en stock es menor a la cantidad requerida por el item.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para pagar proformas.' },
    ],
    responseExample: `{
  "proforma": {
    "prfmaid": "66ff3afe-65bb-49f2-80cf-ae279b7fcf5b",
    "prfmaidentificador": "FE01-002-001-34",
    "prfmaestado": "pagada",
    "prfmafchregistro": "2026-05-25T04:35:56.719Z",
    "prfmafchactualizacion": "2026-05-25T14:52:11.000Z",
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
        "usnombre": "Erick Nuñez",
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
        "dprfmaid": "a0aee57a-277e-41d9-987d-4da410746a3b",
        "dprfmatipoitem": "inventariable",
        "producto": {
          "dprfmacodigo": "012344678901",
          "dprfmadescripcion": "Brocha 2\\\"",
          "dprfmacantidad": 1,
          "dprfmapreciounitario": 25,
          "dprfmapreciototal": 25
        }
      },
      {
        "dprfmaid": "560214e7-69d2-487d-b959-aecc358582a9",
        "dprfmatipoitem": "manual",
        "producto": {
          "dprfmacodigo": null,
          "dprfmadescripcion": "Servicio de instalación y ajuste",
          "dprfmacantidad": 1,
          "dprfmapreciounitario": 10,
          "dprfmapreciototal": 10
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
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/proformas/66ff3afe-65bb-49f2-80cf-ae279b7fcf5b/pay" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body ni query params.',
      'Solo los items inventariables descuentan stock; los items manuales no afectan el inventario.',
      'Al completar el pago, el PDF se regenera automáticamente con el nuevo estado pagada.',
      'Se crea una tarea de envío en segundo plano para notificar o distribuir el documento.',
    ],
  }

  return <ProformaPayReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
