---
name: ticket-widget
description: >
  Genera tickets de software en formato JSON compacto para ser consumidos
  directamente por el widget Tauri de ClickUp, sin necesidad del MCP.
  Usar este skill SOLO Y ÚNICAMENTE cuando el usuario lo solicite explícitamente
  con frases como "dame los tickets para el widget", "formato widget", "genera el
  JSON del widget", "quiero el payload del widget", "genera el json compacto",
  "necesito el JSON para el widget de Tauri". NUNCA activar por defecto — este
  skill es un modo alternativo al ticket-generator normal. No sube nada a ClickUp;
  solo genera el array JSON para que el widget lo procese.
---
 
# Ticket Widget Generator
 
Genera tickets en el **formato JSON compacto** que consume el widget desktop de Tauri para subir a ClickUp directamente vía API, sin pasar por el MCP.
 
> ⚠️ Este skill **no sube nada a ClickUp**. Solo genera el JSON listo para pegar en el widget.
 
---
 
## Cuándo activar este skill
 
Solo cuando el usuario lo pida explícitamente. Ejemplos:
- "dame los tickets para el widget"
- "formato widget"
- "genera el JSON del widget"
- "quiero el payload del widget"
- "json compacto para tauri"
Si el usuario no lo pide, usa `ticket-generator` (MCP) en su lugar.
 
---
 
## Esquema del formato
 
```json
[
  {
    "t": "Título del ticket",
    "tp": "bug" | "feature" | "task" | "spike",
    "p": 1 | 2 | 3 | 4,
    "d": "Descripción en markdown",
    "tags": ["tag1", "tag2"],
    "s": "open",
    "list_id": "abc123"
  }
]
```
 
### Campos
 
| Campo | Tipo | Req. | Descripción |
|---|---|---|---|
| `t` | `string` | ✅ | Título — máx. 10 palabras, imperativo, sin punto final |
| `tp` | `"bug" \| "feature" \| "task" \| "spike"` | ✅ | Tipo de ticket |
| `p` | `1\|2\|3\|4` | ❌ | Prioridad: 1=urgente, 2=alta, 3=normal **(default)**, 4=baja |
| `d` | `string` | ❌ | Descripción completa en markdown |
| `tags` | `string[]` | ❌ | Array de tags; siempre incluye el tipo como primer tag |
| `s` | `string` | ❌ | Status inicial — siempre `"open"` por defecto |
| `list_id` | `string` | ❌ | Override de lista destino; omitir si se usa la default |
 
> La salida **siempre** es un array `[...]`, aunque sea un solo ticket.
 
---
 
## Tipos de ticket y cuándo usarlos
 
| Tipo | Señales en el texto |
|---|---|
| **bug** | "falla", "error", "no funciona", "rompe", "crash", "no hace nada" |
| **feature** | "agregar", "necesitamos", "nueva pantalla", "el usuario debe poder", "quiero que" |
| **task** | "configurar", "documentar", "actualizar dependencias", "migración", "script" |
| **spike** | "investigar", "evaluar", "ver si vale la pena", "no sabemos cómo", "comparar" |
 
> ❌ No uses tipos que no sean los cuatro anteriores.
 
---
 
## Proceso
 
### Paso 1 — Parsear las notas
 
1. Lee el texto completo antes de escribir cualquier ticket.
2. Identifica unidades de trabajo independientes — no agrupes lo que debería ser tickets separados.
3. Para cada unidad, determina el tipo con la tabla de arriba.
4. Si un ítem es solo contexto o reflexión sin acción clara, ignóralo en silencio. Si hay varios, agrúpalos al final en un bloque "No convertido" con una línea de razón.
5. Si no hay trabajo accionable, notifica al usuario y detente:
   > "No encontré trabajo accionable. Incluye acciones concretas, problemas específicos o funcionalidades a desarrollar."
### Paso 2 — Construir el campo `d` (descripción markdown)
 
Usa la plantilla correspondiente al tipo:
 
**Bug:**
```markdown
**Comportamiento actual**
[Qué pasa hoy.]
 
**Comportamiento esperado**
[Qué debería pasar.]
 
**Pasos para reproducir**
1. [Paso 1]
2. [Paso 2]
 
**Severidad:** [Critical / High / Medium / Low]
 
**Criterios de aceptación**
- [ ] El sistema se comporta como se esperaba
- [ ] El fix no rompe los tests existentes
```
 
