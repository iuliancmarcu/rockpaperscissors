export enum PlayOption {
  ROCK = 'Rock',
  PAPER = 'Paper',
  SCISSORS = 'Scissors',
}

export interface PlayOptionConfig {
  readonly key: string;
  readonly label: string;
  readonly symbol: string;
  readonly winsOver: ReadonlyArray<PlayOption>;
}
