import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../src/application/services/order.service';
import { OrderRepository } from '../src/domain/repositories/order.repository';
import { Order, OrderStatus } from '../src/domain/entities/order.entity';
import { OrderResponseDto } from '../src/application/dtos/create-order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let repository: OrderRepository;

  const mockOrder: Order = new Order(
    'cust-123',
    [
      { productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 },
    ],
    OrderStatus.PENDING,
  );
  mockOrder.id = 'order-123';

  const mockOrderRepository = {
    create: jest.fn().mockResolvedValue(mockOrder),
    findAll: jest.fn().mockResolvedValue([mockOrder]),
    findById: jest.fn().mockResolvedValue(mockOrder),
    update: jest.fn().mockResolvedValue({ ...mockOrder, status: OrderStatus.COMPLETED }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<OrderRepository>(OrderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('debería crear una orden exitosamente', async () => {
      const createOrderDto = {
        customerId: 'cust-123',
        items: [
          { productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 },
        ],
      };

      const result = await service.createOrder(createOrderDto);

      expect(repository.create).toHaveBeenCalled();
      expect(result).toBeInstanceOf(OrderResponseDto);
      expect(result.customerId).toBe('cust-123');
    });

    it('debería lanzar error si la creación falla', async () => {
      mockOrderRepository.create.mockRejectedValueOnce(new Error('Database error'));

      const createOrderDto = {
        customerId: 'cust-123',
        items: [{ productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 }],
      };

      await expect(service.createOrder(createOrderDto)).rejects.toThrow('Database error');
    });
  });

  describe('getOrders', () => {
    it('debería retornar todas las órdenes', async () => {
      const result = await service.getOrders();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(OrderResponseDto);
    });

    it('debería retornar array vacío si no hay órdenes', async () => {
      mockOrderRepository.findAll.mockResolvedValueOnce([]);

      const result = await service.getOrders();

      expect(result).toHaveLength(0);
    });
  });

  describe('getOrderById', () => {
    it('debería retornar una orden por ID', async () => {
      const result = await service.getOrderById('order-123');

      expect(repository.findById).toHaveBeenCalledWith('order-123');
      expect(result).toBeInstanceOf(OrderResponseDto);
      expect(result.id).toBe('order-123');
    });

    it('debería lanzar NotFoundException si la orden no existe', async () => {
      mockOrderRepository.findById.mockResolvedValueOnce(null);

      await expect(service.getOrderById('non-existent')).rejects.toThrow();
    });
  });

  describe('updateOrder', () => {
    it('debería actualizar una orden exitosamente', async () => {
      const updateOrderDto = { status: OrderStatus.COMPLETED };

      const result = await service.updateOrder('order-123', updateOrderDto);

      expect(repository.update).toHaveBeenCalledWith('order-123', updateOrderDto);
      expect(result).toBeInstanceOf(OrderResponseDto);
    });

    it('debería lanzar error si la actualización falla', async () => {
      mockOrderRepository.update.mockRejectedValueOnce(new Error('Update failed'));

      await expect(
        service.updateOrder('order-123', { status: OrderStatus.COMPLETED }),
      ).rejects.toThrow('Update failed');
    });
  });

  describe('deleteOrder', () => {
    it('debería eliminar una orden exitosamente', async () => {
      await service.deleteOrder('order-123');

      expect(repository.delete).toHaveBeenCalledWith('order-123');
    });

    it('debería lanzar error si la eliminación falla', async () => {
      mockOrderRepository.delete.mockRejectedValueOnce(new Error('Delete failed'));

      await expect(service.deleteOrder('order-123')).rejects.toThrow('Delete failed');
    });
  });
});