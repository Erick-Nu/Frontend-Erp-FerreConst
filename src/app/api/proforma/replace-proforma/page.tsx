import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Reemplazar Proforma' }

export default function ReemplazarProformaPage() {
  const module = getModule('proforma')!
  
  const endpoint = {
    slug: 'replace-proforma',
    title: 'Reemplazar Proforma',
    method: 'PUT' as const,
    path: '/proformas/:id',
    summary: 'Actualiza una proforma completa en una sola operacion: receptor, metodo de pago, importes y lineas del detalle.',
    status: 'documented' as const,
    authentication: 'Requiere JWT: Authorization: Bearer <token>',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [
          { name: 'dprfmadescripcion', type: 'string', required: true, description: '(string, requerido).' },
          { name: 'dprfmacantidad', type: 'number', required: true, description: '(number, requerido, > 0).' },
          { name: 'dprfmapreciounitario', type: 'number', required: true, description: '(number, requerido, > 0).' },
          { name: 'dprfmapreciototal', type: 'number', required: true, description: '(number, requerido, > 0).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X PUT https://api.tudominio.com/proformas/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
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
      "dprfmadescripcion": "Brocha 2\"",
      "dprfmacantidad": 1,
      "dprfmapreciounitario": 25,
      "dprfmapreciototal": 25
    }
  ]
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
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
          "dprfmadescripcion": "Brocha 2\"",
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
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo una proforma en estado emitida puede editarse.',
    'El cliente y el metodo de pago enviados deben existir y estar activos para la empresa autenticada.',
    'No se permiten codigos duplicados entre items inventariables.',
    'Un item inventariable requiere dprfmacodigo.',
    'El codigo de cada item inventariable debe identificar un producto existente y activo de la empresa autenticada.',
    'sum(dprfmaproductos[].dprfmapreciototal) == prfmasubtotal.',
    'prfmasubtotal - prfmadescuento == prfmatotal.',
    'Se usa tolerancia numerica de 0.0001 al validar importes.',
    'Esta operacion no modifica stock; el stock se descuenta al pagar la proforma.'
    ],
    errors: [
    { status: 400, title: 'payload incompleto, detalle vacio, bandera/tipos invalidos, valor no positivo o codigo faltante en item inventariable' },
    { status: 401, title: 'token ausente o invalido' },
    { status: 404, title: 'la proforma no existe para la empresa autenticada' },
    { status: 409, title: 'la proforma no esta emitida, montos inconsistentes, total negativo, producto inventariable duplicado, codigo inventariable inexistente/inactivo o referencia de detalle invalida' },
    { status: 500, title: 'error inesperado al persistir o consultar datos' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
