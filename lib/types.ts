export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address?: string;
  website?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  lastUpdated?: string;
}

export interface Squad {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  shirtNumber?: number;
}

export interface TeamDetail extends Team {
  squad?: Squad[];
  staff?: any[];
}

export interface Person {
  id: number;
  name: string;
  dateOfBirth: string;
  nationality: string;
  section: string;
}

export interface Match {
  id: number;
  utcDate: string;
  status: 'TIMED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'CANCELLED' | 'SUSPENDED';
  lastUpdatedAt: string;
  minute?: number;
  injuryTime?: number;
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    winner?: 'HOME' | 'AWAY' | 'DRAW';
    duration: 'REGULAR' | 'EXTRA' | 'PENALTY';
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
    extraTime: {
      home: number | null;
      away: number | null;
    };
    penalties: {
      home: number | null;
      away: number | null;
    };
  };
  odds?: {
    msg: string;
  };
  goals?: Goal[];
  bookings?: Booking[];
  substitutions?: Substitution[];
  referees: Referee[];
  season?: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday?: number;
  };
  stage?: string;
  group?: string;
  lastUpdated?: string;
}

export interface Goal {
  minute: number;
  injuryTime?: number;
  type: 'PENALTY' | 'OWN_GOAL' | 'REGULAR';
  player: Person;
  team: Team;
  assist?: {
    player?: Person;
  };
  score: {
    home: number;
    away: number;
  };
}

export interface Booking {
  minute: number;
  player: Person;
  team: Team;
  card: 'YELLOW' | 'RED';
}

export interface Substitution {
  minute: number;
  player: Person;
  playerOut: Person;
  team: Team;
  position?: string;
  positionOut?: string;
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality?: string;
}

export interface StandingTable {
  stage: string;
  type: string;
  group?: string;
  table: Standing[];
}

export interface Standing {
  position: number;
  team: Team;
  playedGames: number;
  form?: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Scorer {
  player: Person;
  team: Team;
  playedMatches: number;
  goals: number;
  assists: number;
  penalties?: number;
}

export interface MatchResponse {
  matches: Match[];
  competition?: Competition;
  filters?: Record<string, any>;
}

export interface StandingResponse {
  competition: Competition;
  season: {
    id: number;
    startDate: string;
    endDate: string;
  };
  standings: StandingTable[];
}

export interface ScorersResponse {
  competition: Competition;
  season: {
    id: number;
    startDate: string;
    endDate: string;
  };
  scorers: Scorer[];
}

export interface TeamsResponse {
  competition: Competition;
  season: {
    id: number;
    startDate: string;
    endDate: string;
  };
  teams: Team[];
}

export interface Player {
  id: number;
  name: string;
  photo?: string;
  role?: {
    primary: string;
  };
  nationality: string;
  age: number;
  height?: string;
}

export interface FavoriteItem {
  type: 'team' | 'player';
  id: number;
  name: string;
  image?: string;
  addedAt: number;
}
