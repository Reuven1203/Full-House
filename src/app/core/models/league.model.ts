
export interface LeagueInfoModel {
  id: string | null;
  name: string | null;
}


export interface LeagueBlindModel {
  id: string;
  blinds: [number, number];
  defaultBuyIn: number;
}

