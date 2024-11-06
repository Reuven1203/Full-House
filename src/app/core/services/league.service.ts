import {DestroyRef, inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {DatabaseService} from "../../../database/database.service";
import {PlayerModel} from "../models/player.model";
import {LeagueBlindModel, LeagueInfoModel} from "../models/league.model";

@Injectable({
  providedIn: 'root'
})

export class LeagueService {
  private destroyRef = inject(DestroyRef);
  private database = inject(DatabaseService);
  private leagueInfoSubject = new BehaviorSubject<LeagueInfoModel>({id: null, name: null});
  leagueInfo$ = this.leagueInfoSubject.asObservable();
  private leaguePlayersSubject = new BehaviorSubject<PlayerModel[]>([]);
  leaguePlayers$ = this.leaguePlayersSubject.asObservable();
  private leagueBlindsSubject = new BehaviorSubject<LeagueBlindModel[]>([]);
  leagueBlinds$ = this.leagueBlindsSubject.asObservable();


  constructor() {
    const leagueInfoSubscription = this.database.leagueInfo$.subscribe((leagueInfo) => {
      this.leagueInfoSubject.next(leagueInfo);
    })

    const playersSubscription = this.database.players$.subscribe((players) => {
      this.leaguePlayersSubject.next(players);
    });
    const blindsSubscription = this.database.blinds$.subscribe((blinds) => {
      this.leagueBlindsSubject.next(blinds);
    })
    this.destroyRef.onDestroy(() => {
      leagueInfoSubscription.unsubscribe();
      playersSubscription.unsubscribe();
      blindsSubscription.unsubscribe();
    });
  }


  getLeagueInfo() {
    return this.leagueInfoSubject.value;
  }


  getAllLeaguePlayers() {
    return this.leaguePlayersSubject.value;
  }

  async addPlayer(name: string, email?: string, avatar?: string): Promise<PlayerModel> {
    try {
      return await this.database.addPlayer({
        name,
        email: email || null,
        avatar: avatar || null
      }); // Return the full player object, including the ID
    } catch (error) {
      console.error("Failed to add player:", error);
      throw error;
    }
  }

  async removePlayer(playerId: string) {
    try {
      return await this.database.removePlayerById(playerId);
    } catch (error) {
      console.error("Failed to remove player:", error);
      throw error;
    }
  }

  getPlayerInfo(playerId: string) {
    return this.leaguePlayersSubject.value.find(player => player.id === playerId);
  }

  getBlindsInfo() {
    return this.leagueBlindsSubject.value;
  }


   getLeagueBlinds() :{id:string, blinds: [number, number]}[] {
    const blinds = this.leagueBlindsSubject.value;
    return blinds.map(blind => {
      return {
        id: blind.id,
        blinds:blind.blinds
      }
    });
}
}
