import { ProformaListReference } from '@/components/docs/ProformaListReference'

export const metadata = { title: 'Listar proformas' }

export default function ListarProformasPage() {
  const endpoint = {
    slug: 'get-proformas',
    title: 'Listar proformas',
    method: 'GET' as const,
    path: '/proformas',
    definition: 'Lista proformas de forma paginada, con búsqueda por identificador o cliente y filtro por estado, dentro de la empresa del usuario autenticado.',
    whenToUse: 'Se usa cuando la aplicación necesita mostrar una tabla de proformas, buscar por identificador o por nombre e identificación del cliente, o filtrar por estado documental. Al usarlo, el usuario obtiene una página de resultados con el conteo total, donde cada proforma incluye su estructura completa con emisor, receptor, detalle, totales y documento PDF.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por prfmaidentificador, clntenombre o clnteidentificacion.' },
      { name: 'status', type: 'string', required: false, description: 'Estado de la proforma. Solo acepta emitida, pagada o anulada.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede listar proformas.' },
      { title: 'Solo permite listar proformas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'page y pageSize son obligatorios y deben ser enteros positivos.' },
      { title: 'Si se envía status, solo acepta emitida, pagada o anulada.' },
      { title: 'search busca coincidencias parciales en prfmaidentificador, clntenombre y clnteidentificacion.' },
      { title: 'El listado se ordena por fecha de registro descendente.' },
      { title: 'Cada elemento del listado devuelve la estructura completa de la proforma, no un resumen.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La búsqueda debe ser un texto', message: 'El query param search fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser un texto', message: 'El query param status fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser emitida, pagada o anulada', message: 'El query param status tiene un valor distinto de emitida, pagada o anulada.' },
      { status: 500, title: 'La página debe ser un entero positivo', message: 'page no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'El tamaño de página debe ser un entero positivo', message: 'pageSize no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para listar proformas.' },
    ],
    responseExample: `{
  "items": [
    {
      "proforma": {
        "prfmaid": "66ff3afe-65bb-49f2-80cf-ae279b7fcf5b",
        "prfmaidentificador": "FE01-002-001-34",
        "prfmaestado": "emitida",
        "prfmafchregistro": "2026-05-25T04:35:56.719Z",
        "prfmafchactualizacion": "2026-05-25T04:35:56.719Z",
        "emisor": {
          "empresa": { "emid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e", "emlogo": "http://localhost:3000/uploads/empresas/logo.png", "emrznsocial": "Ferreconst ElectroLuz K y B", "emruc": "1709639106001", "emcorreo": "electrokyb@gmail.com", "emcodigo": "FE01" },
          "sucursal": { "suid": "2079f9a4-2676-4601-9c87-cfb81edb70e4", "sunombre": "Sucursal Centro Historico Basilica", "suidentificador": "002" },
          "caja": { "cjid": "2dbe2030-46d6-4960-bd5e-fafb6719540f", "cjidentificador": "001" },
          "usuario": { "usid": "428331bb-b892-4bff-b9dc-26260c68e7f4", "usnombre": "Erick Nuñez", "usrol": "jefe" }
        },
        "receptor": {
          "cliente": { "clnteid": "f969e3c1-cd5f-4286-8b5a-81ae9badfa3e", "clntenombre": "Juan Perez", "clnteidentificacion": "1712345678", "clntecorreo": "juan.perez@email.com", "clntetelefono": "0987654321", "clntedireccion": "Av. Principal y Calle 10" }
        },
        "metodoPago": { "mpid": "12421636-dde1-44f1-b36c-9bd81bee22af", "mpnombre": "Efectivo" },
        "detalle": [ { "dprfmaid": "560214e7-69d2-487d-b959-aecc358582a9", "dprfmatipoitem": "manual", "producto": { "dprfmacodigo": null, "dprfmadescripcion": "Servicio de instalación y ajuste", "dprfmacantidad": 1, "dprfmapreciounitario": 10, "dprfmapreciototal": 10 } } ],
        "total": { "prfmasubtotal": 35, "prfmadescuento": 3, "prfmatotal": 32 },
        "documento": { "docnombre": "FE01-002-001-34_2026-05-25.pdf", "docurl": "http://localhost:3000/uploads/proformas/1709639106001/FE01-002-001-34_2026-05-25.pdf" }
      }
    }
  ],
  "page": 1,
  "pageSize": 10,
  "totalItems": 34,
  "totalPages": 4
}`,
    requestExample: `curl -X GET "\${getApiBaseUrl()}/proformas?page=1&pageSize=10&search=juan&status=emitida" \\
  -H "Authorization: Bearer <token>"`,
    notes: [
      'search y status son query params opcionales.',
      'Si no hay resultados para la página solicitada, items se devuelve como arreglo vacío.',
      'Cada elemento del listado devuelve la proforma completa, no un resumen corto.',
      'El listado está restringido a la empresa del usuario autenticado.',
    ],
  }

  return <ProformaListReference moduleTitle="Proforma" moduleSlug="proforma" endpoint={endpoint} />
}
