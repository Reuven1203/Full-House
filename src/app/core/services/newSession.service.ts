import {inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {LeagueService} from "./league.service";
import {SessionPlayerModel} from "../models/session.model";

@Injectable({
  providedIn: 'root'
})
export class NewSessionService {
  // Individual BehaviorSubjects for each form field
  // TODO: Once sessions are dealt with in database, default starting blinds should be from the last session
  private blindsSubject = new BehaviorSubject<[number, number]>([0.25, 0.5]);
  blinds$ = this.blindsSubject.asObservable();  // Observable for blinds
  private defaultBuyInSubject = new BehaviorSubject<number>(100);
  defaultBuyIn$ = this.defaultBuyInSubject.asObservable();  // Observable for defaultBuyIn
  private sessionPlayersSubject = new BehaviorSubject<SessionPlayerModel[]>([]);
  sessionPlayers$ = this.sessionPlayersSubject.asObservable();  // Observable for

  private leagueService = inject(LeagueService);


  constructor() {}


  // Blinds
  getBlinds() {
    return this.blindsSubject.value;
  }

  setBlinds(newBlinds: [number, number]) {
    this.blindsSubject.next(newBlinds);
  }

  // Default Buy In
  getDefaultBuyIn() {
    return this.defaultBuyInSubject.value;
  }

  setDefaultBuyIn(newDefaultBuyIn: number) {
    // this.defaultBuyInSubject.next(newDefaultBuyIn);
    //
    // // Update the buy-in for each session player
    // const updatedPlayers = this.sessionPlayersSubject.value.map(player => ({
    //   playerId: player.playerId,
    //   buyIn: newDefaultBuyIn
    // }));
    //
    // this.sessionPlayersSubject.next(updatedPlayers); // Set the updated players array
  }

  getSessionPlayers() {
  //   bind players id from the league players
    return this.sessionPlayersSubject.value;
  }

  addSessionPlayer(id:string) {
    const currentPlayers = this.sessionPlayersSubject.value;
    this.sessionPlayersSubject.next([...currentPlayers, {playerId:id, buyIn: this.defaultBuyInSubject.value}]);

  }

  setSessionPlayers(players:SessionPlayerModel[]) {
    // create a new array of players with the default buy in
    this.sessionPlayersSubject.next(players);
    return players;
  }

  removeSessionPlayer(playerId: string) {
    const currentPlayers = this.sessionPlayersSubject.value;
    this.sessionPlayersSubject.next(currentPlayers.filter(player => player.playerId !== playerId));
  }

  patchSessionPlayerBuyIn(playerId: string, newBuyIn: number) {
    const currentPlayers = this.sessionPlayersSubject.value;
    this.sessionPlayersSubject.next(currentPlayers.map(player => {
      if(player.playerId === playerId) {
        return {
          playerId: player.playerId,
          buyIn: newBuyIn
        };
      }
      return player;
    }));

  }



  getAllLeaguePlayers() {
    return this.leagueService.getAllLeaguePlayers();
  }

}
