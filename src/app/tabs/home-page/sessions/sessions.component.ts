import {Component, inject, Input, OnInit} from '@angular/core';
import {SessionsService} from "../../../core/services/sessions.service";
import {IonicModule} from "@ionic/angular";
import {DatePipe} from "@angular/common";

import {SessionComponent} from "./session/session.component";
import {SessionModel} from "../../../core/models/session.model";
import {RouterLink} from "@angular/router";
import {SessionInfoPage} from "./session/session-info/session-info.page";

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    DatePipe,
    SessionComponent,
    RouterLink
  ]
})
export class SessionsComponent {
  private sessionsService = inject(SessionsService);
  @Input() sessions = this.sessionsService.allSessions();
  component = SessionInfoPage
  onSessionClick(session: SessionModel) {

  }
  constructor() {

  }




}
