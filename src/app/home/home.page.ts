import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Ticket } from '../models/ticket.model';
import { TicketService } from './services/ticket.service';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule,
    IonAvatar,
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage implements OnInit {
  private readonly ticketService = inject(TicketService);
  private readonly modalCtrl = inject(ModalController);
  private readonly toastCtrl = inject(ToastController);
  tickets: Ticket[] = [];
  filtrados: Ticket[] = [];
  busqueda = '';
  estado: 'todos' | 'pendiente' | 'resuelto' = 'todos';
  resueltos = 0;
  eficiencia = 0;

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
      this.filtrar();
    });
  }

  filtrar(): void {
    const texto = this.busqueda.trim().toLowerCase();
    const ordenPrioridad: Record<Ticket['prioridad'], number> = {
      Alta: 0,
      Media: 1,
      Baja: 2,
    };

    this.filtrados = this.tickets
      .filter((ticket) =>
        !texto || [ticket.titulo, ticket.juego, ticket.usuario]
          .some((campo) => campo.toLowerCase().includes(texto)),
      )
      .filter((ticket) =>
        this.estado === 'todos' ||
        (this.estado === 'resuelto' && ticket.resuelto) ||
        (this.estado === 'pendiente' && !ticket.resuelto),
      )
      .sort((a, b) =>
        ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad] || a.id - b.id,
      );

    this.calcularEficiencia();
  }

  calcularEficiencia(): void {
    this.resueltos = this.tickets.reduce(
      (total, ticket) => total + (ticket.resuelto ? 1 : 0),
      0,
    );
    this.eficiencia = this.tickets.length
      ? Math.round((this.resueltos / this.tickets.length) * 100)
      : 0;
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.estado = 'todos';
    this.filtrar();
  }

  async abrirModal(ticket: Ticket): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TicketModalComponent,
      componentProps: { ticket: { ...ticket } },
    });

    await modal.present();
    const resultado = await modal.onDidDismiss<Ticket>();

    const ticketActualizado = resultado.data;
    if (resultado.role === 'guardar' && ticketActualizado) {
      const indice = this.tickets.findIndex((item) => item.id === ticketActualizado.id);
      if (indice !== -1) {
        this.tickets[indice] = ticketActualizado;
        this.filtrar();
        const toast = await this.toastCtrl.create({
          message: `Ticket #${ticketActualizado.id} actualizado`,
          duration: 2500,
          color: 'success',
        });
        await toast.present();
      }
    }
  }
}
