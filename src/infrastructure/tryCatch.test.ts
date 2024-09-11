import { describe, expect, it } from 'vitest';

import { tryCatch } from './tryCatch';

describe('tryCatch', () => {
  it('should return successful result', async () => {
    const result = await tryCatch(() => Promise.resolve('test'));

    expect(result.result).toEqual('test');
    expect(result.error).toEqual(null);
  });

  it('should return failed result', async () => {
    const result = await tryCatch(() => {
      throw new Error('error');
    });

    expect(result.result).toEqual(null);
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toEqual('error');
  });
});
