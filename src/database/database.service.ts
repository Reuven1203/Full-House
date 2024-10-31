import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { PlayerModel } from "../app/core/models/player.model";
import { BehaviorSubject, Observable } from 'rxjs';

const DB_LEAGUE = "leaguedb";

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
      const schema = `
        CREATE TABLE IF NOT EXISTS players (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT,
          phone TEXT,
          avatar TEXT
        );
      `;
      await this.db.execute(schema);
      await this.loadPlayers();
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error; // Propagate the error
    }
  }

  private async loadPlayers(): Promise<void> {
    try {
      const result = await this.db.query('SELECT * FROM players');
      this.playersSubject.next(result.values || []);
    } catch (error) {
      console.error("Failed to load players:", error);
      throw error; // Propagate the error
    }
  }

  async getAllLeaguePlayers(): Promise<PlayerModel[]> {
    try {
      await this.loadPlayers();
      return this.playersSubject.value;
    } catch (error) {
      console.error("Failed to get all league players:", error);
      throw error; // Propagate the error
    }
  }

  async addPlayer(player: Omit<PlayerModel, 'id'>): Promise<PlayerModel> {
    try {
      const { name, email = null, phone = null, avatar = null } = player;

      // Insert query with optional fields
      const query = `
      INSERT INTO players (name, email, phone, avatar)
      VALUES ("${name}", ${email ? `"${email}"` : "NULL"}, ${phone ? `"${phone}"` : "NULL"}, ${avatar ? `"${avatar}"` : "NULL"})
    `;
      await this.db.execute(query);

      // Retrieve the last inserted player
      const result = await this.db.query(`SELECT * FROM players ORDER BY id DESC LIMIT 1`);
      if (!result.values || result.values.length === 0) {
        throw new Error("Failed to retrieve the newly added player");
      }

      const newPlayer = result.values[0];
      await this.loadPlayers(); // Refresh the player list
      return newPlayer;
    } catch (error) {
      console.error("Failed to add player:", error);
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
}
