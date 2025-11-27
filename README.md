Org Guidelines

Repositorio central de lineamientos y configuraciones para los equipos de desarrollo de SCISA.

Este repositorio busca ser la fuente única de verdad para todos los estándares organizacionales: estilo de código, configuraciones compartidas, reglas de colaboración, documentación y mejores prácticas.
Actualmente contiene el archivo global .editorconfig de la organización.

📌 Objetivo del repositorio

Centralizar y estandarizar los lineamientos que deben seguir todos los proyectos de la organización, con el fin de:

Garantizar consistencia en el estilo de código.

Reducir diferencias entre equipos y editores/IDEs.

Promover buenas prácticas y herramientas comunes.

Simplificar la colaboración entre desarrolladores.

Asegurar que todo el código siga la misma identidad técnica.

Este repo crecerá con el tiempo para incluir lineamientos por rol, procesos, políticas, plantillas y más.

📁 Contenido actual
.editorconfig

Archivo que define reglas de estilo y formato comunes:

Indentación

Uso de espacios o tabs

Codificación de archivos

Reglas de fin de línea

Convenciones específicas para C#, JSON, XML, Markdown y más

Configuración sugerida para dotnet analyzers

El propósito es que cualquier IDE compatible aplique automáticamente estas reglas sin depender de configuraciones locales.

🛠 ¿Para qué sirve .editorconfig?

.editorconfig permite mantener un estilo de código homogéneo en todos los proyectos sin importar:

El IDE (VS Code, Visual Studio, Rider, etc.)

La máquina del desarrollador

La versión del editor

Evita inconsistencias como:

Diferencias de indentación

Distintos finales de línea

Archivos guardados con codificaciones distintas

Espacios extra o formato no convencional

En otras palabras: todos escribimos con el mismo estilo, siempre.

📥 ¿Cómo usarlo?
Opción 1 — Como submódulo (recomendada)

En tu proyecto ejecuta:

git submodule add https://github.com/scisa-mx/org-guidelines


Ahora tendrás una carpeta org-guidelines/ que contiene el .editorconfig.

Puedes:

Usarlo directamente desde esa carpeta, o

Copiarlo a la raíz del proyecto.

Cuando el archivo cambie en este repo:

git submodule update --remote


Todos los proyectos se mantienen sincronizados con un solo comando.

Opción 2 — Copiar el archivo

Simplemente copia .editorconfig a la raíz de cada proyecto que lo necesite.

Tu IDE lo detectará automáticamente.

🏗 ¿Dónde debe colocarse?

En la raíz del repositorio del proyecto (ideal).

También puede colocarse en carpetas específicas si deseas reglas distintas por área (por ejemplo: src/, tests/, un módulo específico, etc.).

Si está en múltiples niveles, el IDE combinará las reglas heredadas.

🤝 Cómo colaborar en este repositorio

Crear una rama o hacer un fork (según permisos).

Realizar los cambios deseados en .editorconfig u otros lineamientos futuros.

Hacer un Pull Request explicando:

Qué se cambió

Por qué es necesario

Impacto esperado en otros proyectos

El equipo revisará el PR y, de ser necesario, generará una discusión antes de aprobarlo.

Una vez aprobado, el cambio se mergea a main.

Los proyectos que lo usan como submódulo podrán actualizar fácilmente.

🧭 Lineamientos futuros (estructura propuesta)

Este repo está pensado para crecer. Algunas carpetas sugeridas a futuro:

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


Y cada uno con documentación clara para los equipos.

📄 Licencia / Uso interno

Este repositorio es de uso interno para equipos de SCISA.
Su contenido no está destinado a distribución pública externa salvo autorización explícita.

🚀 Contribuye al estándar de la organización

Este repositorio será una pieza clave para mantener cohesión entre todos los proyectos de la empresa.
Si deseas proponer mejoras, abre un Issue o envía un Pull Request.
