import { MedidaByIdReference } from '@/components/docs/MedidaByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener Medida' }

export default function ObtenerMedidaPage() {
  const module = getModule('medida')!

  const endpoint = {
    slug: 'get-medida-by-id',
    title: 'Obtener Medida',
    method: 'GET' as const,
    path: '/medidas/:id',
    definition: 'Obtiene el detalle de una medida por su identificador, dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita cargar los datos completos de una medida para una vista de detalle, un formulario de edición o una consulta puntual. Al usarlo, el usuario obtiene los datos de la medida incluyendo su nombre, abreviatura, estado y fecha de registro.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la medida.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede consultar medidas.' },
      { title: 'Solo permite consultar medidas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La búsqueda se realiza por la combinación de id y la empresa del usuario autenticado.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de medida es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de medidas.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar medidas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Medida no encontrada', message: 'No existe una medida con el id indicado dentro de la empresa del usuario autenticado.' },
    ],
    responseExample: `{
  "mdiaid": "7f4f7a99-f7dc-4b10-9326-9e4ec8300e89",
  "mdiaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mdianombre": "Unidad",
  "mdiaabreviatura": "UND",
  "mdiafchregistro": "2026-05-23T17:29:01.621Z",
  "mdiaestado": "activo"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/medidas/7f4f7a99-f7dc-4b10-9326-9e4ec8300e89" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe query params ni body.',
      'Solo devuelve medidas que pertenecen a la empresa del usuario autenticado.',
    ],
  }

  return <MedidaByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
