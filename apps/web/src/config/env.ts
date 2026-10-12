const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!baseApiUrl) {
  throw new Error(
    'NEXT_PUBLIC_BASE_API_URL is not configured in .env.local',
  );
}

export const env = {
  baseApiUrl: baseApiUrl.replace(/\/+$/, ''),
  apiUrl: `${baseApiUrl.replace(/\/+$/, '')}/api`,
} as const;