export interface CashGameModel {
  blinds: [number, number];
  straddle: number | undefined;
  minBuyIn: number;
  maxBuyIn: number;
  withdrawRecord: {
    playerId: string;
    totalBuyIn: number;
    totalCashOut?: number;
  }[];
}

export interface TournamentModel {
  id: string;
  name: string;
  numberOfPlayers: number;
}


export interface SessionModel {
  id: string;
  startDate: Date;
  endDate: Date;
  location: string | undefined;
  type: CashGameModel | TournamentModel;
  gameType: 'NLH' | 'PLO' | 'Custom';
  players: string[];
}

export interface leagueModel {
  id: string;
  name: string;
  playerIds: string[];
  sessionIds: string[];
}

export interface PlayerModel {
  id: string;
  name: string;
  avatar: string;
}


export interface SessionPlayerModel {
  playerId: string;
  buyIn: number;
  cashOut?: number;
}
