import { GameStats } from './models';

export function registerGame(won: boolean) {
  const stats = getGameStats();

  localStorage.setItem('gamesPlayed', (stats.gamesPlayed + 1).toString());
  localStorage.setItem('gamesWon', (stats.gamesWon + (won ? 1 : 0)).toString());
}

export function getGameStats(): GameStats {
  const gamesPlayed = Number(localStorage.getItem('gamesPlayed'));
  const gamesWon = Number(localStorage.getItem('gamesWon'));

  return {
    gamesPlayed: gamesPlayed || 0,
    gamesWon: gamesWon || 0,
  };
}

export function clearGameStats() {
  localStorage.setItem('gamesPlayed', '');
  localStorage.setItem('gamesWon', '');
}
