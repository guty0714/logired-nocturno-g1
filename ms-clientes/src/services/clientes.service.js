const repo = require('../repositories/clientes.repository');
const { validarCliente, construirCliente } = require('../models/cliente');
const HttpError = require('../utils/http-error');

async function listar(filtros) { return repo.findAll(filtros); }
async function obtener(id) {
  const cliente = await repo.findById(id);
  if (!cliente) throw new HttpError(404, `No existe el cliente con id ${id}`);
  return cliente;
}
async function crear(datos) {
  const errores = validarCliente(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);
  try {
    return await repo.create(construirCliente(datos));
  } catch (error) {
    if (error.code === 'CLIENTE_DUPLICADO') throw new HttpError(409, error.message);
    throw error;
  }
}
async function actualizar(id, datos) {
  const errores = validarCliente(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);
  try {
    const actualizado = await repo.update(id, construirCliente(datos));
    if (!actualizado) throw new HttpError(404, `No existe el cliente con id ${id}`);
    return actualizado;
  } catch (error) {
    if (error.code === 'CLIENTE_DUPLICADO') throw new HttpError(409, error.message);
    throw error;
  }
}
async function eliminar(id) {
  const eliminado = await repo.remove(id);
  if (!eliminado) throw new HttpError(404, `No existe el cliente con id ${id}`);
}

module.exports = { listar, obtener, crear, actualizar, eliminar };