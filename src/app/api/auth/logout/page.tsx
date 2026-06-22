import { AuthLogoutReference } from '@/components/docs/AuthLogoutReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Logout' }

export default function LogoutPage() {
  const module = getModule('auth')

  if (!module) {
    throw new Error('Auth module not found')
  }

  const endpoint = {
    title: 'Logout',
    slug: 'logout',
    method: 'POST' as const,
    path: '/auth/logout',
    definition: 'Cierra la sesión del usuario revocando el refreshToken enviado.',
    whenToUse:
      'Usa este endpoint cuando el usuario decide cerrar sesión y el sistema necesita invalidar el refreshToken actual para evitar que se generen nuevos tokens de acceso desde esa sesión.',
    authentication: 'No requiere token JWT.',
    body: [{ name: 'refreshToken', type: 'string', required: true, description: 'Token de refresco que se desea revocar para cerrar la sesión.' }],
    businessRules: [
      {
        title: 'Se debe enviar el refreshToken de la sesión actual.',
      },
      {
        title: 'El backend revoca el token usando su hash.',
      },
      {
        title: 'Si el token no existe o ya fue revocado, la respuesta sigue siendo correcta.',
      },
      {
        title: 'El accessToken no se revoca en el servidor.',
        description: 'El cliente debe eliminarlo localmente después del cierre de sesión.',
      },
    ],
    responseExample: `{
  "message": "Session closed successfully"
}`,
    expectedErrors: [
      {
        status: 500,
        title: 'El token de refresco es requerido',
        message: 'Ocurre cuando no se envía refreshToken o se envía vacío.',
      },
      {
        status: 500,
        title: 'Error revocando el token de refresco',
        message: 'Ocurre si falla la revocación por un error inesperado en el servidor o en la base de datos.',
      },
    ],
    requestExample: `curl -X POST "${getApiBaseUrl()}/auth/logout" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<opaque_refresh_token>"
  }'`,
    notes: [
      'Llama este endpoint antes de limpiar la sesión en el cliente.',
      'Después de una respuesta exitosa, elimina accessToken y refreshToken.',
      'No es necesario enviar el header Authorization.',
      'Usa la misma variable de entorno que el resto de la documentación para la base URL.',
    ],
  }

  return <AuthLogoutReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
