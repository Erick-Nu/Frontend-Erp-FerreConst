import { CompanyByIdReference } from '@/components/docs/CompanyByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener empresa' }

export default function ObtenerCompanyPage() {
  const module = getModule('company')!

  const endpoint = {
    slug: 'get-company-by-id',
    title: 'Obtener empresa',
    method: 'GET' as const,
    path: '/companies/:id',
    definition: 'Obtiene el detalle de una empresa por su identificador, limitado a la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita cargar la información completa de la empresa del usuario autenticado para una vista de detalle, un formulario de edición o el perfil corporativo. Al usarlo, el usuario obtiene los datos completos de la empresa incluyendo la URL pública del logo.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol administrador, jefe o empleado, pero solo sobre la misma empresa del usuario autenticado.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la empresa.' },
    ],
    businessRules: [
      { title: 'Solo permite consultar la empresa del usuario autenticado; no permite consultar otras empresas.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'El backend transforma emlogo a una URL pública completa.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de empresa es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Empresa no encontrada', message: 'La empresa consultada no existe.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El id enviado no coincide con la empresa del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de empresas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Empresa no encontrada', message: 'La empresa solicitada no fue encontrada en la base de datos.' },
    ],
    responseExample: `{
  "emid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "emruc": "1790012345001",
  "emrznsocial": "Ferreteria Central S.A.",
  "emcorreo": "contacto@ferreteriacentral.com",
  "emlogo": "http://localhost:3000/uploads/empresas/company.png",
  "emcodigo": "FC01",
  "emfchregistro": "2026-05-17T15:20:10.000Z",
  "emestado": "activo"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/companies/0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe query params ni body.',
      'Solo devuelve información de la empresa del usuario autenticado; no permite consultas administrativas globales.',
      'El campo emlogo se devuelve como URL pública completa, lista para usar en etiquetas <img>.',
    ],
  }

  return <CompanyByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
