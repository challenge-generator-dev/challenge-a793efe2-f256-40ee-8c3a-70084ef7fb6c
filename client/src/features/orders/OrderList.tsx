import { useEffect, useState } from 'react';
import { useOrders } from './hooks/useOrders';
import { OrderItem } from './components/OrderItem';
import { OrderForm } from './components/OrderForm';
import ErrorMessage from '@/shared/components/ErrorMessage';
import { Order } from './types/order.types';
import './styles/OrderList.scss';

export function OrderList() {
  const { orders, loading, error, fetchOrders, createOrder, updateOrder, deleteOrder } = useOrders();
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreateOrder = async (orderData: Partial<Order>) => {
    try {
      await createOrder(orderData);
      setShowForm(false);
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  const handleUpdateOrder = async (id: string, orderData: Partial<Order>) => {
    try {
      await updateOrder(id, orderData);
      setEditingOrder(null);
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id);
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const filteredOrders = orders
    .filter(order => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id?.toLowerCase().includes(searchLower) ||
        order.customerName?.toLowerCase().includes(searchLower) ||
        order.status?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field: keyof Order) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  if (loading && orders.length === 0) {
    return (
      <div className="order-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <header className="order-list-header">
        <h1>Gestión de Órdenes</h1>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
            disabled={showForm}
          >
            + Nueva Orden
          </button>
        </div>
      </header>

      <div className="search-filters">
        <input
          type="text"
          placeholder="Buscar por ID, cliente o estado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchOrders} />}

      {showForm && (
        <OrderForm
          order={editingOrder}
          onSubmit={editingOrder 
            ? (data) => handleUpdateOrder(editingOrder.id!, data)
            : handleCreateOrder
          }
          onCancel={handleCancelForm}
        />
      )}

      <div className="orders-table">
        <div className="table-header">
          <div className="th sortable" onClick={() => handleSort('id')}>
            ID{getSortIndicator('id')}
          </div>
          <div className="th sortable" onClick={() => handleSort('customerName')}>
            Cliente{getSortIndicator('customerName')}
          </div>
          <div className="th sortable" onClick={() => handleSort('totalAmount')}>
            Total{getSortIndicator('totalAmount')}
          </div>
          <div className="th sortable" onClick={() => handleSort('status')}>
            Estado{getSortIndicator('status')}
          </div>
          <div className="th sortable" onClick={() => handleSort('createdAt')}>
            Fecha{getSortIndicator('createdAt')}
          </div>
          <div className="th">Acciones</div>
        </div>

        <div className="table-body">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron órdenes</p>
              {searchTerm && (
                <button className="btn-secondary" onClick={() => setSearchTerm('')}>
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            filteredOrders.map(order => (
              <OrderItem
                key={order.id}
                order={order}
                onEdit={handleEdit}
                onDelete={handleDeleteOrder}
              />
            ))
          )}
        </div>
      </div>

      <div className="order-list-footer">
        <span className="order-count">
          {filteredOrders.length} de {orders.length} órdenes
        </span>
        {loading && <span className="loading-indicator">Actualizando...</span>}
      </div>
    </div>
  );
}