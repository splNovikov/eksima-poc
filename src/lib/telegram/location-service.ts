/**
 * Service for IP geolocation using ip-api.com
 * Free tier: 45 requests/minute, no API key required
 */

import type { IpApiResponse, LocationData } from './telegram-types';
import { isPrivateIp } from './telegram-utils';

/**
 * Gets location information from IP address using ip-api.com
 * @param ip - IP address to geolocate
 * @returns Location data or null if unavailable
 */
export async function getLocationFromIP(
  ip: string
): Promise<LocationData | null> {
  // Skip localhost and private IPs
  if (isPrivateIp(ip)) {
    return null;
  }

  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as IpApiResponse;

    // Check if request was successful
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
    console.error('Failed to get location from IP:', error);
    return null;
  }
}
