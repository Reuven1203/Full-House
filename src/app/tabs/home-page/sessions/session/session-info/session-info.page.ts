import {Component, computed, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonCard, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SessionsService} from "../../../../../core/services/sessions.service";
import {CashGameModel, SessionModel, TournamentModel} from "../../../../../core/models/session.model";
import {cash} from "ionicons/icons";
import {BlindsPipe} from "../../../../../core/pipes/blinds.pipe";
import {PlayerSessionInfoComponent} from "./player-session-info/player-session-info.component";

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.page.html',
  styleUrls: ['./session-info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, BlindsPipe, IonCard, IonCardTitle, IonCardSubtitle, PlayerSessionInfoComponent, IonList, IonListHeader, IonLabel, IonItemDivider, IonItemSliding, IonItemOptions, IonItemOption, IonItem]
})
export class SessionInfoPage implements OnInit {
  @Input({required: true}) sessionId!: string;
  sessionService = inject(SessionsService);
  session!: SessionModel | undefined;
  cashGameType: CashGameModel | undefined;
  tournamentType: TournamentModel | undefined;
  totalBuyIn = computed(() => {
    if (this.isCashGame) {
      return this.cashGameType?.withdrawRecord.reduce((acc, record) => acc + record.totalBuyIn, 0);
    } else {
      return 'N/A';
    }

  })

  get isCashGame() {
    return this.sessionService.isCashGameModel(this.session?.type);
  }



  ngOnInit(): void {
    this.session = this.sessionService.getSession(this.sessionId)!;

    if (this.isCashGame) {
      this.cashGameType = this.sessionService.cashGameModel(this.session?.type);
    } else {
      this.tournamentType = this.session?.type as TournamentModel;
      console.log(this.session);
    }

  }

}
