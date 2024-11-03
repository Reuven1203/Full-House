import {Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgClass} from "@angular/common";
import {BlindsSelectionComponent} from "./blinds-selection/blinds-selection.component";
import {NewSessionService} from "../../../../core/services/newSession.service";
import {BaseModalComponent} from "../../../../shared/components/base-modal/base-modal.component";

@Component({
  selector: 'app-blinds-modal',
  templateUrl: './blinds-modal.component.html',
  styleUrls: ['./blinds-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgClass,
    BlindsSelectionComponent
  ]
})



export class BlindsModalComponent extends BaseModalComponent implements OnInit {
  @Input() blinds?:{ id:string, blinds: [number, number]}[];
  @Output() blindsSelected = new EventEmitter<[number, number]>();
  private newSessionService = inject(NewSessionService);
  selectedBlinds!: [number, number];
  private destroyRef = inject(DestroyRef);

  constructor() {
    super();
  }


  ngOnInit() {
    this.selectedBlinds = this.newSessionService.getBlinds();
    const subscription = this.newSessionService.blinds$.subscribe((blinds) => {
      this.selectedBlinds = blinds;
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })

  }

  onBlindsSelected(blinds: [number, number]) {
    this.blindsSelected.emit(blinds);
    this.oncancel.emit();
  }

  blindsAreEqual(blinds1: [number, number], blinds2: [number, number]) {
    return JSON.stringify(blinds1) === JSON.stringify(blinds2);
  }






}
