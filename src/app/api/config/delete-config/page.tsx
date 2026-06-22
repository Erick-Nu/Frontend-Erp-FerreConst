import { ConfigDeleteReference } from '@/components/docs/ConfigDeleteReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Eliminar configuración' }

export default function EliminarConfigPage() {
  const module = getModule('config')!

  const endpoint = {
    slug: 'delete-config',
    title: 'Eliminar configuración',
    method: 'DELETE' as const,
    path: '/configs/:configKey',
    definition: 'Elimina permanentemente una configuración identificada por su clave y empresa, desde administración central.',
    whenToUse:
      'Se usa cuando un administrador necesita remover por completo una clave de configuración de una empresa, por ejemplo para limpiar claves obsoletas o eliminar configuraciones erróneas. Al usarlo, el usuario obtiene la confirmación con la clave eliminada.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Solo permite acceso a usuarios con rol administrador. La empresa del usuario autenticado debe estar activa y ser empresa padre.',
    pathParams: [
      { name: 'configKey', type: 'string', required: true, description: 'Clave de configuración a eliminar.' },
    ],
    queryParams: [
      { name: 'companyId', type: 'string', required: true, description: 'Identificador de la empresa donde se eliminará la clave.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol administrador puede eliminar configuraciones.' },
      { title: 'La empresa del usuario autenticado debe ser empresa padre.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'configKey y companyId son obligatorios.' },
      { title: 'La eliminación se realiza por la combinación de companyId y configKey.' },
      { title: 'La eliminación es permanente; la configuración no puede recuperarse.' },
      { title: 'La respuesta solo devuelve la clave eliminada, no el objeto completo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'La clave de configuración es requerida', message: 'No se envió el parámetro configKey en la ruta.' },
      { status: 400, title: 'El id de empresa es requerido', message: 'No se envió el query param companyId.' },
      { status: 404, title: 'Configuración no encontrada', message: 'No existe una configuración con la combinación de companyId y configKey indicada.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no es administrador', message: 'El usuario autenticado no tiene el rol requerido para eliminar configuraciones.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'La empresa del usuario autenticado no es empresa padre.' },
    ],
    responseExample: `{
  "cfclave": "iva_porcentaje"
}`,
    requestExample: `curl -X DELETE "${getApiBaseUrl()}/configs/iva_porcentaje?companyId=4ff4db6b-f18f-4ecd-83b3-b997fa77a01e" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body.',
      'companyId se envía como query param en la URL.',
      'La eliminación es permanente; no se conserva respaldo de la configuración eliminada.',
      'La respuesta devuelve solo cfclave, no el objeto eliminado completo.',
    ],
  }

  return <ConfigDeleteReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
