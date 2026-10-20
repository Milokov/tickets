# Monitor de tickets de soporte

Prototipo de aplicación móvil híbrida para el área de soporte de una tienda de videojuegos tipo Steam. Consume tareas de una API pública, las presenta como tickets y permite buscarlos, filtrarlos por estado y reasignarles estado y prioridad desde un modal.

Proyecto de Programación de Dispositivos Móviles, Universidad Surcolombiana (Bloque 2, evaluación del tercer corte).

## Tecnologías

| Tecnología | Versión |
|---|---|
| Ionic Angular | `^9.0.0` |
| Angular / Angular CLI | `22.1.7` / `22.1.8` |
| TypeScript | `~6.0.0` |
| Capacitor (core y CLI) | `8.5.3` |

## Funcionalidades

- Dashboard con el porcentaje de eficiencia de resolución.
- Búsqueda por texto en problema, juego o usuario.
- Filtro por estado: todos, pendientes o resueltos.
- Lista de tickets con indicadores de color según el estado.
- Modal de asignación para cambiar estado y prioridad.
- Toast de confirmación de 2,5 segundos después de guardar.
- Diseño responsivo para móvil y tableta.

## Requisitos previos

- Node.js `22.22.3` o superior, compatible con las dependencias de Angular del proyecto.
- Ionic CLI:

```bash
npm install -g @ionic/cli
```

## Instalación y ejecución

```bash
git clone <URL_DEL_REPOSITORIO>
cd tickets
npm install
ionic serve
```

La aplicación abre en [http://localhost:8100](http://localhost:8100). Para ver la versión móvil o de tableta, abre las herramientas de desarrollo del navegador (F12), activa la emulación de dispositivos y elige el tamaño de pantalla.

## Cumplimiento del enunciado

| Requisito | Dónde se resuelve |
|---|---|
| Dashboard responsivo (`ion-header`, `ion-toolbar`, `ion-card`, `ion-grid`) | `home.page.html` |
| Servicio HTTP con `@Injectable` y `HttpClient` | `home/services/ticket.service.ts` |
| Filtros con `ion-searchbar` e `ion-select` y `[(ngModel)]` | `home.page.html`, `home.page.ts` |
| Listado con `ion-list`, `ion-item`, `ion-avatar` e `ion-badge` | `home.page.html` |
| Lógica con `filter()`, `map()`, `reduce()` y `sort()` | `home.page.ts`, `ticket.service.ts` |
| Modal de asignación con `ion-select` y Toast de 2500 ms | `ticket-modal.component.ts`, `home.page.ts` |

## Fuente de datos

La aplicación consulta el endpoint `https://jsonplaceholder.typicode.com/todos` y usa las primeras 20 tareas de la respuesta.

Cada tarea se convierte en un ticket:

- El título del problema y el juego salen de una lista local.
- El usuario y la prioridad se asignan localmente según el `id`.
- El campo `completed` pasa a ser el estado: resuelto si es `true`, pendiente si es `false`.

## Reglas de negocio

- **Eficiencia:** `tickets resueltos / total de tickets * 100`, redondeado al entero más cercano.
- **Orden:** primero por prioridad (Alta, Media, Baja) y luego por `id`.
- **Filtros:** se aplican sobre una lista derivada; los datos originales se conservan en `tickets`.
- **Limpiar:** borra la búsqueda, restablece el estado a "Todos" y vuelve a mostrar la lista completa.

## Estructura del proyecto

```text
src/app/
├── app.component.html
├── app.component.ts
├── app.routes.ts
├── models/
│   └── ticket.model.ts
└── home/
    ├── home.page.html
    ├── home.page.scss
    ├── home.page.ts
    ├── services/
    │   └── ticket.service.ts
    └── ticket-modal/
        └── ticket-modal.component.ts
```

| Archivo | Función |
|---|---|
| `app.routes.ts` | Ruta de `home` y redirección inicial |
| `ticket.model.ts` | Tipos `Ticket` y `Prioridad` |
| `ticket.service.ts` | Consulta la API y convierte cada tarea en ticket |
| `home.page.ts` | Búsqueda, filtros, orden, eficiencia, modal y Toast |
| `home.page.html` / `.scss` | Dashboard, controles, lista y estilos |
| `ticket-modal.component.ts` | Modal para editar estado y prioridad |

## Flujo de uso

1. Escribe en el buscador para encontrar un problema, juego o usuario.
2. Elige un estado para filtrar la lista.
3. Toca un ticket para abrir el modal.
4. Cambia su estado o su prioridad.
5. Pulsa **Guardar cambios**: el modal se cierra, aparece el Toast y la lista y la eficiencia se actualizan.

## Datos de la entrega

- **Estudiante:** Andres Camilo Reina Diaz
- **Docente:** Daniela Alarcon Sepulveda
- **Rama principal:** main
