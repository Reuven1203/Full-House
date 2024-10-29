import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgClass} from "@angular/common";
import {checkmarkOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {BlindsPipe} from "../../../../../core/pipes/blinds.pipe";

@Component({
  selector: 'app-blinds-selection',
  templateUrl: './blinds-selection.component.html',
  styleUrls: ['./blinds-selection.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgClass,
    BlindsPipe
  ]
})
export class BlindsSelectionComponent implements OnInit {
  @Input() blinds!: [number, number];
  @Input() selected = false;
  @Output() blindsSelected = new EventEmitter<number[]>();

  constructor() {
    addIcons({checkmarkOutline});
  }


  ngOnInit() {
    if (this.blinds.length !== 2) {
      this.blinds = [0, 0];
    }
    addIcons({checkmarkOutline});
    }

  onClick() {
    this.blindsSelected.emit(this.blinds);
  }






}
