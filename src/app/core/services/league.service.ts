import {Injectable} from "@angular/core";
import {dummyPlayers} from "../../tabs/dummyPlayers";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LeagueService{
  private leaguePlayersSubject = new BehaviorSubject<string[]>( dummyPlayers.map(player => player.id));
  leaguePlayers$ = this.leaguePlayersSubject.asObservable();
  getAllLeaguePlayers() {
    return this.leaguePlayersSubject.value;
  }

  addPlayer(name:string) {
    const playerId = 'player' + (dummyPlayers.length + 1);
    dummyPlayers.push({
      id: playerId,
      name: name,
      avatar: 'avatar' + (dummyPlayers.length + 1) + '.jpg'
    });

    this.leaguePlayersSubject.next([...this.leaguePlayersSubject.value, playerId]);

    return playerId;

  }

  removePlayer(playerId: string) {
    dummyPlayers.splice(dummyPlayers.findIndex(player => player.id === playerId), 1);
    this.leaguePlayersSubject.next(this.leaguePlayersSubject.value.filter(player => player !== playerId));
  }

  getPlayerInfo(playerId: string) {
    return dummyPlayers.find(player => player.id === playerId);
  }
  constructor() { }
}
