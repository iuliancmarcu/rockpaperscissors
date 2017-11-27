import { PlayOption, PlayOptionConfig } from './models';

const options: Map<PlayOption, PlayOptionConfig> = new Map([
  [
    PlayOption.ROCK,
    {
      label: 'Rock',
      symbol: '👊',
      winsOver: [PlayOption.SCISSORS],
      key: 'R',
    },
  ],
  [
    PlayOption.PAPER,
    {
      label: 'Paper',
      symbol: '🖐️',
      winsOver: [PlayOption.ROCK],
      key: 'P',
    },
  ],
  [
    PlayOption.SCISSORS,
    {
      label: 'Scissors',
      symbol: '✌️',
      winsOver: [PlayOption.PAPER],
      key: 'S',
    },
  ],
]);

export function getPlayOptionsWinner(a?: PlayOption, b?: PlayOption): PlayOption | null {
  const aConfig = options.get(a);
  const bConfig = options.get(b);

  if (aConfig == null || bConfig == null) {
    return aConfig != null ? a : bConfig != null ? b : null;
  }

  const aWinsOverB = aConfig.winsOver.indexOf(b) > -1;
  const bWinsOverA = bConfig.winsOver.indexOf(a) > -1;

  return aWinsOverB ? a : bWinsOverA ? b : null;
}

export function getPlayOptionConfig(option: PlayOption): PlayOptionConfig | null {
  return options.get(option);
}

export function getRandomPlayOption(): PlayOption {
  const count = Object.keys(PlayOption).length;
  const index = Math.floor(Math.random() * count);

  return PlayOption[Object.keys(PlayOption)[index]];
}

export default options;
