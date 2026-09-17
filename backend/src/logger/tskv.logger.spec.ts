import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    stdoutSpy.mockRestore();
  });

  it('formatMessage разделяет поля табуляцией и заканчивает переводом строки', () => {
    const result = logger.formatMessage('log', 'hello');
    expect(result).toContain('level=log');
    expect(result).toContain('message=hello');
    expect(result).toContain('\t');
    expect(result.endsWith('\n')).toBe(true);
  });

  it('log пишет в stdout', () => {
    logger.log('test');
    expect(stdoutSpy).toHaveBeenCalledTimes(1);
  });
});