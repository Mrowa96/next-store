import * as v from 'valibot';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import { safeFetch } from './safeFetch';

const fetchMock = vi.fn();

const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);

vi.stubGlobal('fetch', fetchMock);

describe('safeFetch', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('should return successful result with parsed data', async () => {
    const mockedData = { data: ['a', 'b', 'c'] };

    fetchMock.mockImplementation(async () => ({
      ok: true,
      status: 200,
      headers: new Headers({
        'Content-type': 'application/json',
      }),
      json: async () => mockedData,
    }));

    const result = await safeFetch('http://example.com', {
      successSchema: v.object({
        data: v.array(v.string()),
      }),
    });

    expect(result.isOk).toEqual(true);
    expect(result.error).toEqual(null);
    expect(result.status).toEqual(200);
    expect(result.data).toEqual(mockedData);
  });

  it('should return failed result because endpoint returned invalid json', async () => {
    fetchMock.mockImplementation(async () => ({
      ok: true,
      status: 200,
      headers: new Headers({
        'Content-type': 'application/json',
      }),
      json: async () => {
        throw new Error('Cannot parse data');
      },
    }));

    const result = await safeFetch('http://example.com', {
      successSchema: v.object({
        data: v.array(v.string()),
      }),
    });

    expect(result.isOk).toEqual(false);
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toEqual(
      `Call to http://example.com failed with status 200, because of json parse error`,
    );
    expect(result.status).toEqual(200);
    expect(result.data).toEqual(null);
    expect(consoleErrorMock).toHaveBeenCalledOnce();
  });

  it("should return failed result because endpoint data doesn't match schema", async () => {
    const mockedData = { data: { a: 'a', b: 'b', c: 'c' } };

    fetchMock.mockImplementation(async () => ({
      ok: true,
      status: 200,
      headers: new Headers({
        'Content-type': 'application/json',
      }),
      json: async () => mockedData,
    }));

    const result = await safeFetch('http://example.com', {
      successSchema: v.object({
        data: v.array(v.string()),
      }),
    });

    expect(result.isOk).toEqual(false);
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toEqual(
      `Call to http://example.com failed with status 200, because of parse error`,
    );
    expect(result.status).toEqual(200);
    expect(result.data).toEqual(null);
    expect(consoleErrorMock).toHaveBeenCalledOnce();
  });

  it('should return failed result because endpoint failed', async () => {
    fetchMock.mockImplementation(async () => ({
      ok: false,
      status: 404,
      headers: new Headers(),
    }));

    const result = await safeFetch('http://example.com', {
      successSchema: v.object({
        data: v.array(v.string()),
      }),
    });

    expect(result.isOk).toEqual(false);
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toEqual(`Call to http://example.com failed with status 404`);
    expect(result.status).toEqual(404);
    expect(result.data).toEqual(null);
    expect(consoleErrorMock).toHaveBeenCalledOnce();
  });
});
