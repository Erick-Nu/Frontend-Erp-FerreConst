import { CategoryUpdateReference } from '@/components/docs/CategoryUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar categoría' }

export default function ActualizarCategoryPage() {
  const module = getModule('category')!

  const endpoint = {
    slug: 'update-category',
    title: 'Actualizar categoría',
    method: 'PATCH' as const,
    path: '/categories/:id',
    definition: 'Actualiza parcialmente los datos editables de una categoría de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita modificar el nombre, descripción o estado de una categoría existente. Al usarlo, el usuario obtiene la categoría actualizada con sus datos vigentes.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la categoría.' },
    ],
    body: [
      { name: 'ctgnombre', type: 'string', required: false, description: 'Nuevo nombre de la categoría.' },
      { name: 'ctgriadescripcion', type: 'string | null', required: false, description: 'Nueva descripción de la categoría; puede enviarse como null.' },
      { name: 'ctgriaestado', type: 'string', required: false, description: 'Nuevo estado de la categoría; acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo permite actualizar categorías de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'La categoría debe existir dentro de la empresa autenticada.' },
      { title: 'Una categoría con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envía ctgnombre, no puede estar vacío.' },
      { title: 'ctgnombre no puede repetirse en otra categoría de la misma empresa.' },
      { title: 'Si se envía ctgriadescripcion como texto, no puede estar vacía.' },
      { title: 'ctgriadescripcion puede enviarse como null.' },
      { title: 'Si se envía ctgriaestado, solo puede ser activo o inactivo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de categoría es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Categoría no encontrada', message: 'La categoría no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'El nombre de categoría es requerido', message: 'ctgnombre fue enviado vacío.' },
      { status: 500, title: 'La descripcion de categoría es requerida', message: 'ctgriadescripcion fue enviada como texto vacío.' },
      { status: 500, title: 'El estado de categoría es requerido', message: 'ctgriaestado fue enviado vacío.' },
      { status: 500, title: 'El estado de categoría debe ser activo, inactivo o eliminado', message: 'ctgriaestado tiene un valor no permitido.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar la categoría', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'Ya existe una categoría con ese nombre', message: 'Otra categoría de la misma empresa ya usa el ctgnombre enviado.' },
      { status: 500, title: 'La categoría eliminada no puede ser actualizada', message: 'La categoría existe, pero está en estado eliminado.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó operar sobre una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de categorías.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para actualizar categorías.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error updating category by id', message: 'Ocurrió un error interno al actualizar la categoría.' },
    ],
    responseExample: `{
  "ctgriaid": "3c871a9e-0f6b-4ac9-a18f-0ecfe8b96d90",
  "ctgriaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "ctgnombre": "Herramientas Eléctricas",
  "ctgriadescripcion": "Productos y equipos eléctricos",
  "ctgriafchregistro": "2026-05-21T18:40:00.000Z",
  "ctgriaestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/categories/3c871a9e-0f6b-4ac9-a18f-0ecfe8b96d90" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ctgnombre": "Herramientas Eléctricas",
    "ctgriadescripcion": "Productos y equipos eléctricos",
    "ctgriaestado": "activo"
}'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'El body debe incluir al menos un campo editable con un valor distinto al actual.',
      'ctgriadescripcion puede enviarse como null para limpiar la descripción.',
      'La comparación de nombres existentes se realiza ignorando mayúsculas, minúsculas y espacios extremos.',
      'Aunque el mensaje de validación menciona eliminado, la validación actual solo acepta activo o inactivo para ctgriaestado.',
    ]
  }

  return <CategoryUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
