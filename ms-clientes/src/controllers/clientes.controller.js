const service = require('../services/clientes.service');
const HttpError = require('../utils/http-error');

function leerId(req) {
  const valor = req.params.id;
  const id = Number(valor);
  if (!/^[0-9]+$/.test(valor) || !Number.isSafeInteger(id) || id <= 0) {
    throw new HttpError(400, 'El id debe ser un entero positivo dentro del rango seguro');
  }
  return id;
}
async function listar(req, res) {
  const filtros = { ciudad: req.query.ciudad };
  if (req.query.ids) { // ?ids=1,3,8 → [1, 3, 8]
    filtros.ids = String(req.query.ids).split(',').map(Number);
    if (filtros.ids.some((id) => !Number.isInteger(id) || id <= 0)) {
      throw new HttpError(400, 'ids debe ser una lista de enteros separados por comas');
    }
  }
  res.status(200).json(await service.listar(filtros));
}
async function obtener(req, res) {
  res.status(200).json(await service.obtener(leerId(req)));
}
async function crear(req, res) {
  const nuevo = await service.crear(req.body);
  res.status(201).location(`${req.baseUrl}/${nuevo.id}`).json(nuevo);
}
async function actualizar(req, res) {
  res.status(200).json(await service.actualizar(leerId(req), req.body));
}
async function eliminar(req, res) {
  await service.eliminar(leerId(req));
  res.status(204).end(); // 204 No Content: éxito, sin cuerpo
}

module.exports = { listar, obtener, crear, actualizar, eliminar };