import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Crear usuario' }

export default function CrearUserPage() {
  const module = getModule('user')!
  
  const endpoint = {
    slug: 'register-user',
    title: 'Crear usuario',
    method: 'POST' as const,
    path: '/users',
    summary: 'Registra un nuevo usuario.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json","multipart/form-data"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [
          { name: 'usemid', type: 'string', required: false, description: 'id de la empresa a la que pertenecerá el usuario.' },
          { name: 'usnombre', type: 'string', required: false, description: 'nombre del usuario.' },
          { name: 'usapodo', type: 'string', required: false, description: 'apodo (nickname) del usuario.' },
          { name: 'uscorreo', type: 'string', required: false, description: 'correo del usuario.' },
          { name: 'uspassword', type: 'string', required: false, description: 'contraseña (mínimo 8 caracteres).' },
          { name: 'usrol', type: 'string', required: false, description: 'rol del usuario (administrador, jefe, empleado).' }
    ],
    bodyGroups: [],
    curlExample: `curl -X POST https://api.tudominio.com/users \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "usemid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "usnombre": "Juan Perez",
  "usapodo": "jperez",
  "uscorreo": "juan.perez@empresa.com",
  "uspassword": "secreto123",
  "usrol": "empleado"
}'`,
    responses: [
      {
        status: 201,
        label: 'Created',
        example: `{
  "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
  "usemid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "usnombre": "Juan Perez",
  "usapodo": "jperez",
  "uscorreo": "juan.perez@empresa.com",
  "usimagen": "https://api.tudominio.com/uploads/usuarios/user.png",
  "usrol": "empleado",
  "usfchregistro": "2026-05-23T17:29:01.621Z",
  "usestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Campo: imagen',
    'Formatos permitidos: .png, .jpg',
    'Tamaño máximo: 5MB',
    'Si no se envía, se usa imagen por defecto.',
    'Si no se envía imagen, el backend guarda la ruta por defecto /uploads/usuarios/user.png.',
    'El backend transforma usimagen a URL pública completa.',
    'Si el usuario autenticado crea dentro de su misma empresa, solo puede hacerlo si su rol es jefe.',
    'En creación dentro de la misma empresa no se permite crear usuarios con rol administrador.',
    'Si el usuario autenticado crea para otra empresa, debe ser administrador y su empresa autenticada debe ser empresa padre.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 500, title: 'Company id is required', message: 'usemid ausente o vacío' },
    { status: 500, title: 'Name is required, Name must contain only letters and spaces', message: 'usnombre ausente o inválido' },
    { status: 500, title: 'Nickname is required', message: 'usapodo ausente o vacío' },
    { status: 500, title: 'Email is required, Email must be valid', message: 'uscorreo ausente o inválido' },
    { status: 500, title: 'Password is required, Password must be at least 8 characters', message: 'uspassword ausente o inválida' },
    { status: 500, title: 'Role is required, Role must be valid', message: 'usrol ausente o inválido' },
    { status: 500, title: 'Image size exceeds the allowed limit, Only PNG and JPG images are allowed', message: 'Imagen inválida' },
    { status: 500, title: 'Company code is not invalid', message: 'Empresa autenticada inexistente' },
    { status: 500, title: 'Company does not exist', message: 'Empresa destino inexistente' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'User is not active', message: 'Usuario autenticado inactivo' },
    { status: 500, title: 'User is not admin, Company is not parent', message: 'Crear para otra empresa sin permisos' },
    { status: 500, title: 'User is not jefe', message: 'Crear en la misma empresa sin rol jefe' },
    { status: 500, title: 'Role must be jefe or empleado', message: 'Crear rol administrador dentro de la misma empresa' },
    { status: 500, title: 'User already exists with that email', message: 'Correo ya registrado' },
    { status: 500, title: 'User already exists with that nickname', message: 'Apodo ya registrado en la empresa' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
