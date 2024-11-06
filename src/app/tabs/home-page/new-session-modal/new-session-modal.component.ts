import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {BlindsModalComponent} from "./blinds-modal/blinds-modal.component";
import { FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BlindsPipe} from "../../../core/pipes/blinds.pipe";
import {NewSessionService} from "../../../core/services/newSession.service";
import {ValueChipComponent} from "../sessions/session/session-info/player-session-info/value-chip/value-chip.component";
import {GameInfoFormComponent} from "./game-info-form/game-info-form.component";
import {AddPlayersFormComponent} from "./add-players-form/add-players-form.component";
import {SessionPlayerModel} from "../../../core/models/session.model";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-new-session-modal',
  templateUrl: './new-session-modal.component.html',
  styleUrls: ['./new-session-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    BlindsModalComponent,
    ReactiveFormsModule,
    BlindsPipe,
    ValueChipComponent,
    GameInfoFormComponent,
    AddPlayersFormComponent,
    NgClass
  ]
})
export class NewSessionModalComponent implements OnInit {
  @Output() oncancel = new EventEmitter<void>();
  newSessionForm!: FormGroup;
  private newSessionService = inject(NewSessionService);
  private destroyRef = inject(DestroyRef);





  ngOnInit() {

    this.newSessionForm = new FormGroup({
      blinds: new FormControl<{id:string, blinds:[number, number]}>(this.newSessionService.getBlinds()),
      defaultBuyIn: new FormControl<number>(this.newSessionService.getDefaultBuyIn()),
      sessionComplete: new FormControl<boolean>(false),
      startDateTime: new FormControl<string>(new Date().toISOString()),
      endDateTime: new FormControl<string>(new Date().toISOString()),
      players: new FormControl<SessionPlayerModel[]>(this.newSessionService.getSessionPlayers()),

    });


    // set subscription to each form control
    const blindsSubscription = this.newSessionForm.get('blinds')!.valueChanges.subscribe((blinds) => {
        this.newSessionService.setBlinds(blinds);
    }
    );

    const defaultBuyInSubscription = this.newSessionForm.get('defaultBuyIn')!.valueChanges.subscribe((defaultBuyIn) => {
      this.newSessionForm.get('players')!.value.forEach((player: SessionPlayerModel) => {
          player.buyIn = defaultBuyIn;
      });
    });

    const playersSubscription = this.newSessionForm.get('players')!.valueChanges.subscribe((players) => {
      this.newSessionService.setSessionPlayers(players);
    });


    this.destroyRef.onDestroy(() => {
      blindsSubscription.unsubscribe();
      defaultBuyInSubscription.unsubscribe();
      playersSubscription.unsubscribe();
      // blindsToDefaultBuyInSubscription.unsubscribe();
    })

  }

  onSaveClick() {
    console.log(this.newSessionForm.value);
  }

  onCancelClick() {
    this.oncancel.emit();
  }


}
