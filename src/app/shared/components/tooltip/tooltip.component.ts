import {Component, Input} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {informationCircle} from "ionicons/icons";
import {addIcons} from "ionicons";

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class TooltipComponent{
  @Input() text?: string;

  constructor() {
    addIcons({informationCircle});
  }

}
