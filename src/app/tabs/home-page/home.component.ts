import { Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonNav,
  IonModal,
  IonToggle, IonSegment, IonSegmentButton, IonPopover, IonDatetime, IonDatetimeButton
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import {SessionsComponent} from "./sessions/sessions.component";
import {NewSessionModalComponent} from "./new-session-modal/new-session-modal.component";
import {ComponentPreloadService} from "../../core/services/component-preload.service";
import {LeagueService} from "../../core/services/league.service";
import {LeagueInfoModel} from "../../core/models/league.model";

@Component({
  selector: 'app-home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, SessionsComponent, IonButton, IonNav, IonModal, NewSessionModalComponent, IonToggle, IonSegment, IonSegmentButton, IonPopover, IonDatetime, IonDatetimeButton]
})
export class HomeComponent implements OnInit  {
  @ViewChild(IonModal) modal: IonModal | undefined;
  private leagueService = inject(LeagueService);
  leagueInfo!: LeagueInfoModel;

ngOnInit() {
    this.leagueService.leagueInfo$.subscribe((leagueInfo) => {
      this.leagueInfo = leagueInfo;
    });
  }



  closeModal() {
    // this.modalOpen.set(false)
    this.modal?.dismiss(null, 'cancel')
  }



  constructor(private preloadService: ComponentPreloadService) {
    this.preloadService.initializeComponents();
  }


}
