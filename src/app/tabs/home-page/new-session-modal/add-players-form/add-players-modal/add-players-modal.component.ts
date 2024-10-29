import {
  Component, DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { AnimationController, IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerCheckboxComponent } from './player-checkbox/player-checkbox.component';
import { NewSessionService } from '../../../../../core/services/newSession.service';
import { NewPlayerInputComponent } from './new-player-input/new-player-input.component';
import { BaseModalComponent } from '../../../../../shared/components/base-modal/base-modal.component';
import {LeagueService} from "../../../../../core/services/league.service";

@Component({
  selector: 'app-add-players-modal',
  templateUrl: './add-players-modal.component.html',
  styleUrls: ['./add-players-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    PlayerCheckboxComponent
  ]
})
export class AddPlayersModalComponent extends BaseModalComponent implements OnInit {
  @Output() playerSelected = new EventEmitter<string>();
  private componentRefs: ComponentRef<NewPlayerInputComponent>[] = [];

  // Reference to the container where new player components will be injected
  @ViewChild('newPlayerContainer', { read: ViewContainerRef }) newPlayerContainer!: ViewContainerRef;

  private newSessionService = inject(NewSessionService);
  private leagueService = inject(LeagueService);
  private destroyRef = inject(DestroyRef);
  leaguePlayers!: string[];
  sessionPlayers!: string[];

  constructor(private animationCtrl: AnimationController) {
    super();
  }

  ngOnInit() {
    this.leaguePlayers = this.leagueService.getAllLeaguePlayers();
    const subscription = this.newSessionService.sessionPlayers$.subscribe((players) => {
      this.sessionPlayers = players.map((player) => player.playerId);
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  isPlayerSelected(playerId: string) {
    return this.sessionPlayers.includes(playerId);
  }

  onPlayerClick(playerId: string) {
    this.playerSelected.emit(playerId);
  }

  // Handle the "New Player" button click
  onAddNewPlayerClick() {
    this.addNewPlayerComponent(); // Add a new player input component
  }

  // Function to dynamically inject new player components and apply animation
  addNewPlayerComponent() {
    const componentRef = this.newPlayerContainer.createComponent(NewPlayerInputComponent);
    componentRef.instance.closedClicked.subscribe(() => {
      this.removePlayerComponent(componentRef);
    });
    componentRef.instance.inputUnfocused.subscribe(() => {
      if(!componentRef.instance.inputText) {
        this.removePlayerComponent(componentRef);
      }else {
       const newPlayer = this.leagueService.addPlayer(componentRef.instance.inputText);
       // add id to component ref
        componentRef.instance.playerId = newPlayer;
       this.onPlayerClick(newPlayer);
      }
    });
    this.componentRefs.push(componentRef);
    setTimeout(() => {
      componentRef.instance.focusInput();
    }, 0);
    const newPlayerElement = componentRef.instance.nativeElement;
    this.animateNewPlayerElement(newPlayerElement);
  }

  removePlayerComponent(componentRef: ComponentRef<NewPlayerInputComponent>) {
    const index = this.componentRefs.indexOf(componentRef);
    if (index !== -1) {
      // Remove the component from the view
      this.newPlayerContainer.remove(this.newPlayerContainer.indexOf(componentRef.hostView));

      // Remove the reference from the array
      this.componentRefs.splice(index, 1);

      if(componentRef.instance.playerId) {
        this.newSessionService.removeSessionPlayer(componentRef.instance.playerId);
        this.leagueService.removePlayer(componentRef.instance.playerId);


      }


    }
  }



  // Function to apply animation to a newly created player input element
  animateNewPlayerElement(element: HTMLElement) {
    const animation = this.animationCtrl
      .create()
      .addElement(element)
      .duration(500) // Adjust duration as needed
      .iterations(1)
      .fromTo('height', '0', '100%')
    animation.play(); // Play the animation
  }
}


