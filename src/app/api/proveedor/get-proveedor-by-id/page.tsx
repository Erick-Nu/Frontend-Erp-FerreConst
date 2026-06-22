import { ProveedorByIdReference } from '@/components/docs/ProveedorByIdReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener Proveedor' }

export default function ObtenerProveedorPage() {
  const module = getModule('proveedor')!

  const endpoint = {
    slug: 'get-proveedor-by-id',
    title: 'Obtener Proveedor',
    method: 'GET' as const,
    path: '/proveedores/:id',
    definition: 'Obtiene el detalle de un proveedor por su identificador, dentro de la empresa del usuario autenticado, incluyendo sus relaciones de categoría y marca si existen.',
    whenToUse: 'Se usa cuando la aplicación necesita cargar los datos completos de un proveedor para una vista de detalle, un formulario de edición o una consulta puntual. Al usarlo, el usuario obtiene los datos del proveedor incluyendo su nombre, teléfono, correo y las relaciones resueltas de categoría y marca.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador del proveedor.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede consultar proveedores.' },
      { title: 'Solo permite consultar proveedores de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Las relaciones categoria y marca pueden ser null si el proveedor no las tiene asignadas.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de proveedor es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de proveedores.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar proveedores.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Proveedor no encontrado', message: 'No existe un proveedor con el id indicado dentro de la empresa del usuario autenticado.' },
    ],
    responseExample: `{
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
}`,
    requestExample: 'curl -X GET "${getApiBaseUrl()}/proveedores/a052ef32-3c4b-41da-871a-dfec99d8afa3" \\n  -H "Authorization: Bearer <token>"',
    notes: [
      'Este endpoint no recibe query params ni body.',
      'Solo devuelve proveedores que pertenecen a la empresa del usuario autenticado.',
      'categoria y marca pueden devolverse como null si el proveedor no tiene esas relaciones asignadas.',
    ],
  }

  return (
    <ProveedorByIdReference
      moduleTitle={module.title}
      moduleSlug={module.slug}
      endpoint={endpoint}
    />
  )
}
