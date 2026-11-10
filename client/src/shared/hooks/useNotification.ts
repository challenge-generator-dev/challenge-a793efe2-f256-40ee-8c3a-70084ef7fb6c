import { useState, useCallback, useRef, useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
  createdAt: number;
}

interface UseNotificationReturn {
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType, duration?: number) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
}

const generateId = (): string => {
  return `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const defaultDurations: Record<NotificationType, number> = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3000
};

export const useNotification = (): UseNotificationReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const existing = prev.find((n) => n.id === id);
      if (existing) {
        const timer = timersRef.current.get(id);
        if (timer) {
          clearTimeout(timer);
          timersRef.current.delete(id);
        }
      }
      return prev.filter((n) => n.id !== id);
    });
  }, []);

  const addNotification = useCallback((
    message: string,
    type: NotificationType = 'info',
    duration?: number
  ): string => {
    const id = generateId();
    const finalDuration = duration ?? defaultDurations[type];
    
    const notification: Notification = {
      id,
      message,
      type,
      duration: finalDuration,
      createdAt: Date.now()
    };

    setNotifications((prev) => [...prev, notification]);

    if (finalDuration > 0) {
      const timer = setTimeout(() => {
        removeNotification(id);
      }, finalDuration);
      timersRef.current.set(id, timer);
    }

    return id;
  }, [removeNotification]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setNotifications([]);
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'success', duration);
  }, [addNotification]);

  const error = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'error', duration);
  }, [addNotification]);

  const warning = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'warning', duration);
  }, [addNotification]);

  const info = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'info', duration);
  }, [addNotification]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
};

export default useNotification;