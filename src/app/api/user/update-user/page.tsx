import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Actualizar usuario' }

export default function ActualizarUserPage() {
  const module = getModule('user')!
  
  const endpoint = {
    slug: 'update-user',
    title: 'Actualizar User',
    method: 'PATCH' as const,
    path: '/users/:id',
    summary: 'Actualiza los datos de un usuario y retorna el usuario con los valores actualizados.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: ["application/json","multipart/form-data"],
    contentType: 'application/json',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [
          { name: 'id', type: 'string', required: false, description: 'identificador del usuario.' }
    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X PATCH https://api.tudominio.com/users/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "usnombre": "Juan Perez",
  "uscorreo": "juan.perez@empresa.com",
  "usrol": "empleado"
}'`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
  "usemid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "usnombre": "Juan Perez",
  "usapodo": "jperez",
  "uscorreo": "juan.perez@empresa.com",
  "usimagen": "https://api.tudominio.com/uploads/usuarios/user.png",
  "usrol": "empleado",
  "usfchregistro": "2026-05-18T18:20:10.000Z",
  "usestado": "activo"
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Campo: imagen',
    'Formatos permitidos: .png, .jpg',
    'Tamaño máximo: 5MB',
    'Solo permite actualizar usuarios de la misma empresa del usuario autenticado.',
    'El usuario autenticado debe estar activo.',
    'La empresa del usuario autenticado debe estar activa.',
    'Los roles permitidos para este endpoint son jefe, empleado o administrador.',
    'Si se envía usrol o usestado, solo un usuario con rol jefe puede cambiarlo.',
    'Si se envía usrol o usestado, el usuario objetivo debe tener rol jefe o empleado (no administrador).',
    'Si el usuario objetivo está en estado eliminado, no se permite actualizar.',
    'Debe enviarse al menos un campo para actualizar.',
    'Si se envía uscorreo y ya existe, se retorna error de negocio.',
    'El backend transforma usimagen a URL pública completa.'
    ],
    errors: [
    { status: 401, title: 'Token inválido o ausente' },
    { status: 400, title: 'User id is required', message: 'id inválido o ausente' },
    { status: 500, title: 'At least one field is required to update user', message: 'Body sin campos para actualizar' },
    { status: 500, title: 'Name is required, Name must contain only letters and spaces', message: 'usnombre ausente o inválido' },
    { status: 500, title: 'Email is required, Email must be valid', message: 'uscorreo ausente o inválido' },
    { status: 500, title: 'User image is required', message: 'usimagen vacía' },
    { status: 500, title: 'User status is required', message: 'usestado vacío' },
    { status: 500, title: 'User is not active', message: 'usestado inválido' },
    { status: 500, title: 'Role is required, Role must be valid', message: 'usrol ausente o inválido' },
    { status: 500, title: 'Image size exceeds the allowed limit, Only PNG and JPG images are allowed', message: 'Imagen inválida' },
    { status: 500, title: 'User already exists with that email', message: 'Correo duplicado' },
    { status: 500, title: 'User not found', message: 'Usuario objetivo no encontrado' },
    { status: 500, title: 'Deleted user cannot be updated', message: 'Usuario objetivo eliminado' },
    { status: 500, title: 'User is not jefe', message: 'Usuario autenticado sin rol jefe al cambiar usrol o usestado' },
    { status: 500, title: 'Role must be jefe or empleado', message: 'Usuario objetivo con rol fuera de jefe o empleado al cambiar usrol o usestado' },
    { status: 500, title: 'Company is not active', message: 'Empresa inactiva' },
    { status: 500, title: 'User is not active', message: 'Usuario autenticado inactivo' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
