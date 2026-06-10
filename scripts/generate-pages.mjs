import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const docsRoot = path.join(root, 'documentacion')
const pagesRoot = path.join(root, 'src/app/api')
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://163.245.192.54:3000').replace(/\/$/, '')

const slugOverrides = new Map([
  ['auth/refresh-session', 'refresh'],
  ['checkout/update-checkout', 'update-checkout-status'],
  ['proforma/get-proforma-pdf-by-id', 'get-proforma-pdf'],
  ['system/get-root', 'health'],
])

const titleOverrides = new Map([
  ['auth/login', 'Login'],
  ['auth/logout', 'Logout'],
  ['auth/refresh-session', 'Refresh Session'],
  ['system/get-root', 'Health Check'],
])

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    if (!entry.name.endsWith('.md')) return []
    if (entry.name === 'README.md') return []
    if (entry.name === 'proforma-response-structure.md') return []
    return [full]
  })
}

function stripTicks(value) {
  return value.replace(/`([^`]+)`/g, '$1').trim()
}

function cleanText(value) {
  return stripTicks(value)
    .replace(/\s+/g, ' ')
    .replace(/^[-*]\s+/, '')
    .trim()
}

function getSections(text) {
  const lines = text.split(/\r?\n/)
  const sections = new Map()
  let current = null
  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/)
    if (match) {
      current = match[1].trim()
      sections.set(current, [])
      continue
    }
    if (current) sections.get(current).push(line)
  }
  return sections
}

function getSection(sections, names) {
  const normalized = names.map((name) => name.toLowerCase())
  for (const [name, lines] of sections) {
    if (normalized.includes(name.toLowerCase())) return lines.join('\n').trim()
  }
  return ''
}

function getSectionsMatching(sections, names) {
  const normalized = names.map((name) => name.toLowerCase())
  return [...sections.entries()].filter(([name]) => normalized.includes(name.toLowerCase()))
}

function getCodeBlocks(markdown) {
  const blocks = []
  const regex = /```(\w+)?\n([\s\S]*?)```/g
  let match
  while ((match = regex.exec(markdown))) {
    blocks.push({ language: match[1] || 'text', code: match[2].trim() })
  }
  return blocks
}

function parseListItems(section) {
  return section
    .split(/\r?\n/)
    .filter((line) => /^\s*-\s+/.test(line))
    .map(cleanText)
    .filter(Boolean)
}

function inferType(text) {
  const match = text.match(/\(([^)]*)\)/)
  if (match) {
    const inside = match[1].toLowerCase()
    if (inside.includes('string')) return 'string'
    if (inside.includes('number')) return 'number'
    if (inside.includes('boolean')) return 'boolean'
    if (inside.includes('array')) return 'array'
    if (inside.includes('file') || inside.includes('archivo')) return 'file'
    if (inside.includes('object')) return 'object'
  }
  if (/\bboolean\b/i.test(text)) return 'boolean'
  if (/\bnumber\b|precio|total|cantidad|stock|minimo|maximo/i.test(text)) return 'number'
  if (/array|\[\]/i.test(text)) return 'array'
  if (/archivo|imagen|file/i.test(text)) return 'file'
  return 'string'
}

function parseFields(section, defaultRequired = false) {
  return parseListItems(section)
    .map((item) => {
      const field = item.match(/^([^:]+):\s*(.+)$/) || item.match(/^([^\s]+)\s+(.+)$/)
      if (!field) return null
      const name = field[1].replace(/[()]/g, '').trim()
      if (!name || name.includes(' ')) return null
      const description = cleanText(field[2] || item)
      const lower = item.toLowerCase()
      const required = lower.includes('requerido') || lower.includes('obligatorio') || (defaultRequired && !lower.includes('opcional'))
      return { name, type: inferType(item), required, description }
    })
    .filter(Boolean)
}

function parseErrors(section) {
  return section
    .split(/\r?\n/)
    .filter((line) => /^\s*-\s+/.test(line))
    .map((line) => line.replace(/^\s*-\s+/, '').trim())
    .map((raw) => {
      const status = Number(raw.match(/\b(4\d\d|5\d\d)\b/)?.[1] || 500)
      const messageSource = raw.match(/con mensajes?\s+(.+)$/i)?.[1] || ''
      const messages = [...messageSource.matchAll(/`([^`]+)`/g)].map((m) => m[1]).filter((v) => !/^\d{3}\b/.test(v))
      const beforeStatus = raw.split(/`?\b(?:4\d\d|5\d\d)\b[^`:]*(?:`)?/)[0]
      const startsWithStatus = /^`?\b(?:4\d\d|5\d\d)\b/.test(raw)
      const afterColon = raw.split(':').slice(1).join(':')
      let titleSource = startsWithStatus && afterColon ? afterColon : beforeStatus || raw
      titleSource = titleSource
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\b(4\d\d|5\d\d)\b\s*(Unauthorized|Internal Server Error|Too Many Requests|Conflict|OK|Created)?/gi, '')
        .replace(/con mensajes?.*/gi, '')
        .replace(/:+\s*$/g, '')
        .replace(/[.;]\s*$/g, '')
        .trim()
      return { status, title: titleSource || 'Error', message: messages.length ? messages.join(', ') : undefined }
    })
}

