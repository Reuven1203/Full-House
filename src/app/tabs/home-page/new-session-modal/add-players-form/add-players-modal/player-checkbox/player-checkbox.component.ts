import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {dummyPlayers} from "../../../../../dummyPlayers";
import {PlayerModel} from "../../../../../../core/models/player.model";

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
  @Input({required:true}) playerId!: string;
  @Input() checked:boolean = false;
  @ViewChild('checkbox') checkbox!: HTMLInputElement;




  get player(): PlayerModel | undefined {
    return dummyPlayers.find(player => player.id === this.playerId);
  }




  constructor() { }



}
