# Idea Sink

Skill de Claude para capturar, organizar y convertir ideas y notas en tickets de ClickUp, integrado directamente al Space de **Innovación** en el workspace de SCISA.

---

## ¿Qué hace?

El idea sink es un sistema de captura rápida de ideas dentro de ClickUp. Permite registrar cualquier pensamiento, observación o pendiente sin preocuparse por formato ni prioridad, y procesarlo después convirtiéndolo en tickets estructurados cuando sea conveniente.

El sistema vive en un documento de ClickUp llamado `_idea-sink` y se opera completamente desde el chat de Claude usando lenguaje natural.

---

## Flujo general

```
Ideas / notas
     ↓
  [Modo A] Dictas en el chat        [Modo C] Escribes en ClickUp
     ↓                                        ↓
     └────────────── Inbox (con fecha) ───────┘
                          ↓
                    [Modo B] Procesar
                          ↓
               Tickets en ClickUp + Inbox limpio
```

---

## Modos de uso

### Modo A — Capturar desde el chat
Dictas la idea directamente a Claude en la conversación. Claude la escribe en el inbox con el header de fecha del día.

**Frases de activación:**
> "Agrega al sink: ..."
> "Anota esto en innovación: ..."
> "Guarda esta idea: ..."

---

### Modo C — Migrar notas escritas en ClickUp
Cuando escribiste notas libremente en la página **🗒️ Notas sin procesar** del doc (desde móvil, sin Claude abierto, etc.), Claude las lee, las normaliza a bullets y las pasa al inbox con la fecha de hoy. La página queda limpia al terminar.

**Frases de activación:**
> "Pasa las notas al sink"
> "Migra las notas"
> "Limpia las notas sin procesar"

---

### Modo B — Procesar el inbox y generar tickets
Claude lee todo lo que hay en el inbox, muestra un resumen clasificado por tipo (Bug / Feature / Task / Spike), espera confirmación, genera los tickets completos y los sube a la lista que indiques. Al terminar archiva las ideas en el historial y deja el inbox limpio.

**Frases de activación:**
> "Procesa el sink"
> "Qué hay en el sink"
> "Convierte el sink en tickets"

---

## Prefijos opcionales

Al capturar ideas puedes usar prefijos para darle contexto a Claude:

| Prefijo | Efecto al procesar |
|---|---|
| `!` | Prioridad **High** |
| `?` | Fuerza tipo **Spike** |
| `~` | Marca como idea vaga — Claude pregunta si convertir o descartar |
| *(sin prefijo)* | Claude infiere tipo y usa prioridad Normal |

---

## Estructura del documento en ClickUp

El skill opera sobre un doc fijo en el Space Innovación:

| Página | Propósito |
|---|---|
| Inbox de ideas | Donde viven las ideas organizadas por fecha, pendientes de procesar |
| Notas sin procesar | Página de escritura libre — se limpia tras cada migración |
| Ideas procesadas | Historial de todo lo que ya fue convertido en ticket o descartado |
| Config del sink | Referencia técnica con IDs del doc y páginas para Claude |

---

## Advertencias importantes

**Este skill está hardcodeado a un documento y space específicos.**
Todos los IDs del doc, páginas y space de Innovación están fijos dentro del skill. Si el documento es eliminado, movido o renombrado en ClickUp, el skill dejará de funcionar y deberá actualizarse manualmente con los nuevos IDs.

**No funciona con otros Spaces.**
El skill está diseñado exclusivamente para el Space de **Innovación**. No tiene lógica para operar en DevHub, PUI, SaaS u otros spaces. Si se requiere un sink en otro space, debe crearse un skill separado con su propio documento e IDs.

**La lista destino de tickets no tiene valor por defecto.**
Al procesar el sink, Claude siempre pregunta a qué lista subir los tickets. Puedes evitar esta pregunta agregando una lista preferida en la página ⚙️ Config del sink del documento.

**`update_document_page` reemplaza el contenido completo.**
ClickUp no hace append — cada actualización sobreescribe la página entera. El skill siempre lee antes de escribir para preservar el contenido existente, pero si se interrumpe una operación a la mitad podría haber pérdida parcial de notas. Se recomienda no cerrar la conversación mientras Claude esté procesando.

---

## Instalación

Importar el archivo `idea-sink.skill` desde la sección de Skills en los ajustes de Claude.

El skill requiere que el MCP de ClickUp esté conectado y autenticado en la sesión de Claude.