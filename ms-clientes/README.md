# ms-clientes · Taller 1

Gestiona los clientes de LogiRed: personas o empresas que envían paquetes. Usa Node.js 22 o superior y Express, con controlador, servicio, modelo y repositorio.

## Alcance actual

Listado, consulta por id y creación, con almacenamiento propio en memoria. Los datos se pierden al reiniciar. Incluye tres clientes de ejemplo; el siguiente id es 4.

## Entidad y validaciones

Campos: id, nombre, documento, telefono, email y ciudad. El servidor asigna el id. El email es opcional; los demás campos del cuerpo son obligatorios.

| Campo | Regla |
|---|---|
| nombre | Texto no vacío de hasta 150 caracteres |
| documento | Texto de 5 a 20 caracteres (letras, números o guion); debe ser único |
| telefono | Texto de hasta 32 caracteres con entre 7 y 15 dígitos; admite + inicial, espacios, paréntesis y guiones |
| email | Opcional; si viene, debe tener formato de correo válido; se guarda en minúsculas |
| ciudad | Texto no vacío de hasta 60 caracteres |

Se recortan los espacios sobrantes. El teléfono se guarda sin espacios, paréntesis ni guiones. Se rechazan arreglos y campos desconocidos.

## Ejecutar

Desde esta carpeta:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Puerto predeterminado: 3002. Si ya existe .env, conserve su contenido y ajuste PORT a 3002. HOST predeterminado: 127.0.0.1.

## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | /health | 200, estado del servicio |
| GET | /clientes | 200, arreglo de clientes |
| GET | /clientes/:id | 200, cliente; 400 si el id es inválido; 404 si no existe |
| POST | /clientes | 201, cliente y cabecera Location; 400 si los datos son inválidos; 409 si el documento ya existe |

Crear un cliente: POST http://localhost:3002/clientes

```json
{
  "nombre": "Transportes Andina",
  "documento": "900777888",
  "telefono": "+573151234567",
  "email": "info@andina.com",
  "ciudad": "Cali"
}
```

Consultar el listado: GET http://localhost:3002/clientes

Consultar un registro: GET http://localhost:3002/clientes/1

## Archivos

| Archivo | Función |
|---|---|
| src/index.js | Arranca el servidor |
| src/app.js | Configura JSON, rutas y respuestas de error |
| src/routes/clientes.routes.js | Asocia las peticiones a cada operación |
| src/controllers/clientes.controller.js | Recibe y responde las peticiones; valida el id |
| src/services/clientes.service.js | Coordina las validaciones y operaciones |
| src/models/cliente.js | Valida y prepara los datos |
| src/repositories/clientes.repository.js | Guarda y consulta los clientes en memoria |
| src/utils/http-error.js | Representa errores con código, mensaje y detalles |