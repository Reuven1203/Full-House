import {Component, inject, OnInit} from '@angular/core';
import { addCircleOutline } from "ionicons/icons";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { AddPlayersModalComponent } from "./add-players-modal/add-players-modal.component";
import { BaseModalFormComponent } from "../../../../shared/components/base-modal/base-modal-form.component";
import { addIcons } from "ionicons";
import {NewSessionService} from "../../../../core/services/newSession.service";
import {SessionPlayerComponent} from "./session-player/session-player.component";
import {SessionPlayerModel} from "../../../../core/models/session.model";
import {TooltipComponent} from "../../../../shared/components/tooltip/tooltip.component";
import {caretUp, caretDown} from "ionicons/icons";

@Component({
  selector: 'app-add-players-form',
  templateUrl: './add-players-form.component.html',
  styleUrls: ['./add-players-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    AddPlayersModalComponent,
    SessionPlayerComponent,
    TooltipComponent
  ]
})
export class AddPlayersFormComponent extends BaseModalFormComponent implements OnInit {
  constructor() {
    addIcons({ addCircleOutline });
    super();
  }
  private newSessionService = inject(NewSessionService);
  sessionPlayers!: SessionPlayerModel[];

  override ngOnInit() {
    super.ngOnInit();
    this.newSessionService.sessionPlayers$.subscribe((players) => {
      console.log(players);
      this.sessionPlayers = players;
    });
    addIcons({caretUp, caretDown});
  }

  get isSessionComplete() {
    return this.FormGroup.get('sessionComplete')?.value;
  }



  togglePlayerToSession(playerId: string) {
    const playersControl = this.FormGroup.get('players');
    const defaultBuyIn = this.FormGroup.get('defaultBuyIn')?.value || 0;

    if (playersControl) {
      const playerExists = this.sessionPlayers.some(player => player.playerId === playerId);

      if (!playerExists) {
        this.sessionPlayers = [...this.sessionPlayers, { playerId: playerId, buyIn: defaultBuyIn }];
      } else {
        this.sessionPlayers = this.sessionPlayers.filter(player => player.playerId !== playerId);
      }
      playersControl.setValue(this.sessionPlayers);
    }
  }

  onBuyInChange(playerId: string, buyIn: number | null) {
    const playersControl = this.FormGroup.get('players');
    if (playersControl) {
      const playerIndex = this.sessionPlayers.findIndex(player => player.playerId === playerId);
      this.sessionPlayers[playerIndex].buyIn = buyIn || 0;
      playersControl.setValue(this.sessionPlayers);
    }
  }

  onCashOutChange(playerId: string, cashOut: number | null) {
    const playersControl = this.FormGroup.get('players');
    if (playersControl) {
      const playerIndex = this.sessionPlayers.findIndex(player => player.playerId === playerId);
      this.sessionPlayers[playerIndex].cashOut = cashOut || 0;
      playersControl.setValue(this.sessionPlayers);
    }
  }


}
