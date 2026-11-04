// Campos y validaciones de la entidad Cliente.
const CAMPOS = new Set(['nombre', 'documento', 'telefono', 'email', 'ciudad']);

function validarCliente(datos) {
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    return ['Se esperaba un objeto JSON con los datos del cliente'];
  }
  const errores = [];
  for (const campo of Object.keys(datos)) {
    if (!CAMPOS.has(campo)) errores.push(`Campo no permitido: ${campo}`);
  }
  // Campos de texto obligatorios y su largo máximo
  for (const [campo, maximo] of Object.entries({ nombre: 150, documento: 20, telefono: 32, ciudad: 60 })) {
    if (typeof datos[campo] !== 'string' || !datos[campo].trim()) {
      errores.push(`${campo} es obligatorio y debe ser un texto no vacío`);
    } else if (datos[campo].trim().length > maximo) {
      errores.push(`${campo} no debe superar ${maximo} caracteres`);
    }
  }
  if (typeof datos.documento === 'string' && !/^[0-9A-Za-z-]{5,20}$/.test(datos.documento.trim())) {
    errores.push('documento debe tener entre 5 y 20 caracteres (letras, números o guion)');
  }
  if (typeof datos.telefono === 'string') {
    const telefono = datos.telefono.trim();
    const cantidad = telefono.replace(/\D/g, '').length;
    if (!/^\+?[0-9 ()-]+$/.test(telefono) || cantidad < 7 || cantidad > 15) {
      errores.push('telefono debe contener entre 7 y 15 dígitos; admite + inicial, espacios, paréntesis y guiones');
    }
  }
  // email es opcional, pero si viene debe tener formato válido
  const hayEmail = datos.email !== undefined && datos.email !== null && datos.email !== '';
  if (hayEmail) {
    if (typeof datos.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
      errores.push('email debe tener un formato de correo válido');
    } else if (datos.email.trim().length > 120) {
      errores.push('email no debe superar 120 caracteres');
    }
  }
  return errores;
}

function construirCliente(datos) {
  const hayEmail = typeof datos.email === 'string' && datos.email.trim() !== '';
  return {
    nombre: datos.nombre.trim(),
    documento: datos.documento.trim(),
    telefono: datos.telefono.trim().replace(/[ ()-]/g, ''),
    email: hayEmail ? datos.email.trim().toLowerCase() : null,
    ciudad: datos.ciudad.trim(),
  };
}

module.exports = { validarCliente, construirCliente };