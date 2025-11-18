export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  country: string;
  founded: number;
  venueId?: number;
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  photo: string;
  role: {
    primary: string;
    secondary?: string;
  };
  statistics?: PlayerStatistic[];
}

export interface PlayerStatistic {
  team: Team;
  league: League;
  season: number;
  appearances: number;
  lineups: number;
  minutes: number;
  number?: number;
  position?: string;
  rating?: number;
  captain: boolean;
  goals: number;
  assists: number;
  passes?: number;
  keyPasses?: number;
  dribbles?: number;
  fouls?: number;
  cards?: {
    yellow: number;
    red: number;
  };
  shots?: number;
  tackles?: number;
  blocks?: number;
  interceptions?: number;
  clearances?: number;
  saves?: number;
}

export interface Match {
  id: number;
  league: League;
  season: number;
  round: string;
  date: string;
  timestamp: number;
  timezone: string;
  status: {
    long: string;
    short: string;
    elapsed?: number;
  };
  venue: Venue;
  homeTeam: Team;
  awayTeam: Team;
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime?: {
      home: number | null;
      away: number | null;
    };
    penalty?: {
      home: number | null;
      away: number | null;
    };
  };
  lineups?: Lineup[];
  events?: MatchEvent[];
  statistics?: MatchStatistic[];
  commentary?: Commentary[];
}

export interface Lineup {
  team: Team;
  formation: string;
  players: LineupPlayer[];
}

export interface LineupPlayer {
  player: Player;
  position: string;
  rating?: number;
  stats?: {
    goals: number;
    assists: number;
    passes: number;
    dribbles: number;
    shots: number;
    tackles: number;
  };
}

export interface MatchEvent {
  time: {
    elapsed: number;
    extra?: number;
  };
  type: string;
  detail: string;
  player: Player;
  assist?: Player;
  team: Team;
}

export interface MatchStatistic {
  team: Team;
  possession: number;
  shots: {
    total: number;
    on: number;
  };
  passes: {
    total: number;
    accurate: number;
    percentage: number;
  };
  tackles: number;
  blocks: number;
  interceptions: number;
  fouls: number;
  corners: number;
  offsides: number;
  ballPossession: number;
  xG?: number;
  xGA?: number;
}

export interface Commentary {
  time: number;
  type: string;
  text: string;
  player?: string;
  team: Team;
}

export interface TeamStats {
  id: number;
  name: string;
  logo: string;
  venue: Venue;
  form: string;
  lastMatches?: Match[];
  nextMatches?: Match[];
  squad: Player[];
  statistics?: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  };
}

export interface ApiResponse<T> {
  get: string;
  parameters: Record<string, any>;
  errors: Record<string, string>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T[];
}

export interface FavoriteItem {
  type: 'team' | 'player';
  id: number;
  name: string;
  image?: string;
  addedAt: number;
}
