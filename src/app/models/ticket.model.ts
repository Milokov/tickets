export type Prioridad = 'Alta' | 'Media' | 'Baja';

export interface Ticket {
  id: number;
  titulo: string;
  juego: string;
  usuario: string;
  prioridad: Prioridad;
  resuelto: boolean;
}
