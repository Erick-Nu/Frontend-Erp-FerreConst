import { ProformaSendReference } from '@/components/docs/ProformaSendReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Enviar proforma' }

export default function EnviarProformaPage() {
  const module = getModule('proforma')!

  const endpoint = {
    slug: 'send-proforma',
    title: 'Enviar proforma',
    method: 'POST' as const,
    path: '/proformas/:id/send',
    definition: 'Envía una proforma existente por correo electrónico o WhatsApp al cliente, sin crear un nuevo documento.',
    whenToUse:
      'Se usa cuando la aplicación necesita reenviar una proforma al cliente por un canal específico desde el frontend, ya sea por correo electrónico o WhatsApp. Al usarlo, el usuario obtiene un mensaje de confirmación del envío.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la proforma a enviar.' },
    ],
    body: [
      { name: 'channel', type: 'string', required: true, description: 'Canal de envío; acepta email o whatsapp.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede enviar proformas.' },
      { title: 'Solo permite enviar proformas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'channel solo acepta los valores email o whatsapp.' },
      { title: 'No se puede enviar una proforma en estado anulada.' },
      { title: 'Para el canal email: debe existir correo emisor configurado y correo de destino del cliente.' },
      { title: 'Para el canal whatsapp: debe existir el token WHATSAPP_APICONSULT_TOKEN configurado.' },
      { title: 'Debe existir una instancia de API de WhatsApp configurada para la empresa.' },
      { title: 'Este endpoint realiza el envío de forma inmediata; no inserta una tarea en cola.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de proforma es requerido', message: 'No se envió el parámetro id en la ruta o fue enviado vacío.' },
      { status: 400, title: 'El canal debe ser email o whatsapp', message: 'channel no fue enviado o tiene un valor distinto de email o whatsapp.' },
      { status: 400, title: 'No se puede enviar una proforma anulada', message: 'La proforma está en estado anulada y no puede enviarse.' },
      { status: 400, title: 'El canal solicitado no está activo para esta empresa', message: 'El canal seleccionado no está habilitado para la empresa del usuario autenticado.' },
      { status: 400, title: 'WHATSAPP_APICONSULT_TOKEN es requerido para el canal whatsapp', message: 'No se ha configurado el token global de WhatsApp en el entorno del servidor.' },
      { status: 404, title: 'Proforma no encontrada', message: 'No existe una proforma con el id indicado dentro de la empresa del usuario autenticado.' },
      { status: 500, title: 'Falta correo del remitente o destinatario para enviar la proforma', message: 'No se encontró el correo del emisor o del cliente para realizar el envío por email.' },
      { status: 500, title: 'La instancia de API de WhatsApp no está configurada para esta empresa', message: 'No existe una instancia de API de WhatsApp registrada para la empresa.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para enviar proformas.' },
    ],
    responseExample: `{
  "message": "Proforma enviada exitosamente por email"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/proformas/66ff3afe-65bb-49f2-80cf-ae279b7fcf5b/send" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "email"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'El envío es inmediato; no se encola ni se persiste una nueva tarea de envío.',
      'Usa email o whatsapp exactamente en minúsculas como valor de channel.',
      'Para el envío por email, el cliente debe tener un correo electrónico registrado.',
      'Para el envío por WhatsApp, el cliente debe tener un número de teléfono registrado.',
    ],
  }

  return <ProformaSendReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
