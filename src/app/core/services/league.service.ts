import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {DatabaseService} from "../../../database/database.service";
import {PlayerModel} from "../models/player.model";

@Injectable({
  providedIn: 'root'
})

export class LeagueService {
  private database = inject(DatabaseService);
  private leaguePlayersSubject = new BehaviorSubject<PlayerModel[]>([]);
  leaguePlayers$ = this.leaguePlayersSubject.asObservable();


  constructor() {
    this.initializeLeaguePlayers();
  }


  initializeLeaguePlayers() {
    this.database.getAllLeaguePlayers().then(players => {
      this.leaguePlayersSubject.next(players);
    });
  }


  getAllLeaguePlayers() {
    return this.leaguePlayersSubject.value;
  }

  async addPlayer(name: string, email?: string, avatar?: string): Promise<PlayerModel> {
    try {
      const newPlayer = await this.database.addPlayer({
        name,
        email: email || null,
        avatar: avatar || null
      });

      this.leaguePlayersSubject.next([...this.leaguePlayersSubject.value, newPlayer]);

      return newPlayer; // Return the full player object, including the ID
    } catch (error) {
      console.error("Failed to add player:", error);
      throw error;
    }
  }

  async removePlayer(playerId: string) {
    try {
      const removedPlayer = await this.database.removePlayerById(playerId);
      this.leaguePlayersSubject.next(this.leaguePlayersSubject.value.filter(player => player.id !== playerId));
      return removedPlayer;
    } catch (error) {
      console.error("Failed to remove player:", error);
      throw error;
    }
  }

  getPlayerInfo(playerId: string) {
    console.log(this.leaguePlayersSubject.value);
    return this.leaguePlayersSubject.value.find(player => player.id === playerId);
  }

}
