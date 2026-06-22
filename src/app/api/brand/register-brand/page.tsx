import { BrandCreateReference } from '@/components/docs/BrandCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear marca' }

export default function CrearBrandPage() {
  const module = getModule('brand')!

  const endpoint = {
    slug: 'register-brand',
    title: 'Crear marca',
    method: 'POST' as const,
    path: '/brands',
    definition: 'Crea una nueva marca dentro de la empresa indicada.',
    whenToUse:
      'Se usa cuando la aplicación necesita registrar una marca para organizar el catálogo de productos. Al usarlo, el usuario obtiene la marca creada con su identificador, estado y fecha de registro.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [],
    queryParams: [],
    body: [
      { name: 'mrcemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá la marca.' },
      { name: 'mrcnombre', type: 'string', required: true, description: 'Nombre de la marca.' },
    ],
    businessRules: [
      { title: 'Solo permite crear marcas en la misma empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'mrcemid y mrcnombre son obligatorios.' },
      { title: 'mrcnombre no puede repetirse dentro de la misma empresa.' },
      { title: 'La marca se crea con estado activo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'No se envió mrcemid o se envió vacío.' },
      { status: 500, title: 'El nombre de marca es requerido', message: 'No se envió mrcnombre o se envió vacío.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa indicada en mrcemid o la empresa del usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada a la solicitud está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'mrcemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de marcas.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para crear marcas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Ya existe una marca con ese nombre', message: 'Ya hay una marca registrada con el mismo mrcnombre dentro de la empresa.' },
      { status: 500, title: 'Error saving brand', message: 'Ocurrió un error interno al guardar la marca.' },
      { status: 500, title: 'Error finding brand by id', message: 'La marca fue creada, pero ocurrió un error al consultar sus datos para devolver la respuesta.' },
    ],
    responseExample: `{
  "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
  "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mrcnombre": "Truper",
  "mrcfchregistro": "2026-05-21T20:30:00.000Z",
  "mrcestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/brands" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
    "mrcnombre": "Truper"
}'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta.',
      'Envía el body en formato JSON con el header Content-Type: application/json.',
      'El nombre de marca debe ser único dentro de la empresa.',
      'La comparación de nombres existentes se realiza ignorando mayúsculas, minúsculas y espacios extremos.',
      'La respuesta devuelve los datos guardados de la marca creada.',
    ]
  }

  return <BrandCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
