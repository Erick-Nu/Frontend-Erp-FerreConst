import { CheckoutCreateReference } from '@/components/docs/CheckoutCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear caja' }

export default function CrearCheckoutPage() {
  const module = getModule('checkout')!

  const endpoint = {
    slug: 'register-checkout',
    title: 'Crear caja',
    method: 'POST' as const,
    path: '/checkouts',
    definition: 'Crea una nueva caja dentro de una sucursal de la empresa indicada.',
    whenToUse:
      'Se usa cuando la aplicación necesita registrar una caja o punto de cobro para una sucursal activa. Al usarlo, el usuario obtiene la caja creada con su identificador, sucursal, estado y fecha de registro.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [],
    queryParams: [],
    body: [
      { name: 'cjemid', type: 'string', required: true, description: 'Identificador de la empresa a la que pertenecerá la caja.' },
      { name: 'cjsuid', type: 'string', required: true, description: 'Identificador de la sucursal donde se creará la caja.' },
      { name: 'cjidentificador', type: 'string', required: true, description: 'Código único de 3 dígitos para identificar la caja dentro de la sucursal.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe puede crear cajas.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'La caja solo puede crearse en la misma empresa del usuario autenticado.' },
      { title: 'La sucursal indicada debe existir dentro de la empresa.' },
      { title: 'La sucursal indicada debe estar activa.' },
      { title: 'cjemid, cjsuid y cjidentificador son obligatorios.' },
      { title: 'cjidentificador debe tener exactamente 3 dígitos.' },
      { title: 'cjidentificador no puede repetirse dentro de la misma sucursal.' },
      { title: 'La caja se crea con estado activo.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El id de empresa es requerido', message: 'No se envió cjemid o se envió vacío.' },
      { status: 500, title: 'El id de sucursal es requerido', message: 'No se envió cjsuid o se envió vacío.' },
      { status: 500, title: 'El identificador de caja es requerido', message: 'No se envió cjidentificador o se envió vacío.' },
      { status: 500, title: 'El identificador de sucursal debe ser exactamente 3 digitos', message: 'cjidentificador no cumple el formato de 3 dígitos.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa indicada en cjemid o la empresa del usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada a la solicitud está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'cjemid pertenece a una empresa distinta a la del usuario autenticado.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no está permitido para acceder al módulo de cajas.' },
      { status: 500, title: 'El usuario no es jefe', message: 'El usuario autenticado no tiene el rol requerido para crear cajas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'La sucursal no existe', message: 'La sucursal indicada en cjsuid no existe dentro de la empresa.' },
      { status: 500, title: 'La sucursal no está activa', message: 'La sucursal indicada existe, pero no está activa.' },
      { status: 409, title: 'Ya existe una caja con ese identificador en esta sucursal', message: 'Ya hay una caja registrada con el mismo cjidentificador dentro de la sucursal.' },
      { status: 500, title: 'Error saving checkout', message: 'Ocurrió un error interno al guardar la caja.' },
      { status: 500, title: 'Error finding checkout by row id', message: 'La caja fue creada, pero ocurrió un error al consultar sus datos para devolver la respuesta.' },
    ],
    responseExample: `{
  "cjid": "e1b3da39-d5d5-47d6-a351-0e61e586f732",
  "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "cjidentificador": "001",
  "cjfchregistro": "2026-05-19T22:10:00.000Z",
  "cjestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/checkouts" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
    "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
    "cjidentificador": "001"
}'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta.',
      'Envía el body en formato JSON con el header Content-Type: application/json.',
      'cjidentificador debe enviarse como texto para conservar ceros iniciales, por ejemplo "001".',
      'El identificador de caja es único por sucursal, no necesariamente por toda la empresa.',
      'La respuesta devuelve el registro base creado, sin el objeto sucursal anidado.',
    ]
  }

  return <CheckoutCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
