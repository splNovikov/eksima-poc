/**
 * Type definitions for Telegram notification system
 */

/**
 * Location information from IP geolocation
 */
export interface LocationData {
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
}

/**
 * Payload for Telegram notification request
 */
export interface TelegramNotificationPayload {
  page: string;
  fullUrl?: string;
  timestamp: string;
  userAgent?: string;
  referer?: string;
  ip?: string;
  location?: LocationData;
}

/**
 * Enriched payload with server-side data (IP, location)
 */
export interface EnrichedTelegramNotificationPayload
  extends Omit<TelegramNotificationPayload, 'ip' | 'location'> {
  ip: string;
  location: LocationData | null;
}

/**
 * Telegram Bot API response structure
 */
export interface TelegramApiResponse {
  ok: boolean;
  result?: {
    message_id: number;
    date: number;
    chat: {
      id: number;
      type: string;
    };
    text: string;
  };
  error_code?: number;
  description?: string;
}

/**
 * Telegram API request configuration
 */
export interface TelegramApiConfig {
  botToken: string;
  chatId: string;
}

/**
 * IP Geolocation API response (ip-api.com)
 */
export interface IpApiResponse {
  status: 'success' | 'fail';
  message?: string;
  country?: string;
  countryCode?: string;
  regionName?: string;
  city?: string;
}
