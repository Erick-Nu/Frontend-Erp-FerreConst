import { ProformaCancelReference } from '@/components/docs/ProformaCancelReference'
import { getApiBaseUrl } from '@/config/public-env'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Anular Proforma' }

export default function AnularProformaPage() {
  const module = getModule('proforma')!

  const endpoint = {
    slug: 'cancel-proforma',
    title: 'Anular proforma',
    method: 'PATCH' as const,
    path: '/proformas/:id/cancel',
    definition: 'Anula una proforma cambiando su estado a anulada y regenerando el documento PDF, sin afectar el inventario.',
    whenToUse: 'Se usa cuando una proforma emitida debe ser cancelada, por ejemplo por un error en los datos, porque la venta no se concretó o porque el cliente desistió. Al usarlo, el usuario obtiene la proforma actualizada con estado anulada y el PDF regenerado.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la proforma a anular.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede anular proformas.' },
      { title: 'Solo permite anular proformas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Solo una proforma en estado emitida puede anularse.' },
      { title: 'Esta operación no realiza movimientos de stock ni afecta el inventario.' },
      { title: 'Al completar la anulación se regenera el PDF con el nuevo estado anulada.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de proforma es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Proforma no encontrada', message: 'No existe una proforma con el id indicado dentro de la empresa del usuario autenticado.' },
      { status: 409, title: 'Solo las proformas emitidas pueden anularse', message: 'La proforma no está en estado emitida; solo puede anularse una proforma emitida.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para anular proformas.' },
    ],
    responseExample: `{
  "proforma": {
    "prfmaid": "66ff3afe-65bb-49f2-80cf-ae279b7fcf5b",
    "prfmaidentificador": "FE01-002-001-34",
    "prfmaestado": "anulada",
    "prfmafchregistro": "2026-05-25T04:35:56.719Z",
    "prfmafchactualizacion": "2026-05-25T14:55:03.000Z",
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
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/proformas/66ff3afe-65bb-49f2-80cf-ae279b7fcf5b/cancel" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body ni query params.',
      'Cancelar una proforma no afecta el stock ni el inventario.',
      'Al completar la anulación, el PDF se regenera automáticamente con el nuevo estado anulada.',
      'Una proforma anulada no puede volver a cambiarse de estado.',
    ],
  }

  return <ProformaCancelReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
