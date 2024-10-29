import {SessionModel, PlayerModel} from "../../../core/models/session.model";

export const dummySessions: SessionModel[] = [
  {
    id: 'session1',
    startDate: new Date('2024-09-25T19:00:00'),
    endDate: new Date('2024-09-25T23:00:00'),
    location: 'Las Vegas, NV',
    type: {
      blinds: [5, 10],
      straddle: 20,
      minBuyIn: 500,
      maxBuyIn: 2000,
      withdrawRecord: [
        {
          playerId: 'player1',
          totalBuyIn: 1000
        },
        {
          playerId: 'player2',
          totalBuyIn: 1500
        }
      ]
    },
    gameType: 'NLH', // No-Limit Hold'em
    players: [] // Empty array for now, can add player data later
  },
  {
    id: 'session2',
    startDate: new Date('2024-09-26T18:00:00'),
    endDate: new Date('2024-09-27T02:00:00'),
    location: 'Los Angeles, CA',
    type: {
      id: 'tournament1',
      name: 'LA Poker Classic',
      numberOfPlayers: 120
    },
    gameType: 'PLO', // Pot-Limit Omaha
    players: [] // Empty array for now
  },
  {
    id: 'session3',
    startDate: new Date('2024-09-27T20:00:00'),
    endDate: new Date('2024-09-28T02:00:00'),
    location: 'New York, NY',
    type: {
      blinds: [2, 5],
      straddle: undefined, // No straddle
      minBuyIn: 200,
      maxBuyIn: 1000,
      withdrawRecord: [
        {
          playerId: 'player3',
          totalBuyIn: 500
        },
        {
          playerId: 'player4',
          totalBuyIn: 700,
        }]
    },
    gameType: 'NLH', // No-Limit Hold'em
    players: [] // Empty array for now
  },
  {
    id: 'session4',
    startDate: new Date('2024-10-01T17:00:00'),
    endDate: new Date('2024-10-01T23:30:00'),
    location: 'Miami, FL',
    type: {
      id: 'tournament2',
      name: 'Florida Open',
      numberOfPlayers: 80
    },
    gameType: 'Custom', // Custom game type
    players: [] // Empty array for now
  },
  {
    id: 'session5',
    startDate: new Date('2024-10-05T18:00:00'),
    endDate: new Date('2024-10-06T01:00:00'),
    location: 'Online',
    type: {
      blinds: [1, 2],
      straddle: 4,
      minBuyIn: 100,
      maxBuyIn: 500,
      withdrawRecord: [
        {
          playerId: 'player5',
          totalBuyIn: 200,
          totalCashOut: 500
        },
        {
          playerId: 'player6',
          totalBuyIn: 300,
          totalCashOut: 0
        }
      ]
    },
    gameType: 'PLO', // Pot-Limit Omaha
    players: [] // Empty array for now
  }
];






