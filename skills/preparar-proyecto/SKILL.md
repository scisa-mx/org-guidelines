---
name: preparar-proyecto
description: Prepara un proyecto, nuevo o existente, con la estructura y las reglas de trabajo de SCISA según org-guidelines (src/, tests/, docs/ con features BDD y ADR, README, GLOSSARY, historias de usuario, CHANGELOG, CONTRIBUTING con Gitflow o trunk, .gitignore, .editorconfig, Dockerfile). Úsala cuando el usuario pida iniciar, preparar, formalizar, ordenar, estandarizar o "poner en formato" un proyecto, definir cómo se va a trabajar en él o crear su documentación base.
---

# Preparar un proyecto

Deja cualquier proyecto, nuevo o existente, con la estructura, documentación y reglas de trabajo que piden los lineamientos de SCISA. Todo se escribe en **español**, con frases cortas y sin jerga innecesaria.

Las plantillas de cada archivo están en [PLANTILLAS.md](PLANTILLAS.md). Úsalas como base y rellénalas con la información real del proyecto: nunca dejes texto de relleno ni secciones vacías.

## Lineamientos que aplica

Esta skill **no repite** las reglas de ramas, commits, versiones ni CHANGELOG: las toma de los lineamientos. Antes de escribir `CONTRIBUTING.md` o `CHANGELOG.md`, lee el que corresponda (de una copia local de org-guidelines si existe; si no, del enlace). Si algo de esta skill contradice un lineamiento, manda el lineamiento.

| Tema | Lineamiento |
|---|---|
| Ramas (Gitflow y excepción trunk para librerías) | [06.1 Convenciones de ramas](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.6.git/06.1.branching_gitflow.md) |
| Formato y tipos de commit | [06.3 Reglas de commits](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.6.git/06.3.commits_rules.md) |
| Formato del CHANGELOG | [07.2 Releases](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.7.repositories/07.2.releases.md) |
| Versionado semántico y sufijos `-dev` / `-rc.N` | [07.3 Versionado](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.7.repositories/07.3.semantic_versioning.md) |
| Specs BDD (`.feature` en español) | [05.15 Spec-First](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.5.collaborative_work/05.15.spec_first_workflow.md) y [013.4 Template de features](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.13.templates/013.4.feature_template.md) |
| Estructura de soluciones .NET | [2.4 Estructura de proyectos](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.2.code_standards/2.4.project_structure.md) |
| Documentación mínima y ADR | [05.6 Documentación activa](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.5.collaborative_work/05.6.min_docs.md) |
| Secretos y variables | [09.2 Variables y secretos](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.9.security.md/09.2.variables_secrets.md) |
| Pruebas mínimas | [07.4 Pruebas automatizadas mínimas](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.7.repositories/07.4.minimum_automated_tests.md) |

Si la skill `scisa-changelog` está instalada, úsala para generar las entradas del CHANGELOG.

## 1. Revisar antes de mover nada

1. Lista todos los archivos del proyecto (incluidos los ocultos) y lee el código principal y la documentación que ya exista.
2. Identifica el lenguaje (Python, web estática, Node, .NET…) para elegir `.gitignore`, `.editorconfig`, `Dockerfile` y comando de pruebas.
3. **Pregunta el tipo de proyecto**, con tu recomendación. De esto depende el flujo de ramas y versiones (ver 06.1):
   - **Aplicativo** (se libera a clientes o a producción: SIGLO CD, PLD, servicios SaaS): Gitflow.
   - **Librería o herramienta** sin ciclo de liberación propio (tipo Common, utilidades internas): trunk.
   - Si no está claro, se escala al Tech Lead.
4. Busca secretos: `.env`, llaves, tokens o contraseñas escritas en el código. **Nunca** se suben. Si hay credenciales en el código, avisa al usuario y propón moverlas según 09.2.
5. Busca qué herramientas hay en la máquina (`python`, `node`, `dotnet`, `docker`) para saber qué pruebas puedes correr de verdad.
6. Si el proyecto ya está en Git, revisa la rama actual y el remoto, y no cambies el flujo de ramas existente sin preguntar.
7. Pregunta si hay ticket de ClickUp asociado: su número va en los commits, en el CHANGELOG y en los tags de los `.feature`. Si no hay ticket, los escenarios se etiquetan con el ID de su historia (`@HU-04`) para no perder la trazabilidad.
8. Si el proyecto **ya tiene documentación con otro formato** (por ejemplo, preparado con una versión anterior de esta skill), sigue también la sección 2.1.

## 2. Estructura obligatoria

