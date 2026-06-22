import { ConfigListReference } from '@/components/docs/ConfigListReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Listar configuraciones' }

export default function ListarConfigsPage() {
  const module = getModule('config')!

  const endpoint = {
    slug: 'get-configs',
    title: 'Listar configuraciones',
    method: 'GET' as const,
    path: '/configs',
    definition: 'Obtiene todas las configuraciones de una empresa, ordenadas por clave, desde administración central.',
    whenToUse:
      'Se usa cuando un administrador necesita cargar todas las claves de configuración de una empresa para una pantalla de administración o para inicializar ajustes internos. Al usarlo, el usuario obtiene un arreglo con todas las configuraciones de la empresa indicada, ordenadas alfabéticamente por clave.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Solo permite acceso a usuarios con rol administrador. La empresa del usuario autenticado debe estar activa y ser empresa padre.',
    queryParams: [
      { name: 'companyId', type: 'string', required: false, description: 'Identificador de la empresa. Si no se envía, se usa la empresa del usuario autenticado.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol administrador puede consultar configuraciones.' },
      { title: 'La empresa del usuario autenticado debe ser empresa padre.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Si no se envía companyId, se consultan las configuraciones de la empresa del usuario autenticado.' },
      { title: 'Si se envía companyId, se consultan las configuraciones de la empresa indicada.' },
      { title: 'La respuesta no usa paginación; devuelve todas las configuraciones en un arreglo.' },
      { title: 'Los resultados se ordenan por cfclave en orden ascendente.' },
      { title: 'Si no existen configuraciones para la empresa, se devuelve un arreglo vacío.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'El companyId fue enviado vacío.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no es administrador', message: 'El usuario autenticado no tiene el rol requerido para consultar configuraciones.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'La empresa del usuario autenticado no es empresa padre.' },
    ],
    responseExample: `[
  {
    "cfid": "5b9d0e5e-fd3f-451d-bf68-4db51f52f6b0",
    "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "cfclave": "iva_porcentaje",
    "cfvalor": "15"
  },
  {
    "cfid": "6c3f8e47-cd2a-4f25-91d2-94cc2b8a6b1d",
    "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "cfclave": "moneda",
    "cfvalor": "USD"
  }
]`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/configs?companyId=4ff4db6b-f18f-4ecd-83b3-b997fa77a01e" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni body.',
      'companyId es un query param opcional; si no se envía, se usa la empresa del usuario autenticado.',
      'La respuesta es un arreglo simple, no un objeto paginado.',
    ],
  }

  return <ConfigListReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
