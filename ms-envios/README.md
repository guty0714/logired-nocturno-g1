# ms-envios · Taller 1

Gestiona los envíos (paquetes) de LogiRed registrados para entrega. Usa Node.js 22 o superior y Express, con controlador, servicio, modelo y repositorio.

## Alcance actual

Listado, consulta por id y creación, con almacenamiento propio en memoria. Los datos se pierden al reiniciar. Incluye tres envíos de ejemplo; el siguiente id es 4. `cliente_id` solo se valida como entero positivo; la existencia del cliente se validará en el Taller 2 consultando a ms-clientes.

## Entidad y validaciones

Campos: id, numero_guia, cliente_id, peso_kg, ciudad_destino, direccion_destino, estado y fecha_registro. El servidor asigna el id y la fecha_registro.

| Campo | Regla |
|---|---|
| numero_guia | Texto obligatorio de hasta 30 caracteres; se guarda en mayúsculas; debe ser único (409) |
| cliente_id | Entero positivo obligatorio |
| peso_kg | Número obligatorio mayor que 0 |
| ciudad_destino | Texto obligatorio de hasta 60 caracteres |
| direccion_destino | Texto obligatorio de hasta 150 caracteres |
| estado | Opcional: registrado (por defecto), en_transito o entregado |
| fecha_registro | La asigna el servicio con la fecha de hoy |

Se recortan los espacios sobrantes. Se rechazan arreglos y campos desconocidos.

## Ejecutar

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Puerto predeterminado: 3003. HOST predeterminado: 127.0.0.1.

## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | /health | 200, estado del servicio |
| GET | /envios | 200, arreglo de envíos |
| GET | /envios/:id | 200, envío; 400 si el id es inválido; 404 si no existe |
| POST | /envios | 201, envío y cabecera Location; 400 si los datos son inválidos; 409 si el número de guía ya existe |

Crear un envío: POST http://localhost:3003/envios

```json
{
  "numero_guia": "LR-2026-000200",
  "cliente_id": 1,
  "peso_kg": 3.2,
  "ciudad_destino": "Cali",
  "direccion_destino": "Carrera 100 # 5-20"
}
```

## Archivos

| Archivo | Función |
|---|---|
| src/index.js | Arranca el servidor |
| src/app.js | Configura JSON, rutas y respuestas de error |
| src/routes/envios.routes.js | Asocia las peticiones a cada operación |
| src/controllers/envios.controller.js | Recibe y responde las peticiones; valida el id |
| src/services/envios.service.js | Coordina las validaciones y operaciones |
| src/models/envio.js | Valida y prepara los datos |
| src/repositories/envios.repository.js | Guarda y consulta los envíos en memoria |
| src/utils/http-error.js | Representa errores con código, mensaje y detalles |