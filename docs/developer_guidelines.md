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

[2.3 Convenciones de nombres](programming/07.naming_conventions.md)

2.4 Estructura de proyectos y solución

2.4.1 SIGLONET
```
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
- [Tu codigo deberia hablar por si mismo.](programming/06.autodocs.md)

2.6 Políticas sobre _code smells_ y _refactoring_
- Durante el desarrollo, el objetivo principal es entregar funcionalidad correcta y alineada al requerimiento. Sin embargo, antes de subir cualquier cambio, se espera que cada desarrollador haga una revisión consciente de la calidad del código producido.

Esto implica:

Revisar el código más allá de que “funcione”.

Detectar señales de diseño que puedan indicar problemas a corto o mediano plazo.

Aplicar refactoring cuando sea necesario para mejorar:

- Legibilidad

❌ Antes
```
if (u != null && u.A && u.B && u.C)
{
    DoStuff();
}
```

✅ Después
```
if (IsValidUser(user))
{
    ProcessUser();
}

bool IsValidUser(User user)
{
    return user != null
        && user.IsActive
        && user.HasAcceptedTerms
        && user.HasProfileCompleted;
}
```
- Simplicidad

❌ Antes
```
var result = false;

if (order != null)
{
    if (order.Items != null)
    {
        if (order.Items.Count > 0)
        {
            result = true;
        }
    }
}

```

✅ Después
```
var hasItems = order?.Items?.Any() == true;
```

- Mantenibilidad

❌ Antes
```
if (type == 1)
{
    ApplyDiscount(0.10m);
}
else if (type == 2)
{
    ApplyDiscount(0.15m);
}
else if (type == 3)
{
    ApplyDiscount(0.20m);
}

```

✅ Después
```
var discount = type switch
{
    CustomerType.Regular => 0.10m,
    CustomerType.Premium => 0.15m,
    CustomerType.Vip     => 0.20m,
    _ => 0m
};

ApplyDiscount(discount);
```

- Claridad de intención

❌ Antes
```
foreach (var u in users)
{
    if (u.LastLogin < DateTime.UtcNow.AddDays(-30))
    {
        u.IsActive = false;
    }
}
```

✅ Después
```
DeactivateInactiveUsers(users);

void DeactivateInactiveUsers(IEnumerable<User> users)
{
    foreach (var user in users)
    {
        if (IsInactive(user))
        {
            user.IsActive = false;
        }
    }
}

bool IsInactive(User user)
{
    return user.LastLogin < DateTime.UtcNow.AddDays(-30);
}
```

El refactoring no es una fase separada ni opcional, sino una parte natural del cierre del trabajo. No se espera perfección, pero sí criterio profesional para no introducir deuda técnica evitable.

Como referencia conceptual y práctica sobre code smells y técnicas de refactoring, se recomienda consultar el siguiente recurso, el cual es amplio y completo:

🔗 https://refactoring.guru/

Este material sirve como guía para identificar problemas comunes y entender cuándo un refactor es apropiado, pero el criterio final siempre debe alinearse a las necesidades reales del proyecto.

---

## **3. Librerías, Dependencias y Paquetería**

3.1 Uso de librerías de terceros
* Cuando si, cuando no
* Que revisar cuando para SI validar la libreria

3.2 Evaluación y aprobación de nuevas dependencias

3.3 Versionado y actualización de paquetes (nugets, npm, etc.)

3.4 Políticas de seguridad respecto a dependencias externas

3.5 Como eliminar una dependencia de \_Dependencies

3.6 Como configuro mi ambiente para usar paquetes con Nuget Locales

3.7 Como configuro mi ambiente para usar paquetes de Nuget de SCISA

---

## **4. Principios y Buenas Prácticas de Desarrollo**

4.1 DRY

4.2 SOLID

4.3 KISS

4.4 Manejo de errores y excepciones

4.5 Logs y observabilidad

4.6 Manejo de configuración y secretos

4.7 Si vas a comentar código. Mejor eliminalo

4.8 [Evita el IF](programming/04.avoid_ifs.md)

4.9 Como manejar la deuda tecnica

4.10 Inmutabilidad de clases

---

## **5. Metodología de Trabajo y Flujo de Desarrollo**

5.1 Flujo para trabajar _features_

5.2 Flujo para trabajar _bugfixes_ y _hotfixes_

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

6.3 Reglas para commits, mensajes y atomicidad

6.4 Pull Requests: formato, checklist, aprobaciones

6.5 Merging, rebase, squash: cuándo aplicar cada uno

6.6 Protección y roles en repositorios

---

## **7. Integración Continua, Entrega y Deployments**

7.1 Pipeline de CI/CD

7.2 Reglas para releases

7.3 Versionamiento semántico o propio (tu organización usa varios esquemas)

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
