import { ProformaPdfReference } from '@/components/docs/ProformaPdfReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener Proforma Pdf' }

export default function ObtenerProformaPdfPage() {
  const module = getModule('proforma')!

  const endpoint = {
    slug: 'get-proforma-pdf',
    title: 'Obtener Proforma Pdf',
    method: 'GET' as const,
    path: '/proformas/:id/pdf',
    definition: 'Obtiene la referencia al documento PDF asociado a una proforma, incluyendo su nombre y URL pública.',
    whenToUse: 'Se usa cuando la aplicación necesita descargar, abrir o compartir el archivo PDF de una proforma ya generada, sin necesidad de cargar la estructura completa de la proforma. Al usarlo, el usuario obtiene los datos mínimos de la proforma junto con la referencia de su documento PDF.',
    authentication: 'Requiere token JWT en el header `Authorization: Bearer <token>`. Permite acceso a usuarios con rol jefe o empleado. La empresa y el usuario autenticado deben estar activos.',
    pathParams: [
      { name: 'id', type: 'string', required: true, description: 'Identificador de la proforma.' }
    ],
    businessRules: [
      { title: 'Solo un usuario con rol jefe o empleado puede consultar el PDF de una proforma.' },
      { title: 'Solo permite consultar proformas de la empresa del usuario autenticado.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Si la proforma no existe, se devuelve error 404.' },
      { title: 'Si la proforma existe pero no tiene documento PDF disponible, se devuelve error 404.' },
      { title: 'Solo devuelve la referencia del documento, no la estructura completa de la proforma.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 400, title: 'El id de proforma es requerido', message: 'No se envió el parámetro id en la ruta.' },
      { status: 404, title: 'Proforma no encontrada', message: 'No existe una proforma con el id indicado dentro de la empresa del usuario autenticado.' },
      { status: 404, title: 'Documento PDF de proforma no encontrado', message: 'La proforma existe, pero no tiene un documento PDF accesible.' },
      { status: 500, title: 'La empresa no existe', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'El usuario no es jefe o empleado', message: 'El usuario autenticado no tiene un rol permitido para consultar proformas.' },
    ],
    responseExample: `{
  "proforma": {
    "prfmaid": "66ff3afe-65bb-49f2-80cf-ae279b7fcf5b",
    "prfmaidentificador": "FE01-002-001-34",
    "documento": {
      "docnombre": "FE01-002-001-34_2026-05-25.pdf",
      "docurl": "http://localhost:3000/uploads/proformas/1709639106001/FE01-002-001-34_2026-05-25.pdf"
    }
  }
}`,
    requestExample: 'curl -X GET "http://localhost:3000/proformas/66ff3afe-65bb-49f2-80cf-ae279b7fcf5b/pdf" \\\n  -H "Authorization: Bearer <token>"',
    notes: [
      'Este endpoint no recibe query params ni body.',
      'Usa este endpoint cuando solo necesites la referencia del PDF, no la estructura completa de la proforma.',
      'El campo docurl contiene la URL pública completa del archivo PDF.',
    ],
  }

  return (
    <ProformaPdfReference
      moduleTitle={module.title}
      moduleSlug={module.slug}
      endpoint={endpoint}
    />
  )
}
