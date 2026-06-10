import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: 'Obtener Proforma Pdf' }

export default function ObtenerProformaPdfPage() {
  const module = getModule('proforma')!
  
  const endpoint = {
    slug: 'get-proforma-pdf',
    title: 'Obtener Proforma Pdf',
    method: 'GET' as const,
    path: '/proformas/:id/pdf',
    summary: 'Obtiene la referencia al documento PDF de una proforma específica.',
    status: 'documented' as const,
    authentication: 'Requiere token JWT en el header: Authorization: Bearer <token>',
    contentTypes: [],
    contentType: '',
    headers: [
          { name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }
    ],
    pathParams: [

    ],
    queryParams: [

    ],
    body: [

    ],
    bodyGroups: [],
    curlExample: `curl -X GET https://api.tudominio.com/proformas/:id/pdf \
  -H "Authorization: Bearer <token>"`,
    responses: [
      {
        status: 200,
        label: 'OK',
        example: `{
  "proforma": {
    "prfmaid": "66ff3afe-65bb-49f2-80cf-ae279b7fcf5b",
    "prfmaidentificador": "FE01-002-001-34",
    "documento": {
      "docnombre": "FE01-002-001-34_2026-05-25.pdf",
      "docurl": "https://api.tudominio.com/uploads/proformas/1709639106001/FE01-002-001-34_2026-05-25.pdf"
    }
  }
}`
      }
    ],
    responseLanguage: 'json' as const,
    businessRules: [
    'Solo retorna proformas de la misma empresa del usuario autenticado.',
    'Si la proforma existe pero no tiene PDF disponible, el endpoint responde 404 Proforma pdf document not found.',
    'La empresa del usuario autenticado debe estar activa.',
    'El usuario autenticado debe estar activo.',
    'Roles permitidos para este endpoint: jefe o empleado.'
    ],
    errors: [
    { status: 401, title: 'token inválido o ausente' },
    { status: 404, title: 'Proforma not found o Proforma pdf document not found' },
    { status: 400, title: 'Proforma id is required' }
    ],
    notes: [

    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
