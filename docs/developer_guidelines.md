# Lineamientos Generales del Desarrollador

## **1. Introducción General**

1.1 Propósito del documento

1.2 Alcance (qué equipos aplica: desarrollo, análisis, QA si corresponde)

1.3 Responsabilidades de los roles involucrados

1.4 Cómo mantener actualizado este documento

---

## **2. Estándares de Estilo y Calidad de Código**

[2.1 Lineamientos generales de estilo](https://github.com/dotnet/runtime/blob/main/docs/coding-guidelines/coding-style.md)

2.2 Uso oficial de `.editorconfig`
- [Editorconfig oficial](https://github.com/scisa-mx/org-guidelines/blob/main/.editorconfig)
- Asegurate de tener una copia en el root de tu aplicativo (“El _root_ del aplicativo es el directorio principal donde reside todo el código fuente, configuraciones y archivos esenciales del proyecto.”) para que se apliquen los cambios en automatico en visualstudio

[2.3 Convenciones de nombres](programming/0.2.code_standards/2.3.naming_conventions.md)

2.4 Estructura de proyectos y solución

2.4.1 SIGLONET
```
docs/
tests/
FRONT/
    Scisa.Focys.Presentation.WPF
SIGLONET/
    Business
        Scisa.Focys.Business.Components
        Scisa.Focys.Business.Entities
    Data
        Scisa.Focys.Data
    Jobs
        Scisa.Focys.Jobs
    Services
        Scisa.Focys.Services
        Scisa.Focys.Services.Contracts
Scisa.Focys.Application
Scisa.Focys.I18n
WASHost
```
2.4.2 PLDNET
```
docs/
tests/
FRONT/
    Scisa.Siglo.PLDNET.MVC
WS/
    PLDNET/
        Business/
            Scisa.Siglo.PLDNET.Business.Components
            Scisa.Siglo.PLDNET.Business.Entities
        Data/
            Scisa.Siglo.PLDNET.Data
        Jobs/
            Scisa.Jobs.Core
            Scisa.Siglo.PLDNET.Jobs
            Scisa.Siglo.PLDNET.Scheduling
        Queues/
            Scisa.Siglo.PLDNET.AMQ
        Services/
            Scisa.Siglo.PLDNET.Services
            Scisa.Siglo.PLDNET.Services.Contracts
    SIGLONET/
        Business
            Scisa.Focys.Business.Components
            Scisa.Focys.Business.Entities
        Data
            Scisa.Focys.Data
        Jobs
            Scisa.Focys.Jobs
        Services
            Scisa.Focys.Services
            Scisa.Focys.Services.Contracts

```
2.4.3 Nuevos aplicativos
```
docs/
src/
    Scisa.<namespace>
    something/
        Scisa.something.<namespace>
test/
    Scisa.<namespace>.Tests.Integration
README.md
CHANGELOG.md
.editorconfig
.git/
.gitignore
```
2.5 Comentarios, documentación y XML docs
- Metodos publicos con `<summary>`
- [Tu codigo deberia hablar por si mismo.](programming/0.2.code_standards/2.5.autodocs.md)

[2.6 Políticas sobre _code smells_ y _refactoring_](programming/0.2.code_standards/2.6.refactoring.md)

---

## **3. Librerías, Dependencias y Paquetería**

### 3.1 Uso de librerías de terceros

>Antes de incorporar una librería de terceros se debe evaluar no solo su funcionalidad, sino también su madurez, estabilidad, seguridad, licencia, comunidad, compatibilidad técnica y el riesgo de dependencia a largo plazo, asegurando que pueda mantenerse y reemplazarse sin comprometer la arquitectura del sistema.

1. **Mantenimiento activo**

   * Sin mantenimiento no hay parches, ni soporte a nuevas versiones, ni corrección de vulnerabilidades.

2. **Licencia compatible**

   * Un problema legal puede obligarte a reescribir o retirar el producto completo.

3. **Seguridad**

   * Vulnerabilidades conocidas, tiempo de respuesta y dependencias transitivas.

4. **Estabilidad de la API**

   * Cambios frecuentes rompen tu sistema y encarecen el mantenimiento.

5. **Riesgo de lock-in / acoplamiento**

   * Qué tan difícil será reemplazarla en el futuro (uso de abstracciones, adapters).

Estas cinco cubren los tres ejes más importantes: **legal**, **operativo** y **arquitectónico**.

### 3.2 Evaluación y aprobación de nuevas dependencias

Despues de evaluar el uso de la herramienta...

> Presenta a tu lider de proyecto un documento en `docs/adr/` con la siguiente informacion *adr -> Arquitecture Design Resoluition*

- Problema que se quiere resolver.

- Alternativas evaluadas (incluyendo “hacerlo in-house”).

- Librería seleccionada y por qué.

- Riesgos y plan de salida.

> OJO: El formato oficial para la documentación es Markdown

> Agreguen la resolución del uso de libreria en el documento con el razonamiento detrás de la decisión

### 3.3 Versionado y actualización de paquetes (nugets, npm, etc.)

- Fijación de versiones Nunca usar versiones flotantes (*, latest, ^ sin control en producción).

>Las dependencias de terceros deben versionarse explícitamente, actualizarse de forma controlada y periódica, evaluando impacto, seguridad y compatibilidad, y documentando cambios mayores mediante ADR.

> Actualiza las dependencias con vulnerabilidades detectadas por Checkmarx. Esto será revisado cada PR que se revise con Checkmarx.

3.4 Políticas de seguridad respecto a dependencias externas

El uso de librerías de terceros introduce riesgos de seguridad, legales y operativos, incluyendo ataques de cadena de suministro, secuestro de repositorios, paquetes falsos y licencias incompatibles.

Antes de aprobar una dependencia se debe:

- Validar su licencia y compatibilidad legal.

- Revisar actividad real del proyecto y reputación de los mantenedores.

- Analizar vulnerabilidades conocidas y dependencias transitivas.

    Usar herramientas como:
    - Dependabot
    - Snyk
    - OWASP Dependency-Check
    - GitHub Security Advisories
    - `dotnet list package --vulnerable`
    - Checkmarx

- Verificar que no ejecute código no documentado ni exponga información sensible.

- Registrar la evaluación y decisión en un ADR o catálogo de dependencias.

> WARNING: Al usar librerías de terceros existen varios riesgos de seguridad que vale la pena dejar explícitos en tus guías:
> Proyectos “secuestrados” o falsamente confiables
>
>  Sí, existen escenarios como:
>
> Repo hijacking / takeover
> El dueño original abandona el proyecto y alguien más toma control del repositorio o del paquete (npm, NuGet, PyPI).
> El nombre sigue siendo popular, pero ahora el código puede incluir backdoors.
>
> Typosquatting
> Paquetes con nombres casi idénticos:
>
> newtonsoft.json vs newtonsoft-json
>
> express vs expres
> Se publican con código malicioso esperando que alguien se equivoque al escribir.
>
> Falsos indicadores de popularidad
>
> Estrellas compradas
>
> Forks automáticos
>
> Commits triviales para simular actividad
>
> README muy bien hecho, pero código casi vacío
>
> Todo esto hace que un repo “se vea vivo y confiable” cuando no lo es.

[### 3.5 Como publicar un paquete privado NUGET para uso interno de SCISA](https://stackoverflowteams.com/c/scisa/questions/633/634#634)

[### 3.6 Como configuro mi ambiente para usar paquetes con Nuget Locales](https://stackoverflowteams.com/c/scisa/questions/633/634#634)

---

## **4. Principios y Buenas Prácticas de Desarrollo**

[4.1 DRY](programming/0.4.good_practices/04.1.dry.md)

[4.2 SOLID](programming/0.4.good_practices/04.2.SOLID.md)

[4.3 KISS](programming/0.4.good_practices/04.3.KISS.md)

[4.4 Manejo de errores y excepciones](programming/0.4.good_practices/04.4.exceptions.md)

[4.5 Logs y observabilidad](programming/0.4.good_practices/04.5.logs.md)

[4.6 Manejo de configuración y secretos](programming/0.4.good_practices/04.6.secretos-variables.md)

4.7 Si vas a comentar código. Mejor eliminalo

4.8 [Evita el IF](programming/0.4.good_practices/04.avoid_ifs.md)

4.9 Como manejar la deuda tecnica

4.10 Inmutabilidad de clases

---

## **5. Metodología de Trabajo y Flujo de Desarrollo**

5.1 Flujo para trabajar _features_

https://stackoverflowteams.com/c/scisa/questions/540
https://docs.google.com/document/d/1IAbVGCFkRElbTYEHVtHr7cEV0uk7yXZJbShKS5bvPmo/edit?tab=t.0
https://docs.google.com/document/d/1-1xcl9-mmfmeSbTMRmmJmyUuW-LRAeo_fiilwK06c4s/edit?tab=t.0

> Aqui lo mas importante es identificar claramente desde donde vas a partir para realizar tu trabajo

> Revisa bien antes de subir tus cambios

> Envia el PR hacia donde se esta integrando (Por default es development)

5.2 Flujo para trabajar _bugfixes_ y _hotfixes_

https://stackoverflowteams.com/c/scisa/questions/540

> Aqui lo mas importante es identificar claramente en QUE version se va aplicar el FIX. Esto
Para no enviar cosas que el cliente NO espera. Unicamente LO reportado

> Revisa bien antes de subir tus cambios. Envia el PR hacia donde se esta integrando (Por default es el branch de donde estas trabajando)

5.3 Criterios de Definition of Ready / Definition of Done

5.4 Pair programming y revisiones colaborativas

5.5 Prioridad y urgencia: cómo decidir

5.6 Proceso de documentación mínima requerida

5.7 Revisiones Colaborativas

5.7.1 Que revisar al hacer un PR

---

## **6. Versionamiento y Control de Código**

6.1 Convenciones de ramas (Gitflow)

6.2 Políticas oficiales de uso de Git

6.3 [Reglas para commits, mensajes y atomicidad](programming/0.6.git/06.3.commits_rules.md)

6.4 [Pull Requests: formato, checklist, aprobaciones](programming/0.6.git/06.4.pullrequest.md)

6.5 [Merging, rebase, squash: cuándo aplicar cada uno](programming/0.6.git/06.5.merge_rebase_squash.md)

6.6 Protección y roles en repositorios

---

## **7. Integración Continua, Entrega y Deployments**

7.1 [Pipeline de CI/CD](programming/0.7.repositories/07.1.pipelines_and_ci_cd.md)

7.2 [Reglas para releases](programming/0.7.repositories/07.2.releases.md)

7.3 [Versionamiento semántico o propio](programming/0.7.repositories/07.3.semantic_versioning.md)

7.4 Pruebas automáticas mínimas requeridas

7.5 Validación previa y posterior al deploy

7.6 Gestión de _feature flags_

---

## **8. Gestión de Scripts, Migraciones y Base de Datos**

8.1 Cómo agregar scripts al codebase

8.2 Estandarización del naming de scripts

8.3 Proceso de validación (_idempotencia_, _hashes_, migradores tipo Flyway/DbUp)

8.4 Lineamientos de performance y revisión de consultas

8.5 Políticas sobre cambios directos en BD del cliente

---

## **9. Seguridad y Compliance**

9.1 Lineamientos de seguridad en código

9.2 Manejo de credenciales y secretos

9.3 Validaciones y sanitización de datos

9.4 OWASP Top 10 (aplicado a la organización)

9.5 Revisión de dependencias vulnerables

---

## **10. Comunicación, Colaboración y Expectativas Personales**

10.1 Regla: _“Investiga, acierta y no asumas — pregunta mejor”_

10.2 Comunicación con analistas

10.3 Comunicación con QA

10.4 Códigos de conducta en pull requests

10.5 Tiempo de respuesta esperado

---

## **11. Capacitaciones, Aprendizaje y Crecimiento**

11.1 Ligas de capacitación interna

11.2 Mentoring y acompañamiento

11.3 Requerimientos mínimos de actualización trimestral

11.4 Rutas de aprendizaje por nivel (Junior, Mid, Senior)

---

## **12. Herramientas y Entorno de Desarrollo Estándar**

12.1 Configuración oficial del IDE (Rider, VS, VS Code…)

12.2 Extensiones aprobadas

12.3 Configuración de linters, analizadores y herramientas de calidad

12.4 Estándares de entornos locales (contenedores, versiones de SDK, etc.)

---

## **13. Anexos**

13.1 Glosario

13.2 Plantillas de PR

13.3 Plantillas de commits

13.4 Plantillas de documentación de feature

13.5 Ejemplos de buenas y malas prácticas
