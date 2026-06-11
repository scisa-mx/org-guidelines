---
name: idea-sink
description: >
  Gestiona el idea sink de Innovación en ClickUp: captura notas/ideas en el inbox
  del doc y las procesa convirtiéndolas en tickets estructurados. También puede leer
  la página de notas crudas, pasarlas al inbox formateadas y limpiarla.
  Activar siempre que el usuario mencione el sink, el inbox de ideas, las notas sin
  procesar, o quiera capturar/leer/procesar notas de Innovación.
  Frases de activación: "agrega al sink", "agrega al inbox", "procesa el sink",
  "qué hay en el sink", "lee el inbox de ideas", "vacía el sink",
  "anota esto en innovación", "guarda esta idea", "procesa mis notas del sink",
  "pasa las notas al sink", "migra las notas", "limpia las notas sin procesar".
  Este skill es independiente del ticket-generator — incluye su propio flujo completo
  de generación y subida de tickets cuando el usuario pide procesar el sink.
---

# Idea Sink — Innovación

Gestiona el doc `_idea-sink` del Space Innovación en ClickUp.
Tres modos: **capturar** ideas, **migrar** notas crudas al inbox y **procesar** el inbox convirtiéndolo en tickets.

---

## Referencia del documento

| Campo | Valor |
|---|---|
| Space | Innovación (`901310437538`) |
| Doc ID | `8cm1bgt-28713` |
| Página Inbox | `8cm1bgt-12393` (Inbox de ideas) |
| Página Procesadas | `8cm1bgt-12413` (Ideas procesadas) |
| Página Notas crudas | `8cm1bgt-12473` (Notas sin procesar) |
| URL del doc | https://app.clickup.com/9013603865/docs/8cm1bgt-28713 |

---

## Modo A — Capturar ideas

**Triggers:** "agrega al sink", "anota esto", "guarda esta idea", "agrega al inbox de innovación", o cualquier frase donde el usuario quiera registrar algo sin procesar aún.

### Pasos

**A1. Leer el inbox actual**
Usa `clickup_get_document_pages` con:
- `document_id: "8cm1bgt-28713"`
- `page_ids: ["8cm1bgt-12393"]`
- `content_format: "text/md"`

Extrae el contenido completo de la página.

**A2. Verificar la fecha actual**
Usa la fecha real del sistema (disponible en el contexto de la conversación como "current date"). Formatea como `## DD/MM/YYYY`.

**A3. Construir el nuevo contenido**

Regla del header de fecha — **changelog por día**:

- Si el inbox ya tiene una sección con el header `## DD/MM/YYYY` de hoy → agrega las nuevas ideas **debajo del header existente**, sin duplicarlo.
- Si no existe header de hoy → agrega el header nuevo al final del contenido existente, seguido de las ideas.

Formato de cada idea capturada:
```
- [texto de la idea tal como la dio el usuario]
```

Si el usuario usó prefijos (`!`, `?`, `~`), respétalos sin modificar.

**A4. Actualizar el inbox**
Usa `clickup_update_document_page` con:
- `document_id: "8cm1bgt-28713"`
- `page_id: "8cm1bgt-12393"`
- `content_format: "text/md"`
- `content`: el contenido completo reconstruido (instrucciones originales + ideas existentes + nuevas ideas)

⚠️ `update_document_page` **reemplaza todo el contenido** — siempre incluir el contenido previo completo más lo nuevo. Nunca truncar.

**A5. Confirmar al usuario**
```
✅ Agregado al sink de Innovación (DD/MM/YYYY):
   - [idea 1]
   - [idea 2]
```

---

## Modo C — Migrar notas crudas al inbox

**Triggers:** "pasa las notas al sink", "migra las notas", "limpia las notas sin procesar", "procesa la página de notas", o cualquier frase que implique mover contenido de la página de notas al inbox.

Este modo es el puente entre escritura libre y el inbox estructurado. El usuario escribe sin formato en la página 🗒️ Notas sin procesar, y Claude normaliza, estructura con fecha y limpia.

### Pasos

**C1. Leer las notas crudas**
Usa `clickup_get_document_pages` con:
- `document_id: "8cm1bgt-28713"`
- `page_ids: ["8cm1bgt-12473"]`
- `content_format: "text/md"`