function parseStatus(section) {
  const match = section.match(/`?(\d{3})\s+([^`\n]+)`?/)
  if (!match) return { status: 200, label: 'OK' }
  return { status: Number(match[1]), label: match[2].trim() }
}

function titleFromSlug(module, fileSlug) {
  const override = titleOverrides.get(`${module}/${fileSlug}`)
  if (override) return override
  const h = (slug) => slug.split('-').filter(Boolean).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
  if (fileSlug.startsWith('register-')) return `Crear ${h(fileSlug.replace('register-', ''))}`
  if (fileSlug.startsWith('get-') && fileSlug.includes('by-id')) return `Obtener ${h(fileSlug.replace('get-', '').replace('-by-id', ''))}`
  if (fileSlug.startsWith('get-')) return `Listar ${h(fileSlug.replace('get-', ''))}`
  if (fileSlug.startsWith('update-')) return `Actualizar ${h(fileSlug.replace('update-', '').replace('-status', ''))}`
  if (fileSlug.startsWith('delete-')) return `Eliminar ${h(fileSlug.replace('delete-', ''))}`
  if (fileSlug.startsWith('cancel-')) return `Anular ${h(fileSlug.replace('cancel-', ''))}`
  if (fileSlug.startsWith('pay-')) return `Pagar ${h(fileSlug.replace('pay-', ''))}`
  if (fileSlug.startsWith('replace-')) return `Reemplazar ${h(fileSlug.replace('replace-', ''))}`
  return h(fileSlug)
}

function shortDescription(value) {
  const text = cleanText(value)
  if (!text) return 'Endpoint documentado oficialmente.'
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((s) => s.trim()) || [text]
  const first = sentences[0] || text
  const second = sentences[1]
  const combined = second && `${first} ${second}`.length <= 170 ? `${first} ${second}` : first
  if (combined.length <= 190) return combined
  return `${combined.slice(0, 187).trim()}...`
}

function renderFieldSpec(f) {
  const parts = [`{ name: '${f.name}', type: '${f.type}', required: ${!!f.required}, description: '${escapeString(f.description)}' }`]
  return '      ' + parts.join(',\n')
}

function escapeString(s) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
}

function buildPageContent(moduleSlug, endpoint) {
  const componentName = endpoint.title.replace(/[^a-zA-Z0-9]/g, '') + 'Page'
  const requiresAuth = !/no requiere/i.test(endpoint.authentication)
  const headers = requiresAuth
    ? [{ name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }]
    : []

  const authStr = endpoint.authentication ? endpoint.authentication.replace(/'/g, "\\'") : ''
  const curlPath = endpoint.path.replace(/:([a-zA-Z]+)/g, ':$1')

  const bodyFieldsStr = endpoint.body.map((f) => `    ${renderFieldSpec(f)}`).join(',\n')
  const pathParamsStr = endpoint.pathParams.map((f) => `    ${renderFieldSpec(f)}`).join(',\n')
  const queryParamsStr = endpoint.queryParams.map((f) => `    ${renderFieldSpec(f)}`).join(',\n')
  const headersStr = headers.map((f) => `    ${renderFieldSpec(f)}`).join(',\n')
  const errorsStr = endpoint.errors.map((e) => {
    let s = `    { status: ${e.status}, title: '${escapeString(e.title)}'`
    if (e.message) s += `, message: '${escapeString(e.message)}'`
    return s + ' }'
  }).join(',\n')
  const rulesStr = endpoint.businessRules.map((r) => `    '${escapeString(r)}'`).join(',\n')
  const notesStr = endpoint.notes.map((n) => `    '${escapeString(n)}'`).join(',\n')

  return `import { EndpointReference } from '@/components/docs/EndpointReference'
import { getModule } from '@/config/navigation'

export const metadata = { title: '${escapeString(endpoint.title)}' }

export default function ${componentName}() {
  const module = getModule('${moduleSlug}')!
  
  const endpoint = {
    slug: '${endpoint.slug}',
    title: '${escapeString(endpoint.title)}',
    method: '${endpoint.method}' as const,
    path: '${escapeString(endpoint.path)}',
    summary: '${escapeString(endpoint.summary)}',
    status: 'documented' as const,
    authentication: '${authStr}',
    contentTypes: ${JSON.stringify(endpoint.contentTypes)},
    contentType: '${endpoint.contentType || ''}',
    headers: [
${headersStr}
    ],
    pathParams: [
${pathParamsStr}
    ],
    queryParams: [
${queryParamsStr}
    ],
    body: [
${bodyFieldsStr}
    ],
    bodyGroups: [],
    curlExample: \`${endpoint.curlExample}\`,
    responses: [
      {
        status: ${endpoint.responses[0]?.status || 200},
        label: '${(endpoint.responses[0]?.label || 'OK').replace(/'/g, "\\'")}',
        example: \`${endpoint.responses[0]?.example || '{}'}\`
      }
    ],
    responseLanguage: '${endpoint.responseLanguage || 'json'}' as const,
    businessRules: [
${rulesStr}
    ],
    errors: [
${errorsStr}
    ],
    notes: [
${notesStr}
    ]
  }

  return <EndpointReference module={module} endpoint={endpoint} />
}
`
}

function businessRules(sections) {
  const names = [
    'Comportamiento relevante',
    'Reglas de negocio',
    'Reglas De Negocio',
    'Reglas de consistencia',
    'Reglas de imagen (si se envía)',
    'Reglas importantes',
    'Reglas de filtro por sucursal',
  ]
  const rules = []
  for (const [, lines] of getSectionsMatching(sections, names)) {
    const text = lines.join('\n')
    rules.push(...parseListItems(text))
    const paragraphs = text
      .split(/\n{2,}/)
      .map(cleanText)
      .filter((item) => item && !item.startsWith('```') && !item.includes('{') && !item.startsWith('-'))
    if (!parseListItems(text).length) rules.push(...paragraphs)
  }
  return rules.length ? [...new Set(rules)] : ['No aplica.']
}

function notes(sections) {
  const items = []
  for (const [name, lines] of sections) {
    if (!/^Notas/i.test(name)) continue
    const parsed = parseListItems(lines.join('\n'))
    if (parsed.length) items.push(...parsed)
  }
  return [...new Set(items)]
}

function requestBody(sections) {
  const bodyNames = ['Body', 'Body (obligatorios)', 'Body (obligatorio)', 'Body (todos opcionales)', 'Body (opcionales)']
  const groups = []
  for (const [name, lines] of sections) {
    if (bodyNames.map((n) => n.toLowerCase()).includes(name.toLowerCase())) {
      const section = lines.join('\n')
      const defaultRequired = /obligatorio/i.test(name)
      const fields = parseFields(section, defaultRequired)
      if (fields.length) groups.push({ title: 'Body', fields })
    }
    if (['Cabecera', 'Item (\`dprfmaproductos[]\`)', 'Cabecera editable'].includes(name)) {
      const fields = parseFields(lines.join('\n'), false)
      if (fields.length) groups.push({ title: name, fields })
    }
  }
  return groups
}

function contentTypes(section) {
  const matches = [...section.matchAll(/`([^`]+)`/g)].map((m) => m[1])
  return matches.length ? matches : []
}

function buildCurl(method, route, requiresAuth, contentType, jsonExample) {
  const parts = [`curl -X ${method} ${apiBaseUrl}${route}`]
  if (requiresAuth) parts.push(`-H "Authorization: Bearer <token>"`)
  if (method !== 'GET' && method !== 'DELETE' && contentType) parts.push(`-H "Content-Type: ${contentType}"`)
  if (jsonExample && method !== 'GET' && method !== 'DELETE') parts.push(`-d '${jsonExample}'`)
  return parts
    .map((part, index) => (index === 0 ? part : `  ${part}`))
    .map((line, index, lines) => (index < lines.length - 1 ? `${line} \\` : line))
    .join('\n')
}

function endpointFromFile(file) {
  const text = fs.readFileSync(file, 'utf8')
  const first = text.split(/\r?\n/)[0]
  const match = first.match(/^#\s+(GET|POST|PUT|PATCH|DELETE)\s+(.+)$/)
  if (!match) return null

  const moduleSlug = path.basename(path.dirname(file))
  const fileSlug = path.basename(file, '.md').replace(/-endpoint$/, '')
  const slug = slugOverrides.get(`${moduleSlug}/${fileSlug}`) || fileSlug
  const sections = getSections(text)

  const description = getSection(sections, ['Descripción', 'Descripcion'])
  const auth = getSection(sections, ['Autenticación', 'Autenticacion'])
  const types = contentTypes(getSection(sections, ['Content-Type']))
  const bodyGroups = requestBody(sections)
  const response = responseSpec(getSection(sections, ['Respuesta Exitosa']), text)
  const err = parseErrors(getSection(sections, ['Errores comunes', 'Errores']))
  const requiresAuth = !/no requiere/i.test(auth)
  const primaryType = types[0] || (match[1] === 'GET' ? undefined : 'application/json')

  // Extract JSON example for curl body
  const allSections = [...sections.values()].map((lines) => lines.join('\n')).join('\n')
  const bodyBlocks = getCodeBlocks(allSections)
  const jsonBlock = bodyBlocks.find((b) => b.language === 'json')

  // Get the first JSON block that looks like a request body (not response)
  const responseSection = getSection(sections, ['Respuesta Exitosa'])
  const requestBlocks = getCodeBlocks(getSection(sections, ['Ejemplo (JSON)', 'Ejemplo']))
  const requestJson = requestBlocks.find((b) => b.language === 'json')?.code || jsonBlock?.code

  return {
    module: moduleSlug,
    slug,
    title: titleFromSlug(moduleSlug, fileSlug),
    method: match[1],
    path: match[2].trim(),
    summary: shortDescription(description),
    authentication: auth ? cleanText(auth) : 'No requiere autenticación.',
    contentTypes: types.length ? types : primaryType ? [primaryType] : [],
    contentType: primaryType || '',
    headers: requiresAuth
      ? [{ name: 'Authorization', type: 'string', required: true, description: 'Bearer token obtenido durante el login.' }]
      : [],
    pathParams: params(sections, 'path'),
    queryParams: params(sections, 'query'),
    body: bodyGroups[0]?.fields || [],
    curlExample: buildCurl(match[1], match[2].trim(), requiresAuth, primaryType, requestJson),
    responses: [{ status: response.status, label: response.label, example: response.example }],
    responseLanguage: 'json',
    businessRules: businessRules(sections),
    errors: err.length ? err : [{ status: 500, title: 'Error inesperado' }],
    notes: notes(sections),
  }
}

function params(sections, kind) {
  const names = kind === 'path'
    ? ['Path Param', 'Path Params']
    : ['Query Params', 'Query Params (obligatorios)', 'Query Param (obligatorio)']
  const section = getSection(sections, names)
  if (!section || /no requiere/i.test(section)) return []
  return parseFields(section, /obligatorio/i.test(names.join(' ')))
}

function responseSpec(responseSection, fullText) {
  const status = parseStatus(responseSection)
  const blocks = getCodeBlocks(responseSection)
  const fallbackBlocks = getCodeBlocks(fullText)
  const block = blocks[0] || fallbackBlocks[fallbackBlocks.length - 1]
  if (block) {
    return { status: status.status, label: status.label, example: block.code, language: block.language === 'json' ? 'json' : 'text' }
  }
  return { status: status.status, label: status.label, example: '{}', language: 'json' }
}

// MAIN
const files = walk(docsRoot)
let count = 0
for (const file of files) {
  const endpoint = endpointFromFile(file)
  if (!endpoint) continue

  const pageDir = path.join(pagesRoot, endpoint.module, endpoint.slug)
  const pageFile = path.join(pageDir, 'page.tsx')
  
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true })
  }

  const content = buildPageContent(endpoint.module, endpoint)
  fs.writeFileSync(pageFile, content)
  count++
  console.log(`[${count}] ${endpoint.module}/${endpoint.slug} → ${path.relative(root, pageFile)}`)
}

console.log(`\nGeneradas ${count} páginas de endpoints.`)
