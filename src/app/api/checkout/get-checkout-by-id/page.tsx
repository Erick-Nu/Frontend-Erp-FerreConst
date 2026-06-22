import { CheckoutByIdReference } from '@/components/docs/CheckoutByIdReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Obtener caja' }

export default function ObtenerCheckoutPage() {
  const module = getModule('checkout')!

  const endpoint = {
    slug: 'get-checkout-by-id',
    title: 'Obtener caja',
    method: 'GET' as const,
    path: '/checkouts/:id',
    definition: 'Obtiene el detalle de una caja por su identificador funcional dentro de una sucursal específica.',
    whenToUse:
      'Se usa cuando la aplicación necesita consultar una caja específica para mostrar su detalle, validar su estado o cargar sus datos en una pantalla de gestión. Al usarlo, el usuario obtiene la información de la caja junto con un resumen de la sucursal asociada.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador funcional de la caja. Corresponde a cjidentificador, no a cjid.' },
    ],
    queryParams: [
      { name: 'cjsuid', type: 'string', required: true, description: 'Identificador de la sucursal donde se busca la caja.' },
    ],
    businessRules: [
      { title: 'Solo permite consultar cajas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'El usuario autenticado debe tener rol administrador, jefe o empleado.' },
      { title: 'La búsqueda se realiza por empresa autenticada, cjsuid y cjidentificador.' },
      { title: 'El parámetro id de la ruta corresponde al campo cjidentificador, no al campo cjid.' },
      { title: 'El query param cjsuid es obligatorio para identificar la sucursal donde se busca la caja.' },
      { title: 'Un mismo cjidentificador puede repetirse en sucursales distintas.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de caja es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 400, title: 'El id de sucursal es requerido', message: 'No se envió el query param obligatorio cjsuid.' },
      { status: 500, title: 'Caja no encontrada', message: 'No existe una caja con ese identificador dentro de la sucursal indicada y la empresa autenticada.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no puede acceder a otra empresa', message: 'El usuario autenticado intentó acceder a información de una empresa distinta a la suya.' },
      { status: 500, title: 'El usuario no es jefe, empleado o administrador', message: 'El rol del usuario no tiene permiso para consultar cajas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Error finding checkout by id', message: 'Ocurrió un error interno al consultar la caja por empresa, sucursal e identificador.' },
    ],
    responseExample: `{
  "cjid": "e1b3da39-d5d5-47d6-a351-0e61e586f732",
  "cjemid": "e2f7b231-fc3d-4010-9ec0-47ed08a34593",
  "cjsuid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
  "cjidentificador": "001",
  "cjfchregistro": "2026-05-19T22:10:00.000Z",
  "cjestado": "activo",
  "sucursal": {
    "suid": "30d3385c-445d-4f2f-97f9-3d3f88c052f1",
    "sunombre": "Sucursal Centro",
    "suidentificador": "001",
    "suestado": "activo"
   }
}`,
    requestExample: `curl -X GET "${getApiBaseUrl()}/checkouts/001?cjsuid=30d3385c-445d-4f2f-97f9-3d3f88c052f1" \
  -H "Authorization: Bearer <token>"`,
    notes: [
      'Este endpoint no recibe body.',
      'Envía cjsuid como query param obligatorio.',
      'El id de la ruta debe ser el cjidentificador visible de la caja, por ejemplo "001".',
      'Para conservar ceros iniciales, trata el identificador de caja como texto.',
      'La respuesta incluye el objeto sucursal con datos básicos de la sucursal asociada.',
    ],
  }

  return <CheckoutByIdReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
