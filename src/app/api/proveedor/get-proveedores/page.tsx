import { ProveedorListReference } from '@/components/docs/ProveedorListReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Listar Proveedores' }

export default function ListarProveedoresPage() {
  const module = getModule('proveedor')!

  const endpoint = {
    slug: 'get-proveedores',
    title: 'Listar Proveedores',
    method: 'GET' as const,
    path: '/proveedores',
    definition: 'Lista proveedores de forma paginada, con búsqueda por nombre o correo y filtro por estado, dentro de la empresa del usuario autenticado.',
    whenToUse: 'Se usa cuando la aplicación necesita mostrar una tabla de proveedores, buscar por nombre o correo de contacto, o filtrar por estado. Al usarlo, el usuario obtiene una página de resultados con el conteo total de proveedores de su empresa, incluyendo las relaciones resueltas de categoría y marca.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por provnombre o provcorreo.' },
      { name: 'status', type: 'string', required: false, description: 'Estado del proveedor. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede listar proveedores.' },
      { title: 'Solo permite listar proveedores de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'page y pageSize son obligatorios y deben ser enteros positivos.' },
      { title: 'Si no se envía status, se excluyen los proveedores con estado eliminado.' },
      { title: 'Si se envía status, solo acepta activo o inactivo.' },
      { title: 'search busca coincidencias parciales en provnombre y provcorreo.' },
      { title: 'Las relaciones categoria y marca pueden ser null si el proveedor no las tiene asignadas.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La búsqueda debe ser un texto', message: 'El query param search fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser un texto', message: 'El query param status fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser activo o inactivo', message: 'El query param status tiene un valor distinto de activo o inactivo.' },
      { status: 500, title: 'La página debe ser un entero positivo', message: 'page no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'El tamaño de página debe ser un entero positivo', message: 'pageSize no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de proveedores.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para listar proveedores.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "items": [
    {
      "provid": "a052ef32-3c4b-41da-871a-dfec99d8afa3",
      "provemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
      "categoria": {
        "ctgriaid": "85cdca30-3008-466b-b896-52d588cdda10",
        "ctgnombre": "Pintura",
        "ctgriadescripcion": null
      },
      "marca": {
        "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
        "mrcnombre": "Truper"
      },
      "provnombre": "DeWalt Centro Historico",
      "provtelefono": "0984653471",
      "provcorreo": null,
      "provfchregistro": "2026-05-23T17:29:01.621Z",
      "provestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 5,
  "totalPages": 1
}`,
    requestExample: 'curl -X GET "${getApiBaseUrl()}/proveedores?page=1&pageSize=20&search=dewalt&status=activo" \\\n  -H "Authorization: Bearer <token>"',
    notes: [
      'search y status son query params opcionales.',
      'Si no hay resultados para la página solicitada, items se devuelve como arreglo vacío.',
      'El listado está restringido a la empresa del usuario autenticado.',
      'categoria y marca pueden devolverse como null si el proveedor no tiene esas relaciones.',
    ],
  }

  return (
    <ProveedorListReference
      moduleTitle={module.title}
      moduleSlug={module.slug}
      endpoint={endpoint}
    />
  )
}
