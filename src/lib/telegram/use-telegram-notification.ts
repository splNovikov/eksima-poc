/**
 * React hook for sending Telegram notifications
 * Provides convenient way to send page visit notifications
 */

import { useCallback } from 'react';
import type { TelegramNotificationPayload } from './telegram-types';
import {
  notifyPageVisit,
  sendNotification,
  type NotificationApiResponse,
} from './telegram-notification-client';

/**
 * Options for useTelegramNotification hook
 */
export interface UseTelegramNotificationOptions {
  /**
   * Whether to send notifications automatically on mount
   */
  autoSend?: boolean;
  /**
   * Whether to silently fail (default: true)
   */
  silent?: boolean;
  /**
   * Custom endpoint URL
   */
  endpoint?: string;
}

/**
 * Return type of useTelegramNotification hook
 */
export interface UseTelegramNotificationReturn {
  /**
   * Send notification for a page visit
   */
  notify: (page: string) => Promise<NotificationApiResponse>;
  /**
   * Send custom notification
   */
  send: (
    payload: TelegramNotificationPayload
  ) => Promise<NotificationApiResponse>;
  /**
   * Whether notification is being sent
   */
  isSending: boolean;
}

/**
 * React hook for sending Telegram notifications
 * @param options - Hook configuration options
 * @returns Object with notification functions and state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { notify } = useTelegramNotification();
 *
 *   useEffect(() => {
 *     notify('/my-page');
 *   }, []);
 *
 *   return <div>My Page</div>;
 * }
 * ```
 */
export function useTelegramNotification(
  options: UseTelegramNotificationOptions = {}
): UseTelegramNotificationReturn {
  const { silent = true, endpoint } = options;

  const notify = useCallback(
    async (page: string): Promise<NotificationApiResponse> => {
      return notifyPageVisit(page, { silent, endpoint });
    },
    [silent, endpoint]
  );

  const send = useCallback(
    async (
      payload: TelegramNotificationPayload
    ): Promise<NotificationApiResponse> => {
      return sendNotification(payload, { silent, endpoint });
    },
    [silent, endpoint]
  );

  // Note: isSending state would require useState, but for simplicity
  // we're keeping the hook stateless. You can add state management if needed.

  return {
    notify,
    send,
    isSending: false, // Can be enhanced with useState if needed
  };
}
