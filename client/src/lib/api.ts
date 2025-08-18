// API configuration for Vercel deployment
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL;

export const API_BASE_URL = isProduction && isVercel 
  ? `https://${process.env.VERCEL_URL}` 
  : isProduction 
    ? '' // Relative URLs for other production environments
    : ''; // Development uses relative URLs to proxy

// API request helper that works with both development and production
export async function apiRequest(path: string, options: RequestInit = {}) {
  const url = path.startsWith('/') ? path : `/${path}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Environment-specific configuration
export const getAPIConfig = () => ({
  baseURL: API_BASE_URL,
  isProduction,
  isVercel: Boolean(isVercel),
  environment: process.env.NODE_ENV || 'development'
});