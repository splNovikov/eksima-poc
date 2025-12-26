/**
 * Telegram Bot API client for sending notifications
 * Documentation: https://core.telegram.org/bots/api#sendmessage
 */

import type { TelegramApiConfig, TelegramApiResponse } from './telegram-types';

/**
 * Sends a notification to Telegram via Bot API
 * @param message - Message text to send
 * @param config - Telegram bot configuration (token and chat ID)
 * @returns Promise with API response
 * @throws Error if API request fails
 */
export async function sendTelegramNotification(
  message: string,
  config: TelegramApiConfig
): Promise<TelegramApiResponse> {
  const { botToken, chatId } = config;
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as
        | TelegramApiResponse
        | Record<string, unknown>;

      throw new Error(
        `Telegram API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    return (await response.json()) as TelegramApiResponse;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    throw error;
  }
}
