import { AuthLoginReference } from '@/components/docs/AuthLoginReference'
import type { LoginEndpoint } from '@/components/docs/AuthLoginReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Login' }

export default function LoginPage() {
  const module = getModule('auth')

  if (!module) {
    throw new Error('Auth module not found')
  }

  const endpoint: LoginEndpoint = {
    title: 'Login',
    slug: 'login',
    method: 'POST' as const,
    path: '/auth/login',
    definition: 'Inicia sesión de usuario y emite un accessToken junto con un refreshToken.',
    whenToUse:
      'Usa este endpoint cuando un usuario necesita ingresar al sistema con el RUC de la empresa, su apodo y su contraseña. Si las credenciales son válidas, obtiene los tokens necesarios para mantener la sesión activa y consumir endpoints protegidos.',
    authentication: 'No requiere token JWT previo.',
    body: [
      { name: 'emruc', type: 'string', required: true, description: 'RUC de la empresa a la que pertenece el usuario.' },
      { name: 'usapodo', type: 'string', required: true, description: 'Apodo del usuario que desea iniciar sesión.' },
      { name: 'uspassword', type: 'string', required: true, description: 'Contraseña del usuario.' },
    ],
    businessRules: [
      {
        title: 'Validación de acceso',
        description: 'La empresa y el usuario deben coincidir para permitir el ingreso.',
      },
      {
        title: 'Estado de la empresa',
        description: 'La empresa debe estar activa.',
      },
      {
        title: 'Estado del usuario',
        description: 'El usuario debe estar activo.',
      },
      {
        title: 'Acceso concedido',
        description: 'Si las credenciales son correctas, el sistema entrega tokens para continuar la sesión.',
      },
      {
        title: 'Protección de acceso',
        description: 'Si hay varios intentos fallidos, el acceso se bloquea por un tiempo.',
      },
    ],
    responseExample: `{
  "accessToken": "<jwt_access_token>",
  "refreshToken": "<opaque_refresh_token>",
  "company": {
    "emid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "emruc": "1709639106001",
    "emrznsocial": "Ferreconst ElectroLuz K y B",
    "emlogo": "${getApiBaseUrl()}/uploads/empresas/company.png",
    "emestado": "activo",
    "empadre": false
  },
  "user": {
    "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
    "usemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "usnombre": "Juan Perez",
    "usapodo": "jperez",
    "uscorreo": "juan.perez@empresa.com",
    "usimagen": "${getApiBaseUrl()}/uploads/usuarios/user.png",
    "usrol": "jefe",
    "usestado": "activo"
  }
}`,
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'Las credenciales enviadas no son válidas.' },
      { status: 429, title: 'Demasiados intentos fallidos', message: 'Se superó el límite de intentos permitidos; intente de nuevo en 15 minutos.' },
      { status: 500, title: 'El RUC de la empresa es requerido', message: 'El body no incluyó el campo obligatorio emruc.' },
      { status: 500, title: 'El RUC debe ser válido', message: 'El valor enviado en emruc no tiene un formato válido.' },
      { status: 500, title: 'El apodo es requerido', message: 'El body no incluyó el campo obligatorio usapodo.' },
      { status: 500, title: 'La contraseña es requerida', message: 'El body no incluyó el campo obligatorio uspassword.' },
      { status: 500, title: 'El usuario esta inactivo', message: 'El usuario existe, pero no está habilitado para iniciar sesión.' },
      { status: 500, title: 'La empresa esta inactiva', message: 'La empresa existe, pero no está habilitada para permitir el ingreso de usuarios.' },
    ],
    requestExample: `curl -X POST "${getApiBaseUrl()}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "emruc": "1709639106001",
    "usapodo": "jperez",
    "uspassword": "secreto123"
  }'`,
    notes: [
      'Guarda el accessToken para enviarlo en endpoints protegidos con el formato Authorization: Bearer <token>.',
      'Guarda el refreshToken para renovar la sesión con POST /auth/refresh.',
      'Si el usuario cierra sesión, deja de usar el refreshToken anterior.',
      'Las credenciales inválidas responden con código HTTP 401.',
    ],
  }

  return <AuthLoginReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
