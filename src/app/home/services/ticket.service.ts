import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Prioridad, Ticket } from '../../models/ticket.model';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Problema {
  titulo: string;
  juego: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'https://jsonplaceholder.typicode.com/todos';
  private readonly PROBLEMAS: Problema[] = [
    { titulo: 'El juego se cierra al iniciar', juego: 'Counter-Strike 2' },
    { titulo: 'Cobro duplicado en mi compra', juego: 'Tienda' },
    { titulo: 'No me llega el código de verificación', juego: 'Cuenta' },
    { titulo: 'Reembolso pendiente hace una semana', juego: 'Tienda' },
    { titulo: 'Lag y pérdida de paquetes en partida', juego: 'Dota 2' },
    { titulo: 'Los logros no se desbloquean', juego: 'Hades' },
    { titulo: 'Descarga atascada al 99%', juego: 'Cyberpunk 2077' },
    { titulo: 'Desapareció mi partida guardada en la nube', juego: 'Stardew Valley' },
    { titulo: 'Pantalla negra al abrir el juego', juego: 'Elden Ring' },
    { titulo: 'Mi cuenta fue bloqueada sin motivo', juego: 'Cuenta' },
    { titulo: 'El chat de voz no funciona', juego: 'Team Fortress 2' },
    { titulo: 'No aparece mi regalo en el inventario', juego: 'Inventario' },
  ];
  private readonly USUARIOS = ['Camila', 'Andrés', 'Laura', 'Sebastián', 'Valentina'];
  private readonly PRIORIDADES: Prioridad[] = ['Alta', 'Media', 'Baja'];

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Todo[]>(this.endpoint).pipe(
      map((todos) =>
        todos.slice(0, 20).map((todo) => {
          const problema = this.PROBLEMAS[todo.id % this.PROBLEMAS.length];

          return {
            id: todo.id,
            titulo: problema.titulo,
            juego: problema.juego,
            usuario: this.USUARIOS[todo.id % this.USUARIOS.length],
            prioridad: this.PRIORIDADES[todo.id % this.PRIORIDADES.length],
            resuelto: todo.completed,
          };
        }),
      ),
    );
  }
}
