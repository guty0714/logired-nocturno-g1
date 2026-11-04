// Taller 1: almacenamiento propio en memoria; se reinicia al detener el proceso.
const envios = [
  { id: 1, numero_guia: 'LR-2026-000101', cliente_id: 1, peso_kg: 2.5, ciudad_destino: 'Medellín', direccion_destino: 'Carrera 43A # 1-50', estado: 'registrado', fecha_registro: '2026-10-26' },
  { id: 2, numero_guia: 'LR-2026-000102', cliente_id: 2, peso_kg: 10, ciudad_destino: 'Bogotá', direccion_destino: 'Calle 72 # 10-34', estado: 'en_transito', fecha_registro: '2026-10-27' },
  { id: 3, numero_guia: 'LR-2026-000103', cliente_id: 3, peso_kg: 0.8, ciudad_destino: 'Cali', direccion_destino: 'Avenida 6N # 25-10', estado: 'entregado', fecha_registro: '2026-10-28' },
];
let siguienteId = 4;
const copiar = (envio) => (envio ? { ...envio } : null);

async function findAll() { return envios.map(copiar); }
async function findById(id) { return copiar(envios.find((e) => e.id === id)); }
async function create(envio) {
  // Comprobar y escribir sin esperas evita duplicados en este proceso.
  if (envios.some((e) => e.numero_guia === envio.numero_guia)) {
    const error = new Error('Ya existe un envío con ese número de guía');
    error.code = 'ENVIO_DUPLICADO';
    throw error;
  }
  const nuevo = { ...envio, id: siguienteId++ };
  envios.push(nuevo);
  return copiar(nuevo);
}

module.exports = { findAll, findById, create };