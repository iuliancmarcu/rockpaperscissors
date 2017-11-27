import * as stats from '../../src/stats';

describe('stats', () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };

    (global as any).localStorage = localStorageMock;
  });

  describe('clearGameStats', () => {
    it('sets gamesPlayed and gamesWon to ""', () => {
      stats.clearGameStats();

      expect(localStorageMock.setItem).toBeCalledWith('gamesPlayed', '');
      expect(localStorageMock.setItem).toBeCalledWith('gamesWon', '');
    });
  });

  describe('getGameStats', () => {
    it('gets gamesPlayed and gamesWon', () => {
      localStorageMock.getItem
        .mockReturnValueOnce('2')
        .mockReturnValueOnce('1');

      const st = stats.getGameStats();

      expect(localStorageMock.getItem).toBeCalledWith('gamesPlayed');
      expect(localStorageMock.getItem).toBeCalledWith('gamesWon');

      expect(st).toEqual({
        gamesPlayed: 2,
        gamesWon: 1,
      });
    });

    it('returns 0 if local storage returns ""', () => {
      localStorageMock.getItem
        .mockReturnValue('');

      const st = stats.getGameStats();

      expect(localStorageMock.getItem).toBeCalledWith('gamesPlayed');
      expect(localStorageMock.getItem).toBeCalledWith('gamesWon');

      expect(st).toEqual({
        gamesPlayed: 0,
        gamesWon: 0,
      });
    });
  });

  describe('registerGame', () => {
    it('increments local storage value for gamesPlayed and also for gamesWon if win is true', () => {
      localStorageMock.getItem
        .mockReturnValueOnce('2')
        .mockReturnValueOnce('1');

      stats.registerGame(false);

      expect(localStorageMock.setItem).toBeCalledWith('gamesPlayed', '3');
      expect(localStorageMock.setItem).toBeCalledWith('gamesWon', '1');

      localStorageMock.getItem
        .mockReturnValueOnce('2')
        .mockReturnValueOnce('1');

      stats.registerGame(true);

      expect(localStorageMock.setItem).toBeCalledWith('gamesPlayed', '3');
      expect(localStorageMock.setItem).toBeCalledWith('gamesWon', '2');
    });
  });
});
