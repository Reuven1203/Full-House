import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {closeOutline} from "ionicons/icons";
import {FormsModule} from "@angular/forms";


@Component({
    selector: 'app-new-player-input',
    templateUrl: './new-player-input.component.html',
    styleUrls: ['./new-player-input.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class NewPlayerInputComponent  {
  @Input() playerId?:string
  @Output() inputUnfocused = new EventEmitter<String>();
  @Output() closedClicked = new EventEmitter<string>();
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;
  inputText = '';


  constructor(private elementRef: ElementRef) {
    addIcons({
      'close-outline': closeOutline
    });
  }


  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }




  onInputUnfocused() {
    this.inputUnfocused.emit(this.inputText);
  }

  onClosedClicked() {
    this.closedClicked.emit(this.playerId);
  }

  focusInput() {
    if (this.inputEl) {
      this.inputEl.nativeElement.focus(); // Focus the input element
    }
  }




}
