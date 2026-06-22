import { ConfigUpdateReference } from '@/components/docs/ConfigUpdateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar configuración' }

export default function ActualizarConfigPage() {
  const module = getModule('config')!

  const endpoint = {
    slug: 'update-config',
    title: 'Actualizar configuración',
    method: 'PATCH' as const,
    path: '/configs/:configKey',
    definition: 'Actualiza el valor de una configuración existente, identificada por su clave y empresa, desde administración central.',
    whenToUse:
      'Se usa cuando un administrador necesita modificar el valor de una clave de configuración ya registrada para una empresa. Al usarlo, el usuario obtiene los datos completos de la configuración actualizada, incluyendo su identificador único, empresa, clave y nuevo valor.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Solo permite acceso a usuarios con rol administrador. La empresa del usuario autenticado debe estar activa y ser empresa padre.',
    pathParams: [
      { name: 'configKey', type: 'string', required: true, description: 'Clave de configuración.' },
    ],
    queryParams: [
      { name: 'companyId', type: 'string', required: true, description: 'Identificador de la empresa donde se actualizará la clave.' },
    ],
    body: [
      { name: 'cfvalor', type: 'string', required: true, description: 'Nuevo valor para la clave de configuración; debe ser diferente al valor actual.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol administrador puede actualizar configuraciones.' },
      { title: 'La empresa del usuario autenticado debe ser empresa padre.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'configKey, companyId y cfvalor son obligatorios.' },
      { title: 'La actualización se realiza por la combinación de companyId y configKey.' },
      { title: 'Si el valor enviado es igual al valor actual, la actualización se rechaza.' },
      { title: 'Este endpoint solo actualiza cfvalor; no permite cambiar la clave ni la empresa.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La clave de configuración es requerida', message: 'No se envió el parámetro configKey en la ruta.' },
      { status: 400, title: 'El id de empresa es requerido', message: 'No se envió el query param companyId.' },
      { status: 404, title: 'Configuración no encontrada', message: 'No existe una configuración con la combinación de companyId y configKey indicada.' },
      { status: 500, title: 'El valor de configuración es requerido', message: 'cfvalor fue enviado vacío.' },
      { status: 500, title: 'Al menos un campo es requerido para actualizar la configuración', message: 'El cfvalor enviado es igual al valor actual de la configuración.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no es administrador', message: 'El usuario autenticado no tiene el rol requerido para actualizar configuraciones.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'La empresa del usuario autenticado no es empresa padre.' },
    ],
    responseExample: `{
  "cfid": "5b9d0e5e-fd3f-451d-bf68-4db51f52f6b0",
  "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "cfclave": "iva_porcentaje",
  "cfvalor": "16"
}`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/configs/iva_porcentaje?companyId=4ff4db6b-f18f-4ecd-83b3-b997fa77a01e" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "cfvalor": "16"
  }'`,
    notes: [
      'Este endpoint solo actualiza el campo cfvalor; no permite modificar cfclave ni cfemid.',
      'companyId se envía como query param en la URL.',
      'Si el nuevo valor es igual al valor actual, el backend responde con error.',
    ],
  }

  return <ConfigUpdateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
