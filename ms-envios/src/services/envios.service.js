const repo = require('../repositories/envios.repository');
const { validarEnvio, construirEnvio } = require('../models/envio');
const HttpError = require('../utils/http-error');

async function listar() { return repo.findAll(); }
async function obtener(id) {
  const envio = await repo.findById(id);
  if (!envio) throw new HttpError(404, `No existe el envío con id ${id}`);
  return envio;
}
async function crear(datos) {
  const errores = validarEnvio(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);
  try {
    return await repo.create(construirEnvio(datos));
  } catch (error) {
    if (error.code === 'ENVIO_DUPLICADO') throw new HttpError(409, error.message);
    throw error;
  }
}

module.exports = { listar, obtener, crear };