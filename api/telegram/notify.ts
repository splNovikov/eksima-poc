/**
 * Telegram Bot API endpoint for sending notifications
 * Vercel Serverless Function
 * Documentation: https://core.telegram.org/bots/api#sendmessage
 */

// Types
interface LocationData {
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
}

interface TelegramNotificationPayload {
  page: string;
  fullUrl?: string;
  timestamp: string;
  userAgent?: string;
  referer?: string;
  ip?: string;
  location?: LocationData;
}

interface EnrichedTelegramNotificationPayload
  extends Omit<TelegramNotificationPayload, 'ip' | 'location'> {
  ip: string;
  location: LocationData | null;
}

interface IpApiResponse {
  status: 'success' | 'fail';
  message?: string;
  country?: string;
  countryCode?: string;
  regionName?: string;
  city?: string;
}

interface VercelRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: string | unknown;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
}

// Constants
const GEOLOCATION_TIMEOUT = 2000; // 2 seconds
const TELEGRAM_API_TIMEOUT = 5000; // 5 seconds
const IP_API_TIMEOUT = 3000; // 3 seconds

// Utility functions
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function extractBrowserInfo(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome'))
    return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === 'unknown' ||
    ip.startsWith('127.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.')
  );
}

function formatNotificationMessage(
  payload: EnrichedTelegramNotificationPayload
): string {
  const { page, fullUrl, timestamp, ip, userAgent, referer, location } = payload;
  const parts: string[] = ['🔔 <b>New Page Visit</b>\n\n'];
  parts.push(`📄 <b>Page:</b> ${escapeHtml(page)}\n`);

  if (fullUrl) {
    parts.push(`🌍 <b>Full URL:</b> ${escapeHtml(fullUrl)}\n`);
  }

  parts.push(
    `🕐 <b>Time:</b> ${new Date(timestamp).toLocaleString('ru-RU')}\n`
  );

  if (ip && ip !== 'unknown') {
    parts.push(`📍 <b>IP:</b> ${escapeHtml(ip)}\n`);
  }

  if (location) {
    const locationParts: string[] = [];
    if (location.city) locationParts.push(location.city);
    if (location.region) locationParts.push(location.region);
    if (location.country) locationParts.push(location.country);

    if (locationParts.length > 0) {
      parts.push(
        `🗺️ <b>Location:</b> ${escapeHtml(locationParts.join(', '))}\n`
      );
    }
  }

  if (referer) {
    parts.push(`🔗 <b>Referer:</b> ${escapeHtml(referer)}\n`);
  }

  if (userAgent) {
    const browser = extractBrowserInfo(userAgent);
    parts.push(`🌐 <b>Browser:</b> ${escapeHtml(browser)}\n`);
  }

  return parts.join('');
}

async function getLocationFromIP(ip: string): Promise<LocationData | null> {
  if (isPrivateIp(ip)) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), IP_API_TIMEOUT);

    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as IpApiResponse;

    if (data.status === 'success') {
      return {
        city: data.city,
        region: data.regionName,
        country: data.country,
        countryCode: data.countryCode,
      };
    }

    return null;
  } catch (error) {
    // Silently fail - don't break notifications if geolocation fails
    if (error instanceof Error && error.name !== 'AbortError') {
      console.error('Failed to get location from IP:', error);
    }
    return null;
  }
}

async function sendTelegramNotification(
  message: string,
  botToken: string,
  chatId: string
): Promise<void> {
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_API_TIMEOUT);

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Telegram API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Telegram API request timeout');
    }
    throw error;
  }
}

function extractClientIp(
  headers: Record<string, string | string[] | undefined>
): string {
  const forwarded = headers['x-forwarded-for'];
  if (forwarded) {
    const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return ip.split(',')[0].trim();
  }

  const realIp = headers['x-real-ip'];
  if (realIp) {
    return Array.isArray(realIp) ? realIp[0] : realIp;
  }

  return 'unknown';
}

function validatePayload(
  payload: unknown
): payload is TelegramNotificationPayload {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const p = payload as Partial<TelegramNotificationPayload>;
  return !!(p.page && p.timestamp);
}

function parseRequestBody(body: string | unknown): unknown {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body;
}

/**
 * Vercel Serverless Function handler
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const method = req.method || 'GET';

  // Handle GET requests - configuration check
  if (method === 'GET') {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    res.status(200).json({
      configured: !!(botToken && chatId),
      hasBotToken: !!botToken,
      hasChatId: !!chatId,
    });
    return;
  }

  // Handle POST requests
  if (method !== 'POST') {
    res.status(405).json({ error: `Method ${method} not allowed` });
    return;
  }

  try {
    // Validate environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing Telegram configuration');
      res.status(500).json({ error: 'Telegram bot not configured' });
      return;
    }

    // Parse request body
    const payload = parseRequestBody(req.body);
    if (!payload) {
      res.status(400).json({ error: 'Invalid JSON in request body' });
      return;
    }

    // Validate required fields
    if (!validatePayload(payload)) {
      res
        .status(400)
        .json({ error: 'Missing required fields: page, timestamp' });
      return;
    }

    // Get client IP
    const ip = extractClientIp(req.headers);

    // Get location from IP (non-blocking with timeout)
    let location: LocationData | null = null;
    if (ip && ip !== 'unknown') {
      try {
        location = await Promise.race([
          getLocationFromIP(ip),
          new Promise<null>(resolve =>
            setTimeout(() => resolve(null), GEOLOCATION_TIMEOUT)
          ),
        ]);
      } catch {
        location = null;
      }
    }

    // Enrich payload with server-side data
    const enrichedPayload: EnrichedTelegramNotificationPayload = {
      ...payload,
      ip,
      location,
    };

    // Format and send notification
    const message = formatNotificationMessage(enrichedPayload);
    await sendTelegramNotification(message, botToken, chatId);

    res.status(200).json({ success: true, message: 'Notification sent' });
  } catch (error) {
    console.error('Error processing Telegram notification:', error);

    res.status(500).json({
      error: 'Failed to send notification',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
