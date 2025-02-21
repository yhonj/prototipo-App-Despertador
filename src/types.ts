export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  hints: string[];
}

export interface Alarm {
  id: string;
  time: string;
  songId: string;
  isActive: boolean;
  days: boolean[];
}

export interface GuessAttempt {
  songGuess: string;
  artistGuess: string;
  isCorrect: boolean;
}