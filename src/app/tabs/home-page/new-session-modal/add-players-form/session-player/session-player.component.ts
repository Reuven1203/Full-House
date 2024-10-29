import {Component, computed, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {LeagueService} from "../../../../../core/services/league.service";
import {IonicModule} from "@ionic/angular";
import {
  ValueChipComponent
} from "../../../sessions/session/session-info/player-session-info/value-chip/value-chip.component";
import {NgOptimizedImage} from "@angular/common";
import {caretDown, caretUp} from "ionicons/icons";
import {addIcons} from "ionicons";

@Component({
  selector: 'app-session-player',
  templateUrl: './session-player.component.html',
  styleUrls: ['./session-player.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ValueChipComponent,
    NgOptimizedImage
  ]
})
export class SessionPlayerComponent  {
  @Input() playerId!: string;
  @Input() buyIn!: number;
  @Input() cashOut = 0;
  @Input() showCashOut = false;
  @Output() buyInChange = new EventEmitter<number | null>();
  @Output() cashOutChange = new EventEmitter<number | null>();
  private leagueService = inject(LeagueService);
 get player() {
    return this.leagueService.getPlayerInfo(this.playerId);
 }

 onBuyInChange(value: number | null) {
   this.buyInChange.emit(value);
 }

 onCashOutChange(value: number | null) {
    this.cashOutChange.emit(value);
 }



  constructor() {
    addIcons({caretDown, caretUp});
  }


}
