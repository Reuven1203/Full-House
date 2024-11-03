import {Component, inject, Input, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {PlayerModel} from "../../../../../../core/models/player.model";
import {LeagueService} from "../../../../../../core/services/league.service";

@Component({
  selector: 'app-player-checkbox',
  templateUrl: './player-checkbox.component.html',
  styleUrls: ['./player-checkbox.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PlayerCheckboxComponent {
  @Input({required:true}) playerId!: string | undefined;
  @Input() checked:boolean = false;
  @ViewChild('checkbox') checkbox!: HTMLInputElement;
  private leagueService = inject(LeagueService);




  get player(): PlayerModel | undefined {
    if(!this.playerId) return undefined;
    return this.leagueService.getPlayerInfo(this.playerId);
  }

  constructor() { }



}
