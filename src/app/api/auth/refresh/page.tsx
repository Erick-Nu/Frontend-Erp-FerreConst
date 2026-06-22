import { AuthRefreshReference } from '@/components/docs/AuthRefreshReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Renovar sesión' }

export default function RefreshSessionPage() {
  const module = getModule('auth')

  if (!module) {
    throw new Error('Auth module not found')
  }

  const endpoint = {
    title: 'Renovar sesión',
    slug: 'refresh',
    method: 'POST' as const,
    path: '/auth/refresh',
    definition: 'Renueva la sesión usando un refreshToken válido y devuelve un nuevo par de tokens.',
    whenToUse:
      'Usa este endpoint cuando el accessToken expiró y el sistema necesita mantener la sesión activa sin pedir nuevamente las credenciales del usuario.',
    authentication: 'No requiere token JWT.',
    body: [
      {
        name: 'refreshToken',
        type: 'string',
        required: true,
        description: 'Token de refresco vigente que se usa para solicitar un nuevo accessToken y un nuevo refreshToken.',
      },
    ],
    businessRules: [
      {
        title: 'El cliente debe enviar un refreshToken vigente.',
      },
      {
        title: 'El backend valida el token usando su hash guardado en la base de datos.',
      },
      {
        title: 'El token no debe estar revocado ni expirado.',
      },
      {
        title: 'El usuario y la empresa asociados deben estar activos.',
      },
      {
        title: 'Si la renovación es correcta, el refresh token anterior se revoca y se emite uno nuevo.',
      },
      {
        title: 'El nuevo refresh token registra ip y user-agent cuando están disponibles.',
      },
    ],
    responseExample: `{
  "accessToken": "<new_jwt_access_token>",
  "refreshToken": "<new_opaque_refresh_token>"
}`,
    expectedErrors: [
      {
        status: 401,
        title: 'No autorizado',
        message: 'Ocurre cuando el refreshToken no existe, ya fue revocado o ya expiró.',
      },
      {
        status: 401,
        title: 'El usuario esta inactivo',
        message: 'Ocurre cuando el usuario asociado al token ya no está activo.',
      },
      {
        status: 401,
        title: 'La empresa esta inactiva',
        message: 'Ocurre cuando la empresa asociada al usuario ya no está activa.',
      },
      {
        status: 500,
        title: 'El token de refresco es requerido',
        message: 'Ocurre cuando no se envía refreshToken o se envía vacío.',
      },
      {
        status: 500,
        title: 'Error renovando la sesión',
        message: 'Ocurre si falla una operación interna al consultar, revocar o crear tokens.',
      },
    ],
    requestExample: `curl -X POST "${getApiBaseUrl()}/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<opaque_refresh_token>"
  }'`,
    notes: [
      'No envíes el header Authorization; este endpoint trabaja únicamente con refreshToken.',
      'Reemplaza siempre el refreshToken anterior por el nuevo valor recibido.',
      'Si recibes 401 Unauthorized, el usuario debe iniciar sesión nuevamente.',
      'Usa la misma variable de entorno que el resto de la documentación para la base URL.',
    ],
  }

  return <AuthRefreshReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
