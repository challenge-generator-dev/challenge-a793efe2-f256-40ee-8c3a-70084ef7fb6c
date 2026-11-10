# Implementación de operaciones CRUD de órdenes en DynamoDB

El sistema de gestión de órdenes requiere la implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos DynamoDB a través de una interfaz de usuario construida con React. El objetivo es permitir a los usuarios gestionar órdenes de manera eficiente, asegurando que los datos se persistan correctamente en DynamoDB. El sistema debe manejar casos de error y proporcionar feedback al usuario.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial y lectura de órdenes

**Objetivo:** Configurar el entorno de desarrollo y permitir la lectura de órdenes desde DynamoDB.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura el entorno de desarrollo para trabajar con DynamoDB y React.
- Implementa la funcionalidad para leer órdenes desde DynamoDB y mostrarlas en la interfaz.
- Asegúrate de manejar correctamente los errores de conexión y de lectura.

**Entregable:** Interfaz de usuario que muestra las órdenes leídas desde DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza Terraform para versionar la infraestructura de DynamoDB.
- Maneja los errores de conexión y lectura de DynamoDB proporcionando feedback al usuario.

</details>

### Fase 2: Creación y actualización de órdenes

**Objetivo:** Implementar la funcionalidad para crear y actualizar órdenes en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa la funcionalidad para crear nuevas órdenes y guardarlas en DynamoDB.
- Agrega la capacidad de actualizar órdenes existentes en DynamoDB.
- Asegúrate de validar los datos de entrada y manejar los errores de escritura.

**Entregable:** Interfaz de usuario que permite crear y actualizar órdenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Valida los datos de entrada antes de guardarlos en DynamoDB.
- Maneja los errores de escritura en DynamoDB proporcionando feedback al usuario.

</details>

### Fase 3: Eliminación de órdenes

**Objetivo:** Implementar la funcionalidad para eliminar órdenes de DynamoDB.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Implementa la funcionalidad para eliminar órdenes de DynamoDB.
- Asegúrate de confirmar la acción de eliminación con el usuario.
- Maneja los errores de eliminación y proporciona feedback al usuario.

**Entregable:** Interfaz de usuario que permite eliminar órdenes de DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Confirma la acción de eliminación con el usuario antes de proceder.
- Maneja los errores de eliminación en DynamoDB proporcionando feedback al usuario.

</details>

### Fase 4: Versionado de la infraestructura

**Objetivo:** Versionar la infraestructura de DynamoDB usando Terraform.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Utiliza Terraform para versionar la configuración de la infraestructura de DynamoDB.
- Asegúrate de que la configuración versionada permita la implementación de las operaciones CRUD.
- Documenta el proceso de versionado y despliegue de la infraestructura.

**Entregable:** Configuración versionada de la infraestructura de DynamoDB usando Terraform.

<details>
<summary>Pistas de conocimiento</summary>

- Sigue las mejores prácticas para versionar la infraestructura con Terraform.
- Documenta claramente el proceso de versionado y despliegue.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en la gestión de órdenes?
- **paraQueSirve**: ¿Para qué sirve versionar la infraestructura de DynamoDB con Terraform?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD en DynamoDB desde una interfaz de usuario construida con React?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica el versionado de la infraestructura de DynamoDB con Terraform?

## Criterios de Evaluacion

- Implementación correcta de operaciones CRUD en DynamoDB desde la interfaz de usuario.
- Manejo adecuado de errores de conexión, lectura, escritura y eliminación en DynamoDB.
- Confirmación de la acción de eliminación con el usuario antes de proceder.
- Versionado correcto de la infraestructura de DynamoDB usando Terraform.
- Documentación clara del proceso de versionado y despliegue de la infraestructura.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd api && npm install && npm run build` — componente `api` (practice).
4. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
