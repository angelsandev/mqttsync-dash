# Servidor MQTT con Backend FASTAPI y Frontend React con Dashboard

### [V0.1.1] Cambios para Despliegue en VERCEL- 2026-4-28
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Crear variable entorno y frontend y crear proyecto Frontend en VERCEL.
- **Estructura:** Crear `.env` en frontend con la variable que conteiene la URL del backend en VERCEL.
- **Estructura:** Usar esa variable de entorno en la llamada `fetch` y evitar poner URL.

### [V0.1.0] Despliegue en VERCEL- 2026-4-28
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Modificar archivo `vercel.json`

### [V0.0.9] Despliegue en VERCEL- 2026-4-28
- **Pruebas:** ✅ Todo ok.


### [V0.0.8] Despliegue en VERCEL- 2026-4-28
- **Pruebas:** ✅ Todo ok.
- **Estructura:** Crear `vercel.json`


### [V0.0.7] Crear Base de datos y modelos- 2026-4-28
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Crear modelo de DB, crear una DB en Vercel con NEON (Postgres).
- **Estructura:** Crear Base de datos `Postgres` en VERCEL, con `NEON`.
- **Estructura:** Crear `models.py` que es la tabla de la DB.
- **Estructura:** Crear el motor y sesión par ala DB : `database.py`



### [V0.0.6] Frontend para mostrar datos JSON en una Card- 2026-4-28
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Probar Frontend: escribimos un JSON en MQTT Explorer con los datos y, en el Frontend, a los 5 segunds aparece la Card con los datos actualizados.
- **Estructura:** Añadir componente `Dashboard` React para `Card` que muestre los datos recibidos del `JSON`.
- **Estructura:** Llamar al componente desde `App.tsx` para mostrar esa card junto a las otras.
- **main.py:** Añadir `CORS`

### [V0.0.5] Crear Endpoint - 2026-4-28
- **Pruebas:** ✅ Todo ok.  
- **Pruebas:** ✅ Crear un JSON en MQTT Explorer con los datos. Si accedemos al endpoint desde el navegador, se ven los datos de ese JSON recibido.
- **Pruebas:** ✅ Probar `http://localhost:8000/telemetry/sensor01` y se ve el JSON.
- **Estructura:** Crear `router.py` con endpoint para ser llamado desde el Frontend.


### [V0.0.4] Añadir Redis Upstash - 2026-4-28
- **Pruebas:** ✅ Todo ok.  
- **Pruebas:** ✅ Probado: enviar un dato desde MQTT Explorer `un JSON` y recibido en VSC correctamente.
- **Pruebas:** ✅ Añadir Redis con `Upstash Redis` para poder guardar en caché cuando se desplegue el proyecto en Vercel.
- **Estructura:** Añadir `core/redis.py`
- **mqttservice.py:** Añadir lógica para guardar los datos en REDIS.

### [V0.0.3] Crear Model Telemetry - 2026-4-28
- **Pruebas:** ✅ Todo ok.  
- **Pruebas:** ✅ Implementar código en módulo `telemetry`
- **main.py:** Añadir llamada a función `start_mqtt` al arrancar la app, con `yield`.


### [V0.0.2] Crear estructura Backend - 2026-4-27
- **Pruebas:** ✅ Todo ok.  
- **Pruebas:** ✅ Crear estructura de Backend con Vertical Slicing.
- **Estructura:** Crear carpetas de Backend.
- **Estructura:** Instalar todas las dependencias con el `requirements.txt`.
- **Estructura:** Crear `main.py` con un router que devuelve un texto.

### [V0.0.1] Primer Dashboard. Crear proyecto React con Typescript - 2026-4-27
- **Pruebas:** ✅ Todo ok.  
- **Pruebas:** ✅ Crear proyecto React y Typescript y TailwindCSS.
- **Pruebas:** ✅ Crear un primer Dashboard para probar visualización de `Cards` y gráficas con `Chart`. 
- **Estructura:** Crear carpetas `frontend`,`backend` y `firmware`. 
