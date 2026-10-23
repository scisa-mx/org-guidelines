# Plantillas

Rellena cada plantilla con datos reales. Lo que está entre `<>` se reemplaza; las secciones marcadas como *opcional* se quitan si no aplican.

---

## README.md

````markdown
# <Nombre del proyecto>

<Qué es y para qué sirve, en 2-3 frases que entienda alguien que no lo programó.>

## Cómo usarlo

**Una sola vez, para prepararlo:**

1. <Requisito, por ejemplo: tener Python 3.12 instalado.>
2. <Instalar dependencias: `pip install -r requirements.txt`.>
3. <Copiar `.env.example` a `.env` y llenar los datos de acceso.>

**Cada vez que se use:**

```
<comando, por ejemplo: python src/main.py>
```

## Configuración  *(opcional)*

Los datos de conexión van en el archivo `.env`. El detalle de cada dato está en [docs/configuracion.md](docs/configuracion.md).

> El archivo `.env` contiene contraseñas: no lo compartas ni lo subas al repositorio (ya está en `.gitignore`).

## Reglas de cálculo  *(opcional)*

- **<Regla>**: <cómo se calcula>.

## Estructura

| Carpeta / archivo | Contenido |
|---|---|
| `src/` | <qué hay> |
| `tests/` | Pruebas (`<comando>`) |
| `docs/features/` | Especificaciones BDD de cada funcionalidad (`.feature` + `.md`) |
| `docs/` | <otros documentos: HISTORIAS, MANUAL, configuración, adr> |
| `Dockerfile` | Para correrlo en un contenedor |
| `GLOSSARY.md` | Significado de cada término del proyecto |
| `CHANGELOG.md` | Historial de cambios y versiones |
| `CONTRIBUTING.md` | Cómo proponer cambios |
````

---

## GLOSSARY.md

```markdown
# <Nombre del contexto>

<Una o dos frases: qué es este proyecto y para quién.>

Los términos generales del equipo (AC, DoD, DoR, ADR…) están en el glosario de org-guidelines; aquí solo van los propios de este proyecto.

## Lenguaje

### <Grupo de términos>

**<Término>**:
<Qué ES, en una o dos frases. Sin detalles de implementación.>
_Evitar_: <sinónimo 1>, <sinónimo 2>

**<Término>**:
<Definición.>
_Evitar_: <sinónimos>
```

Reglas:
- Elige una palabra por concepto y pon las demás en `_Evitar_`.
- Solo términos propios del proyecto, no conceptos generales de programación.
- Agrupa en subtítulos cuando haya grupos naturales (por ejemplo Proyectos, Avance, Recursos, Pantalla, Datos).

---

## docs/features/<feature>/<feature>.feature

Fuente de verdad de los criterios de aceptación. Un archivo por funcionalidad; `<feature>` en minúsculas con guiones (`alta-proyecto`). Versión resumida de [013.4 Template de features](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.13.templates/013.4.feature_template.md); si difieren, manda 013.4.

```gherkin
# language: es
@<ticket>
Característica: <Nombre de la funcionalidad>

  Como <rol>
  Quiero <capacidad>
  Para <beneficio>

  Antecedentes:
    Dado que <estado inicial común>          # (opcional)

  Escenario: <Flujo principal, en una frase>
    Dado que <precondición con valores concretos>
    Cuando <acción del actor>
    Entonces <resultado observable>

  Escenario: <Error o caso borde>
    Dado que <precondición>
    Cuando <acción>
    Entonces <resultado observable>

  @pendiente
  Escenario: <Comportamiento acordado que aún no se implementa>
    ...
```

Reglas: pasos desde la perspectiva del usuario (sin clases, tablas ni endpoints), valores concretos, un escenario por regla de negocio, vocabulario del glosario. Usa `Esquema del escenario` + `Ejemplos` cuando sólo cambian los datos.

Etiquetas: `@<ticket>` en la `Característica` si hay ticket de ClickUp. Si no hay, quítala y pon en cada escenario el ID de su historia (`@HU-04`), para saber qué historia cubre cada uno.

---

## docs/features/<feature>/<feature>.md

```markdown
# Feature: <Nombre de la funcionalidad>

## 1. Descripción

<Qué hace y qué problema resuelve.>

## 2. Actores

- **<Rol>**: <qué hace en este flujo>.

## 3. Reglas del sistema

- <Regla de negocio.>

## 4. Escenarios

<!-- feature:start -->
<lo rellena exportar-features.js con el contenido de <feature>.feature; no se edita a mano>
<!-- feature:end -->

## 5. Notas técnicas  *(opcional)*

- <Archivos, servicios o dependencias involucradas.>
```

---

## docs/HISTORIAS.md

````markdown
# <Proyecto>: historias de usuario

## Alcance acordado

Con <persona>, el <fecha>:

- <Punto acordado.>

## Cómo leer cada historia

- **Origen**: **Minuta** (se pidió explícitamente), **Necesaria** (sin ella no se puede operar lo pedido) o **Extra** (se puede quitar).
- Los criterios de aceptación de cada historia están en su `.feature`.

## Resumen

| ID | Historia | Origen | Etapa | Especificación |
|---|---|---|---|---|
| HU-01 | Como <rol>, quiero <acción>, para <beneficio> | Minuta | 1 | [<feature>](features/<feature>/<feature>.feature) |

## Entrega por etapas

| Etapa | Historias | Resultado |
|---|---|---|
| 1 · Base | HU-01, … | <qué se puede hacer al terminar> |

## Reglas de cálculo  *(opcional)*

| Regla | Cálculo |
|---|---|

## Fuera de alcance

- <Lo que no se va a hacer.>
````

---

## docs/adr/NNNN-<titulo>.md  *(opcional)*

