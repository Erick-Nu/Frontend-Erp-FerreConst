export type NavModule = {
  slug: string
  title: string
  description: string
  endpoints: Array<{ slug: string; title: string; method: string; path: string; summary: string; status: string }>
}

export const navigationModules: NavModule[] = [
  {
    slug: 'auth',
    title: 'Autenticación',
    description: 'Gestión de sesiones, access tokens y refresh tokens para usuarios del sistema.',
    endpoints: [
      { slug: 'login', title: 'Login', method: 'POST', path: '/auth/login', summary: 'Inicia sesión de usuario y retorna un accessToken y un refreshToken.', status: 'documented' },
      { slug: 'logout', title: 'Logout', method: 'POST', path: '/auth/logout', summary: 'Cierra la sesión revocando el refreshToken recibido.', status: 'documented' },
      { slug: 'refresh', title: 'Refresh Session', method: 'POST', path: '/auth/refresh', summary: 'Renueva la sesión usando el refreshToken y retorna un nuevo par de tokens.', status: 'documented' }
    ]
  },
  {
    slug: 'alert',
    title: 'Alertas',
    description: 'Alertas de stock bajo y eventos en tiempo real.',
    endpoints: [
      { slug: 'get-alert-events', title: 'Listar Alert Events', method: 'GET', path: '/alerts/events', summary: 'Abre una conexión SSE (Server-Sent Events) para recibir alertas.', status: 'documented' },
      { slug: 'get-alerts', title: 'Listar Alerts', method: 'GET', path: '/alerts', summary: 'Obtiene el listado paginado de alertas visibles de la empresa.', status: 'documented' },
      { slug: 'update-alert-as-viewed', title: 'Actualizar Alert As Viewed', method: 'PATCH', path: '/alerts/:id/visto', summary: 'Marca una alerta como vista.', status: 'documented' }
    ]
  },
  {
    slug: 'branch',
    title: 'Sucursales',
    description: 'Administración de sucursales por empresa.',
    endpoints: [
      { slug: 'register-branch', title: 'Crear Branch', method: 'POST', path: '/branches', summary: 'Crea una sucursal para la empresa.', status: 'documented' },
      { slug: 'get-branches', title: 'Listar Branches', method: 'GET', path: '/branches', summary: 'Obtiene el listado paginado de sucursales.', status: 'documented' },
      { slug: 'get-branch-by-id', title: 'Obtener Branch', method: 'GET', path: '/branches/:id', summary: 'Obtiene una sucursal por su identificador.', status: 'documented' },
      { slug: 'update-branch', title: 'Actualizar Branch', method: 'PATCH', path: '/branches/:id', summary: 'Actualiza una sucursal por su identificador.', status: 'documented' }
    ]
  },
  {
    slug: 'brand',
    title: 'Marcas',
    description: 'Catálogo de marcas de productos.',
    endpoints: [
      { slug: 'register-brand', title: 'Crear Brand', method: 'POST', path: '/brands', summary: 'Crea una nueva marca.', status: 'documented' },
      { slug: 'get-brands', title: 'Listar Brands', method: 'GET', path: '/brands', summary: 'Obtiene el listado paginado de marcas.', status: 'documented' },
      { slug: 'get-brand-by-id', title: 'Obtener Brand', method: 'GET', path: '/brands/:id', summary: 'Obtiene una marca por su identificador.', status: 'documented' },
      { slug: 'update-brand', title: 'Actualizar Brand', method: 'PATCH', path: '/brands/:id', summary: 'Actualiza una marca por su identificador.', status: 'documented' }
    ]
  },
  {
    slug: 'category',
    title: 'Categorías',
    description: 'Catálogo de categorías de productos.',
    endpoints: [
      { slug: 'register-category', title: 'Crear Category', method: 'POST', path: '/categories', summary: 'Crea una nueva categoría.', status: 'documented' },
      { slug: 'get-categories', title: 'Listar Categories', method: 'GET', path: '/categories', summary: 'Obtiene el listado paginado de categorías.', status: 'documented' },
      { slug: 'get-category-by-id', title: 'Obtener Category', method: 'GET', path: '/categories/:id', summary: 'Obtiene una categoría por su identificador.', status: 'documented' },
      { slug: 'update-category', title: 'Actualizar Category', method: 'PATCH', path: '/categories/:id', summary: 'Actualiza una categoría.', status: 'documented' }
    ]
  },
  {
    slug: 'checkout',
    title: 'Cajas',
    description: 'Gestión de cajas y estado operativo.',
    endpoints: [
      { slug: 'register-checkout', title: 'Crear Checkout', method: 'POST', path: '/checkouts', summary: 'Crea una nueva caja registradora.', status: 'documented' },
      { slug: 'get-checkouts', title: 'Listar Checkouts', method: 'GET', path: '/checkouts', summary: 'Obtiene el listado paginado de cajas.', status: 'documented' },
      { slug: 'get-checkout-by-id', title: 'Obtener Checkout', method: 'GET', path: '/checkouts/:id', summary: 'Obtiene una caja por su identificador.', status: 'documented' },
      { slug: 'update-checkout-status', title: 'Actualizar Checkout Status', method: 'PATCH', path: '/checkouts/:id', summary: 'Abre o cierra el estado operativo de una caja.', status: 'documented' }
    ]
  },
  {
    slug: 'client',
    title: 'Clientes',
    description: 'Gestión de clientes.',
    endpoints: [
      { slug: 'register-client', title: 'Crear Client', method: 'POST', path: '/clients', summary: 'Crea un nuevo cliente.', status: 'documented' },
      { slug: 'get-clients', title: 'Listar Clients', method: 'GET', path: '/clients', summary: 'Obtiene el listado paginado de clientes.', status: 'documented' },
      { slug: 'get-client-by-id', title: 'Obtener Client', method: 'GET', path: '/clients/:id', summary: 'Obtiene un cliente por su identificador o cédula/RUC.', status: 'documented' },
      { slug: 'update-client', title: 'Actualizar Client', method: 'PATCH', path: '/clients/:id', summary: 'Actualiza la información de un cliente.', status: 'documented' }
    ]
  },
  {
    slug: 'company',
    title: 'Empresas',
    description: 'Administración de empresas registradas en el sistema.',
    endpoints: [
      { slug: 'register-company', title: 'Crear Company', method: 'POST', path: '/companies', summary: 'Registra una nueva empresa en el sistema.', status: 'documented' },
      { slug: 'get-companies', title: 'Listar Companies', method: 'GET', path: '/companies', summary: 'Obtiene el listado paginado de empresas.', status: 'documented' },
      { slug: 'get-company-by-id', title: 'Obtener Company', method: 'GET', path: '/companies/:id', summary: 'Obtiene una empresa por su identificador.', status: 'documented' },
      { slug: 'update-company', title: 'Actualizar Company', method: 'PUT', path: '/companies/:id', summary: 'Actualiza la información comercial y visual de la empresa.', status: 'documented' },
      { slug: 'update-company-status', title: 'Actualizar Company Status', method: 'PATCH', path: '/companies/:id/status', summary: 'Cambia el estado de una empresa (activo/inactivo/eliminado).', status: 'documented' }
    ]
  },
  {
    slug: 'config',
    title: 'Configuración',
    description: 'Parámetros de configuración del sistema.',
    endpoints: [
      { slug: 'register-config', title: 'Crear Config', method: 'POST', path: '/configs', summary: 'Crea un nuevo parámetro de configuración.', status: 'documented' },
      { slug: 'get-configs', title: 'Listar Configs', method: 'GET', path: '/configs', summary: 'Obtiene todos los parámetros de configuración.', status: 'documented' },
      { slug: 'get-config-by-key', title: 'Obtener Config', method: 'GET', path: '/configs/:key', summary: 'Obtiene el valor de un parámetro de configuración por su clave.', status: 'documented' },
      { slug: 'update-config', title: 'Actualizar Config', method: 'PUT', path: '/configs/:key', summary: 'Actualiza el valor de un parámetro existente.', status: 'documented' },
      { slug: 'delete-config', title: 'Eliminar Config', method: 'DELETE', path: '/configs/:key', summary: 'Elimina un parámetro de configuración por su clave.', status: 'documented' }
    ]
  },
  {
    slug: 'medida',
    title: 'Medidas',
    description: 'Unidades de medida para productos.',
    endpoints: [
      { slug: 'register-medida', title: 'Crear Medida', method: 'POST', path: '/medidas', summary: 'Crea una nueva unidad de medida.', status: 'documented' },
      { slug: 'get-medidas', title: 'Listar Medidas', method: 'GET', path: '/medidas', summary: 'Obtiene el listado de unidades de medida.', status: 'documented' },
      { slug: 'get-medida-by-id', title: 'Obtener Medida', method: 'GET', path: '/medidas/:id', summary: 'Obtiene una unidad de medida por su identificador.', status: 'documented' },
      { slug: 'update-medida', title: 'Actualizar Medida', method: 'PATCH', path: '/medidas/:id', summary: 'Actualiza una unidad de medida existente.', status: 'documented' }
    ]
  },
  {
    slug: 'playment-method',
    title: 'Métodos de Pago',
    description: 'Catálogo de métodos de pago disponibles.',
    endpoints: [
      { slug: 'register-playment-method', title: 'Crear Playment Method', method: 'POST', path: '/payment-methods', summary: 'Crea un nuevo método de pago.', status: 'documented' },
      { slug: 'get-playment-methods', title: 'Listar Playment Methods', method: 'GET', path: '/payment-methods', summary: 'Obtiene los métodos de pago disponibles.', status: 'documented' },
      { slug: 'get-playment-method-by-id', title: 'Obtener Playment Method', method: 'GET', path: '/payment-methods/:id', summary: 'Obtiene un método de pago por su identificador.', status: 'documented' },
      { slug: 'update-playment-method', title: 'Actualizar Playment Method', method: 'PATCH', path: '/payment-methods/:id', summary: 'Actualiza un método de pago existente.', status: 'documented' }
    ]
  },
  {
    slug: 'product',
    title: 'Productos',
    description: 'Catálogo de productos, marcas, categorías y datos comerciales.',
    endpoints: [
      { slug: 'register-product', title: 'Crear Product', method: 'POST', path: '/products', summary: 'Crea un nuevo producto en el catálogo.', status: 'documented' },
      { slug: 'get-products', title: 'Listar Products', method: 'GET', path: '/products', summary: 'Obtiene el listado paginado de productos.', status: 'documented' },
      { slug: 'get-product-by-id', title: 'Obtener Product', method: 'GET', path: '/products/:id', summary: 'Obtiene el detalle completo de un producto por su id o código.', status: 'documented' },
      { slug: 'update-product', title: 'Actualizar Product', method: 'PUT', path: '/products/:id', summary: 'Actualiza la información comercial y características de un producto.', status: 'documented' }
    ]
  },
  {
    slug: 'proforma',
    title: 'Proformas',
    description: 'Creación, consulta, pago, anulación y exportación PDF de proformas.',
    endpoints: [
      { slug: 'register-proforma', title: 'Crear Proforma', method: 'POST', path: '/proformas', summary: 'Crea y emite una nueva proforma con estado emitida.', status: 'documented' },
      { slug: 'get-proformas', title: 'Listar Proformas', method: 'GET', path: '/proformas', summary: 'Obtiene el listado paginado de proformas.', status: 'documented' },
      { slug: 'get-proforma-by-id', title: 'Obtener Proforma', method: 'GET', path: '/proformas/:id', summary: 'Obtiene el detalle completo de una proforma.', status: 'documented' },
      { slug: 'get-proforma-pdf', title: 'Obtener Proforma Pdf', method: 'GET', path: '/proformas/:id/pdf', summary: 'Genera y descarga el documento PDF de una proforma.', status: 'documented' },
      { slug: 'pay-proforma', title: 'Pagar Proforma', method: 'POST', path: '/proformas/:id/pagar', summary: 'Registra el pago de una proforma emitida, cambiando su estado a pagada y descontando el stock.', status: 'documented' },
      { slug: 'replace-proforma', title: 'Reemplazar Proforma', method: 'POST', path: '/proformas/:id/reemplazar', summary: 'Anula una proforma emitida y crea una nueva con los cambios enviados.', status: 'documented' },
      { slug: 'cancel-proforma', title: 'Anular Proforma', method: 'POST', path: '/proformas/:id/anular', summary: 'Cambia el estado de una proforma a anulada.', status: 'documented' }
    ]
  },
  {
    slug: 'proveedor',
    title: 'Proveedores',
    description: 'Gestión de proveedores.',
    endpoints: [
      { slug: 'register-proveedor', title: 'Crear Proveedor', method: 'POST', path: '/proveedores', summary: 'Registra un nuevo proveedor.', status: 'documented' },
      { slug: 'get-proveedores', title: 'Listar Proveedores', method: 'GET', path: '/proveedores', summary: 'Obtiene el listado paginado de proveedores.', status: 'documented' },
      { slug: 'get-proveedor-by-id', title: 'Obtener Proveedor', method: 'GET', path: '/proveedores/:id', summary: 'Obtiene un proveedor por su identificador.', status: 'documented' },
      { slug: 'update-proveedor', title: 'Actualizar Proveedor', method: 'PATCH', path: '/proveedores/:id', summary: 'Actualiza la información de un proveedor.', status: 'documented' }
    ]
  },
  {
    slug: 'stock',
    title: 'Stock',
    description: 'Control de inventario por producto, empresa y sucursal.',
    endpoints: [
      { slug: 'register-stock', title: 'Crear Stock', method: 'POST', path: '/stocks', summary: 'Asigna o incrementa stock de un producto para una sucursal específica.', status: 'documented' },
      { slug: 'get-stocks', title: 'Listar Stocks', method: 'GET', path: '/stocks', summary: 'Obtiene el stock detallado por producto y sucursal.', status: 'documented' },
      { slug: 'get-stocks-by-company', title: 'Listar Stocks By Company', method: 'GET', path: '/stocks/empresa', summary: 'Obtiene el inventario consolidado a nivel de empresa.', status: 'documented' },
      { slug: 'get-stock-by-id', title: 'Obtener Stock', method: 'GET', path: '/stocks/:id', summary: 'Obtiene el detalle de un registro de stock específico.', status: 'documented' },
      { slug: 'update-stock', title: 'Actualizar Stock', method: 'PATCH', path: '/stocks/:id', summary: 'Ajusta manualmente los niveles máximo o mínimo de un stock, o fuerza una corrección de cantidad.', status: 'documented' }
    ]
  },
  {
    slug: 'system',
    title: 'Sistema',
    description: 'Endpoints técnicos del estado de la API.',
    endpoints: [
      { slug: 'health', title: 'Health Check', method: 'GET', path: '/', summary: 'Endpoint raíz para validar que la API está viva.', status: 'documented' }
    ]
  },
  {
    slug: 'user',
    title: 'Usuarios',
    description: 'Gestión de usuarios, credenciales, contraseñas y estado.',
    endpoints: [
      { slug: 'register-user', title: 'Crear User', method: 'POST', path: '/users', summary: 'Registra un nuevo usuario en la empresa.', status: 'documented' },
      { slug: 'get-users', title: 'Listar Users', method: 'GET', path: '/users', summary: 'Obtiene el listado paginado de usuarios.', status: 'documented' },
      { slug: 'get-user-by-id', title: 'Obtener User', method: 'GET', path: '/users/:id', summary: 'Obtiene un usuario por su identificador.', status: 'documented' },
      { slug: 'update-user', title: 'Actualizar User', method: 'PUT', path: '/users/:id', summary: 'Actualiza la información personal de un usuario.', status: 'documented' },
      { slug: 'update-user-password', title: 'Actualizar User Password', method: 'PATCH', path: '/users/:id/password', summary: 'Cambia la contraseña de un usuario.', status: 'documented' },
      { slug: 'update-user-status', title: 'Actualizar User Status', method: 'PATCH', path: '/users/:id/status', summary: 'Cambia el estado de un usuario (activo/inactivo/eliminado).', status: 'documented' }
    ]
  }
]

export const totalEndpoints = navigationModules.reduce(
  (total, module) => total + module.endpoints.length,
  0
)

export const documentedEndpoints = navigationModules.reduce(
  (total, module) => total + module.endpoints.filter((endpoint) => endpoint.status === 'documented').length,
  0
)

export function getModule(slug: string) {
  return navigationModules.find((module) => module.slug === slug) ?? null
}

export function getEndpoint(moduleSlug: string, endpointSlug: string) {
  return getModule(moduleSlug)?.endpoints.find((endpoint) => endpoint.slug === endpointSlug) ?? null
}

export function getEndpointParams() {
  return navigationModules.flatMap((module) =>
    module.endpoints.map((endpoint) => ({ module: module.slug, endpoint: endpoint.slug }))
  )
}