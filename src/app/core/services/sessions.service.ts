import {Injectable, signal} from '@angular/core';
import {dummySessions} from "../../tabs/home-page/sessions/dummySessions";
import {CashGameModel, SessionModel, TournamentModel} from "../models/session.model";

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private sessions = signal<SessionModel[]>(dummySessions)

  allSessions = this.sessions.asReadonly()

  getSession(sessionId:string) : SessionModel | undefined {
    return this.allSessions().find((session : SessionModel) => session.id === sessionId)
  }
  getSessionAsync(sessionId: string): Promise<SessionModel | undefined> {
    return Promise.resolve(this.getSession(sessionId));
  }

  isCashGameModel(type: CashGameModel | TournamentModel | undefined): type is CashGameModel {
    return (type as CashGameModel).minBuyIn !== undefined;
  }

  cashGameModel(type: CashGameModel | TournamentModel | undefined): CashGameModel {
    return type as CashGameModel;
  }

  constructor() { }
}
