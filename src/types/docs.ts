export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type EndpointStatus = 'documented' | 'pending'

export type FieldSpec = {
  name: string
  type: string
  required?: boolean
  description: string
}

export type FieldGroup = {
  title: string
  fields: FieldSpec[]
}

export type ResponseSpec = {
  status: number
  label: string
  example: string
}

export type ErrorSpec = {
  status: number
  title: string
  message?: string
}

export type EndpointDoc = {
  slug: string
  title: string
  method: HttpMethod
  path: string
  summary: string
  status: EndpointStatus
  authentication?: string
  contentType?: string
  contentTypes?: string[]
  headers?: FieldSpec[]
  pathParams?: FieldSpec[]
  queryParams?: FieldSpec[]
  body?: FieldSpec[]
  bodyGroups?: FieldGroup[]
  curlExample: string
  responses: ResponseSpec[]
  responseLanguage?: 'json' | 'text'
  responseContentType?: string
  businessRules?: string[]
  errors?: ErrorSpec[]
  notes?: string[]
}

export type ModuleDoc = {
  slug: string
  title: string
  description: string
  endpoints: EndpointDoc[]
}