import { CheckoutStatusReference } from '@/components/docs/CheckoutStatusReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Actualizar estado de caja' }

export default function ActualizarCheckoutPage() {
  const module = getModule('checkout')!

  const endpoint = {
    slug: 'update-checkout-status',
    title: 'Actualizar estado de caja',
    method: 'PATCH' as const,
    path: '/checkouts/:id/status',
    definition: 'Actualiza el estado de una caja de la empresa del usuario autenticado.',
    whenToUse:
      'Se usa cuando la aplicación necesita activar, inactivar o cambiar el estado operativo de una caja existente. Al usarlo, el usuario obtiene la caja actualizada junto con un resumen de la sucursal asociada.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador interno de la caja. Corresponde a cjid, no al identificador visible.' },
    ],
    body: [
      { name: 'cjestado', type: 'string', required: true, description: 'Nuevo estado de la caja. Acepta activo o inactivo.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe puede actualizar el estado de una caja.' },
      { title: 'Solo permite actualizar cajas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La caja debe existir dentro de la empresa autenticada.' },
      { title: 'Una caja con estado eliminado no puede actualizarse.' },
      { title: 'cjestado es obligatorio.' },
      { title: 'cjestado solo puede ser activo o inactivo.' },
      { title: 'La respuesta incluye un resumen de la sucursal asociada en sucursal.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de caja es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Caja no encontrada', message: 'La caja no existe o no pertenece a la empresa autenticada.' },
      { status: 500, title: 'El identificador de caja es requerido', message: 'El identificador interno de la caja llegó vacío al servicio.' },
      { status: 500, title: 'El estado de caja es requerido', message: 'No se envió cjestado o se envió vacío.' },
      { status: 500, title: 'El estado de caja debe ser activo, inactivo o eliminado', message: 'cjestado tiene un valor no permitido.' },
      { status: 500, title: 'La caja eliminada no puede ser actualizada', message: 'La caja existe, pero está en estado eliminado.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó operar sobre una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de cajas.' },
      { status: 500, title: 'El usuario no es jefe', message: 'El usuario autenticado no tiene el rol requerido para actualizar cajas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error updating checkout status by id', message: 'Ocurrió un error interno al actualizar el estado de la caja.' },
    ],
    responseExample: `{
  "cjid": "e1b3da39-d5d5-47d6-a351-0e61e586f732",
  "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "cjidentificador": "001",
  "cjfchregistro": "2026-05-19T22:10:00.000Z",
  "cjestado": "inactivo",
  "sucursal": {
    "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
    "sunombre": "Sucursal Centro",
    "suidentificador": "001",
    "suestado": "activo"
  }
 }`,
    requestExample: `curl -X PATCH "${getApiBaseUrl()}/checkouts/e1b3da39-d5d5-47d6-a351-0e61e586f732/status" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "cjestado": "inactivo"
  }'`,
    notes: [
      'Este endpoint no recibe query params.',
      'En esta ruta, id corresponde al identificador interno cjid, no al identificador visible cjidentificador.',
      'Envía el body en formato JSON con el header Content-Type: application/json.',
      'Aunque el mensaje de validación menciona eliminado, la validación actual solo acepta activo o inactivo para cjestado.',
      'Si necesitas consultar por identificador visible de caja, usa GET /checkouts/:id con el query param cjsuid.',
    ],
  }

  return <CheckoutStatusReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
