import {inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {LeagueService} from "./league.service";
import {SessionPlayerModel} from "../models/session.model";

@Injectable({
  providedIn: 'root'
})
export class NewSessionService {
  private leagueService = inject(LeagueService);

  // Individual BehaviorSubjects for each form field
  // TODO: Once sessions are dealt with in database, default starting blinds should be from the last session
  private blindsSubject = new BehaviorSubject<{ id: string, blinds: [number, number] }>({
    id: '', blinds: [0, 0]
  });
  blinds$ = this.blindsSubject.asObservable();  // Observable for blinds
  private defaultBuyInSubject = new BehaviorSubject<number>(100);
  defaultBuyIn$ = this.defaultBuyInSubject.asObservable();  // Observable for defaultBuyIn
  private sessionPlayersSubject = new BehaviorSubject<SessionPlayerModel[]>([]);
  sessionPlayers$ = this.sessionPlayersSubject.asObservable();  // Observable for



  constructor() {
    this.initializeBlinds()
  }
  private  initializeBlinds() {
    try {
      const blinds = this.leagueService.getLeagueBlinds();
      if (blinds.length > 0) {
        this.setBlinds(blinds[0]);
      }
    } catch (error) {
      console.error('Failed to initialize blinds:', error);
    }
  }

  getDefaultBuyInFromBlinds(blindId: string) {
    const info = this.leagueService.getBlindsInfo()
    const blind = info.find(blind => blind.id === blindId);
    if(blind) {
      return blind.defaultBuyIn;
    }else {
      return 100;
  }
    }


  // Blinds
  getBlinds() {
    return this.blindsSubject.value;
  }

  setBlinds(blinds: {id:string, blinds: [number, number]}) {
    this.blindsSubject.next(blinds);
  //   set the default buy in to the default buy in of the blinds
    this.setDefaultBuyIn(this.getDefaultBuyInFromBlinds(blinds.id));
  }



  // Default Buy In
  getDefaultBuyIn() {
    return this.defaultBuyInSubject.value;
  }

  setDefaultBuyIn(newDefaultBuyIn: number) {
    this.defaultBuyInSubject.next(newDefaultBuyIn);
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
