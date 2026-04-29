# Org Guidelines

Repositorio central de lineamientos y configuraciones para los equipos de desarrollo de SCISA.

Este repositorio busca ser la fuente única de verdad para todos los estándares organizacionales: estilo de código, configuraciones compartidas, reglas de colaboración, documentación y mejores prácticas.

Actualmente contiene el archivo global `.editorconfig` de la organización.

---

## 📌 Objetivo del repositorio

Centralizar y estandarizar los lineamientos que deben seguir todos los proyectos de la organización, con el fin de:

- Garantizar consistencia en el estilo de código.
- Reducir diferencias entre equipos y editores/IDEs.
- Promover buenas prácticas y herramientas comunes.
- Simplificar la colaboración entre desarrolladores.
- Asegurar que todo el código siga la misma identidad técnica.

Este repo crecerá con el tiempo para incluir lineamientos por rol, procesos, políticas, plantillas y más.

---

## 📁 Contenido actual

### `.editorconfig`

Archivo que define reglas de estilo y formato comunes:

- Indentación
- Uso de espacios o tabs
- Codificación de archivos
- Reglas de fin de línea
- Convenciones específicas para C#, JSON, XML, Markdown y más
- Configuración sugerida para dotnet analyzers

El propósito es que cualquier IDE compatible aplique automáticamente estas reglas sin depender de configuraciones locales.

---

## 🛠 ¿Para qué sirve `.editorconfig`?

`.editorconfig` permite mantener un estilo de código homogéneo en todos los proyectos sin importar:

- El IDE (VS Code, Visual Studio, Rider, etc.)
- La máquina del desarrollador
- La versión del editor

Evita inconsistencias como:

- Diferencias de indentación
- Distintos finales de línea
- Archivos guardados con codificaciones distintas
- Espacios extra o formato no convencional

En otras palabras: todos escribimos con el mismo estilo, siempre.

---

## 🙌 ¿Quieres proponer un cambio o agregar un lineamiento?

Este repositorio es abierto para todos los desarrolladores de SCISA. Si tienes una propuesta — una nueva guía, un ajuste a una regla existente, una convención que debería estandarizarse — este es el lugar correcto para hacerlo.

Como el acceso de escritura está restringido, las contribuciones se hacen mediante **fork + Pull Request**. Es el flujo estándar y toma menos de un minuto configurarlo la primera vez.

### Flujo de contribución

```
Fork → Clone → Branch → Cambios → Push → PR a main → Revisión → Merge
```

### Paso a paso

**1. Haz un fork del repositorio**

