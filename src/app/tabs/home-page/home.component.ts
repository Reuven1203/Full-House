import {Component, OnChanges, signal, ViewChild} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonNav,
  IonModal,
  IonToggle, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import {SessionsComponent} from "./sessions/sessions.component";
import {NewSessionModalComponent} from "./new-session-modal/new-session-modal.component";
import {ComponentPreloadService} from "../../core/services/component-preload.service";

@Component({
  selector: 'app-home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, SessionsComponent, IonButton, IonNav, IonModal, NewSessionModalComponent, IonToggle, IonSegment, IonSegmentButton]
})
export class HomeComponent {
  @ViewChild(IonModal) modal: IonModal | undefined;
  closeModal() {
    // this.modalOpen.set(false)
    this.modal?.dismiss(null, 'cancel')
  }

  constructor(private preloadService: ComponentPreloadService) {
    this.preloadService.initializeComponents();
  }

}