```
<Proyecto>/
├── src/                        Código de la aplicación (nada más)
├── tests/                      Pruebas automáticas
├── docs/
│   ├── features/<feature>/     <feature>.feature (fuente de verdad) + <feature>.md
│   ├── adr/                    Decisiones de arquitectura (solo si hay alguna)
│   ├── HISTORIAS.md            Alcance, resumen de historias y etapas
│   ├── MANUAL.md               (opcional)
│   └── configuracion.md        (opcional)
├── .gitignore
├── .editorconfig
├── Dockerfile                  (opcional: si el proyecto se ejecuta como servicio o en contenedor)
├── CHANGELOG.md
├── CONTRIBUTING.md
├── GLOSSARY.md
└── README.md
```

Se quedan en la raíz, además, los archivos que la herramienta del lenguaje espera ahí: `requirements.txt`, `package.json`, `.env.example`, `*.sln`, `Directory.Build.props`, etc.

**Proyectos .NET de producto:** dentro de `src/` respeta las capas y nombres de la guía 2.4. No aplanes una solución por capas para que quepa en otra forma.

Al mover el código a `src/`:
- Mueve juntos los archivos que se referencian entre sí (por ejemplo `index.html`, `app.js` y `styles.css`) para no romper rutas relativas.
- Revisa rutas que dependan de la carpeta actual (lectura de `.env`, archivos de salida) y confirma que siguen funcionando.
- Borra basura generada: `__pycache__/`, `node_modules/`, `bin/`, `obj/`, archivos `.pyc`.
- Actualiza **todas** las menciones a las rutas viejas en la documentación (`grep` el nombre de cada archivo movido).
- Si el cambio de ruta afecta a los usuarios (por ejemplo, datos guardados por ubicación en el navegador), avísalo en el README y en el CHANGELOG.

### 2.1 Migrar un proyecto con documentación existente

Cuando el proyecto ya tiene historias, CHANGELOG o CONTRIBUTING con otro formato, se migra sin perder información:

| Si encuentras | Haz esto |
|---|---|
| Criterios *Dado / cuando / entonces* en `HISTORIAS.md` u otro documento | Pásalos a `docs/features/<feature>/<feature>.feature`, agrupando las historias por funcionalidad (una por épica suele funcionar). Cada escenario lleva la etiqueta de su historia o ticket. Después quita los criterios de `HISTORIAS.md` y agrega la columna de enlace a la especificación. Comprueba que **todas** las historias quedaron cubiertas (`grep -oh '@HU-[0-9]*'`). |
| Criterios con números concretos (cálculos, límites, días) | Antes de escribirlos como ejemplos, compruébalos contra el código o las pruebas. Si no coinciden, pregunta cuál es el correcto. |
| `CHANGELOG.md` con versiones ya publicadas en otro formato | **No reescribas las versiones cerradas**: 07.2 prohíbe modificarlas. Cambia solo el encabezado, agrega `## Unreleased` arriba y usa el formato nuevo a partir de ahí. Anota en el encabezado desde qué versión aplica el formato nuevo. |
| `CONTRIBUTING.md` con otras reglas de ramas o commits | Reescribe esas secciones según el tipo de proyecto, y conserva lo propio del proyecto (revisión manual, estilo de código, restricciones técnicas). |
| Referencias a herramientas que ya no se usan (por ejemplo, work items de Azure DevOps) | Cámbialas a ClickUp y anótalo en `Unreleased`. |

Registra la migración en `## Unreleased`, en la sección `Changed`.

## 3. Qué debe contener cada archivo

