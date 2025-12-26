/**
 * Utility functions for Telegram notifications
 */

import type { TelegramNotificationPayload } from './telegram-types';

/**
 * Escapes HTML special characters for Telegram HTML parse mode
 * @param text - Text to escape
 * @returns Escaped text safe for HTML parse mode
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Extracts browser information from user agent string
 * @param userAgent - User agent string
 * @returns Browser name or 'Unknown'
 */
export function extractBrowserInfo(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome'))
    return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
}

/**
 * Formats notification message with page visit details
 * @param payload - Notification payload with all visit information
 * @returns Formatted HTML message for Telegram
 */
export function formatNotificationMessage(
  payload: TelegramNotificationPayload
): string {
  const { page, fullUrl, timestamp, userAgent, referer, ip, location } =
    payload;

  let message = `🔔 <b>New Page Visit</b>\n\n`;

  message += `📄 <b>Page:</b> ${escapeHtml(page)}\n`;

  if (fullUrl) {
    message += `🌍 <b>Full URL:</b> ${escapeHtml(fullUrl)}\n`;
  }

  message += `🕐 <b>Time:</b> ${new Date(timestamp).toLocaleString('ru-RU')}\n`;

  if (ip && ip !== 'unknown') {
    message += `📍 <b>IP:</b> ${escapeHtml(ip)}\n`;
  }

  // Add location information
  if (location) {
    const locationParts: string[] = [];

    if (location.city) locationParts.push(location.city);
    if (location.region) locationParts.push(location.region);
    if (location.country) locationParts.push(location.country);

    if (locationParts.length > 0) {
      message += `🗺️ <b>Location:</b> ${escapeHtml(locationParts.join(', '))}\n`;
    }
  }

  if (referer) {
    message += `🔗 <b>Referer:</b> ${escapeHtml(referer)}\n`;
  }

  if (userAgent) {
    const browser = extractBrowserInfo(userAgent);
    message += `🌐 <b>Browser:</b> ${escapeHtml(browser)}\n`;
  }

  return message;
}

/**
 * Checks if IP address is localhost or private
 * @param ip - IP address to check
 * @returns True if IP is localhost or private
 */
export function isPrivateIp(ip: string): boolean {
  return (
    ip === 'unknown' ||
    ip.startsWith('127.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.')
  );
}
