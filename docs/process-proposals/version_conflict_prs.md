# Propuesta de Cambio: Conflicto de Versión entre PRs en Paralelo

## Contexto

Las guías definen que la versión se decide en el PR ([7.3 Versionamiento](../programming/0.7.repositories/07.3.semantic_versioning.md)): "la versión se decide antes del merge, no después", y un PR sin impacto de versión no está completo. También definen que `development` lleva siempre sufijo `-dev` ([6.1 Gitflow](../programming/0.6.git/06.1.branching_gitflow.md)).

Cuando dos PRs `features/*` están abiertos al mismo tiempo, ambos modifican la versión y el CHANGELOG. El primero en integrarse gana; el segundo queda con conflicto de versión y de `Unreleased`.

**Las guías no documentan este caso.** No define quién sube la versión, cómo se resuelve el conflicto ni el orden de merge.

---

## Problema

| Situación | Qué pasa hoy |
|---|---|
| Dos PRs suben la versión a partes distintas | Conflicto en archivos de versión; cada persona lo resuelve a su criterio |
| Dos PRs agregan entradas a `Unreleased` | Conflicto de texto en `CHANGELOG.md` |
| El segundo PR calculó su impacto sobre una base vieja | Versión incorrecta (MINOR subido dos veces, o PATCH cuando ya había MINOR) |
| No hay regla de orden de merge | Gana quien tenga el PR listo primero |

Consecuencias:

- Versiones incorrectas o saltadas en `development`.
- Entradas del CHANGELOG perdidas al resolver conflictos a ciegas.
- Retrabajo y fatiga de PRs que deben re-validarse.

---

## Alternativas

### Opción A: Documentar el procedimiento actual (mínimo)

Agregar a 6.1 / 7.3 la resolución cuando la base cambió:

1. `git rebase origin/development` en la rama personal.
2. Conservar la versión que ya está en `development` y **recalcular** el impacto sobre esa base (no subir MINOR dos veces).
3. Conservar ambas entradas de `Unreleased`.
4. Compilar y correr tests antes del push.
5. Avisar en el PR qué se ajustó.

**Pros:** costo cero, no cambia el flujo.
**Contras:** el conflicto sigue ocurriendo.

### Opción B: Versión solo en `releases/*` (recomendada)

Los `features/*` **no tocan la versión**. Solo agregan su entrada a `Unreleased` del CHANGELOG. La versión se fija al crear `releases/vX.Y.Z`, deducida del CHANGELOG:

| CHANGELOG | Versión |
|---|---|
| Solo `Fixed` | PATCH |
| Incluye `Added` | MINOR |
| Incluye `Removed` o breaking change | MAJOR |

`development` conserva su `X.Y.Z-dev`.

**Pros:**
- Elimina el conflicto de versión entre features.
- Una sola persona decide la versión, con visión completa.
- Coherente con el flujo actual de `releases/*` ([6.1](../programming/0.6.git/06.1.branching_gitflow.md)).

**Contras:**
- Cambia la regla actual "la versión se decide en el PR".
- El conflicto de `Unreleased` sigue existiendo, aunque es trivial (conservar ambas líneas).
- Requiere ajustar el DoD y la plantilla de PR.

### Opción C: Orden de merge explícito

Definir que el segundo PR debe actualizarse y re-validarse tras el merge del primero.

**Pros:** simple de comunicar.
**Contras:** no evita el conflicto, solo ordena su resolución.

---

## Propuesta concreta

1. Adoptar **Opción A** de inmediato en 6.1 y 7.3.
2. Evaluar **Opción B** con el Tech Lead durante un ciclo de release antes de adoptarla.

### Documentos a ajustar si se adopta B

- `06.1.branching_gitflow.md`: quién fija la versión.
- `07.3.semantic_versioning.md`: quitar "decidir versión en el PR" para features.
- `07.2.releases.md`: la versión se deduce del CHANGELOG al abrir el release.
- `013.2.pr_templates.md` y `05.5.DoD.md`: retirar el requisito de impacto de versión por PR.

---

## Preguntas abiertas

- ¿Hay repositorios donde `development` no exista (librerías trunk como Common) y la versión deba seguir en el PR? En Common la versión crece con cada integración, por lo que B no aplica.
- ¿Quién abre `releases/*` y decide la versión final?
- ¿Se automatiza la deducción de versión desde el CHANGELOG (skill `scisa-changelog`)?

---

## Riesgos de no adoptar este cambio

1. Versiones inconsistentes en `development`.
2. Entradas del CHANGELOG perdidas en resoluciones de conflicto.
3. Cada persona resuelve el conflicto distinto.
