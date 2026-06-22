import { ConfigByKeyReference } from '@/components/docs/ConfigByKeyReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener configuración por clave' }

export default function ListarConfigByKeyPage() {
  const module = getModule('config')!

  const endpoint = {
    slug: 'get-config-by-key',
    title: 'Obtener configuración por clave',
    method: 'GET' as const,
    path: '/configs/:configKey',
    definition: 'Obtiene una configuración específica por su clave, dentro de una empresa indicada, desde administración central.',
    whenToUse:
      'Se usa cuando un administrador necesita consultar el valor de una clave de configuración puntual para una empresa específica. Al usarlo, el usuario obtiene los datos completos de la configuración, incluyendo su identificador único, empresa, clave y valor.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Solo permite acceso a usuarios con rol administrador. La empresa del usuario autenticado debe estar activa y ser empresa padre.',
    pathParams: [
      { name: 'configKey', type: 'string', required: true, description: 'Clave de configuración.' },
    ],
    queryParams: [
      { name: 'companyId', type: 'string', required: true, description: 'Identificador de la empresa donde se buscará la clave.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol administrador puede consultar configuraciones.' },
      { title: 'La empresa del usuario autenticado debe ser empresa padre.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'configKey y companyId son obligatorios.' },
      { title: 'La búsqueda se realiza por la combinación de companyId y configKey.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La clave de configuración es requerida', message: 'No se envió el parámetro configKey en la ruta.' },
      { status: 400, title: 'El id de empresa es requerido', message: 'No se envió el query param companyId.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no es administrador', message: 'El usuario autenticado no tiene el rol requerido para consultar configuraciones.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'La empresa del usuario autenticado no es empresa padre.' },
      { status: 500, title: 'Configuración no encontrada', message: 'No existe una configuración con la combinación de companyId y configKey indicada.' },
    ],
    responseExample: `{
  "cfid": "5b9d0e5e-fd3f-451d-bf68-4db51f52f6b0",
  "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "cfclave": "iva_porcentaje",
  "cfvalor": "15"
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/configs/iva_porcentaje?companyId=4ff4db6b-f18f-4ecd-83b3-b997fa77a01e" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body.',
      'companyId se envía como query param en la URL.',
      'La búsqueda es exacta por la combinación de empresa y clave; no se realizan búsquedas parciales.',
    ],
  }

  return <ConfigByKeyReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
