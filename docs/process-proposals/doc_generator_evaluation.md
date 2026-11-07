# Spike: herramienta para generar documentación desde los `.feature` de Reqnroll

> Alimenta el Ticket 2.2 de la [épica de consolidación](./docs_consolidation_epic.md) y la guía [2.8](../programming/0.2.code_standards/2.8.reqnroll_documentation.md). Como todo ticket, debe pasar por su spec validada ([05.15](../programming/0.5.collaborative_work/05.15.spec_first_workflow.md)).

## Contexto (por qué)

Cada entrega debe llevar un [Documento de Validación de Entrega](../programming/0.5.collaborative_work/05.17.delivery_validation_doc.md): qué cambió, qué escenarios validar y qué queda fuera de alcance. Los escenarios ya existen como `.feature` de Reqnroll en `tests/**`; armar el documento a mano no escala ni se mantiene consistente.

## Preguntas a responder

1. ¿Existe una herramienta que genere **Markdown** (para wiki.js) desde `.feature` en español?
2. ¿Puede cruzar el resultado de ejecución de Reqnroll con cada escenario?
3. ¿Puede marcar Nuevo / Modificado / Sin cambios entre dos releases? (Si no, ¿se resuelve con un script de diff sobre git?)
4. ¿Se mantiene activamente y es compatible con Reqnroll y .NET actual?
5. ¿Construir una herramienta propia es proporcional al problema?

## Candidatos

Hallazgos de una búsqueda preliminar; **todo debe confirmarse con prueba real** en un repo piloto.

| Candidato | Qué es | Salida | Observaciones |
|---|---|---|---|
| **Reqnroll LivingDoc** (CLI oficial de Reqnroll) | Genera reporte desde el ensamblado de pruebas + archivo de ejecución | HTML (otros formatos sin confirmar) | Valida pero no genera Markdown directo. Confirmar flags y formatos en la documentación oficial |
| **Expressium.LivingDoc** (plugin de terceros) | Reporte tipo living documentation para Reqnroll, sobre Cucumber Messages | HTML (un solo archivo) | Terceros; evaluar mantenimiento y licencia |
| **Pickles** | Generador clásico de documentación desde Gherkin | Markdown, HTML, Word, Excel, JSON | Sus mantenedores indican que está sin mantenimiento (ligado a SpecFlow; última versión ~2022). Riesgo alto para adoptarlo hoy |
| **Herramienta propia** (`dotnet tool`) | Parser de Gherkin (paquete oficial de Cucumber) + generador de Markdown + lectura de TRX/mensajes + diff entre tags | Markdown a la medida | Control total del formato del documento de entrega; costo de construir y mantener |
| **Salida HTML publicada tal cual** | Subir el HTML de LivingDoc al wiki como adjunto o enlace | HTML | Alternativa si wiki.js no necesita Markdown nativo; probar si se renderiza o se enlaza |

## Criterios de evaluación

| Criterio | Peso |
|---|---|
| Salida legible en wiki.js (Markdown, o HTML que el wiki acepte) | Alto |
| Soporta Gherkin en español | Alto |
| Muestra resultado de ejecución por escenario | Alto |
| Mantenimiento activo / compatibilidad con Reqnroll actual | Alto |
| Permite Nuevo / Modificado / Sin cambios (directo o con script) | Medio |
| Corre en pipeline sin intervención | Medio |
| Costo de adopción o de construcción | Medio |

## Plan del spike

1. Elegir **un repo piloto** con `.feature` en `tests/**` y pruebas ejecutándose en pipeline.
2. Probar cada candidato con ese repo y guardar la salida real.
3. Publicar las salidas en una página de prueba del portal y revisar cómo se ven (Mermaid, tablas, Gherkin).
4. Prototipar el diff entre dos tags con `git diff` y un parser de Gherkin; medir esfuerzo.
5. Presentar al equipo: comparación con los criterios, recomendación y estimación.

## Resultado esperado

Decisión documentada (ADR): usar herramienta existente, o construir la propia con alcance definido. Con esa decisión se actualizan 2.8, 05.15, 05.9, 2.7 y 013.4.

## Fuera de alcance

- Automatizar todavía la publicación al wiki (Ticket 2.1).
- Migrar proyectos al uso de Reqnroll.
