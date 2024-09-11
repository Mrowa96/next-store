import { type GenericSchema, type InferOutput, parseAsync } from 'valibot';

import { tryCatch } from './tryCatch';

async function getJsonContentFromResponse(response: Response) {
  if (response.headers.get('Content-type')?.startsWith('application/json')) {
    const result = await tryCatch(() => response.json());

    return {
      jsonContent: result.result as unknown,
      jsonError: result.error,
    };
  }

  return {
    jsonContent: null,
    jsonError: null,
  };
}

export async function safeFetch<SuccessSchema extends GenericSchema>(
  url: string,
  schemas: {
    successSchema: SuccessSchema;
  },
  options?: RequestInit,
): Promise<
  | { isOk: false; status: number; data: unknown; error: Error }
  | { isOk: true; status: number; data: InferOutput<SuccessSchema>; error: null }
> {
  const response = await fetch(url, options);
  const { jsonContent, jsonError } = await getJsonContentFromResponse(response);

  if (jsonError) {
    const error = new Error(
      `Call to ${url} failed with status ${response.status}, because of json parse error`,
      {
        cause: jsonError,
      },
    );

    console.error({ error });

    return {
      isOk: false,
      status: response.status,
      data: jsonContent || null,
      error,
    };
  }

  if (!response.ok) {
    const error = new Error(`Call to ${url} failed with status ${response.status}`);

    console.error({ error });

    return {
      isOk: false,
      status: response.status,
      data: jsonContent || null,
      error,
    };
  }

  const { result: parseResult, error: parseError } = await tryCatch(() =>
    parseAsync(schemas.successSchema, jsonContent),
  );

  if (parseError) {
    const error = new Error(
      `Call to ${url} failed with status ${response.status}, because of parse error`,
      {
        cause: parseError,
      },
    );

    console.error({ error });

    return {
      isOk: false,
      status: response.status,
      data: null,
      error: error,
    };
  }

  return {
    isOk: true,
    status: response.status,
    data: parseResult,
    error: null,
  };
}
