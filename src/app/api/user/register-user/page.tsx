import { UserCreateReference } from '@/components/docs/UserCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear usuario' }

export default function CrearUserPage() {
  const module = getModule('user')!

  const endpoint = {
    slug: 'register-user',
    title: 'Crear usuario',
    method: 'POST' as const,
    path: '/users',
    definition: 'Registra un nuevo usuario en el sistema, ya sea dentro de la misma empresa del solicitante o para otra empresa desde administración central.',
    whenToUse: 'Se usa cuando la aplicación necesita crear un nuevo usuario, ya sea un empleado o jefe dentro de la misma empresa, o cualquier tipo de usuario para otra empresa desde el panel de administración central. Al usarlo, el usuario obtiene los datos completos del usuario creado, incluyendo la URL pública de su imagen de perfil.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Para creación en la misma empresa: rol jefe, no permite crear administradores. Para otra empresa: rol administrador, empresa debe ser padre.',
    body: [
      { name: 'usemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá el usuario.' },
      { name: 'usnombre', type: 'string', required: true, description: 'Nombre completo del usuario; debe contener solo letras y espacios.' },
      { name: 'usapodo', type: 'string', required: true, description: 'Apodo o nombre de usuario; debe ser único dentro de la empresa.' },
      { name: 'uscorreo', type: 'string', required: true, description: 'Correo electrónico del usuario; debe tener formato válido y ser único globalmente.' },
      { name: 'uspassword', type: 'string', required: true, description: 'Contraseña del usuario; debe tener al menos 8 caracteres.' },
      { name: 'usrol', type: 'string', required: true, description: 'Rol del usuario. Valores: administrador, jefe, empleado.' },
      { name: 'imagen', type: 'file', required: false, description: 'Imagen de perfil del usuario; solo se aceptan .png o .jpg de hasta 5 MB.' },
    ],
    businessRules: [
      { title: 'El campo usemid es obligatorio y debe corresponder a una empresa existente.' },
      { title: 'El campo usnombre es obligatorio y solo permite letras y espacios.' },
      { title: 'El campo usapodo es obligatorio y debe ser único dentro de la empresa destino.' },
      { title: 'El campo uscorreo es obligatorio, debe tener formato de correo electrónico válido y ser único a nivel global.' },
      { title: 'El campo uspassword es obligatorio y debe tener al menos 8 caracteres.' },
      { title: 'El campo usrol es obligatorio y solo acepta los valores: administrador, jefe, empleado.' },
      { title: 'El campo imagen es opcional; si no se envía, se asigna una imagen por defecto.' },
      { title: 'La imagen solo acepta formatos .png y .jpg.' },
      { title: 'La imagen no puede superar los 5 MB.' },
      { title: 'Si no se envía imagen, la solicitud debe usar Content-Type: application/json.' },
      { title: 'Si se envía imagen, la solicitud debe usar Content-Type: multipart/form-data.' },
      { title: 'La contraseña se almacena cifrada; nunca se devuelve en la respuesta.' },
      { title: 'El usuario autenticado debe tener rol jefe para crear dentro de la misma empresa.' },
      { title: 'El usuario autenticado debe tener rol administrador para crear en otra empresa.' },
      { title: 'Para crear en otra empresa, la empresa autenticada debe ser empresa padre de la empresa destino.' },
      { title: 'No se permite crear usuarios con rol administrador dentro de la misma empresa.' },
      { title: 'El sistema verifica que la empresa destino exista y esté activa.' },
      { title: 'El sistema verifica que el usuario autenticado esté activo.' },
      { title: 'Si el correo ya está registrado en el sistema, se rechaza la creación.' },
      { title: 'Si el apodo ya existe en la empresa destino, se rechaza la creación.' },
      { title: 'El endpoint transforma la ruta de la imagen a una URL pública completa.' },
      { title: 'La imagen por defecto se asigna desde /uploads/usuarios/user.png.' },
      { title: 'El endpoint no recibe parámetros de ruta ni query params.' },
      { title: 'El usuario creado se devuelve con todos sus datos, incluida la URL de la imagen.' },
      { title: 'El estado del usuario se asigna como "activo" por defecto.' },
      { title: 'La fecha de registro se genera automáticamente al crear el usuario.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'usemid fue enviado vacío.' },
      { status: 500, title: 'El nombre es requerido', message: 'usnombre fue enviado vacío.' },
      { status: 500, title: 'El nombre sólo debe contener letras y espacios', message: 'usnombre contiene caracteres no permitidos.' },
      { status: 500, title: 'El apodo es requerido', message: 'usapodo fue enviado vacío.' },
      { status: 500, title: 'El correo es requerido', message: 'uscorreo fue enviado vacío.' },
      { status: 500, title: 'El correo debe ser válido', message: 'uscorreo no tiene formato de correo válido.' },
      { status: 500, title: 'La contraseña es requerida', message: 'uspassword fue enviado vacío.' },
      { status: 500, title: 'La contraseña debe tener al menos 8 caracteres', message: 'uspassword tiene menos de 8 caracteres.' },
      { status: 500, title: 'El rol es requerido', message: 'usrol fue enviado vacío.' },
      { status: 500, title: 'El rol debe ser válido', message: 'usrol no es uno de los valores permitidos.' },
      { status: 500, title: 'El tamaño de la imagen excede el límite permitido', message: 'La imagen enviada supera los 5 MB.' },
      { status: 500, title: 'Solo se permiten imágenes PNG y JPG', message: 'La imagen enviada no tiene extensión .png o .jpg.' },
      { status: 500, title: 'Error al guardar la imagen', message: 'Ocurrió un error interno al guardar la imagen en el servidor.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'Se intentó crear un usuario para otra empresa, pero la empresa del solicitante no es empresa padre.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó operar sobre una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es administrador', message: 'Para crear usuarios en otra empresa, el solicitante debe ser administrador.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de usuarios.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa destino indicada en usemid no fue encontrada.' },
      { status: 500, title: 'El rol debe ser jefe o empleado', message: 'En creación dentro de la misma empresa, no se permite crear usuarios con rol administrador.' },
      { status: 500, title: 'El usuario no es jefe', message: 'Para crear usuarios en la misma empresa, el solicitante debe tener rol jefe.' },
      { status: 500, title: 'Ya existe un usuario con ese correo', message: 'El uscorreo enviado ya está registrado por otro usuario.' },
      { status: 500, title: 'Ya existe un usuario con ese apodo', message: 'El usapodo enviado ya está en uso por otro usuario dentro de la empresa destino.' },
      { status: 500, title: 'El usuario no fue creado', message: 'El usuario fue guardado, pero no pudo consultarse para devolver la respuesta.' },
      { status: 500, title: 'Error saving user', message: 'Ocurrió un error interno al guardar el usuario.' },
    ],
    responseExample: `{
  "usid": "2a6eb0a9-10e1-49fb-a2f3-1e5c580f5a07",
  "usemid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "usnombre": "Juan Perez",
  "usapodo": "jperez",
  "uscorreo": "juan.perez@empresa.com",
  "usimagen": "http://localhost:3000/uploads/usuarios/user.png",
  "usrol": "empleado",
  "usfchregistro": "2026-05-23T17:29:01.621Z",
  "usestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/users" \
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
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'Si no se envía imagen, usa Content-Type: application/json.',
      'Si se envía imagen, usa Content-Type: multipart/form-data con el archivo en el campo imagen.',
      'La contraseña se almacena cifrada; nunca se devuelve en la respuesta.',
      'uscorreo debe ser único a nivel global.',
      'usapodo debe ser único solo dentro de la empresa destino.',
      'En creación dentro de la misma empresa, no se permite asignar el rol administrador.',
    ],
  }

  return <UserCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
