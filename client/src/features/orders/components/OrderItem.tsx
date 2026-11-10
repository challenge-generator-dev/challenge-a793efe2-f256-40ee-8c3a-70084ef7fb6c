import { Order } from '../types/order.types';
import { useState } from 'react';
import ConfirmationModal from '@/shared/components/ConfirmationModal';
import '../styles/OrderItem.scss';

interface OrderItemProps {
  order: Order;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

export function OrderItem({ order, onEdit, onDelete }: OrderItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status?: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'status-pending',
      'processing': 'status-processing',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status?.toLowerCase() || ''] || 'status-default';
  };

  const getStatusLabel = (status?: string) => {
    const labels: Record<string, string> = {
      'pending': 'Pendiente',
      'processing': 'Procesando',
      'completed': 'Completado',
      'cancelled': 'Cancelado'
    };
    return labels[status?.toLowerCase() || ''] || status || 'Desconocido';
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(order.id!);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const canEdit = order.status !== 'completed' && order.status !== 'cancelled';
  const canDelete = order.status !== 'processing';

  return (
    <>
      <div className={`order-item ${getStatusClass(order.status)}`}>
        <div className="order-cell order-id">
          <span className="cell-label">ID</span>
          <span className="cell-value order-id-value">{order.id}</span>
        </div>

        <div className="order-cell order-customer">
          <span className="cell-label">Cliente</span>
          <span className="cell-value">{order.customerName}</span>
          {order.customerEmail && (
            <span className="cell-secondary">{order.customerEmail}</span>
          )}
        </div>

        <div className="order-cell order-total">
          <span className="cell-label">Total</span>
          <span className="cell-value cell-amount">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>

        <div className="order-cell order-status">
          <span className="cell-label">Estado</span>
          <span className={`status-badge ${getStatusClass(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="order-cell order-date">
          <span className="cell-label">Fecha</span>
          <span className="cell-value">{formatDate(order.createdAt)}</span>
        </div>

        <div className="order-cell order-actions">
          <span className="cell-label">Acciones</span>
          <div className="action-buttons">
            <button
              className="btn-icon btn-edit"
              onClick={() => onEdit(order)}
              disabled={!canEdit}
              title={canEdit ? 'Editar orden' : 'No editable'}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
            <button
              className="btn-icon btn-delete"
              onClick={handleDeleteClick}
              disabled={!canDelete || isDeleting}
              title={canDelete ? 'Eliminar orden' : 'No eliminable'}
            >
              {isDeleting ? (
                <span className="spinner-small"></span>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmationModal
          title="Confirmar eliminación"
          message={`¿Estás seguro de que deseas eliminar la orden #${order.id}? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          variant="danger"
        />
      )}
    </>
  );
}