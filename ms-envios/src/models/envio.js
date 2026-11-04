// Campos y validaciones de la entidad Envío.
const CAMPOS = new Set(['numero_guia', 'cliente_id', 'peso_kg', 'ciudad_destino', 'direccion_destino', 'estado']);
const ESTADOS = ['registrado', 'en_transito', 'entregado'];

function validarEnvio(datos) {
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    return ['Se esperaba un objeto JSON con los datos del envío'];
  }
  const errores = [];
  for (const campo of Object.keys(datos)) {
    if (!CAMPOS.has(campo)) errores.push(`Campo no permitido: ${campo}`);
  }
  // Textos obligatorios y su largo máximo
  for (const [campo, maximo] of Object.entries({ numero_guia: 30, ciudad_destino: 60, direccion_destino: 150 })) {
    if (typeof datos[campo] !== 'string' || !datos[campo].trim()) {
      errores.push(`${campo} es obligatorio y debe ser un texto no vacío`);
    } else if (datos[campo].trim().length > maximo) {
      errores.push(`${campo} no debe superar ${maximo} caracteres`);
    }
  }
  // cliente_id: solo se valida como entero positivo (la existencia se valida en el Taller 2)
  if (!Number.isSafeInteger(datos.cliente_id) || datos.cliente_id <= 0) {
    errores.push('cliente_id es obligatorio y debe ser un entero positivo');
  }
  if (typeof datos.peso_kg !== 'number' || !Number.isFinite(datos.peso_kg) || datos.peso_kg <= 0) {
    errores.push('peso_kg es obligatorio y debe ser un número mayor que 0');
  }
  // estado es opcional; si viene debe estar en la lista
  if (datos.estado !== undefined && !ESTADOS.includes(datos.estado)) {
    errores.push(`estado debe ser uno de: ${ESTADOS.join(', ')}`);
  }
  return errores;
}

function construirEnvio(datos) {
  return {
    numero_guia: datos.numero_guia.trim().toUpperCase(),
    cliente_id: datos.cliente_id,
    peso_kg: datos.peso_kg,
    ciudad_destino: datos.ciudad_destino.trim(),
    direccion_destino: datos.direccion_destino.trim(),
    estado: datos.estado || 'registrado',
    fecha_registro: new Date().toISOString().slice(0, 10),
  };
}

module.exports = { validarEnvio, construirEnvio };