Extrae el contenido debajo del separador `---`. Ignora el encabezado y las instrucciones de la página.

Si no hay contenido (o la página solo tiene el header + separador), responde:
> "La página de notas está vacía. No hay nada que migrar."

Y detente.

**C2. Normalizar el contenido**

Convierte el texto libre a bullets limpios, uno por idea/nota identificable. Reglas:
- Separa ideas que estén pegadas en el mismo párrafo si son claramente distintas.
- Respeta los prefijos (`!`, `?`, `~`) si el usuario los usó.
- Preserva el texto original lo más posible — no reformules, solo limpia.
- Si una línea es contexto o reflexión sin acción clara, consérvala como `~` (idea vaga).

**C3. Leer el inbox actual**
Usa `clickup_get_document_pages` con `page_ids: ["8cm1bgt-12393"]` para obtener el estado actual del inbox.

**C4. Construir el nuevo contenido del inbox**

Aplica la misma regla de changelog por día que el Modo A:
- Si ya existe `## DD/MM/YYYY` de hoy → agrega los bullets debajo, sin duplicar el header.
- Si no existe → agrega el header de hoy al final, seguido de los bullets.

**C5. Actualizar el inbox**
Usa `clickup_update_document_page` con `page_id: "8cm1bgt-12393"` y el contenido completo reconstruido.

⚠️ Siempre incluir el contenido previo completo del inbox más lo nuevo. Nunca truncar.

**C6. Limpiar la página de notas crudas**
Usa `clickup_update_document_page` con `page_id: "8cm1bgt-12473"` reemplazando el contenido por el estado inicial vacío — conservando solo el encabezado, instrucciones y separador:

```markdown
# Notas sin procesar

> Escribe aquí lo que sea — ideas, observaciones, pendientes, borradores.  
> Cuando le digas a Claude "pasa las notas al sink", leerá esta página, normalizará el contenido, lo agregará al inbox con el header de fecha de hoy y borrará esta página.  
> No necesitas formato — texto libre es suficiente.

---

```

**C7. Confirmar al usuario**
```
✅ Notas migradas al sink (DD/MM/YYYY):
   - [nota normalizada 1]
   - [nota normalizada 2]
   ...
   N notas agregadas al inbox. Página de notas limpia ✓
```

Si quieres procesar el inbox ahora y convertir en tickets, di "procesa el sink".

---

## Modo B — Procesar el inbox

**Triggers:** "procesa el sink", "qué hay en el sink", "vacía el inbox", "procesa mis notas", "convierte el sink en tickets".

### Pasos

**B1. Leer el inbox**
Usa `clickup_get_document_pages` igual que en A1.

Extrae solo el contenido debajo de `## Ideas sin procesar`. Ignora todo lo anterior (instrucciones, tabla de convenciones). Agrupa las ideas por sección de fecha si las hay.

Si no hay nada (o solo está el comentario HTML `<!-- ... -->`), responde:
> "El inbox está vacío. No hay ideas pendientes."

Y detente.

**B2. Interpretar prefijos opcionales**

| Prefijo | Efecto |
|---|---|
| `!` | Prioridad **High** |
| `?` | Tipo **Spike** |
| `~` | Idea vaga — preguntar si convertir o descartar |
| *(sin prefijo)* | Inferir tipo y prioridad Normal |

**B3. Clasificar cada idea**

| Tipo | Señales |
|---|---|
| **Bug** | "falla", "error", "no funciona", "crash", "500" |
| **Feature** | "agregar", "necesitamos", "quiero que", "el usuario debe poder" |
| **Task** | "configurar", "documentar", "migrar", "actualizar", "script" |
| **Spike** | "investigar", "evaluar", "ver si", "no sabemos cómo" |

> ❌ No uses Improvement ni Refactor — clasifica como Task o Spike según corresponda.

**B4. Mostrar resumen al usuario**

```
📥 Encontré N ideas en el sink de Innovación:

| # | Idea (resumida) | Fecha | Tipo | Prioridad |
|---|---|---|---|---|
| 1 | ...            | DD/MM | Feature | Normal |
| 2 | ...            | DD/MM | Bug     | High   |

¿Continúo generando los tickets? ¿Quieres cambiar algo?
```

Si hay ideas con prefijo `~`, listarlas aparte y preguntar qué hacer con cada una antes de continuar.

