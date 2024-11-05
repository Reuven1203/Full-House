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
    this.initializeLeaguePlayers().then(
      () => console.log("League players initialized form league service")

    )

  }




  async initializeLeaguePlayers() {
    const result = await this.database.getAllLeaguePlayers();
    console.log("result of league players in service", result);
    this.leaguePlayersSubject.next(result.values || []);
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
    return this.leaguePlayersSubject.value.find(player => player.id === playerId);
  }

  async getLeagueBlinds() {
    const blinds =  await this.database.getLeagueBlinds();
    return blinds.map((blind: {id:string, blinds_low:number, blinds_high:number}) =>{
      return {
        id: blind.id,
        blinds: [blind.blinds_low, blind.blinds_high]
      }
    });
  }
}
