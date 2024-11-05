import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {BlindsPipe} from "../../../../core/pipes/blinds.pipe";
import {IonicModule, IonModal} from "@ionic/angular";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
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
export class GameInfoFormComponent extends BaseModalFormComponent implements OnInit, AfterViewInit {
  @ViewChild(ValueChipComponent, { static: false }) valueChipComponent!: ValueChipComponent;
  @ViewChild('startDateModal', { static: false }) startDateModal!: IonModal;
  @ViewChild('endDateModal', { static: false }) endDateModal!: IonModal;
  private leagueService = inject(LeagueService);
  leagueBlinds!: {id:string, blinds: [number, number]}[];
  maxDate!:string;


  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  override async ngOnInit() {
    super.ngOnInit();
    this.leagueBlinds = await this.leagueService.getLeagueBlinds();
    this.maxDate = new Date().toISOString().split('T')[0];

  }

  // get endMinDate(): string {
  //   return this.FormGroup.get('startDateTime')?.value.toISOString().split('T')[0];
  // }

  ngAfterViewInit() {
    this.cdr.detectChanges();
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

  async onDateItemClick(field: 'startDateTime' | 'endDateTime') {
    const modal = field === 'startDateTime' ? this.startDateModal : this.endDateModal;
    await modal.present();
  }

  onDateChange(event: any, field: "startDateTime" | "endDateTime") {
    const date = event.detail.value;
    this.FormGroup.patchValue({ [field]: date });
  }











}
