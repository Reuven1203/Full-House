import {Component, computed, Input, OnChanges, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {dummyPlayers} from "../../../../../dummyPlayers";
import {CurrencyPipe} from "@angular/common";
import {ListItemComponent} from "../../../../../../shared/components/list-item/list-item.component";
import {ValueChipComponent} from "./value-chip/value-chip.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-player-session-info',
  templateUrl: './player-session-info.component.html',
  styleUrls: ['./player-session-info.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CurrencyPipe,
    ListItemComponent,
    ValueChipComponent,
    FormsModule
  ]
})
export class PlayerSessionInfoComponent implements OnInit {
  @Input({required:true}) playerId!: string;
  @Input({required:true}) buyIn!: number;
  @Input() cashOut = 0
  net!: number

  ngOnInit() {
    this.calculateNet();
  }

  calculateNet() {
    this.net = this.cashOut - this.buyIn;
  }

  buyInChanged(value: number | null) {
    this.buyIn = value || 0;
    console.log(this.buyIn)
  }

  cashOutChanged(value: number | null) {
    this.cashOut = value || 0;
    console.log(this.cashOut)
  }




  get player() {
    return dummyPlayers.find(player => player.id === this.playerId)
  }


  constructor() { }





}
