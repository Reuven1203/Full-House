// schema.ts

const LEAGUES_TABLE = `
CREATE TABLE IF NOT EXISTS leagues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
`;

const PLAYERS_TABLE = `
CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    avatar TEXT,
    email TEXT,
    phone TEXT
);
`;

const LEAGUE_PLAYERS_TABLE = `
CREATE TABLE IF NOT EXISTS league_players (
    league_id TEXT NOT NULL,
    player_id TEXT NOT NULL,
    FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    PRIMARY KEY (league_id, player_id)
);
`;

const SESSIONS_TABLE = `
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    league_id TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT,
    location TEXT,
    game_type TEXT NOT NULL CHECK (game_type IN ('NLH', 'PLO', 'Custom')),
    session_type TEXT NOT NULL CHECK (session_type IN ('CashGame', 'Tournament')),
    note TEXT,
    FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE
);
`;

const CASH_GAMES_TABLE = `
CREATE TABLE IF NOT EXISTS cash_games (
    session_id TEXT PRIMARY KEY,
    blinds_id INTEGER NOT NULL,
    blinds_low INTEGER NOT NULL,
    blinds_high INTEGER NOT NULL,
    min_buy_in INTEGER NOT NULL,
    max_buy_in INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (blinds_id) REFERENCES blinds(id) ON DELETE CASCADE
);
`;

const CASHGAME_WITHDRAW_RECORDS_TABLE = `
CREATE TABLE IF NOT EXISTS cashgame_withdraw_records (
    session_id TEXT NOT NULL,
    player_id TEXT NOT NULL,
    total_buy_in REAL NOT NULL,
    total_cash_out REAL,
    PRIMARY KEY (session_id, player_id),
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);
`;

const BLINDS_TABLE = `
CREATE TABLE IF NOT EXISTS blinds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    league_id TEXT NOT NULL,
    blinds_low INTEGER NOT NULL,
    blinds_high INTEGER NOT NULL,
    default_buy_in REAL NOT NULL,
    FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE,
    UNIQUE (league_id, blinds_low, blinds_high)
);
`;

export const STARTING_BLINDS = `
INSERT INTO blinds (league_id, blinds_low, blinds_high, default_buy_in) VALUES
    (1, 0.25, 0.5, 35),
    (1, 0.5, 1, 70),
    (1, 1, 2, 100),
    (1, 1, 3, 250),
    (1, 2, 5, 500),
    (1, 5, 10, 1000),
    (1, 10, 20, 2000),
    (1, 25, 50, 4000),
    (1, 50, 100, 8000),
    (1, 100, 200, 16000),
    (1, 200, 400, 32000),
    (1, 500, 1000, 64000);
`;

export const ALL_SCHEMAS = `
${LEAGUES_TABLE}
${PLAYERS_TABLE}
${LEAGUE_PLAYERS_TABLE}
${SESSIONS_TABLE}
${CASH_GAMES_TABLE}
${CASHGAME_WITHDRAW_RECORDS_TABLE}
${BLINDS_TABLE}
`;
