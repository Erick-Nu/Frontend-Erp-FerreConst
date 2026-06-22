import { CompanyListReference } from '@/components/docs/CompanyListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar empresas' }

export default function ListarCompaniesPage() {
  const module = getModule('company')!

  const endpoint = {
    slug: 'get-companies',
    title: 'Listar empresas',
    method: 'GET' as const,
    path: '/companies',
    definition: 'Lista empresas hijas de forma paginada, con búsqueda por texto y filtro por estado, para administración central.',
    whenToUse:
      'Se usa cuando un administrador necesita consultar el listado de empresas hijas registradas en el sistema, aplicar búsqueda por razón social, RUC, correo o código, o filtrar por estado. Al usarlo, el usuario obtiene una página de resultados con el conteo total de empresas.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Solo permite acceso a usuarios con rol administrador. La empresa del usuario autenticado debe estar activa y ser empresa padre.',
    queryParams: [
      { name: 'page', type: 'string', required: true, description: 'Número de página. Debe ser un entero positivo.' },
      { name: 'pageSize', type: 'string', required: true, description: 'Cantidad de registros por página. Debe ser un entero positivo.' },
      { name: 'search', type: 'string', required: false, description: 'Texto opcional para buscar por razón social, RUC, correo o código.' },
      { name: 'status', type: 'string', required: false, description: 'Estado de la empresa. Solo acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol administrador puede listar empresas.' },
      { title: 'La empresa del usuario autenticado debe ser empresa padre.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'page y pageSize son obligatorios y deben ser enteros positivos.' },
      { title: 'Solo lista empresas con empadre = false (empresas hijas).' },
      { title: 'Si no se envía status, se excluyen las empresas con estado eliminado.' },
      { title: 'Si se envía status, solo acepta activo o inactivo.' },
      { title: 'search busca coincidencias parciales en razón social, RUC, correo y código.' },
      { title: 'El backend transforma emlogo a una URL pública completa.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La búsqueda debe ser un texto', message: 'El query param search fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser un texto', message: 'El query param status fue enviado como arreglo en lugar de texto.' },
      { status: 400, title: 'El estado debe ser activo o inactivo', message: 'El query param status tiene un valor distinto de activo o inactivo.' },
      { status: 500, title: 'La página debe ser un entero positivo', message: 'page no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'Page size must be a positive integer', message: 'pageSize no es un entero positivo o no fue enviado.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'La empresa del usuario autenticado no es empresa padre.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no es administrador', message: 'El usuario autenticado no tiene el rol requerido para listar empresas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
    ],
    responseExample: `{
  "items": [
    {
      "emid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
      "emruc": "1790012345001",
      "emrznsocial": "Ferreteria Central S.A.",
      "emcorreo": "contacto@ferreteriacentral.com",
      "emlogo": "http://localhost:3000/uploads/empresas/company.png",
      "emcodigo": "FC01",
      "emfchregistro": "2026-05-17T15:20:10.000Z",
      "emestado": "activo"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalItems": 57,
  "totalPages": 3
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/companies?page=1&pageSize=20&search=ferreteria&status=activo" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'search y status son query params opcionales.',
      'Si no hay resultados para la página solicitada, items se devuelve como arreglo vacío.',
      'El campo emlogo se devuelve como URL pública completa, lista para usar en etiquetas <img>.',
    ],
  }

  return <CompanyListReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
