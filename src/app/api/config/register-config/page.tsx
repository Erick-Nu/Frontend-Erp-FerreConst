import { ConfigCreateReference } from '@/components/docs/ConfigCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear configuración' }

export default function CrearConfigPage() {
  const module = getModule('config')!

  const endpoint = {
    slug: 'register-config',
    title: 'Crear configuración',
    method: 'POST' as const,
    path: '/configs',
    definition: 'Registra una nueva configuración de tipo clave-valor para una empresa, desde administración central.',
    whenToUse:
      'Se usa cuando un administrador necesita crear un nuevo parámetro de configuración para una empresa, como porcentajes, valores por defecto o ajustes del sistema. Al usarlo, el usuario obtiene los datos de la configuración creada, incluyendo su identificador único.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Solo permite acceso a usuarios con rol administrador. La empresa del usuario autenticado debe estar activa y ser empresa padre.',
    body: [
      { name: 'cfemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá la configuración.' },
      { name: 'cfclave', type: 'string', required: true, description: 'Clave única de configuración dentro de la empresa; no puede repetirse en la misma empresa.' },
      { name: 'cfvalor', type: 'string', required: true, description: 'Valor asociado a la clave de configuración.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol administrador puede registrar configuraciones.' },
      { title: 'La empresa del usuario autenticado debe ser empresa padre.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Todos los campos del body son obligatorios.' },
      { title: 'cfclave no puede repetirse dentro de la misma empresa.' },
      { title: 'Este endpoint permite crear configuraciones para cualquier empresa, no solo para la empresa del usuario autenticado.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'cfemid fue enviado vacío.' },
      { status: 500, title: 'La clave de configuración es requerida', message: 'cfclave fue enviado vacío.' },
      { status: 500, title: 'El valor de configuración es requerido', message: 'cfvalor fue enviado vacío.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no es administrador', message: 'El usuario autenticado no tiene el rol requerido para crear configuraciones.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'La empresa del usuario autenticado no es empresa padre.' },
      { status: 500, title: 'Ya existe una configuración con esa clave', message: 'Ya hay una configuración registrada con la misma cfclave dentro de la empresa indicada.' },
      { status: 500, title: 'La configuración no fue creada', message: 'La configuración fue guardada, pero no pudo consultarse para devolver la respuesta.' },
      { status: 500, title: 'Error saving config', message: 'Ocurrió un error interno al guardar la configuración.' },
    ],
    responseExample: `{
  "cfid": "5b9d0e5e-fd3f-451d-bf68-4db51f52f6b0",
  "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
  "cfclave": "iva_porcentaje",
  "cfvalor": "15"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/configs" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "cfemid": "4ff4db6b-f18f-4ecd-83b3-b997fa77a01e",
    "cfclave": "iva_porcentaje",
    "cfvalor": "15"
  }'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'cfclave debe ser única por empresa; dos empresas pueden tener la misma clave con valores distintos.',
      'Este endpoint está pensado para administración central y permite operar sobre cualquier empresa, no solo la del usuario autenticado.',
    ],
  }

  return <ConfigCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
