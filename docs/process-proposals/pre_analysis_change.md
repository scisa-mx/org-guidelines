# Propuesta de Cambio: Pre-análisis Obligatorio en Propuestas

## Contexto

Las propuestas al cliente se construyen con distinto nivel de detalle dependiendo del requerimiento y del tiempo disponible. En algunos casos se presentan propuestas sin historias de usuario, sin wireframes y con estimaciones validadas solo por el analista o el área comercial.

Esto ha generado (o puede generar) propuestas aceptadas que resultan mal estimadas o ambiguas cuando llegan a desarrollo.

Este documento expone los trade-offs del proceso actual y propone formalizarlo.

---

## Trade-offs a resolver

### Trade-off 1: Invertir en análisis sin certeza de venta

**La tensión:** Si el cliente pide un requerimiento y el equipo hace el análisis, se invierte tiempo sin que el cliente esté pagando por ello. El área comercial puede ver esto como desperdicio si la propuesta no se cierra.

**La posición:** Este costo es un riesgo del negocio, no del cliente. Es el precio de enviar propuestas correctas. La alternativa — enviar propuestas sin análisis — traslada el riesgo al momento donde más daño hace:

> Una propuesta aceptada con estimación incorrecta o alcance ambiguo es más cara que el análisis que se quiso ahorrar.

Las consecuencias concretas de saltarse el análisis:

- El equipo absorbe el sobrecosto de desarrollo que no se estimó
- El cliente recibe algo distinto a lo que esperaba ("eso no era lo que pedí")
- Se generan conflictos de alcance que dañan la relación comercial
- El proyecto acumula deuda técnica o funcional para cumplir con lo prometido

El costo del análisis pre-propuesta es pequeño y acotado. El costo de una propuesta mal hecha y aceptada es grande e impredecible.

**Conclusión:** El negocio debe asumir el costo del análisis como inversión en calidad de propuesta, no como gasto evitable.

---

### Trade-off 2: Estimar sin el equipo de desarrollo

**La tensión:** Involucrar a un desarrollador en la fase de análisis consume tiempo del equipo técnico y requiere coordinación adicional antes de que exista siquiera una propuesta aprobada.

**La posición:** No involucrarlos es más costoso. El analista modela el **problema del cliente**; el desarrollador modela la **solución técnica**. Son modelos distintos, y la distancia entre ambos es donde viven los errores de estimación.

Ejemplos típicos del problema:

- El analista estima 5 días porque "es solo una pantalla nueva". El desarrollador descubre que requiere migración de datos, cambio de modelo de dominio y ajuste de permisos — son 15 días.
- El desarrollador acepta la estimación sin revisarla bien en el momento porque no fue convocado. Cuando empieza a trabajar, ya es tarde para renegociar.
- El analista asume que cierta integración ya existe. El desarrollador sabe que no existe y que construirla duplica el esfuerzo.

Involucrar al desarrollador **no significa** que haga todo el análisis. Significa que co-valida que lo que se propone es coherente con la realidad técnica del sistema.

**Conclusión:** La estimación sin validación del equipo técnico tiene un riesgo estructural que no se resuelve con experiencia del analista — se resuelve con participación del desarrollador.

---

## Propuesta concreta

Adoptar el [estándar de pre-análisis](../programming/0.5.collaborative_work/05.14.pre_analysis_standard.md) como proceso obligatorio antes de presentar cualquier propuesta al cliente.

### Cambios al proceso actual

| Paso | Proceso actual | Proceso propuesto |
|---|---|---|
| Recepción de requerimiento | Analista evalúa y arma propuesta | Analista convoca sesión de pre-análisis |
| Definición de alcance | Narrativa libre, sin formato estándar | Historias de usuario + wireframes |
| Estimación | Analista o comercial estiman solos | Analista + al menos un desarrollador co-estiman |
| Detalle de actividades | Opcional y no estandarizado | Requerido (puede quedar abierto con nota explícita) |
| Gate de salida | Sin criterio definido | [Checklist de propuesta](../programming/0.5.collaborative_work/05.11.proposal_checklist.md) completo |

### Costo estimado del cambio

| Tipo de requerimiento | Tiempo de pre-análisis |
|---|---|
| Requerimiento típico | 2–4 horas (analista + desarrollador) |
| Requerimiento complejo | 1–2 días |
| Propuesta mal estimada y aceptada | Variable — históricamente mayor a lo anterior |

---

## Riesgos de no adoptar este cambio

1. **Propuesta aceptada mal estimada** → el equipo absorbe el sobrecosto o el cliente queda insatisfecho
2. **Alcance ambiguo en propuesta aceptada** → conflictos durante desarrollo sobre qué estaba incluido
3. **Estimaciones sin validación técnica** → expectativas rotas, tensión entre área comercial y desarrollo
4. **Reputación del equipo comprometida** → el cliente percibe que el equipo no sabe lo que hace, aunque el problema fue en la propuesta

---

## Decisión solicitada

Aprobar el pre-análisis como etapa obligatoria en el proceso de propuestas, operado bajo el estándar documentado en [`05.14.pre_analysis_standard.md`](../programming/0.5.collaborative_work/05.14.pre_analysis_standard.md).

La adopción no requiere cambios en herramientas ni en estructura de equipos — requiere un acuerdo entre el área comercial y el área de desarrollo sobre el proceso mínimo antes de presentar una propuesta.
