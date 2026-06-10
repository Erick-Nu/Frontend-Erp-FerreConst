import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear Proforma' }

export default function CrearProformaPage() {
  const module = getModule('proforma')!
  
  const endpoint = {
    slug: 'register-proforma',
    title: 'Crear Proforma',
    method: 'POST' as const,
    path: '/proformas',
    summary: 'Registra una nueva proforma en estado emitida para la empresa del usuario autenticado. Responsabilidades del endpoint: - Validar permisos de empresa y usuario.',
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
          { name: 'dprfmaesinventariable', type: 'boolean', required: true, description: '(boolean, requerido).' },
          { name: 'dprfmacodigo', type: 'string', required: false, description: '(string, condicional):' },
          { name: 'dprfmadescripcion', type: 'string', required: true, description: '(string, requerido).' },
          { name: 'dprfmacantidad', type: 'number', required: true, description: '(number, requerido, > 0).' },
          { name: 'dprfmapreciounitario', type: 'number', required: true, description: '(number, requerido, > 0).' },
          { name: 'dprfmapreciototal', type: 'number', required: true, description: '(number, requerido, > 0).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/proformas \
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
    {
      "dprfmaesinventariable": true,
      "dprfmacodigo": "012344678901",
      "dprfmadescripcion": "Brocha 2\"",
      "dprfmacantidad": 1,
      "dprfmapreciounitario": 25,
      "dprfmapreciototal": 25
    },
    {
      "dprfmaesinventariable": false,
      "dprfmadescripcion": "Servicio de instalación y ajuste",
      "dprfmacantidad": 1,
      "dprfmapreciounitario": 10,
      "dprfmapreciototal": 10
    }
  ]
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "proforma": {
    "prfmaid": "ce3bb915-e4e2-4649-8e82-9dff0e5e7946",
    "prfmaidentificador": "FE01-002-001-23",
    "prfmaestado": "emitida",
    "prfmafchregistro": "2026-05-25T02:18:46.630Z",
    "prfmafchactualizacion": "2026-05-25T02:18:46.630Z",
    "emisor": {
      "empresa": {
        "emid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
        "emlogo": "https://api.tudominio.com/uploads/empresas/logo.png",
        "emrznsocial": "Ferreconst ElectroLuz K y B",
        "emruc": "1709639106001",
        "emcorreo": "electrokyb@gmail.com",
        "emcodigo": "FE01"
      },
      "sucursal": {
        "suid": "2079f9a4-2676-4601-9c87-cfb81edb70e4",
        "sunombre": "Sucursal Centro",
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
        "dprfmaid": "560214e7-69d2-487d-b959-aecc358582a9",
        "dprfmatipoitem": "manual",
        "producto": {
          "dprfmacodigo": null,
          "dprfmadescripcion": "Servicio de instalación y ajuste",
          "dprfmacantidad": 1,
          "dprfmapreciounitario": 10,
          "dprfmapreciototal": 10
        }
      },
      {
        "dprfmaid": "1c2d17f2-7637-4777-a6c3-118b788fe6b3",
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
      "prfmadescuento": 0,
      "prfmatotal": 35
    },
    "documento": {
      "docnombre": "FE01-002-001-23_2026-05-25.pdf",
      "docurl": "https://api.tudominio.com/uploads/proformas/1709639106001/FE01-002-001-23_2026-05-25.pdf"
    }
  }
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'sum(dprfmaproductos[].dprfmapreciototal) == prfmasubtotal',
    'prfmasubtotal - prfmadescuento == prfmatotal',
    'Empresa del usuario autenticado: debe existir y estar activa.',
    'Usuario autenticado: debe existir, pertenecer a la empresa, estar activo y tener rol jefe o empleado.',
    'Sucursal: debe existir y estar activa.',
    'Caja: debe existir, estar activa y pertenecer a la sucursal enviada.',
    'Cliente: debe existir y estar activo.',
    'Método de pago: debe existir y estar activo.',
    'Secuencia: debe existir para combinación empresa+sucursal.',
    'No se permiten códigos duplicados entre items inventariables.',
    'Todo item con dprfmaesinventariable = true debe usar el código de un producto existente y activo de la empresa autenticada.'
    ],
    errors: [
    { status: 401, title: 'token inválido o ausente' },
    { status: 409, title: 'Error' },
    { status: 500, title: 'statusCode', message: 'Error' }
    ],
    notes: [
    'La proforma siempre se crea en estado emitida.',
    'El backend no recalcula dprfmapreciototal; valida lo enviado por frontend.',
    'prfmasubtotal se persiste en cabecera (proforma).',
    'La respuesta real incluye proforma.documento con la referencia al PDF generado.',
    'prfmaidentificador se arma así:'
    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
