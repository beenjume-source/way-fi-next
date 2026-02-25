---
name: creador-de-habilidades
description: Utiliza esta habilidad cuando necesites crear nuevas habilidades para el asistente Antigravity. Proporciona una guía paso a paso, estructura de carpetas y el formato correcto del archivo SKILL.md en español.
---

# Creador de Habilidades Antigravity

Esta habilidad te permite generar nuevas habilidades para extender tus capacidades de forma estructurada y siguiendo las mejores prácticas de Google Antigravity.

## Cuándo usar esta habilidad
- Cuando el usuario te pida crear una nueva "habilidad" o "función personalizada".
- Cuando necesites automatizar un flujo de trabajo recurrente mediante una habilidad.
- Cuando quieras documentar procesos específicos del proyecto como si fueran una extensión de tu cerebro.

## Estructura de una Habilidad
Cada habilidad debe residir en su propia carpeta dentro del directorio de habilidades.

### 1. Ubicación
- **Específica del espacio de trabajo:** `.agent/skills/<nombre-de-la-habilidad>/`
- **Global (para todos los proyectos):** `~/.gemini/antigravity/skills/<nombre-de-la-habilidad>/`

### 2. Archivos requeridos
- **`SKILL.md`**: El archivo principal que contiene las instrucciones y metadatos.

### 3. Archivos opcionales
- `scripts/`: Scripts de soporte (Python, JavaScript, etc.) que la habilidad puede ejecutar.
- `examples/`: Ejemplos de uso o archivos de referencia.
- `resources/`: Activos adicionales necesarios.

## Formato de `SKILL.md`
El archivo debe comenzar con un bloque **YAML frontmatter** y seguir con instrucciones en Markdown.

### YAML Frontmatter
```yaml
---
name: nombre-de-la-habilidad (único, usar guiones)
description: Una descripción clara y orientada a la acción. Es crucial para que el asistente sepa cuándo activar esta habilidad.
---
```

### Secciones Recomendadas en el Markdown
1. **`# Nombre de la Habilidad`**: Un título claro.
2. **`## Cuándo usar esta habilidad`**: Disparadores específicos y escenarios de uso.
3. **`## Instrucciones de uso`**: Guía paso a paso, convenciones de código y lógicas "si-entonces".
4. **`## Ejemplos`**: Bloques de código o flujos de trabajo de muestra.

## Mejores Prácticas
- **Enfoque único**: Cada habilidad debe ocuparse de una sola responsabilidad.
- **Descripciones potentes**: La descripción en el frontmatter es lo que el asistente lee para decidir si "invoca" la habilidad. Hazla descriptiva.
- **Lógica clara**: Usa listas numeradas y secciones bien definidas para que el asistente pueda seguir las reglas sin ambigüedades.

---
*Creado por Antigravity - Habilidad Generadora de Habilidades*
