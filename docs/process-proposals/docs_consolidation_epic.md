# Épica: Consolidación de documentación en el portal wiki.js

> Texto listo para crear la épica y sus tickets en ClickUp (skill `ticket-template`). Cada ticket debe pasar por su propia spec validada ([05.15](../programming/0.5.collaborative_work/05.15.spec_first_workflow.md)).

## Contexto (por qué)

- La mayoría de nuestras soluciones no tiene documentación ni pruebas.
- Mucha documentación existe, pero vive en Google Drive (y otras herramientas) y **nadie la encuentra ni la mantiene**.
- Quien se incorpora al equipo no tiene una ruta clara para empezar ni contexto de negocio de los productos principales.
- Decisión organizacional: **la documentación es la forma de iniciar cualquier trabajo** y debe estar consolidada en un solo portal (wiki.js), alimentada desde los repositorios. Ver [07.9](../programming/0.7.repositories/07.9.docs_portal.md).

## Objetivo

Que cualquier persona pueda encontrar, en un solo lugar, la documentación vigente de cada producto y repositorio, y que la documentación nueva nazca ahí por defecto.

## Fuera de alcance

- Reescribir toda la documentación histórica. Se migra lo que sirve y se archiva el resto.
- Cambiar el contenido de los manuales de usuario (solo su ubicación).

## Fases y tickets

### Fase 0: Inventario (rescate de lo que existe)

**Ticket 0.1: Inventario de documentación en Google Drive y otras fuentes**

Contexto: sin saber qué existe no se puede consolidar.

Criterios de aceptación:

```gherkin
# language: es
Característica: Inventario de documentación existente

  Escenario: Todas las fuentes quedan inventariadas
    Dado que existen documentos en Google Drive, Stack Overflow Teams, Docusaurus y repositorios
    Cuando el equipo recorre cada fuente
    Entonces cada documento queda registrado en la hoja de inventario con todas sus columnas completas

  Escenario: Cada documento queda clasificado
    Dado un documento registrado en el inventario
    Cuando una persona lo revisa junto con un par
    Entonces se marca como "Migrar", "Actualizar y migrar" o "Archivar"
    Y tiene un destino y un dueño asignados
```

Columnas del inventario: nombre, enlace, fuente, producto/proyecto, tipo (spec, ADR, manual, diseño, procedimiento, otro), última edición, dueño, vigencia (Vigente / Dudosa / Obsoleta), acción (Migrar / Actualizar y migrar / Archivar), destino (repo / espacio del portal), estado.

**Ticket 0.2: Mapa de repositorios** (qué repo es qué, producto, equipo, dueño, estado de `docs/`, `tests/`, README).

### Fase 1: Portal mínimo

**Ticket 1.1: Prueba de concepto de wiki.js** (hosting, SSO, Git storage, Mermaid, Gherkin, búsqueda, permisos Interno/Cliente).

**Ticket 1.2: Publicar manualmente** `org-guidelines` y los `docs/` de 2 repos piloto (Identity y Common).

**Ticket 1.3: Publicar la ruta de inducción y el contexto de productos** ([01.6](../programming/0.1.introduction/01.6.onboarding_path.md), [01.7](../programming/0.1.introduction/01.7.product_context.md)).

### Fase 2: Automatización

**Ticket 2.1: Pipeline de publicación** `docs/` → `docs-portal` al mergear a `master`.

**Ticket 2.2: Herramienta de exportación** `.feature` → bloque del `.md` y validación en PR.

**Ticket 2.3: Skill** para generar spec + ADR + diagrama desde una conversación.

### Fase 3: Migración

**Ticket 3.1: Migrar documentos "Migrar"** del inventario, por producto y en orden de criticidad.

**Ticket 3.2: Migrar manuales de Docusaurus y artículos de Stack Overflow Teams a wiki.js.**

**Ticket 3.3: Archivar** lo marcado "Archivar" (Drive de solo lectura, con enlace a su reemplazo).

### Fase 4: Cobertura de specs en lo existente

**Ticket 4.1: Spec de caracterización** de los features críticos de cada producto (siguiendo la regla de avance de 05.15), priorizados por riesgo.

## Criterios de éxito de la épica

- [ ] Existe una hoja de inventario completa y vigente.
- [ ] El portal está en producción con acceso para el equipo.
- [ ] Todo repositorio con actividad en el último trimestre tiene `README.md` y `docs/` publicados en el portal.
- [ ] Todo documento marcado "Migrar" está en el portal o en el repo.
- [ ] Google Drive ya no es origen de documentación nueva.
- [ ] Una persona nueva puede seguir la ruta de inducción sin ayuda para llegar a su primer ticket Ready.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Documentación obsoleta se migra y desinforma | Clasificación de vigencia por un par, antes de migrar |
| El portal se llena y nadie lo mantiene | Dueños por espacio, fecha de última revisión visible |
| Operaciones (DevHub) no adopta el proceso | Capacitación al equipo de operaciones en documentar con el mismo estándar |
| La sincronización pisa ediciones manuales | Regla: lo que viene de un repo solo se edita por PR |
