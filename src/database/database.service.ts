import { Injectable } from '@angular/core';
import {CapacitorSQLite, DBSQLiteValues, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import { PlayerModel } from "../app/core/models/player.model";
import { BehaviorSubject, Observable } from 'rxjs';
import {ALL_SCHEMAS, LEAGUE_PLAYERS_TABLE, LEAGUES_TABLE, PLAYERS_TABLE, STARTING_BLINDS} from "./Schemas";
import {Capacitor} from "@capacitor/core";

const DB_NAME = "pokerleaguedb";

interface JeepSqliteComponent extends HTMLElement {
  initWebStore: () => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})


export class DatabaseService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private platform = Capacitor.getPlatform();
  private playersSubject = new BehaviorSubject<PlayerModel[]>([]);
  players$: Observable<PlayerModel[]> = this.playersSubject.asObservable();

  async initializePlugin(): Promise<void> {
    if (this.platform === 'web') {
      await this.initWebStore();
    }
    try {
      await this.establishConnection();
      await this.initializeSchemas();
      await this.listTables();
      console.log('league table contents');
      await this.viewTableContents('leagues');
      await this.loadPlayers();
      await this.saveDatabaseToStore();
    } catch (error) {
      console.error("Failed to initialize plugin:", error);
      throw error;
    }
  }
  async initializeSchemas(): Promise<void> {
    try {
      // check if schemas are already created
        const tables = await this.db.query(`SELECT name FROM sqlite_master WHERE type='table'`);
        if (tables.values?.length === 0) {
            console.log("No tables found. Initializing schemas...");
            await this.db.execute(ALL_SCHEMAS);
            await this.createDefaultLeague();
            await this.initializeBlinds();
        }
    //     check if blinds are already initialized
        const blinds = await this.db.query(`SELECT * FROM blinds`);
        if (blinds.values?.length === 0) {
            console.log("No blinds found. Initializing blinds...");
            await this.initializeBlinds();
        }
    } catch (error) {
      console.error("Failed to initialize schemas:", error);
      throw error;
    }

  }

  async createDefaultLeague(): Promise<void> {
    try {
      // Check if the league with id 1 already exists
      const leagueCheck = await this.db.query(`SELECT * FROM leagues WHERE id = 1`);

      if (leagueCheck.values?.length === 0) {
        // Insert league with id 1 and name 'My Poker League'
        const insertLeagueQuery = `
        INSERT INTO leagues (id, name)
        VALUES (1, 'My Poker League')
      `;
        await this.db.execute(insertLeagueQuery);
        console.log("Default league created with id 1 and name 'My Poker League'");
      } else {
        console.log("League with id 1 already exists", leagueCheck.values);
      }
    } catch (error) {
      console.error("Failed to create default league:", error);
      throw error;
    }
  }
  async listTables(): Promise<void> {
    const tables = await this.db.query(`SELECT name FROM sqlite_master WHERE type='table'`);
    console.log("Existing tables:", tables.values);
  }

  private async initWebStore(): Promise<void> {
    // Ensure the `jeep-sqlite` element is in the DOM
    const jeepSqliteEl = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepSqliteEl);
    await customElements.whenDefined('jeep-sqlite');

    // Initialize the web store
    try {
      await this.sqlite.initWebStore();
      console.log(">> Web store initialized");
    } catch (error) {
      console.error("Failed to initialize web store:", error);
      throw error;
    }
  }

  async establishConnection(): Promise<void> {
    try {
      const isConnection = await this.sqlite.isConnection(DB_NAME, false);
      if(isConnection.result){
        console.log(">> Retrieving database connection");
        this.db = await this.sqlite.retrieveConnection(DB_NAME, false);
      }else {
        console.log(">> Creating database connection");
        this.db = await this.sqlite.createConnection(DB_NAME, false, "no-encryption", 1, false);
      }

      const isOpen = await this.db.isDBOpen();
        if(isOpen.result){
            console.log(">> Database is already open");
            return;
        }else {
          console.log(">> Opening database");
            await this.db.open();
        }
    } catch (error) {
      console.error("Failed to establish database connection:", error);
      throw error;
    }
  }

  private async initializeDatabase(): Promise<void> {
    await this.db.execute(ALL_SCHEMAS)
  }

  async saveDatabaseToStore(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      await this.sqlite.saveToStore(DB_NAME);  // Save to IndexedDB
      console.log("Database saved to store");
    }
  }




  private async loadPlayers(): Promise<void> {
    await this.viewTableContents('league_players');
    try {
      const result = await this.getAllLeaguePlayers()
      if(!result){
        throw new Error("Failed to load players");
      }
      this.playersSubject.next(result.values || []);
      console.log("Loaded players:", result);
    } catch (error) {
      console.error("Failed to load players:", error);
      throw error; // Propagate the error
    }
  }

  async getAllLeaguePlayers(leagueId = 1): Promise<DBSQLiteValues> {
    try {
      const result = await this.db.query(`
      SELECT p.id, p.name, p.email, p.phone, p.avatar
      FROM players p
      JOIN league_players lp ON p.id = lp.player_id
      WHERE lp.league_id = ${leagueId}
    `, undefined, true); // Correctly passing leagueId as a parameter
      console.log("Getting all league players:", result);
      return result || [];
    } catch (error) {
      console.error(`Failed to get all league players for league ID ${leagueId}:`, error);
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
      if (Capacitor.getPlatform() === 'web') {
        await this.sqlite.saveToStore(DB_NAME);  // Save to IndexedDB
        console.log("Database saved to store");
      }
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

  async getLeagueBlinds(leagueID = 1): Promise<any> {
    try {
      const result = await this.db.query(`SELECT id, blinds_low, blinds_high FROM blinds WHERE league_id = "${leagueID}"`);
      return result.values || [];
    } catch (error) {
      console.error("Failed to get blinds:", error);
      throw error;
    }
  }

  resetDatabase = async () => {
  //   first drop all tables
    await this.dropAllTables();

  //  then close connection
    await this.db.delete()
    await this.db.close();
    await this.sqlite.closeConnection(DB_NAME, false);
  //  then reestablish connection
    await this.establishConnection();
  //  then initialize schemas
    await this.initializeSchemas();



  }

  dropAllTables = async () => {
    try {
      await this.db.execute(`DROP TABLE IF EXISTS league_players`);
      await this.db.execute(`DROP TABLE IF EXISTS players`);
      await this.db.execute(`DROP TABLE IF EXISTS leagues`);
      await this.db.execute(`DROP TABLE IF EXISTS sessions`);
      await this.db.execute(`DROP TABLE IF EXISTS cash_games`);
      await this.db.execute(`DROP TABLE IF EXISTS cashgame_withdraw_records`);
      await this.db.execute(`DROP TABLE IF EXISTS blinds`);
      console.log("All tables dropped");


    } catch (error) {
      console.error("Failed to drop tables:", error);
      throw error;
    }
  }

  initializeBlinds = async () => {
    try{
      await this.db.execute(STARTING_BLINDS)
    }catch (error) {
      console.error("Failed to initialize blinds:", error);
      throw error;
    }
  }

  async viewTableContents(tableName: string): Promise<void> {
    try {
      const result = await this.db.query(`SELECT * FROM ${tableName}`);
      if (result.values && result.values.length > 0) {
        console.log(`Contents of ${tableName}:`, result.values);
      } else {
        console.log(`No data found in ${tableName}.`);
      }
    } catch (error) {
      console.error(`Failed to fetch data from ${tableName}:`, error);
    }
  }

}


