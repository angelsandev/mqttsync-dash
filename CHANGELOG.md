# Servidor MQTT con Backend FASTAPI y Frontend React con Dashboard

### [V0.1.8] Rutas en el Frontend - 2026-4-30
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Probar todas la cards, datos de sensores, graficas y enrutamiento ok.
- **Estructura:** Crear componentes `Sensorcards` `MachineStats` `Machinecard` de manera que queda tod más estructurado. Si quiero añadir un sensor, iré a `Sensorcards` y lo añado.
- **MachineDetail:** Desde aquí se llama a los sensorcards y machineStats y graficas.
- **App.tsx:** Desde aquí se esriben las rutas. En la ruta de máquins, por ejemplo, se llama a `MachineDetail`.


### [V0.1.7] Polling automático - 2026-4-30
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Actualizar las Cards automáticamente cada vez que se introducen datos en MQTTExplorer.
- **MachineCard:** Lógica `setInterval` para Polling cada 5 segundos.
- **useTelemetry.ts:** Lógica para que el spinner `loading` solo se ejecute la primera vez que se llama a la función. Después, en el Polling cada 5 seg, no habrá loading. 


### [V0.1.6] Frontend llamadas a nuevos endpoints - 2026-4-30
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Crear tipos de datos, servicios y llamadas a nuevos endpoints.
- **Pruebas:** ✅ Se visualizan las cards con los datos que hay en el sistema guardados. Si introducimos unos datos en MQTTExplorer, se pintará la card en el Frontend con esos datos de máquina nueva. (Hay que actualizar el navegador).
- **Estructura:** Crear `services`,`hooks` y `types` donde se define el tipo de dato a recibir, se hacen las llamadas endpoints según el `router del backend`.
- **Dashboard:** Modificar lógica para visualizar las cards creadas con los datos de las máquinas que hay almacenadas. 
- **MachineCard:** Lógica donde se llama al endpoint y se cogen los datos de las máquinas para ponerla en las cards.

### [V0.1.5] Backend para múltiples datos - 2026-4-29
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Probar Backend, conectar MQTTExplorer y enviar un TOPIC con sus datos. Se ve la tabla Postgres (en VERCEL) creada correctamente con los datos enviados.
- **Pruebas:** ✅ Se trata de modificar los models para recibir datos de varias maquinas y clasificar cada sensor segun la maquina a la que pertenece.
- **models.py:** Añadir campos para la tabla de la DB.
- **mqttservice.py:** Modificar la lógica para el nuevo TOPIC y los nuevos datos que debe leer.
- **schemas.py:** Añadir campos, atributos y separar por clases con Herencia.
- **router.py:** Nuevas rutas y llamadas utilizando las clases del schemas.
- **redis.py:** Modificar la llave, ya que ahora se utiliza una doble llave como parametro.



### [V0.1.4] Modo Oscuro y Estructurar Frontend- 2026-4-29
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Crear estructura en frontend basado en separación de responsabilidades.
- **Estructura:** Crear carpetas para separación responsabilidades.
- **MainLayout:** Aquí se crea lo que será común en todas las páginas.
- **Modo oscuro:** Crear lo que se llama `ContextAPI`, con `ThemeContext.tsx`. 
- **main.tsx:** Llamar al `ThemeProvider ` que hemos creado en `ThemeContext` para aplicar el modo oscuro y light.
- **NavBar.tsx:** Crear componente para menú navegación, incluyendo botón modo oscuro. 
- **index.css:** Crear un `variant` para que Tailwind acepte la clase `dark`.

### [V0.1.3] Guardar datos en DB Postgres- 2026-4-29
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ Añadir el guardado en la DB de Postgres.
- **mqttservice.py:** Añadir lógica para guardar en Postgres.
- **mqttservice.py:** Modificar lógica para que muestre correcto la hora en el dashboard, incluso si no se envía `timestamp` en el JSON.
- **dashboard.tsx:** Modificar la línea para mostrar el timestamp correcto.

### [V0.1.2] Cambios para Despliegue en VERCEL- 2026-4-28
- **Pruebas:** ✅ Todo ok.
- **Pruebas:** ✅ 
- **.env:** Modificar `.env` en frontend: la URL tenía una `/` al final que no debe existir.
- **Vercel Front:** En proyecto de frontend en Vercel, configurar la variable de entorno, eliminando esa `/` al final.
- **main.py:** En el `CORS` colocar la URL del frontend par apermitir la conexión.


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
