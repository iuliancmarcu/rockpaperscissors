import { PlayOption } from '../../src/models';
import * as options from '../../src/options';

describe('options', () => {
  describe('getRandomPlayOption', () => {
    it('returns a random play option', () => {
      const playOptions = Object.keys(PlayOption).map(k => PlayOption[k]);
      expect(playOptions).toContain(options.getRandomPlayOption());
    });
  });

  describe('getPlayOptionsWinner', () => {
    it('returns null if both values are null', () => {
      expect(options.getPlayOptionsWinner(null, null)).toBe(null);
    });

    it('returns null if values are the same', () => {
      expect(options.getPlayOptionsWinner(PlayOption.ROCK, PlayOption.ROCK)).toBe(null);
    });

    it('returns first value if second is null', () => {
      expect(options.getPlayOptionsWinner(PlayOption.ROCK, null)).toBe(PlayOption.ROCK);
    });

    it('returns second value if first is null', () => {
      expect(options.getPlayOptionsWinner(null, PlayOption.PAPER)).toBe(PlayOption.PAPER);
    });

    it('returns the winner between the values', () => {
      expect(options.getPlayOptionsWinner(PlayOption.ROCK, PlayOption.PAPER)).toBe(PlayOption.PAPER);
      expect(options.getPlayOptionsWinner(PlayOption.ROCK, PlayOption.SCISSORS)).toBe(PlayOption.ROCK);
      expect(options.getPlayOptionsWinner(PlayOption.PAPER, PlayOption.SCISSORS)).toBe(PlayOption.SCISSORS);
    });
  });
});
