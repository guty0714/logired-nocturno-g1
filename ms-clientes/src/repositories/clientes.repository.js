// Taller 2 (semana 1, parte 1): almacenamiento en memoria con CRUD y filtros.
const clientes = [
  { id: 1, nombre: 'Distribuidora El Valle', documento: '900123456', telefono: '+573001112233', email: 'contacto@elvalle.com', ciudad: 'Cali' },
  { id: 2, nombre: 'Comercial Antioquia', documento: '900654321', telefono: '+573104445566', email: 'ventas@comantioquia.com', ciudad: 'Medellín' },
  { id: 3, nombre: 'Ana Torres', documento: '1020304050', telefono: '+573207778899', email: null, ciudad: 'Bogotá' },
];
let siguienteId = 4;
const copiar = (cliente) => (cliente ? { ...cliente } : null);

function duplicado(documento, idIgnorado) {
  return clientes.some((c) => c.documento === documento && c.id !== idIgnorado);
}
function errorDuplicado() {
  const error = new Error('Ya existe un cliente con ese documento');
  error.code = 'CLIENTE_DUPLICADO';
  return error;
}

async function findAll(filtros = {}) {
  let resultado = clientes;
  if (filtros.ciudad) {
    resultado = resultado.filter((c) => c.ciudad.toLowerCase() === filtros.ciudad.toLowerCase());
  }
  if (filtros.ids) {
    resultado = resultado.filter((c) => filtros.ids.includes(c.id));
  }
  return resultado.map(copiar);
}
async function findById(id) { return copiar(clientes.find((c) => c.id === id)); }
async function create(cliente) {
  if (duplicado(cliente.documento)) throw errorDuplicado();
  const nuevo = { ...cliente, id: siguienteId++ };
  clientes.push(nuevo);
  return copiar(nuevo);
}
async function update(id, datos) {
  const indice = clientes.findIndex((c) => c.id === id);
  if (indice === -1) return null;
  if (duplicado(datos.documento, id)) throw errorDuplicado();
  clientes[indice] = { ...datos, id };
  return copiar(clientes[indice]);
}
async function remove(id) {
  const indice = clientes.findIndex((c) => c.id === id);
  if (indice === -1) return false;
  clientes.splice(indice, 1);
  return true;
}

module.exports = { findAll, findById, create, update, remove };