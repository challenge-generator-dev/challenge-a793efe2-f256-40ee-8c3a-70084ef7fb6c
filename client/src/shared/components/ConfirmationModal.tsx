import React, { useEffect, useRef, useCallback } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonVariant?: 'primary' | 'danger' | 'success';
  showCancel?: boolean;
  isLoading?: boolean;
  ariaLabel?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  confirmButtonVariant = 'primary',
  showCancel = true,
  isLoading = false,
  ariaLabel
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const buttonVariants = {
    primary: {
      backgroundColor: '#3b82f6',
      hoverBackgroundColor: '#2563eb',
      text: '#ffffff'
    },
    danger: {
      backgroundColor: '#ef4444',
      hoverBackgroundColor: '#dc2626',
      text: '#ffffff'
    },
    success: {
      backgroundColor: '#22c55e',
      hoverBackgroundColor: '#16a34a',
      text: '#ffffff'
    }
  };

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen && !isLoading) {
      onCancel();
    }
  }, [isOpen, isLoading, onCancel]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onCancel();
    }
  };

  const handleConfirmClick = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  const handleCancelClick = () => {
    if (!isLoading) {
      onCancel();
    }
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  if (!isOpen) return null;

  const variant = buttonVariants[confirmButtonVariant];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-label={ariaLabel || title}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
          maxWidth: '420px',
          width: '90%',
          padding: '24px',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h2
            id="modal-title"
            style={{
              margin: '0 0 8px 0',
              fontSize: '20px',
              fontWeight: 600,
              color: '#111827'
            }}
          >
            {title}
          </h2>
          <p
            id="modal-description"
            style={{
              margin: 0,
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6'
            }}
          >
            {message}
          </p>
        </div>
        
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}
        >
          {showCancel && (
            <button
              onClick={handleCancelClick}
              onKeyDown={(e) => handleButtonKeyDown(e, handleCancelClick)}
              disabled={isLoading}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                color: '#374151',
                fontSize: '14px',
                fontWeight: 500,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {cancelText}
            </button>
          )}
          <button
            ref={confirmButtonRef}
            onClick={handleConfirmClick}
            onKeyDown={(e) => handleButtonKeyDown(e, handleConfirmClick)}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: variant.backgroundColor,
              color: variant.text,
              fontSize: '14px',
              fontWeight: 500,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isLoading && (
              <span
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#ffffff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}
              />
            )}
            {confirmText}
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
export type { ConfirmationModalProps };