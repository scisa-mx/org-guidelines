---
name: scisa-changelog
description: Genera entradas de CHANGELOG para proyectos SCISA siguiendo el formato organizacional. Analiza commits de git, los categoriza según los tipos estándar y produce entradas en español listas para agregar a CHANGELOG.md. Por defecto propone el output; con --write lo escribe directo al archivo.
---

# SCISA Changelog Generator

Skill organizacional para generar y mantener CHANGELOG.md siguiendo el estándar SCISA.

## Cuándo usar este skill

- Preparar entradas de changelog antes de un release
- Cerrar el bloque `## Unreleased` con número de versión y fecha
- Agregar entradas durante el desarrollo (conforme avanza, no al final)
- Revisar qué cambios van en el próximo release

## Formato del CHANGELOG

El archivo se llama `CHANGELOG.md` y vive en la raíz del proyecto.

```markdown
# Nombre de la aplicación

## Unreleased

### Fixed
- [TICKET] Descripción funcional del fix

### Added
- [TICKET] Descripción funcional del feature

### Changed
- [TICKET] Descripción del cambio o mejora de rendimiento

### Deprecated
- [TICKET] Lo que será eliminado en futuras versiones

### Removed
- [TICKET] Lo que fue eliminado

### Security
- [TICKET] Cambios relacionados con vulnerabilidades o seguridad
```

Al hacer release, el bloque `Unreleased` se convierte en versión con fecha:

```markdown
## v1.3.1 - 2025-04-29

### Fixed
- [8527] Permite importar personas físicas sin país de nacimiento
```

## Reglas de formato

- Idioma: **español**
- Referencia de ticket: `[NÚMERO]` al inicio de cada entrada (Azure DevOps o ClickUp)
- Si el commit no tiene ticket, omitir el prefijo
- Una línea por cambio, concisa y funcional
- El lector puede ser desarrollador, negocio o usuario final — escribir para todos
- Versión más reciente arriba siempre
- Solo una sección `## Unreleased` activa en cualquier momento
- Las versiones cerradas (con número y fecha) **no se modifican**

## Mapeo commits → secciones

| Tipo de commit | Sección CHANGELOG | Incluir |
|---|---|---|
| `feat` / `add` | `Added` | Sí |
| `fix` | `Fixed` | Sí |
| `perf` | `Changed` | Sí |
| `security` | `Security` | Sí |
| `refactor` | — | No (usar `perf` si hay impacto visible) |
| `docs` | — | No |
| `test` | — | No |
| `chore` | — | No |
| `bump` | — | No |
| Breaking change | `Removed` / `Deprecated` | Sí |

## Cómo usar

### Proponer entradas (default)

```
Genera el changelog de los commits desde el último release
```

```
Genera las entradas de changelog de la última semana
```

```
¿Qué va en el CHANGELOG para la versión 2.1.0?
```

### Escribir directo al archivo

```
Genera el changelog de los últimos commits --write
```

```
Cierra el bloque Unreleased como v1.4.0 hoy --write
```

### Cerrar una versión

```
Cierra el Unreleased como versión 1.4.0 con la fecha de hoy
```

El skill toma todo lo que está en `## Unreleased`, lo mueve a `## v1.4.0 - FECHA` y crea un nuevo `## Unreleased` vacío.

## Proceso del skill

1. Leer el rango de commits indicado (`git log` desde el tag anterior o fecha especificada)
2. Filtrar commits según la tabla de mapeo (excluir `refactor`, `docs`, `test`, `chore`, `bump`)
3. Extraer número de ticket del mensaje (`[NÚMERO]` al inicio de la descripción)
4. Traducir el mensaje técnico a lenguaje funcional en español
5. Agrupar por sección (`Fixed`, `Added`, `Changed`, `Deprecated`, `Removed`, `Security`)
6. Si `--write`: append al bloque `## Unreleased` existente en `CHANGELOG.md`
7. Si no `--write`: mostrar el output propuesto para revisión del dev

## Ejemplo

**Commits en el repo:**
```
feat: [8440] agregar opción para importar inversionistas
fix: [8527] permitir importar personas físicas sin país de nacimiento
perf: [7227] optimizar consulta de importación de personas
chore: actualizar dependencias de NuGet
test: agregar unit tests para importación
security: [9091] corregir vulnerabilidad en validación de LOGIN
```

**Output propuesto:**
```markdown
### Fixed
- [8527] Permite importar personas físicas sin país de nacimiento

### Added
- [8440] Opción para importar inversionistas

### Changed
- [7227] Mejora en el tiempo de importación de personas (50% más rápido)

### Security
- [9091] Se corrigió una vulnerabilidad en la validación del LOGIN
```

## Referencia

- Estándar organizacional: `docs/programming/0.7.repositories/07.2.releases.md`
- Tipos de commit: `docs/programming/0.6.git/06.3.commits_rules.md`
- Versionamiento semántico: `docs/programming/0.7.repositories/07.3.semantic_versioning.md`
- Inspirado en: [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
