import { useState, useEffect, FormEvent } from 'react';
import { Order, CreateOrderDto, UpdateOrderDto } from '../types/order.types';
import ErrorMessage from '@/shared/components/ErrorMessage';
import '../styles/OrderForm.scss';

interface OrderFormProps {
  order?: Order | null;
  onSubmit: (data: CreateOrderDto | UpdateOrderDto) => Promise<void>;
  onCancel: () => void;
}

export function OrderForm({ order, onSubmit, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<CreateOrderDto>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    items: [],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(0);

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || '',
        customerEmail: order.customerEmail || '',
        customerPhone: order.customerPhone || '',
        items: order.items || [],
        notes: order.notes || '',
        status: order.status
      });
    }
  }, [order]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName?.trim()) {
      errors.customerName = 'El nombre del cliente es obligatorio';
    } else if (formData.customerName.length < 2) {
      errors.customerName = 'El nombre debe tener al menos 2 caracteres';
    }

    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      errors.customerEmail = 'El correo electrónico no es válido';
    }

    if (formData.customerPhone && !/^[+]?[0-9\s-]{9,15}$/.test(formData.customerPhone)) {
      errors.customerPhone = 'El teléfono no es válido';
    }

    if (!formData.items || formData.items.length === 0) {
      errors.items = 'Debe añadir al menos un artículo';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof CreateOrderDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    if (newItemQuantity <= 0) {
      setValidationErrors(prev => ({ ...prev, itemQuantity: 'La cantidad debe ser mayor a 0' }));
      return;
    }
    if (newItemPrice < 0) {
      setValidationErrors(prev => ({ ...prev, itemPrice: 'El precio no puede ser negativo' }));
      return;
    }

    const newItem = {
      name: newItemName.trim(),
      quantity: newItemQuantity,
      price: newItemPrice
    };

    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));

    setNewItemName('');
    setNewItemQuantity(1);
    setNewItemPrice(0);

    if (validationErrors.items) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.items;
        return newErrors;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items?.filter((_, i) => i !== index) || []
    }));
  };

  const calculateTotal = (): number => {
    if (!formData.items) return 0;
    return formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Error submitting form:', err);
      setValidationErrors(prev => ({ 
        ...prev, 
        submit: 'Error al guardar la orden. Inténtalo de nuevo.' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-form-overlay">
      <div className="order-form-container">
        <div className="form-header">
          <h2>{order ? 'Editar Orden' : 'Nueva Orden'}</h2>
          <button className="btn-close" onClick={onCancel} aria-label="Cerrar formulario">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h3>Información del Cliente</h3>
            
            <div className="form-group">
              <label htmlFor="customerName">Nombre del cliente *</label>
              <input
                id="customerName"
                type="text"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className={validationErrors.customerName ? 'input-error' : ''}
                placeholder="Nombre completo"
                disabled={isSubmitting}
              />
              {validationErrors.customerName && (
                <span className="error-text">{validationErrors.customerName}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerEmail">Correo electrónico</label>
                <input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  className={validationErrors.customerEmail ? 'input-error' : ''}
                  placeholder="correo@ejemplo.com"
                  disabled={isSubmitting}
                />
                {validationErrors.customerEmail && (
                  <span className="error-text">{validationErrors.customerEmail}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="customerPhone">Teléfono</label>
                <input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  className={validationErrors.customerPhone ? 'input-error' : ''}
                  placeholder="+34 600 000 000"
                  disabled={isSubmitting}
                />
                {validationErrors.customerPhone && (
                  <span className="error-text">{validationErrors.customerPhone}</span>
                )}
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Artículos</h3>
            
            <div className="add-item-form">
              <div className="form-row">
                <div className="form-group flex-2">
                  <label htmlFor="itemName">Artículo</label>
                  <input
                    id="itemName"
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Nombre del artículo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itemQuantity">Cantidad</label>
                  <input
                    id="itemQuantity"
                    type="number"
                    min="1"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
                    className={validationErrors.itemQuantity ? 'input-error' : ''}
                  />
                  {validationErrors.itemQuantity && (
                    <span className="error-text">{validationErrors.itemQuantity}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="itemPrice">Precio (€)</label>
                  <input
                    id="itemPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(parseFloat(e.target.value) || 0)}
                    className={validationErrors.itemPrice ? 'input-error' : ''}
                  />
                  {validationErrors.itemPrice && (
                    <span className="error-text">{validationErrors.itemPrice}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-add-item"
                  onClick={handleAddItem}
                >
                  +
                </button>
              </div>
            </div>

            {formData.items && formData.items.length > 0 && (
              <div className="items-list">
                <div className="items-table-header">
                  <span>Artículo</span>
                  <span>Cantidad</span>
                  <span>Precio</span>
                  <span>Subtotal</span>
                  <span></span>
                </div>
                {formData.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>{item.price.toFixed(2)} €</span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => handleRemoveItem(index)}
                      aria-label={`Eliminar ${item.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="items-total">
                  <span>Total:</span>
                  <span className="total-amount">{calculateTotal().toFixed(2)} €</span>
                </div>
              </div>
            )}

            {validationErrors.items && (
              <ErrorMessage message={validationErrors.items} />
            )}
          </section>

          <section className="form-section">
            <h3>Notas</h3>
            <div className="form-group">
              <label htmlFor="notes">Notas adicionales</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Instrucciones especiales, observaciones..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          </section>

          {validationErrors.submit && (
            <ErrorMessage message={validationErrors.submit} />
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-small"></span>
                  Guardando...
                </>
              ) : (
                order ? 'Actualizar Orden' : 'Crear Orden'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}