```markdown
# NNNN. <Decisión en una frase>

- **Estado:** Aceptada
- **Fecha:** <AAAA-MM-DD>

## Contexto

<Qué problema o restricción obligó a decidir.>

## Decisión

<Qué se decidió.>

## Alternativas consideradas

- **<Alternativa>**: <por qué no>.

## Consecuencias

<Qué se gana, qué se pierde, qué queda pendiente.>
```

---

## CHANGELOG.md

```markdown
# <Nombre de la aplicación>

## Unreleased

## v1.0.0 - <AAAA-MM-DD>

### Added
- [<TICKET>] <Qué hace, en palabras del usuario.>
- [<TICKET>] <Otra capacidad.>
```

Las secciones permitidas y las reglas de redacción están en [07.2 Releases](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.7.repositories/07.2.releases.md). `[<TICKET>]` solo si hay ticket.

---

## CONTRIBUTING.md

````markdown
# Cómo contribuir

Gracias por ayudar a mejorar <proyecto>. Esta guía explica cómo proponer cambios sin romper nada. Sigue los lineamientos de [org-guidelines](https://github.com/scisa-mx/org-guidelines).

## Antes de empezar

1. Clona el repositorio: `git clone <URL>`.
2. <Instalar dependencias / abrir el archivo principal.>
3. <Configurar `.env` a partir de `.env.example`, si aplica.>

> **Nunca subas el archivo `.env`.** <Si aplica.>

## Flujo de trabajo

Este proyecto es un **<aplicativo | librería>** y usa el modelo **<Gitflow | trunk>** de [06.1 Convenciones de ramas](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.6.git/06.1.branching_gitflow.md).

<!-- Aplicativo (Gitflow): -->
1. Todo trabajo parte de un ticket en ClickUp con su especificación validada.
2. Crea tu rama desde `development` con el nombre que indica 06.1.
3. Copia la especificación a `docs/features/<feature>/<feature>.feature` en el primer commit.
4. Escribe los commits con el formato de [06.3 Reglas de commits](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.6.git/06.3.commits_rules.md), por ejemplo `<ejemplo real>`.
5. Corre las pruebas (ver abajo) y agrega tu cambio a `## Unreleased` en `CHANGELOG.md`.
6. Abre un Pull Request hacia `development` y pide revisión a otra persona del equipo.

<!-- Librería / herramienta (trunk): -->
1. Crea una rama corta desde `main`.
2. Escribe los commits con el formato de [06.3 Reglas de commits](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.6.git/06.3.commits_rules.md), por ejemplo `<ejemplo real>`.
3. Corre las pruebas y actualiza la versión y `CHANGELOG.md`.
4. Abre un Pull Request hacia `main` y pide revisión a otra persona del equipo. No se sube directo a `main`.

## Especificaciones

Cada funcionalidad con comportamiento visible tiene su `docs/features/<feature>/<feature>.feature` en español ([05.15 Spec-First](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.5.collaborative_work/05.15.spec_first_workflow.md)). Si cambias el comportamiento, actualiza primero el `.feature` y después el `.md` que lo acompaña.

## Pruebas

```
<comando>
```

Todas deben pasar. Si agregas o cambias una regla, agrega su prueba en `tests/`; cada bug corregido lleva su prueba. <Revisión manual, si aplica, como lista de casillas.>

## Versiones

| Tipo de cambio | Ejemplo | Versión |
|---|---|---|
| Rompe lo existente | <ejemplo propio> | 1.0.0 → **2.0.0** |
| Función nueva compatible | <ejemplo propio> | 1.0.0 → **1.1.0** |
| Corrección o documentación | <ejemplo propio> | 1.0.0 → **1.0.1** |

Sufijos por rama, etiquetas y quién las crea: [07.3 Versionado](https://github.com/scisa-mx/org-guidelines/blob/main/docs/programming/0.7.repositories/07.3.semantic_versioning.md). Las etiquetas de este proyecto tienen la forma `<vX.Y.Z | Proyecto-vX.Y.Z>`.

## Estilo de código

- Respeta `.editorconfig`.
- <Reglas propias del proyecto.>

## Dudas o problemas

Abre un ticket en ClickUp (<espacio / lista>). Describe qué hiciste, qué esperabas y qué pasó.
````

Deja solo el bloque de flujo que corresponda al tipo de proyecto; borra los comentarios `<!-- -->`.

---

## .gitignore

Base para todos:

```gitignore
# Credenciales
.env

# Sistema operativo y editores
.DS_Store
Thumbs.db
.vscode/
```

Agrega según el tipo:

| Tipo | Líneas |
|---|---|
| Python | `__pycache__/`, `*.pyc`, `.venv/`, `venv/` |
| Node / web | `node_modules/`, `dist/` |
| .NET | `bin/`, `obj/`, `*.user`, `.vs/` |
| Salidas con datos | el patrón real, por ejemplo `latencias_*.csv` o `tablero-proyectos-*.json` |

---

## .editorconfig

**.NET:** copia el `.editorconfig` oficial de org-guidelines. Antes de copiarlo, quita las secciones de rutas de otros proyectos y corrige errores de sintaxis si los trae.

**Otros lenguajes:**

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = <4 para Python, 2 para JS/HTML/CSS/Vue>

[*.md]
trim_trailing_whitespace = false
```

---

## Dockerfile

Python:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ src/

# La configuración se pasa al correr el contenedor, no se copia a la imagen:
#   docker run --rm --env-file .env <imagen>
CMD ["python", "/app/src/main.py"]
```

Web estática:

```dockerfile
FROM nginx:1.27-alpine

#   docker build -t <imagen> .
#   docker run --rm -p 8080:80 <imagen>   ->  http://localhost:8080
COPY src/ /usr/share/nginx/html/
```
