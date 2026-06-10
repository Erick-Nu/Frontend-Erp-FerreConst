import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Login' }

export default function LoginPage() {
  const module = getModule('auth')!
  
  const endpoint = {
    slug: 'login',
    title: 'Login',
    method: 'POST' as const,
    path: '/auth/login',
    summary: 'Inicia sesión de usuario y retorna un accessToken y un refreshToken.',
    status: 'documented' as const,
    authentication: 'No requiere token JWT.',
    contentTypes: ["application/json"],
    contentType: 'application/json',
    headers: [

    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [
          { name: 'emruc', type: 'string', required: true, description: 'RUC de la empresa.' },
          { name: 'usapodo', type: 'string', required: true, description: 'apodo del usuario.' },
          { name: 'uspassword', type: 'string', required: true, description: 'contraseña del usuario.' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
  "emruc": "1709639106001",
  "usapodo": "jperez",
  "uspassword": "secreto123"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "accessToken": "<jwt_access_token>",
  "refreshToken": "<opaque_refresh_token>",
  "company": {
    "emid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "emruc": "1709639106001",
    "emrznsocial": "Ferreconst ElectroLuz K y B",
    "emlogo": "https://api.tudominio.com/uploads/empresas/company.png",
    "emestado": "activo",
    "empadre": false
  },
  "user": {
    "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
    "usemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "usnombre": "Juan Perez",
    "usapodo": "jperez",
    "uscorreo": "juan.perez@empresa.com",
    "usimagen": "https://api.tudominio.com/uploads/usuarios/user.png",
    "usrol": "jefe",
    "usestado": "activo"
  }
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'accessToken se usa para endpoints protegidos (Authorization: Bearer <token>).',
    'refreshToken se usa para renovar sesión en POST /auth/refresh.',
    'El backend valida usuario y empresa en estado activo.',
    'El backend registra metadatos del token de refresco con ip y user-agent cuando están disponibles.'
    ],
    errors: [
    { status: 401, title: 'Credenciales inválidas' },
    { status: 429, title: 'Bloqueo temporal por 3 intentos fallidos' },
    { status: 500, title: 'Company RUC is required', message: 'RUC ausente' },
    { status: 500, title: 'RUC must be valid', message: 'RUC inválido' },
    { status: 500, title: 'Nickname is required', message: 'usapodo ausente' },
    { status: 500, title: 'Password is required', message: 'uspassword ausente' },
    { status: 500, title: 'User is inactive', message: 'Usuario inactivo' },
    { status: 500, title: 'Company is inactive', message: 'Empresa inactiva' },
    { status: 500, title: 'Error inesperado' }
    ],
    notes: [
    'El bloqueo temporal se aplica por combinación emruc + usapodo + ip.',
    'Después de 3 intentos fallidos consecutivos, el login se bloquea por 15 minutos.',
    'El conteo de intentos también aplica cuando el usuario no existe, para evitar enumeración de cuentas.',
    'Un login exitoso reinicia el contador y desbloquea la combinación evaluada.',
    'El mensaje del bloqueo es Too many failed login attempts. Try again in 15 minutes.'
    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
