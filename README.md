# Monitor de tickets de soporte

Prototipo móvil híbrido de un monitor de tickets de soporte con temática de tienda de videojuegos tipo Steam. Consume tareas de una API pública, las presenta como tickets de soporte y permite filtrarlas y reasignarles estado y prioridad.

## Tecnologías

- Ionic Angular `^9.0.0`
- Angular `22.1.7` y Angular CLI `22.1.8`
- TypeScript `~6.0.0`
- Capacitor `8.5.3` (core y CLI)

## Funcionalidades

- Dashboard con porcentaje de eficiencia de resolución.
- Búsqueda por texto en problema, juego o usuario.
- Filtro por estado: todos, pendientes o resueltos.
- Lista de tickets con indicadores de color según el estado.
- Modal de asignación para cambiar estado y prioridad.
- Toast de confirmación durante 2,5 segundos después de guardar.
- Diseño responsivo para móvil y tableta.

## Requisitos previos

- Node.js `22.22.3` o superior compatible con las dependencias de Angular del proyecto.
- Ionic CLI:

```bash
npm install -g @ionic/cli
```

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Entrar a la carpeta del proyecto:

```bash
cd tickets
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
ionic serve
```

La aplicación se abre en [http://localhost:8100](http://localhost:8100). Para probar la vista móvil o de tableta, abre las herramientas de desarrollo del navegador, activa la emulación de dispositivos y selecciona el tamaño de pantalla que quieras revisar.

## Fuente de datos

La aplicación consulta el endpoint público `https://jsonplaceholder.typicode.com/todos`.

Usa las primeras 20 tareas de la respuesta. Cada `todo` se convierte en un ticket: el título del problema y el juego se toman de una lista local, mientras que el usuario y la prioridad se asignan localmente según el `id`. El campo `completed` se transforma en el estado del ticket: resuelto cuando es `true` y pendiente cuando es `false`.

## Reglas de negocio

- La eficiencia se calcula como `tickets resueltos / total de tickets * 100` y se redondea al entero más cercano.
- La lista se ordena primero por prioridad (`Alta`, `Media`, `Baja`) y luego por `id`.
- El filtrado se aplica sobre una lista derivada; los datos originales se mantienen en `tickets`.
- El botón `Limpiar` elimina la búsqueda, restablece el estado a `Todos` y vuelve a mostrar la lista ordenada.

## Estructura del proyecto

```text
src/app/
├── app.component.html              # Contenedor raíz de Ionic y salida del enrutador.
├── app.component.ts                # Componente raíz de la aplicación.
├── app.routes.ts                   # Ruta lazy de home y redirección inicial.
├── models/
│   └── ticket.model.ts             # Tipos Ticket y Prioridad.
└── home/
    ├── home.page.html              # Dashboard, controles y lista de tickets.
    ├── home.page.scss              # Estilos de la pantalla principal y diseño adaptable.
    ├── home.page.ts                # Búsqueda, filtros, orden, eficiencia, modal y Toast.
    ├── services/
    │   └── ticket.service.ts       # Consulta la API y transforma los todo en tickets.
    └── ticket-modal/
        └── ticket-modal.component.ts # Modal para editar estado y prioridad.
```

## Flujo de uso

1. Escribe un texto en el buscador para localizar un problema, juego o usuario.
2. Selecciona un estado para filtrar la lista.
3. Toca un ticket para abrir el modal.
4. Cambia su estado o prioridad.
5. Pulsa `Guardar cambios`.
6. Cierra el modal y revisa el Toast de confirmación y la lista actualizada.

## Verificación antes de entregar

- [ ] La aplicación inicia correctamente.
- [ ] El buscador y el filtro por estado funcionan.
- [ ] El modal se abre y se cierra correctamente.
- [ ] Se muestra el Toast después de guardar.
- [ ] El repositorio contiene el código fuente.

## Datos de la entrega

- **Estudiante:** Andres Camilo Reina Diaz
- **Docente:** Daniela Alarcon Sepulveda
