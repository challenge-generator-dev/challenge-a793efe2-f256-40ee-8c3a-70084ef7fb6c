import React, { useEffect, useState } from 'react';

type ErrorType = 'error' | 'warning' | 'info';

interface ErrorMessageProps {
  message: string;
  type?: ErrorType;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const typeStyles: Record<ErrorType, { bg: string; border: string; icon: string }> = {
  error: {
    bg: '#fee2e2',
    border: '#ef4444',
    icon: '✕'
  },
  warning: {
    bg: '#fef3c7',
    border: '#f59e0b',
    icon: '⚠'
  },
  info: {
    bg: '#dbeafe',
    border: '#3b82f6',
    icon: 'ℹ'
  }
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
  onClose,
  autoClose = true,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const style = typeStyles[type];

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose();
    }
    if (e.key === 'Escape' && onClose) {
      handleClose();
    }
  };

  if (!isVisible && !isLeaving) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: style.bg,
        border: `2px solid ${style.border}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: isLeaving ? 'translateX(120%)' : 'translateX(0)',
        opacity: isLeaving ? 0 : 1,
        transition: 'all 0.3s ease-in-out',
        maxWidth: '480px',
        margin: '8px 0'
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: style.border,
          color: '#fff',
          fontSize: '14px',
          fontWeight: 'bold',
          flexShrink: 0
        }}
        aria-hidden="true"
      >
        {style.icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            color: '#1f2937',
            fontSize: '14px',
            lineHeight: '1.5',
            wordBreak: 'break-word'
          }}
        >
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          aria-label="Cerrar mensaje"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            padding: 0,
            border: 'none',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
export type { ErrorMessageProps, ErrorType };