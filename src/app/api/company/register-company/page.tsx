import { CompanyCreateReference } from '@/components/docs/CompanyCreateReference'
import { getModule } from '@/config/navigation'
import { getApiBaseUrl } from '@/config/public-env'

export const metadata = { title: 'Crear empresa' }

export default function CrearCompanyPage() {
  const module = getModule('company')!

  const endpoint = {
    slug: 'register-company',
    title: 'Crear empresa',
    method: 'POST' as const,
    path: '/companies',
    definition: 'Registra una nueva empresa hija en el sistema, asociada a la empresa padre del usuario autenticado.',
    whenToUse:
      'Se usa cuando un administrador de una empresa padre necesita crear una nueva empresa hija. Al usarlo, el usuario obtiene los datos completos de la empresa creada, incluyendo su identificador único y la URL pública del logo.',
    status: 'documented' as const,
    authentication:
      'Requiere token JWT en el header `Authorization: Bearer <token>`. Solo permite acceso a usuarios con rol administrador. La empresa del usuario autenticado debe estar activa y ser empresa padre.',
    body: [
      { name: 'emruc', type: 'string', required: true, description: 'RUC de la empresa; debe tener exactamente 13 dígitos.' },
      { name: 'emrznsocial', type: 'string', required: true, description: 'Razón social de la empresa.' },
      { name: 'emcorreo', type: 'string', required: true, description: 'Correo electrónico de la empresa; debe tener formato válido.' },
      { name: 'emcodigo', type: 'string', required: true, description: 'Código alfanumérico de exactamente 4 caracteres; se normaliza a mayúsculas.' },
      { name: 'imagen', type: 'file', required: false, description: 'Logo de la empresa; solo se aceptan .png o .jpg de hasta 5 MB. Si no se envía, se asigna un logo por defecto.' },
    ],
    businessRules: [
      { title: 'Solo un usuario con rol administrador puede registrar empresas.' },
      { title: 'La empresa del usuario autenticado debe ser empresa padre.' },
      { title: 'La empresa del usuario autenticado debe estar activa.' },
      { title: 'El usuario autenticado debe estar activo.' },
      { title: 'Todos los campos del body, excepto imagen, son obligatorios.' },
      { title: 'emruc debe tener exactamente 13 dígitos.' },
      { title: 'emcorreo debe tener formato de correo válido.' },
      { title: 'emcodigo debe tener exactamente 4 caracteres alfanuméricos, se normaliza a mayúsculas en el backend.' },
      { title: 'emruc no puede repetirse en otra empresa.' },
      { title: 'emcorreo no puede repetirse en otra empresa.' },
      { title: 'emcodigo no puede repetirse en otra empresa.' },
      { title: 'Si se envía imagen, solo se aceptan archivos .png y .jpg.' },
      { title: 'Si se envía imagen, el tamaño máximo permitido es 5 MB.' },
      { title: 'Si no se envía imagen, se asigna un logo por defecto.' },
      { title: 'La empresa se crea con estado activo.' },
      { title: 'Cuando se envía imagen, el Content-Type debe ser multipart/form-data. Si no, puede usarse application/json.' },
    ],
    expectedErrors: [
      { status: 401, title: 'No autorizado', message: 'No se envió un token JWT válido o el token no contiene información válida del usuario.' },
      { status: 500, title: 'El RUC debe ser válido', message: 'emruc no tiene exactamente 13 dígitos.' },
      { status: 500, title: 'El texto es requerido', message: 'emruc fue enviado vacío.' },
      { status: 500, title: 'La razon social de empresa es requerida', message: 'emrznsocial fue enviado vacío.' },
      { status: 500, title: 'El correo de empresa es requerido', message: 'emcorreo fue enviado vacío.' },
      { status: 500, title: 'El correo de empresa debe ser válido', message: 'emcorreo no tiene formato de correo válido.' },
      { status: 500, title: 'El código de empresa es requerido', message: 'emcodigo fue enviado vacío.' },
      { status: 500, title: 'El código de empresa debe tener exactamente 4 caracteres alfanuméricos', message: 'emcodigo no cumple el formato de 4 caracteres alfanuméricos.' },
      { status: 500, title: 'El tamaño de la imagen excede el límite permitido', message: 'La imagen enviada supera los 5 MB.' },
      { status: 500, title: 'Solo se permiten imágenes PNG y JPG', message: 'La imagen enviada no tiene extensión .png o .jpg.' },
      { status: 500, title: 'Error al guardar la imagen', message: 'Ocurrió un error interno al guardar la imagen en el servidor.' },
      { status: 500, title: 'El código de empresa no es inválido', message: 'La empresa asociada al usuario autenticado no fue encontrada.' },
      { status: 500, title: 'La empresa no está activa', message: 'La empresa asociada al usuario autenticado está inactiva.' },
      { status: 500, title: 'La empresa no es empresa padre', message: 'La empresa del usuario autenticado no es empresa padre y no puede crear empresas hijas.' },
      { status: 500, title: 'El usuario no existe', message: 'El usuario autenticado no fue encontrado dentro de su empresa.' },
      { status: 500, title: 'El usuario no pertenece a la empresa', message: 'El usuario autenticado no pertenece a la empresa indicada por su sesión.' },
      { status: 500, title: 'El usuario no es administrador', message: 'El usuario autenticado no tiene el rol requerido para crear empresas.' },
      { status: 500, title: 'El usuario no está activo', message: 'El usuario autenticado está inactivo y no puede usar el sistema.' },
      { status: 500, title: 'Ya existe una empresa con ese RUC', message: 'Ya hay una empresa registrada con el mismo emruc.' },
      { status: 500, title: 'Ya existe una empresa con ese correo', message: 'Ya hay una empresa registrada con el mismo emcorreo.' },
      { status: 500, title: 'Ya existe una empresa con ese código', message: 'Ya hay una empresa registrada con el mismo emcodigo.' },
      { status: 500, title: 'La empresa no fue creada', message: 'La empresa fue guardada, pero no pudo consultarse para devolver la respuesta.' },
      { status: 500, title: 'Error saving company', message: 'Ocurrió un error interno al guardar la empresa.' },
    ],
    responseExample: `{
  "emid": "0f4c5bde-9a11-4c76-9b6a-2e0b58e9bc2a",
  "emruc": "1790012345001",
  "emrznsocial": "Ferreteria Central S.A.",
  "emcorreo": "contacto@ferreteriacentral.com",
  "emlogo": "http://localhost:3000/uploads/empresas/company.png",
  "emcodigo": "FC01",
  "emfchregistro": "2026-05-23T17:29:01.621Z",
  "emestado": "activo"
}`,
    requestExample: `curl -X POST "${getApiBaseUrl()}/companies" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "emruc": "1790012345001",
    "emrznsocial": "Ferreteria Central S.A.",
    "emcorreo": "contacto@ferreteriacentral.com",
    "emcodigo": "FC01"
  }'`,
    notes: [
      'Este endpoint no recibe parámetros de ruta ni query params.',
      'Si no se envía imagen, usa Content-Type: application/json.',
      'Si se envía imagen, usa Content-Type: multipart/form-data con el archivo en el campo imagen.',
      'Envía emruc como texto para conservar ceros iniciales.',
      'emcodigo se convierte automáticamente a mayúsculas en el backend.',
      'El backend devuelve emlogo como URL pública completa, no como ruta relativa.',
    ],
  }

  return <CompanyCreateReference moduleTitle={module.title} moduleSlug={module.slug} endpoint={endpoint} />
}
