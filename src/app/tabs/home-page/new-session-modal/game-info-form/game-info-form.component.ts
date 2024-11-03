import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {BlindsPipe} from "../../../../core/pipes/blinds.pipe";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {IonToggle} from "@ionic/angular/standalone";
import {
    ValueChipComponent
} from "../../sessions/session/session-info/player-session-info/value-chip/value-chip.component";
import {BlindsModalComponent} from "../blinds-modal/blinds-modal.component";
import {BaseModalFormComponent} from "../../../../shared/components/base-modal/base-modal-form.component";
import {LeagueService} from "../../../../core/services/league.service";

@Component({
    selector: 'app-game-info-form',
    templateUrl: './game-info-form.component.html',
    styleUrls: ['./game-info-form.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush, // Add this line
  imports: [
    BlindsPipe,
    IonicModule,
    ReactiveFormsModule,
    ValueChipComponent,
    BlindsModalComponent
  ]
})
export class GameInfoFormComponent extends BaseModalFormComponent implements OnInit {
  @ViewChild(ValueChipComponent, { static: false }) valueChipComponent!: ValueChipComponent;
  private leagueService = inject(LeagueService);
  leagueBlinds!: {id:string, blinds: [number, number]}[];

  constructor(private cdr: ChangeDetectorRef) {
    super();

  }

  override async ngOnInit() {
    super.ngOnInit();
    this.leagueBlinds = await this.leagueService.getLeagueBlinds();
  }


  onDefaultBuyInClick() {
    const inputElement = this.valueChipComponent.inputField.nativeElement;
    inputElement.focus();
    const length = inputElement.value.length;
    inputElement.setSelectionRange(length, length);
  }

  onBlindsSelected(blinds: [number, number]) {
    this.FormGroup.patchValue({ blinds });
  }

  onSessionCompleteClick() {
    const currentValue = this.FormGroup.get('sessionComplete')?.value;
    this.FormGroup.patchValue({ sessionComplete: !currentValue });
  }

  get blinds(): [number, number]  {
    const blindsValue = this.FormGroup.get('blinds')?.value;
    return  blindsValue as [number, number];

  }

  get defaultBuyIn(): number {
    return this.FormGroup.get('defaultBuyIn')?.value;
  }

  get startDateTime(): Date {
    return this.FormGroup.get('startDateTime')?.value;
  }








}
