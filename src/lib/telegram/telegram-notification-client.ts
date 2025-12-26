/**
 * Client-side utility for sending Telegram notifications
 * Sends notification requests to the serverless API endpoint
 */

import type { TelegramNotificationPayload } from './telegram-types';

/**
 * Response from notification API
 */
export interface NotificationApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Options for sending notification
 */
export interface SendNotificationOptions {
  /**
   * API endpoint URL (defaults to /api/telegram/notify)
   */
  endpoint?: string;
  /**
   * Whether to silently fail (default: false)
   */
  silent?: boolean;
}

/**
 * Sends a Telegram notification from the client
 * @param payload - Notification payload with page visit information
 * @param options - Optional configuration
 * @returns Promise with API response
 * @throws Error if request fails (unless silent is true)
 */
export async function sendNotification(
  payload: TelegramNotificationPayload,
  options: SendNotificationOptions = {}
): Promise<NotificationApiResponse> {
  const { endpoint = '/api/telegram/notify', silent = false } = options;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as
        | NotificationApiResponse
        | Record<string, unknown>;

      const error = new Error(
        `Notification API error: ${response.status} - ${JSON.stringify(errorData)}`
      );

      if (silent) {
        console.error('Failed to send notification:', error);
        return { success: false, error: error.message };
      }

      throw error;
    }

    return (await response.json()) as NotificationApiResponse;
  } catch (error) {
    if (silent) {
      console.error('Failed to send notification:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    throw error;
  }
}

/**
 * Creates a notification payload from current page information
 * @param page - Page path or identifier
 * @param additionalData - Additional data to include
 * @returns Notification payload
 */
export function createNotificationPayload(
  page: string,
  additionalData: Partial<TelegramNotificationPayload> = {}
): TelegramNotificationPayload {
  return {
    page,
    fullUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: new Date().toISOString(),
    userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    referer: typeof document !== 'undefined' ? document.referrer : undefined,
    ...additionalData,
  };
}

/**
 * Sends a notification for a page visit
 * Convenience function that combines payload creation and sending
 * @param page - Page path or identifier
 * @param options - Optional configuration
 * @returns Promise with API response
 */
export async function notifyPageVisit(
  page: string,
  options: SendNotificationOptions = {}
): Promise<NotificationApiResponse> {
  const payload = createNotificationPayload(page);
  return sendNotification(payload, options);
}