**Feature:**
```markdown
**Historia de usuario**
Como [rol], quiero [acción], para [beneficio].
 
**Descripción**
[Contexto y problema que resuelve.]
 
**Criterios de aceptación**
- [ ] [Condición verificable 1]
- [ ] [Condición verificable 2]
 
**Notas técnicas**
[Dependencias, APIs involucradas, consideraciones.]
```
 
**Task:**
```markdown
**Descripción**
[Qué implica y por qué es necesaria ahora.]
 
**Criterios de aceptación**
- [ ] [Entregable concreto 1]
- [ ] [Entregable concreto 2]
 
**Notas técnicas**
[Herramientas, scripts o contexto relevante.]
```
 
**Spike:**
```markdown
**Pregunta a responder**
[La pregunta concreta que define el fin del spike.]
 
**Contexto**
[Por qué hay incertidumbre y qué se necesita saber para avanzar.]
 
**Timebox:** [ej. 1 día / 3 días]
 
**Entregable esperado**
[Documento / ADR / POC / recomendación escrita.]
```
 
### Paso 3 — Construir el JSON
 
Para cada ticket:
- `t`: título máx. 10 palabras, imperativo
- `tp`: tipo en lowercase
- `p`: 3 por defecto (normal), salvo que el usuario indique otra prioridad
- `d`: descripción markdown de la plantilla, con saltos de línea como `\n` dentro del string
- `tags`: array con el tipo como primer elemento, más cualquier tag adicional que se infiera del contexto
- `s`: `"open"` siempre
- `list_id`: incluir solo si el usuario proporciona un ID de lista explícitamente
### Paso 4 — Vista previa y confirmación
 
Muestra el JSON completo en un bloque de código y pregunta:
 
> "¿Todo se ve bien? ¿Quieres ajustar alguna prioridad, agregar tags o asignar un `list_id` antes de usarlo en el widget?"
 
Espera respuesta. Aplica los cambios y muestra el JSON actualizado si los hay.
 
### Paso 5 — Entregar el JSON final
 
Una vez confirmado, presenta el JSON final listo para copiar.
 
---
 
## Ejemplo completo
 
**Input:**
> "El botón de guardar no hace nada en Firefox. Necesitamos un endpoint para exportar reportes en CSV."
 
**Output:**
```json
[
  {
    "t": "Botón guardar no responde en Firefox",
    "tp": "bug",
    "p": 3,
    "d": "**Comportamiento actual**\nEl botón de guardar no ejecuta ninguna acción al hacer clic en Firefox.\n\n**Comportamiento esperado**\nAl hacer clic en Guardar, los cambios se persisten y se muestra confirmación.\n\n**Pasos para reproducir**\n1. Abrir el formulario\n2. Completar los campos\n3. Hacer clic en Guardar\n\n**Severidad:** High\n\n**Criterios de aceptación**\n- [ ] El botón guarda correctamente en Firefox\n- [ ] El fix no afecta Chrome ni Safari",
    "tags": ["bug", "firefox"],
    "s": "open"
  },
  {
    "t": "Endpoint de exportación de reportes en CSV",
    "tp": "feature",
    "p": 3,
    "d": "**Historia de usuario**\nComo administrador, quiero exportar reportes en CSV, para analizarlos en herramientas externas.\n\n**Descripción**\nActualmente no existe forma de exportar datos fuera del sistema.\n\n**Criterios de aceptación**\n- [ ] Endpoint GET /reports/export retorna archivo .csv válido\n- [ ] El archivo incluye todos los campos relevantes del reporte\n- [ ] El endpoint está protegido por autenticación\n\n**Notas técnicas**\nVerificar límites de tamaño para reportes grandes; considerar streaming si aplica.",
    "tags": ["feature", "api"],
    "s": "open"
  }
]
```
 
---
 
## Resumen de cierre
 
Al entregar el JSON final, agrega una línea:
 
`JSON generado: N tickets — X Bugs, X Features, X Tasks, X Spikes`
 
Omite los tipos con cero.
 