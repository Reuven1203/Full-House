import {Component, inject, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {CashGameModel, SessionModel, TournamentModel} from "../../../../core/models/session.model";
import {addIcons} from "ionicons";
import {person} from "ionicons/icons";
import {EventEmitter} from "@angular/core";
import {SessionsService} from "../../../../core/services/sessions.service";
import {ListItemComponent} from "../../../../shared/components/list-item/list-item.component";


@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss'],
    standalone: true,
    host: {
    '(click)':"onClick()"

    },
  imports: [
    DatePipe,
    IonicModule,
    ListItemComponent
  ]
})
export class SessionComponent  {
  @Input({required:true}) session!: SessionModel
  @Output() sessionClicked = new EventEmitter<SessionModel>()
  sessionService = inject(SessionsService);
  constructor() {
    addIcons({person})

  }

  onClick() {
    this.sessionClicked.emit(this.session)
  }



}
