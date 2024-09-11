type SuccessfulResult<T> = { result: T; error: null };

type FailedResult = { result: null; error: Error };

export async function tryCatch<T>(
  fn: () => Promise<T>,
): Promise<FailedResult | SuccessfulResult<T>> {
  try {
    return {
      result: await fn(),
      error: null,
    };
  } catch (error) {
    let preparedError: Error;

    if (!(error instanceof Error)) {
      preparedError = new Error(String(error));
    } else {
      preparedError = error;
    }

    return {
      result: null,
      error: preparedError,
    };
  }
}
