import { MedidaCreateReference } from '@/components/docs/MedidaCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear Medida' }

export default function CrearMedidaPage() {
  const module = getModule('medida')!

  const endpoint = {
    slug: 'register-medida',
    title: 'Crear Medida',
    method: 'POST' as const,
    path: '/medidas',
    definition: 'Registra una nueva unidad de medida dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita crear una nueva unidad de medida para usar en productos, stock u otros procesos del inventario. Al usarlo, el usuario obtiene los datos completos de la medida creada, incluyendo su identificador único y fecha de registro.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    body: [
      { name: 'mdiaemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá la medida; debe coincidir con la empresa del usuario autenticado.' },
      { name: 'mdianombre', type: 'string', required: true, description: 'Nombre de la medida; debe ser único dentro de la empresa.' },
      { name: 'mdiaabreviatura', type: 'string', required: true, description: 'Abreviatura de la medida; debe ser única dentro de la empresa.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede registrar medidas.' },
      { title: 'Solo permite crear medidas en la misma empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Todos los campos del body son obligatorios.' },
      { title: 'mdianombre no puede repetirse dentro de la misma empresa.' },
      { title: 'mdiaabreviatura no puede repetirse dentro de la misma empresa.' },
      { title: 'La medida se crea con estado activo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'mdiaemid fue enviado vacío.' },
      { status: 500, title: 'El nombre de medida es requerido', message: 'mdianombre fue enviado vacío.' },
      { status: 500, title: 'La abreviatura de medida es requerida', message: 'mdiaabreviatura fue enviado vacío.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'mdiaemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de medidas.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para crear medidas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Ya existe una medida con ese nombre', message: 'Ya hay una medida registrada con el mismo mdianombre dentro de la empresa.' },
      { status: 500, title: 'Ya existe una medida con esa abreviatura', message: 'Ya hay una medida registrada con la misma mdiaabreviatura dentro de la empresa.' },
      { status: 500, title: 'La medida no fue creada', message: 'La medida fue guardada, pero no pudo consultarse para devolver la respuesta.' },
      { status: 500, title: 'Error saving medida', message: 'Ocurrió un error interno al guardar la medida.' },
    ],
    responseExample: `{
  "mdiaid": "7f4f7a99-f7dc-4b10-9326-9e4ec8300e89",
  "mdiaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mdianombre": "Unidad",
  "mdiaabreviatura": "UND",
  "mdiafchregistro": "2026-05-23T17:29:01.621Z",
  "mdiaestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/medidas" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "mdiaemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
    "mdianombre": "Unidad",
    "mdiaabreviatura": "UND"
  }'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'mdianombre y mdiaabreviatura deben ser únicos dentro de la empresa; pueden repetirse entre empresas distintas.',
      'mdiaemid debe coincidir con la empresa del usuario autenticado; no se permite crear medidas para otras empresas.',
    ],
  }

  return <MedidaCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
