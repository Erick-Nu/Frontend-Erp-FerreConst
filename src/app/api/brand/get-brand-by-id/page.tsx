import { BrandByIdReference } from '@/components/docs/BrandByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener marca' }

export default function ObtenerBrandPage() {
  const module = getModule('brand')!

  const endpoint = {
    slug: 'get-brand-by-id',
    title: 'Obtener marca',
    method: 'GET' as const,
    path: '/brands/:id',
    definition: 'Obtiene el detalle de una marca por su identificador dentro de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita consultar la información completa de una marca específica, por ejemplo para mostrar su detalle o cargar sus datos en una pantalla de edición. Al usarlo, el usuario obtiene los datos registrados de la marca solicitada.',
    status: 'documented' as const,
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la marca.' },
    ],
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    businessRules: [
      { title: 'Solo permite consultar marcas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol jefe o empleado.' },
      { title: 'La marca debe existir dentro de la empresa autenticada.' },
      { title: 'El identificador id corresponde al campo mrcid de la marca.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de marca es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 500, title: 'Marca no encontrada', message: 'La marca no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a información de una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de marcas.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar marcas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error finding brand by id', message: 'Ocurrió un error interno al consultar la marca por identificador.' },
    ],
    responseExample: `{
  "mrcid": "5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9",
  "mrcemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "mrcnombre": "Truper",
  "mrcfchregistro": "2026-05-21T20:30:00.000Z",
  "mrcestado": "activo"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/brands/5d2f2f91-e1d9-4f3f-b2ad-35f54f9500b9" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body.',
      'Envía el identificador de la marca en la ruta, reemplazando :id.',
      'Usa este endpoint para consultar una sola marca; para listados paginados usa GET /brands.',
      'La respuesta incluye el estado actual de la marca en mrcestado.',
    ]
  }

  return <BrandByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