| Archivo | Contenido obligatorio |
|---|---|
| `README.md` | Qué es y para qué sirve (2-3 frases). Cómo usarlo, paso a paso. Configuración (o enlace a `docs/configuracion.md`). Reglas de negocio o de cálculo si las hay. Tabla **Estructura** con cada carpeta y archivo. |
| `GLOSSARY.md` | Términos propios del dominio, agrupados por tema. Cada uno con definición de 1-2 frases y `_Evitar_:` con los sinónimos que no se usan. Sin detalles de implementación. Los `.feature` usan este vocabulario. |
| `docs/features/<feature>/<feature>.feature` | Uno por funcionalidad con comportamiento observable, según 05.15 y 013.4. Es la **fuente de verdad** de los criterios de aceptación. |
| `docs/features/<feature>/<feature>.md` | Contexto escrito a mano y los escenarios copiados del `.feature` dentro del bloque `<!-- feature:start -->` … `<!-- feature:end -->`. No copies el bloque a mano: usa `node exportar-features.js <ruta-del-proyecto>` (está junto a esta skill), que lo rellena o lo actualiza en todos los `.md` y crea el `.md` si falta. Si no hay Node, cópialo tal cual del `.feature`. |
| `docs/HISTORIAS.md` | Alcance acordado (con quién y cuándo), tabla resumen (ID, historia, origen, etapa, enlace a su `.feature`), entrega por etapas, reglas de cálculo y fuera de alcance. Los escenarios **no** se repiten aquí. |
| `docs/adr/NNNN-<titulo>.md` | Solo si se tomó una decisión de arquitectura relevante. Contexto, decisión, alternativas y consecuencias. |
| `docs/MANUAL.md` | Solo si lo usan personas no técnicas: cómo abrirlo, partes de la pantalla, tareas comunes paso a paso, preguntas frecuentes. |
| `docs/configuracion.md` | Solo si hay `.env` o configuración: tabla con cada variable, para qué sirve y valor por defecto (nunca el valor de un secreto). |
| `CHANGELOG.md` | Formato de 07.2. La primera versión es `v1.0.0`. Si ya existe, las versiones cerradas no se tocan (ver 2.1). |
| `CONTRIBUTING.md` | Flujo de ramas según el tipo de proyecto (06.1), formato de commits (06.3), Pull Request con revisión de otra persona, specs BDD, pruebas (comando + revisión manual), versiones con ejemplos propios del proyecto (07.3), estilo de código y cómo reportar problemas (ticket en ClickUp). Enlaza a los lineamientos en vez de copiarlos. |
| `.gitignore` | Siempre `.env`. Más lo generado por el lenguaje y los archivos de salida que puedan traer datos reales (CSV de resultados, respaldos exportados). Nunca ignores `.env.example`. |
| `.editorconfig` | **.NET:** el `.editorconfig` oficial de org-guidelines (revisa que no traiga rutas de otros proyectos ni errores de sintaxis). **Otros lenguajes:** la plantilla corta de PLANTILLAS.md. |
| `Dockerfile` | Imagen base oficial con versión fija. Copia solo `src/` y dependencias. **Nunca** copia `.env`: la configuración entra con `--env-file`. Comentario con los comandos `docker build` y `docker run`. |
| `tests/` | Pruebas de la lógica de negocio que no dependan de credenciales reales ni de la red (07.4). Si el código no se puede importar sin efectos (lee `.env` o toca el DOM al cargarse), da valores de prueba o carga solo la parte pura, sin reescribir el programa. |

## 4. Glosario: cómo armarlo

1. Saca los términos de la pantalla, el código, el README, las historias de usuario y los `.feature`.
2. Cuando dos documentos usan palabras distintas para lo mismo (por ejemplo "diagrama" y "calendario"), **pregunta al usuario cuál es la oficial**, con tu recomendación. No lo decidas solo. Si el proyecto ya tiene glosario, revisa contra él los títulos de las historias y los textos de los `.feature`: si usan un sinónimo marcado en `_Evitar_` (por ejemplo "copia" cuando el término es "respaldo"), cámbialo por el término oficial sin preguntar.
3. Cuando el usuario define un término de forma distinta a como funciona el código, dilo con un ejemplo concreto antes de escribirlo.
4. Después de elegir, alinea **todos** los documentos (incluidos los `.feature`) con el glosario y anótalo en el CHANGELOG.
5. No redefinas términos que ya están en el [glosario organizacional](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.13.templates/013.1.glossary.md) (AC, DoD, DoR, ADR…).

## 5. Verificar

1. Corre las pruebas. Si no puedes (falta el intérprete o el navegador), dilo claramente y no digas que funciona.
2. Si el proyecto está en Git, confirma que `.env` no está entre los archivos preparados (`git diff --cached --name-only`).
3. Esta skill **no sube nada**: deja los cambios en la carpeta del proyecto. Si el usuario pide hacer commit o publicarlo, sigue los lineamientos 06.1 y 06.3 y pide confirmación antes de cada push.

## 6. Al terminar, reporta

- Tipo de proyecto elegido (aplicativo / librería) y flujo de ramas.
- Estructura final (árbol).
- Qué movió, qué creó y qué borró.
- Features documentados (`docs/features/`), cuántos escenarios y qué historias cubren, y escenarios marcados `@pendiente`.
- Si fue migración: qué se pasó a otro formato y qué se dejó como estaba (por ejemplo, versiones cerradas del CHANGELOG).
- Pruebas: cuántas y si pasaron, o por qué no se pudieron correr.
- Decisiones que tomaste solo y avisos para los usuarios (por ejemplo, exportar datos antes de actualizar).
- Versión inicial anotada en el CHANGELOG.
