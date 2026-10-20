import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-modal',
  standalone: true,
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Ticket #{{ ticket.id }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrar()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="detalle">
        <h2>{{ ticket.titulo }}</h2>
        <p>{{ ticket.juego }} · {{ ticket.usuario }}</p>
      </div>
      <ion-item>
        <ion-select label="Estado" [(ngModel)]="ticket.resuelto">
          <ion-select-option [value]="true">Resuelto</ion-select-option>
          <ion-select-option [value]="false">Pendiente</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-select label="Prioridad" [(ngModel)]="ticket.prioridad">
          <ion-select-option value="Alta">Alta</ion-select-option>
          <ion-select-option value="Media">Media</ion-select-option>
          <ion-select-option value="Baja">Baja</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-button expand="block" (click)="guardar()">Guardar cambios</ion-button>
    </ion-content>
  `,
  styles: [`
    :host {
      --ion-background-color: #1b2838;
      --ion-text-color: #c7d5e0;
    }

    ion-toolbar {
      --background: #171a21;
    }

    ion-item {
      --background: #16202d;
      --color: #c7d5e0;
      margin-bottom: 10px;
    }

    .detalle {
      color: #c7d5e0;
      margin-bottom: 20px;
    }

    .detalle h2 {
      color: #66c0f4;
      margin-bottom: 8px;
    }

    .detalle p {
      margin: 0;
    }
  `],
})
export class TicketModalComponent {
  private readonly modalCtrl = inject(ModalController);
  @Input({ required: true }) ticket!: Ticket;

  cerrar(): void {
    this.modalCtrl.dismiss(null, 'cancelar');
  }

  guardar(): void {
    this.modalCtrl.dismiss(this.ticket, 'guardar');
  }
}
