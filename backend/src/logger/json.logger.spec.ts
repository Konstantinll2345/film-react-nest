import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('formatMessage возвращает валидный JSON с level, message, optionalParams', () => {
    const result = logger.formatMessage('log', 'hello', { a: 1 });
    const parsed = JSON.parse(result);
    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('hello');
    expect(parsed.optionalParams).toEqual([{ a: 1 }]);
  });

  it('log пишет в console.log отформатированное сообщение', () => {
    logger.log('test');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const parsed = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('test');
  });
});