Espera confirmación del usuario.

**B5. Generar tickets**

Para cada idea accionable, genera el ticket completo según su tipo:

### BUG
```
**Título:** [máx. 10 palabras]
**Tipo:** Bug | **Prioridad:** [según prefijo o Normal]

**Descripción**
[Comportamiento actual vs. esperado]

**Pasos para reproducir**
1. ...

**Entorno**
- Ambiente: [production / staging / local]
- Versión: [si aplica]

**Severidad:** [Critical / High / Medium / Low]

**Criterios de aceptación**
- [ ] El sistema se comporta como se esperaba
- [ ] El fix no rompe tests existentes
- [ ] Verificado en el ambiente donde se reportó
```

### FEATURE
```
**Título:** [máx. 10 palabras]
**Tipo:** Feature | **Prioridad:** [según prefijo o Normal]

**Historia de usuario**
Como [rol], quiero [acción], para [beneficio].

**Descripción**
[Contexto y problema que resuelve]

**Criterios de aceptación**
- [ ] [Condición 1]
- [ ] [Condición 2]

**Notas técnicas** *(si aplica)*
```

### TASK
```
**Título:** [máx. 10 palabras]
**Tipo:** Task | **Prioridad:** [según prefijo o Normal]

**Descripción**
[Qué implica, por qué ahora, qué queda listo]

**Criterios de aceptación**
- [ ] [Entregable 1]
- [ ] [Entregable 2]
```

### SPIKE
```
**Título:** [máx. 10 palabras]
**Tipo:** Spike | **Prioridad:** [según prefijo o Normal]

**Pregunta a responder**
[La pregunta concreta]

**Descripción**
[Contexto e incertidumbre]

**Timebox:** [ej. 1 día]
**Entregable esperado:** [documento / ADR / POC / recomendación]
```

Muestra todos los tickets generados y pregunta:
> "¿Todo se ve bien? ¿Cambias alguna prioridad u otro campo antes de subir?"

**B6. Confirmar lista destino**

Pregunta a qué lista de ClickUp se suben:
> "¿A qué lista de Innovación los subo?"

- Nombre exacto o ID → verifica con `clickup_get_list`.
- Nombre ambiguo → repregunta hasta tener uno exacto.
- Todos van a la misma lista salvo que el usuario diga lo contrario.

**B7. Subir a ClickUp**

Por cada ticket usa `clickup_create_task` con:
- `name` = título
- `markdown_description` = cuerpo completo
- `priority` = `urgent` / `high` / `normal` / `low`
- `tags` = tipo en lowercase: `bug`, `feature`, `task`, `spike`
- ❌ No asignes personas ni estimes horas salvo pedido explícito.

Si los tags fallan:
> "No se pudieron agregar tags — ¿continúo sin ellos?"

**B8. Archivar en "Ideas procesadas"**

Lee el contenido actual de `8cm1bgt-12413` con `clickup_get_document_pages`, luego actualiza con `clickup_update_document_page` agregando una fila por idea:

| Fecha | Idea original | Resultado | Ticket |
|---|---|---|---|
| DD/MM/YYYY | Texto original | Convertida / Descartada | [ID](url) |

**B9. Limpiar el inbox**

Actualiza `8cm1bgt-12393` conservando la sección de instrucciones y la tabla de convenciones completas; elimina solo el contenido debajo de `## Ideas sin procesar`, dejando el comentario HTML intacto:

```markdown
## Ideas sin procesar

<!-- Escribe aquí abajo. Claude leerá desde esta sección hacia abajo. -->
```

**B10. Resumen final**

```
✅ Sink de Innovación procesado:
   - N tickets subidos a [lista]
   - N ideas archivadas en "Ideas procesadas"
   - Inbox limpio ✓

Tickets generados:
   - ID — Título (tipo) → url
   ...
Se generaron N tickets: X Bugs, X Features, X Tasks, X Spikes
```

---

## Notas generales

- Nunca truncar contenido previo al hacer update — siempre leer antes de escribir.
- Los prefijos del usuario (`!`, `?`, `~`) se preservan en el archivo; solo se interpretan al procesar.
- Si el usuario captura una idea mientras hay ideas sin procesar de días anteriores, simplemente se agrega con el header del día de hoy — no se mezcla con entradas viejas.