// =====================================================================
// ARCHIVO: src/data/api.js
// ---------------------------------------------------------------------
// Capa de datos del panel: fetch, validación, búsqueda y el cruce.
// =====================================================================

const BASE = 'https://dummyjson.com'

// GET /users?limit=0 → TODOS los usuarios (limit=0 = sin paginar).
export async function obtenerUsuarios() {
  const respuesta = await fetch(`${BASE}/users?limit=0`)
  if (!respuesta.ok) throw new Error('No se pudieron cargar los usuarios')
  const datos = await respuesta.json()
  return datos.users  // DummyJSON responde { users: [...] }
}

// GET /carts?limit=0 → TODOS los carritos.
export async function obtenerCarritos() {
  const respuesta = await fetch(`${BASE}/carts?limit=0`)
  if (!respuesta.ok) throw new Error('No se pudieron cargar los carritos')
  const datos = await respuesta.json()
  return datos.carts  // DummyJSON responde { carts: [...] }
}

// GET /products?limit=0 → TODOS los productos.
export async function obtenerProductos() {
  const respuesta = await fetch(`${BASE}/products?limit=0`)
  if (!respuesta.ok) throw new Error('No se pudieron cargar los productos')
  const datos = await respuesta.json()
  return datos.products  // DummyJSON responde { products: [...] }
}

// GET /users/:id → un solo usuario (para el detalle).
export async function obtenerUsuario(id) {
  const respuesta = await fetch(`${BASE}/users/${id}`)
  if (!respuesta.ok) throw new Error('No se pudo cargar el cliente')
  return respuesta.json()
}

// GET /carts/user/:id → los carritos de UN solo usuario.
export async function obtenerCarritosDeUsuario(id) {
  const respuesta = await fetch(`${BASE}/carts/user/${id}`)
  if (!respuesta.ok) throw new Error('No se pudieron cargar los carritos')
  const datos = await respuesta.json()
  return datos.carts
}


// GET /products?limit=0 → TODOS los productos.
export async function obtenerpos() {
  const respuesta = await fetch(`${BASE}/posts?limit=0`)
  if (!respuesta.ok) throw new Error('No se pudieron cargar los productos')
  const datos = await respuesta.json()
  return datos.posts  // DummyJSON responde { products: [...] }
}

export async function obtenerRecipes() {
  const respuesta = await fetch(`${BASE}/recipes?limit=0`)
  if (!respuesta.ok) throw new Error('No se pudieron cargar los productos')
  const datos = await respuesta.json()
  return datos.recipes  // DummyJSON responde { products: [...] }
}

// Búsqueda amigable: no distingue mayúsculas de minúsculas.
export function normalizar(texto) {
  return String(texto).toLowerCase()
}

// =====================================================================
// CRUCE CLAVE: usuarios + carritos → clientes con totales.
// Unimos DOS endpoints por userId (el punto importante de la clase).
// =====================================================================
export function unirClientesYCarritos(usuarios, carritos) {
  return usuarios.map((usuario) => {
    const carritosCliente = carritos.filter((cart) => cart.userId === usuario.id)
    const totalGastado = carritosCliente.reduce((s, cart) => s + cart.discountedTotal, 0)
    const totalArticulos = carritosCliente.reduce((s, cart) => s + cart.totalQuantity, 0)

    return {
      id: usuario.id,
      nombre: `${usuario.firstName} ${usuario.lastName}`,
      email: usuario.email,
      ciudad: usuario.address?.city || 'Sin ciudad',
      empresa: usuario.company?.name || 'Sin empresa',
      avatar: usuario.image,
      totalCarritos: carritosCliente.length,
      totalArticulos,
      totalGastado,
      carritos: carritosCliente,
    }
  })
}