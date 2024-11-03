import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { PlayerModel } from "../app/core/models/player.model";
import { BehaviorSubject, Observable } from 'rxjs';
import {ALL_SCHEMAS} from "./Schemas";

const DB_LEAGUE = "pokerleaguedb";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  private playersSubject = new BehaviorSubject<PlayerModel[]>([]);
  players$: Observable<PlayerModel[]> = this.playersSubject.asObservable();

  async initializePlugin(): Promise<void> {
    try {
      this.db = await this.sqlite.createConnection(DB_LEAGUE, false, "no-encryption", 1, false);
      await this.db.open();
      await this.db.execute(ALL_SCHEMAS);
      const result = await this.db.query('SELECT COUNT(*) as count FROM leagues');
      console.log("Leagues count:", result.values);
      if (result.values && result.values[0].count === 0) {
        await this.db.execute(`
          INSERT INTO leagues (id, name) VALUES ('1', 'MY POKER LEAGUE');
        `);
      }
      const playersTableCheck = await this.db.query('PRAGMA table_info(players)');
      console.log("Players table check:", playersTableCheck.values);
      await this.loadPlayers();
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error; // Propagate the error
    }
  }

  private async loadPlayers(): Promise<void> {
    try {
      const result = await this.db.query('SELECT p.*\n' +
        'FROM players p\n' +
        'JOIN league_players lp ON p.id = lp.player_id\n' +
        'WHERE lp.league_id = (SELECT id FROM leagues LIMIT 1);');
      if(!result.values) {
        throw new Error("Failed to load players");
      }
      this.playersSubject.next(result.values || []);
      console.log("Loaded players:", result.values);
    } catch (error) {
      console.error("Failed to load players:", error);
      throw error; // Propagate the error
    }
  }

  async getAllLeaguePlayers(leagueId = 1): Promise<PlayerModel[]> {
    try {
      // join league_players with players
      const result = await this.db.query(`
        SELECT p.*
        FROM players p
        JOIN league_players lp ON p.id = lp.player_id
        WHERE lp.league_id = "${leagueId}"
      `);
      console.log("Getting all league players:", result.values);
      return result.values || [];
    } catch (error) {
      console.error("Failed to get all league players:", error);
      throw error; // Propagate the error
    }
  }

  async addPlayer(player: Omit<PlayerModel, 'id'>): Promise<PlayerModel> {
    try {
      const { name, email = null, phone = null, avatar = null } = player;

      const playerQuery = `
      INSERT INTO players (name, email, phone, avatar)
      VALUES ("${name}", ${email ? `"${email}"` : "NULL"}, ${phone ? `"${phone}"` : "NULL"}, ${avatar ? `"${avatar}"` : "NULL"})
    `;
      const success = await this.db.execute(playerQuery);
      if (!success.changes) {
        throw new Error("Failed to add player");
      }
      const result = await this.db.query(`SELECT * FROM players ORDER BY id DESC LIMIT 1`);
      console.log("New player:", result.values);
      if (!result.values || result.values.length === 0) {
        throw new Error("Failed to retrieve the newly added player");
      }

      const newPlayer = result.values[0];
      const playerId = newPlayer.id;
      console.log("New player ID:", playerId);
      await this.addPlayerToLeague(playerId);
      return newPlayer;
    } catch (error) {
      console.error("Failed to add player:", error);
      throw error;
    }
  }

  async addPlayerToLeague(playerId: string, leagueId = 1): Promise<void> {
    try {
      const query = `
        INSERT INTO league_players (league_id, player_id)
        VALUES ("${leagueId}", "${playerId}")
      `;
      const changes = await this.db.execute(query);
      if (!changes.changes) {
        throw new Error("Failed to add player to league");
      }
      await this.loadPlayers();
    } catch (error) {
      console.error("Failed to add player to league:", error);
      throw error;
    }
  }

  async updatePlayerById(id: string, player: PlayerModel): Promise<void> {
    try {
      const { name, email, phone, avatar } = player;
      const query = `
        UPDATE players
        SET name="${name}", email="${email}", phone="${phone}", avatar="${avatar}"
        WHERE id="${id}"
      `;
      await this.db.execute(query);
      await this.loadPlayers();
    } catch (error) {
      console.error("Failed to update player:", error);
      throw error;
    }
  }

  async removePlayerById(id: string): Promise<void> {
    try {
      const query = `DELETE FROM players WHERE id="${id}"`;
      await this.db.execute(query);
      await this.loadPlayers(); // Refresh player list
    } catch (error) {
      console.error("Failed to delete player:", error);
      throw error; // Propagate the error
    }
  }

  dropAllTables = async () => {
    try {
      await this.db.execute(`DROP TABLE IF EXISTS league_players`);
      await this.db.execute(`DROP TABLE IF EXISTS players`);
      await this.db.execute(`DROP TABLE IF EXISTS leagues`);
      console.log("All tables dropped");


    } catch (error) {
      console.error("Failed to drop tables:", error);
      throw error;
    }
  }
}

