# SCISA org-guidelines

## Unreleased

### Added
- Se agrega la skill `preparar-proyecto`: deja un proyecto nuevo o existente con la estructura, documentación base y reglas de trabajo de los lineamientos, enlazando a 06.1, 06.3, 07.2 y 07.3 en vez de copiarlos
- El instalador de skills fuerza TLS 1.2 para funcionar en Windows PowerShell 5.1
- Se agrega 06.7 Revisor automático de PRs (Code Reviewer con IA): alcance actual, roadmap de reglas de pruebas y BDD por fases y modos, y proceso para proponer mejoras al prompt
- Se agrega 06.1 Convenciones de ramas (Gitflow): ramas, flujos de feature/release/hotfix/STS, versionamiento `-dev`/`-rc.N` por rama y advertencia sobre quitar funcionalidad en releases por cliente

- Se agrega el flujo Spec-First (05.15): specs BDD en español validadas por un par antes de iniciar cualquier trabajo, aprobadas en ClickUp
- Se agrega la ruta de inducción (01.6) y el contexto de productos y arquitectura (01.7)
- Se agrega el estándar del portal de documentación en wiki.js (07.9) y la propuesta de épica de consolidación de documentación
- Se documenta la excepción de trunk simple para librerías (Common) en 06.1

### Changed
- Se corrigen typos, traducción ("relaciones públicas" → PR) y tabla de calidad de código en 06.4; se enlazan los tiempos de respuesta de revisión (010.5)
- Se reescribe el Definition of Ready (05.3): una spec validada y criterios de aceptación son condición para tomar un ticket
- Los escenarios BDD se escriben en español (`# language: es`); el `.feature` es la fuente de verdad y el `.md` se exporta de él
- Wiki.js es la herramienta única de documentación; Docusaurus queda deprecado
- Se aclara que `development` puede romperse y no equivale a `master`
- Se estandariza la nomenclatura `master` / `development` / `releases/*` / `hotfixes/*` en CONTEXT, 06.5, 06.6 y 07.3
- Se documenta que el hotfix se lleva a `development` con rebase de su propia rama y PR

## v1.0.0 - 2026-05-20

### Added
- Se agrega modelo de dominio organizacional en CONTEXT.md con glosario, roles, gitflow, versionamiento y ambientes
- Se agrega Definition of Done (DoD) como documento propio con dos niveles de criterios: aceptación del ticket y criterios técnicos universales
- Se agrega checklist de propuesta para validar completitud antes de presentar al cliente; la aprobación del cliente es el gate de inicio de desarrollo
- Se agrega estándar de Gateway de entrega: checkpoint formal de validación en ambiente QA con demo en vivo y verificación en tres puntas (propuesta ↔ documentación ↔ entregable)
- Se agrega KPI de entregas con tasa de fallos, clasificación por etapa de origen (Análisis / Desarrollo / Gateway) y cadencia de revisión por release y trimestral
- Se actualizan los lineamientos de desarrollador y README para incluir navegación a todos los nuevos estándares
- Se agrega política de ambientes de despliegue (Dev, Staging, Production), gateway de producción, ventanas de deploy y política de notificaciones a clientes
- Se agregan guías de introducción para el repositorio
- Se crea guía organizacional para manuales de usuario
- Se agregan políticas de evaluación y aprobación de librerías de terceros

### Changed
- Se agrega información de estructura de PLD
- Se agrega guía de refactoring

### Removed
- Se elimina la sección 8 (scripts) por falta de acuerdo organizacional
