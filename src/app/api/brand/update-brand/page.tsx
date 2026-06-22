import { BrandUpdateReference } from '@/components/docs/BrandUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar marca' }

export default function ActualizarBrandPage() {
  const module = getModule('brand')!

  const endpoint = {
    slug: 'update-brand',
    title: 'Actualizar marca',
    method: 'PATCH' as const,
    path: '/brands/:id',
    definition: 'Actualiza parcialmente los datos editables de una marca de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita modificar el nombre o estado de una marca existente. Al usarlo, el usuario obtiene la marca actualizada con sus datos vigentes.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la marca.' },
    ],
    body: [
      { name: 'mrcnombre', type: 'string', required: false, description: 'Nuevo nombre de la marca.' },
      { name: 'mrcestado', type: 'string', required: false, description: 'Nuevo estado de la marca; acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo permite actualizar marcas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'La marca debe existir dentro de la empresa autenticada.' },
      { title: 'Una marca con estado eliminado no puede actualizarse.' },
      { title: 'Debe enviarse al menos un campo editable con un valor diferente al actual.' },
      { title: 'Si se envía mrcnombre, no puede estar vacío.' },
      { title: 'mrcnombre no puede repetirse en otra marca de la misma empresa.' },
      { title: 'Si se envía mrcestado, solo puede ser activo o inactivo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de marca es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Marca no encontrada', message: 'La marca no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'El nombre de marca es requerido', message: 'mrcnombre fue enviado vacío.' },
      { status: 500, title: 'El estado de marca es requerido', message: 'mrcestado fue enviado vacío.' },
      { status: 500, title: 'El estado de marca debe ser activo, inactivo o eliminado', message: 'mrcestado tiene un valor no permitido.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar la marca', message: 'No se envió ningún campo editable o todos los valores enviados son iguales a los actuales.' },
      { status: 500, title: 'Ya existe una marca con ese nombre', message: 'Otra marca de la misma empresa ya usa el mrcnombre enviado.' },
      { status: 500, title: 'La marca eliminada no puede ser actualizada', message: 'La marca existe, pero está en estado eliminado.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó operar sobre una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de marcas.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para actualizar marcas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error updating brand by id', message: 'Ocurrió un error interno al actualizar la marca.' },
    ],
    responseExample: `{
  "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
  "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mrcnombre": "Truper Pro",
  "mrcfchregistro": "2026-05-21T20:30:00.000Z",
  "mrcestado": "activo"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/brands/5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "mrcnombre": "Truper Pro",
    "mrcestado": "activo"
}'`,
    notes: [
      'Este endpoint no recibe query params.',
      'Envía solo los campos que deseas actualizar.',
      'El body debe incluir al menos un campo editable con un valor distinto al actual.',
      'La comparación de nombres existentes se realiza ignorando mayúsculas, minúsculas y espacios extremos.',
      'Aunque el mensaje de validación menciona eliminado, la validación actual solo acepta activo o inactivo para mrcestado.',
    ]
  }

  return <BrandUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
