import { BranchCreateReference } from '@/components/docs/BranchCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear sucursal' }

export default function CrearBranchPage() {
  const module = getModule('branch')!

  const endpoint = {
    slug: 'register-branch',
    title: 'Crear sucursal',
    method: 'POST' as const,
    path: '/branches',
    definition: 'Crea una nueva sucursal dentro de la empresa indicada.',
    whenToUse:
      'Se usa cuando la aplicación necesita registrar una nueva sucursal para operar inventario, ventas o procesos internos de una empresa. Al usarlo, el usuario obtiene la sucursal creada con su identificador, estado y fecha de registro.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    body: [
      { name: 'suemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá la sucursal.' },
      { name: 'sunombre', type: 'string', required: true, description: 'Nombre de la sucursal.' },
      { name: 'suidentificador', type: 'string', required: true, description: 'Código único de 3 dígitos para identificar la sucursal dentro de la empresa.' },
      { name: 'sudireccion', type: 'string | null', required: false, description: 'Dirección física de la sucursal.' },
      { name: 'sucorreo', type: 'string | null', required: false, description: 'Correo electrónico de contacto de la sucursal.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe puede crear sucursales.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La sucursal solo puede crearse en la misma empresa del usuario autenticado.' },
      { title: 'suemid, sunombre y suidentificador son obligatorios.' },
      { title: 'suidentificador debe tener exactamente 3 dígitos.' },
      { title: 'suidentificador no puede repetirse dentro de la misma empresa.' },
      { title: 'Si se envía sucorreo, debe tener formato de correo válido.' },
      { title: 'Después de crear la sucursal, el sistema crea una secuencia asociada a esa sucursal.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'No se envió suemid o se envió vacío.' },
      { status: 500, title: 'El nombre de sucursal es requerido', message: 'No se envió sunombre o se envió vacío.' },
      { status: 500, title: 'El identificador de sucursal es requerido', message: 'No se envió suidentificador o se envió vacío.' },
      { status: 500, title: 'El identificador de sucursal debe ser exactamente 3 digitos', message: 'suidentificador no cumple el formato de 3 dígitos.' },
      { status: 500, title: 'El correo de sucursal debe ser válido', message: 'sucorreo fue enviado, pero no tiene formato de correo válido.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa indicada en suemid o la empresa del usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada a la solicitud está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede crear sucursales para otra empresa', message: 'suemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de sucursales.' },
      { status: 500, title: 'El usuario no es jefe', message: 'El usuario autenticado no tiene el rol requerido para crear sucursales.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Ya existe una sucursal con ese identificador', message: 'Ya hay una sucursal registrada con el mismo suidentificador dentro de la empresa.' },
      { status: 500, title: 'La sucursal no existe', message: 'La sucursal fue creada, pero no pudo encontrarse al crear su secuencia asociada.' },
      { status: 500, title: 'La sucursal no está activa', message: 'La sucursal creada no está activa al momento de crear su secuencia asociada.' },
      { status: 500, title: 'Ya existe una secuencia para esta sucursal', message: 'Ya existe una secuencia asociada a la sucursal.' },
      { status: 500, title: 'Error saving branch', message: 'Ocurrió un error interno al guardar la sucursal.' },
    ],
    responseExample: `{
  "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "suemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "sunombre": "Sucursal Centro",
  "sudireccion": null,
  "sucorreo": null,
  "suidentificador": "001",
  "sufchregistro": "2026-05-19T22:10:00.000Z",
  "suestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/branches" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "suemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
    "sunombre": "Sucursal Centro",
    "suidentificador": "001",
    "sudireccion": "Av. Principal y Calle 10",
    "sucorreo": "sucursal.centro@empresa.com"
}'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta.',
      'Envía el body en formato JSON con el header Content-Type: application/json.',
      'suidentificador debe enviarse como texto para conservar ceros iniciales, por ejemplo "001".',
      'sudireccion y sucorreo pueden enviarse como null si no están disponibles.',
      'La sucursal se crea con estado activo.',
      'La respuesta devuelve los datos guardados de la sucursal creada.',
    ],
  }

  return <BranchCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
