import { CategoryCreateReference } from '@/components/docs/CategoryCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear categoría' }

export default function CrearCategoryPage() {
  const module = getModule('category')!

  const endpoint = {
    slug: 'register-category',
    title: 'Crear categoría',
    method: 'POST' as const,
    path: '/categories',
    definition: 'Crea una nueva categoría dentro de la empresa indicada.',
    whenToUse:
      'Se usa cuando la aplicación necesita registrar una categoría para organizar el catálogo de productos. Al usarlo, el usuario obtiene la categoría creada con su identificador, descripción, estado y fecha de registro.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [],
    queryParams: [],
    body: [
      { name: 'ctgriaemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá la categoría.' },
      { name: 'ctgnombre', type: 'string', required: true, description: 'Nombre de la categoría.' },
      { name: 'ctgriadescripcion', type: 'string | null', required: false, description: 'Descripción de la categoría.' },
    ],
    businessRules: [
      { title: 'Solo permite crear categorías en la misma empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'ctgriaemid y ctgnombre son obligatorios.' },
      { title: 'ctgnombre no puede repetirse dentro de la misma empresa.' },
      { title: 'ctgriadescripcion puede enviarse como null.' },
      { title: 'La categoría se crea con estado activo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'No se envió ctgriaemid o se envió vacío.' },
      { status: 500, title: 'El nombre de categoría es requerido', message: 'No se envió ctgnombre o se envió vacío.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa indicada en ctgriaemid o la empresa del usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada a la solicitud está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'ctgriaemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de categorías.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para crear categorías.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Ya existe una categoría con ese nombre', message: 'Ya hay una categoría registrada con el mismo ctgnombre dentro de la empresa.' },
      { status: 500, title: 'Error saving category', message: 'Ocurrió un error interno al guardar la categoría.' },
      { status: 500, title: 'Error finding category by id', message: 'La categoría fue creada, pero ocurrió un error al consultar sus datos para devolver la respuesta.' },
    ],
    responseExample: `{
  "ctgriaid": "3c871a9e-0f6b-4ac9-a18f-0ecfe8b96d90",
  "ctgriaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "ctgnombre": "Herramientas Manuales",
  "ctgriadescripcion": "Productos para uso manual en ferretería",
  "ctgriafchregistro": "2026-05-21T18:40:00.000Z",
  "ctgriaestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/categories" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ctgriaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
    "ctgnombre": "Herramientas Manuales",
    "ctgriadescripcion": "Productos para uso manual en ferretería"
}'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta.',
      'Envía el body en formato JSON con el header Content-Type: application/json.',
      'El nombre de categoría debe ser único dentro de la empresa.',
      'La comparación de nombres existentes se realiza ignorando mayúsculas, minúsculas y espacios extremos.',
      'Si no tienes descripción, envía ctgriadescripcion como null o no envíes el campo.',
      'La respuesta devuelve los datos guardados de la categoría creada.',
    ]
  }

  return <CategoryCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
