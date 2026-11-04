// Taller 1: almacenamiento propio en memoria; se reinicia al detener el proceso.
const clientes = [
  { id: 1, nombre: 'Distribuidora El Valle', documento: '900123456', telefono: '+573001112233', email: 'contacto@elvalle.com', ciudad: 'Cali' },
  { id: 2, nombre: 'Comercial Antioquia', documento: '900654321', telefono: '+573104445566', email: 'ventas@comantioquia.com', ciudad: 'Medellín' },
  { id: 3, nombre: 'Ana Torres', documento: '1020304050', telefono: '+573207778899', email: null, ciudad: 'Bogotá' },
];
let siguienteId = 4;
const copiar = (cliente) => (cliente ? { ...cliente } : null);

async function findAll() { return clientes.map(copiar); }
async function findById(id) { return copiar(clientes.find((c) => c.id === id)); }
async function create(cliente) {
  // Comprobar y escribir sin esperas evita duplicados en este proceso.
  if (clientes.some((c) => c.documento === cliente.documento)) {
    const error = new Error('Ya existe un cliente con ese documento');
    error.code = 'CLIENTE_DUPLICADO';
    throw error;
  }
  const nuevo = { ...cliente, id: siguienteId++ };
  clientes.push(nuevo);
  return copiar(nuevo);
}

module.exports = { findAll, findById, create };