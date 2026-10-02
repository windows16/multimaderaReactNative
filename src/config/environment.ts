const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

if (!apiUrl) {
  throw new Error(
    'Falta EXPO_PUBLIC_API_URL en el entorno. Configura la URL base de la API en .env.',
  );
}

export const environment = {
  apiUrl: apiUrl.replace(/\/+$/, ''),
} as const;
