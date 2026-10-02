function stringifyError(value: unknown): string | null {
  try {
    const serialized = JSON.stringify(value, null, 2);
    return serialized === undefined ? null : serialized;
  } catch {
    return null;
  }
}

export function formatError(error: unknown, fallback = 'Ocurrió un error inesperado.'): string {
  if (error instanceof Error) {
    const details = {
      name: error.name,
      message: error.message,
      ...(error.stack ? { stack: error.stack } : {}),
    };

    return stringifyError(details) ?? (error.message || fallback);
  }

  if (typeof error === 'string') return error;
  if (error === null || error === undefined) return fallback;

  const serialized = stringifyError(error);
  return serialized ?? String(error);
}