Desde GitHub, ve a [scisa-mx/org-guidelines](https://github.com/scisa-mx/org-guidelines) y presiona el botón **Fork** (esquina superior derecha). Esto crea una copia del repo bajo tu usuario.

**2. Clona tu fork localmente**

```bash
git clone https://github.com/<tu-usuario>/org-guidelines.git
cd org-guidelines
```

**3. Agrega el repositorio original como remote `upstream`**

Esto te permite mantener tu fork sincronizado con los cambios que otros mergeen al repo oficial.

```bash
git remote add upstream https://github.com/scisa-mx/org-guidelines.git
```

Verifica que quedó bien:

```bash
git remote -v
# origin    https://github.com/<tu-usuario>/org-guidelines.git (fetch)
# origin    https://github.com/<tu-usuario>/org-guidelines.git (push)
# upstream  https://github.com/scisa-mx/org-guidelines.git (fetch)
# upstream  https://github.com/scisa-mx/org-guidelines.git (push)
```

**4. Sincroniza tu fork antes de empezar a trabajar**

Siempre parte desde el estado más reciente del repo oficial para evitar conflictos:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

**5. Crea un branch descriptivo**

Usa el prefijo que corresponda al tipo de cambio:

| Prefijo | Cuándo usarlo |
|---|---|
| `feat/` | Agregar un lineamiento nuevo |
| `update/` | Modificar o extender uno existente |
| `fix/` | Corregir un error, ambigüedad o inconsistencia |

```bash
git checkout -b feat/branching-strategy
# o
git checkout -b update/editorconfig-csharp-rules
# o
git checkout -b fix/bdd-guide-typo
```

**6. Haz tus cambios**

- Si estás **agregando** un lineamiento nuevo, crea la carpeta correspondiente y un archivo `README.md` dentro de ella siguiendo la estructura de la sección [🧭 Lineamientos futuros](#-lineamientos-futuros-estructura-propuesta).
- Si estás **modificando** uno existente, edita directamente el archivo afectado.
- Sé claro y conciso. Escribe como si la persona que lo lee no tiene contexto previo.

**7. Haz commit y sube los cambios a tu fork**

```bash
git add .
git commit -m "feat: agregar guía de branching strategy"
git push origin feat/branching-strategy
```

**8. Abre un Pull Request hacia `main` del repo original**

Ve a tu fork en GitHub. Aparecerá un banner para abrir un PR — haz clic en **Compare & pull request**.

Asegúrate de que el PR apunte a:

- **base repository:** `scisa-mx/org-guidelines` — rama `main`
- **head repository:** `<tu-usuario>/org-guidelines` — tu branch

En la descripción del PR incluye:

- **Qué cambia:** el archivo o sección afectada.
- **Por qué es necesario:** el problema que resuelve o la necesidad que cubre.
- **Impacto esperado:** qué equipos o proyectos se ven afectados y cómo.

**9. Revisión**

Al menos un miembro del equipo debe aprobar el PR antes del merge. Si el cambio es significativo o afecta a múltiples equipos, el revisor puede solicitar una discusión antes de aprobar.

---

## 📥 ¿Cómo usarlo?

### Opción 1 — Como submódulo (recomendada)

En tu proyecto ejecuta:

```bash
git submodule add https://github.com/scisa-mx/org-guidelines
```

Ahora tendrás una carpeta `org-guidelines/` que contiene el `.editorconfig`. Puedes:

- Usarlo directamente desde esa carpeta, o
- Copiarlo a la raíz del proyecto.

Cuando el archivo cambie en este repo:

```bash
git submodule update --remote
```

Todos los proyectos se mantienen sincronizados con un solo comando.

### Opción 2 — Copiar el archivo

Simplemente copia `.editorconfig` a la raíz de cada proyecto que lo necesite. Tu IDE lo detectará automáticamente.

---

## 🏗 ¿Dónde debe colocarse?

- En la raíz del repositorio del proyecto (ideal).
- También puede colocarse en carpetas específicas si deseas reglas distintas por área (por ejemplo: `src/`, `tests/`, un módulo específico, etc.).
- Si está en múltiples niveles, el IDE combinará las reglas heredadas.

---

## 🤝 Cómo colaborar en este repositorio

1. Hacer un fork del repositorio (ver [sección de contribución](#-quieres-proponer-un-cambio-o-agregar-un-lineamiento)).
2. Realizar los cambios deseados en `.editorconfig` u otros lineamientos futuros.
3. Hacer un Pull Request explicando:
   - Qué se cambió
   - Por qué es necesario
   - Impacto esperado en otros proyectos
4. El equipo revisará el PR y, de ser necesario, generará una discusión antes de aprobarlo.
5. Una vez aprobado, el cambio se mergea a `main`.
6. Los proyectos que lo usan como submódulo podrán actualizar fácilmente.

---

## 🧭 Lineamientos futuros (estructura propuesta)

Este repo está pensado para crecer. Algunas carpetas sugeridas a futuro:

```
/coding-style
/environment-guidelines
/branching-strategy
/release-process
/role-based-guidelines
/onboarding
/internal-training
/security
/devops
/templates
/scripts
```

Y cada uno con documentación clara para los equipos.

---

## 📄 Licencia / Uso interno

Este repositorio es de uso interno para equipos de SCISA. Su contenido no está destinado a distribución pública externa salvo autorización explícita.

---

## 🚀 Contribuye al estándar de la organización

Este repositorio será una pieza clave para mantener cohesión entre todos los proyectos de la empresa. Si deseas proponer mejoras, abre un [Issue](https://github.com/scisa-mx/org-guidelines/issues) o envía un Pull Request.