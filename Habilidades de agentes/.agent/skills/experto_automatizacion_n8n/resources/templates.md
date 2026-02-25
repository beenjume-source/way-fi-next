# Recursos y Plantillas: Experto Automatización n8n

Estas plantillas están diseñadas para ser copiadas y adaptadas en nodos "Code" de n8n para optimizar el procesamiento de datos.

## 1. Procesamiento de Grandes Colecciones (Batching Mental)
Para evitar saturar la memoria, procesamos transformaciones de forma eficiente.

```javascript
// Optimización de transformación de datos (Data Thinning)
const items = $input.all();
const result = items.map(item => {
  const data = item.json;
  return {
    json: {
      id: data.id,
      timestamp: new Date().toISOString(),
      // Solo extraemos lo estrictamente necesario
      payload: {
        user: data.user.email,
        status: data.status.toUpperCase()
      }
    }
  };
});
return result;
```

## 2. Manejo de Errores Industrial
Patrón profesional para asegurar que el workflow no se rompa silenciosamente.

```javascript
try {
  // Lógica compleja aquí
  const data = $input.first().json;
  if (!data.apiKey) throw new Error("API Key faltante en la entrada");
  
  return { json: { status: "success", result: processData(data) } };
} catch (error) {
  return {
    json: {
      status: "error",
      message: error.message,
      stack: error.stack,
      step: "DataTransformation_Mapping"
    }
  };
}
```

## 3. Integración con Bases de Datos (Estructura de Query)
Cuando se requiere persistencia para escalabilidad.

```javascript
// Ejemplo de preparación de datos para PostgreSQL
const items = $input.all();
const query = "INSERT INTO logs (event, metadata) VALUES ($1, $2)";
return items.map(item => ({
  json: {
    query,
    parameters: [
      item.json.eventName,
      JSON.stringify(item.json.meta)
    ]
  }
}));
```

## 4. Patrón UX: Reducción de Carga Cognitiva
Para evitar la fatiga de decisión, simplificamos las salidas hacia el usuario.

```javascript
// Simplificación de salida para UI/Notificaciones (UX-First)
const item = $input.first().json;
return {
  json: {
    title: "✅ Acción Completada",
    summary: `Se procesaron ${item.count} elementos con éxito.`,
    next_step: "Revisa el dashboard para detalles.",
    status_color: "#00FF00"
  }
};
```

## 5. Manejo de Errores con Notificación Proactiva (Best Practice)
Siguiendo el benchmarking de éxito, notificamos el error antes de fallar.

```javascript
try {
  // Operación de riesgo
} catch (error) {
  // 1. Loggear para debugging
  console.error(error);
  // 2. Preparar payload para canal de alertas (Slack/Discord/Email)
  return {
    json: {
      alert: true,
      severity: "critical",
      context: "Workflow de Facturación",
      error_details: error.message
    }
  };
}
```

