# Servidor MQTT con Backend FASTAPI y Frontend React con Dashboard

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
