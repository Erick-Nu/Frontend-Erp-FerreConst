import { CategoryByIdReference } from '@/components/docs/CategoryByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener categoría' }

export default function ObtenerCategoryPage() {
  const module = getModule('category')!

  const endpoint = {
    slug: 'get-category-by-id',
    title: 'Obtener categoría',
    method: 'GET' as const,
    path: '/categories/:id',
    definition: 'Obtiene el detalle de una categoría por su identificador dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita consultar la información completa de una categoría específica, por ejemplo para mostrar su detalle o cargar sus datos en una pantalla de edición. Al usarlo, el usuario obtiene los datos registrados de la categoría solicitada.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la categoría.' },
    ],
    businessRules: [
      { title: 'Solo permite consultar categorías de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'La categoría debe existir dentro de la empresa autenticada.' },
      { title: 'El identificador id corresponde al campo ctgriaid de la categoría.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de categoría es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'Categoría no encontrada', message: 'La categoría no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a información de una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de categorías.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar categorías.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error finding category by id', message: 'Ocurrió un error interno al consultar la categoría por identificador.' },
    ],
    responseExample: `{
  "ctgriaid": "3c871a9e-0f6b-4ac9-a18f-0ecfe8b96d90",
  "ctgriaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "ctgnombre": "Herramientas Manuales",
  "ctgriadescripcion": "Productos para uso manual en ferretería",
  "ctgriafchregistro": "2026-05-21T18:40:00.000Z",
  "ctgriaestado": "activo"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/categories/3c871a9e-0f6b-4ac9-a18f-0ecfe8b96d90" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body.',
      'Envía el identificador de la categoría en la ruta, reemplazando :id.',
      'Usa este endpoint para consultar una sola categoría; para listados paginados usa GET /categories.',
      'El campo ctgriadescripcion puede venir como null si no fue registrado.',
      'La respuesta incluye el estado actual de la categoría en ctgriaestado.',
    ]
  }

  return <CategoryByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
