import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { OrderController } from '../src/infrastructure/controllers/order.controller';
import { OrderService } from '../src/application/services/order.service';
import { Order, OrderStatus } from '../src/domain/entities/order.entity';
import { OrderResponseDto } from '../src/application/dtos/create-order.dto';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let service: OrderService;

  const mockOrder: Order = new Order(
    'cust-123',
    [{ productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 }],
    OrderStatus.PENDING,
  );
  mockOrder.id = 'order-123';

  const mockOrderService = {
    createOrder: jest.fn().mockResolvedValue(new OrderResponseDto(mockOrder)),
    getOrders: jest.fn().mockResolvedValue([new OrderResponseDto(mockOrder)]),
    getOrderById: jest.fn().mockResolvedValue(new OrderResponseDto(mockOrder)),
    updateOrder: jest.fn().mockResolvedValue(new OrderResponseDto(mockOrder)),
    deleteOrder: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    service = moduleFixture.get<OrderService>(OrderService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /orders', () => {
    it('debería crear una nueva orden', async () => {
      const createOrderDto = {
        customerId: 'cust-123',
        items: [{ productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 }],
      };

      const response = await request(app.getHttpServer())
        .post('/orders')
        .send(createOrderDto)
        .expect(201);

      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(response.body).toHaveProperty('id');
      expect(response.body.customerId).toBe('cust-123');
    });

    it('debería retornar 400 si el DTO es inválido', async () => {
      const invalidDto = { customerId: 'cust-123', items: [] };

      await request(app.getHttpServer()).post('/orders').send(invalidDto).expect(400);
    });
  });

  describe('GET /orders', () => {
    it('debería retornar todas las órdenes', async () => {
      const response = await request(app.getHttpServer()).get('/orders').expect(200);

      expect(mockOrderService.getOrders).toHaveBeenCalled();
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('id');
    });

    it('debería retornar array vacío si no hay órdenes', async () => {
      mockOrderService.getOrders.mockResolvedValueOnce([]);

      const response = await request(app.getHttpServer()).get('/orders').expect(200);

      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /orders/:id', () => {
    it('debería retornar una orden por ID', async () => {
      const response = await request(app.getHttpServer()).get('/orders/order-123').expect(200);

      expect(mockOrderService.getOrderById).toHaveBeenCalledWith('order-123');
      expect(response.body).toHaveProperty('id', 'order-123');
    });

    it('debería retornar 404 si la orden no existe', async () => {
      mockOrderService.getOrderById.mockRejectedValueOnce(new Error('Order not found'));

      await request(app.getHttpServer()).get('/orders/non-existent').expect(404);
    });
  });

  describe('PUT /orders/:id', () => {
    it('debería actualizar una orden', async () => {
      const updateOrderDto = { status: OrderStatus.COMPLETED };

      const response = await request(app.getHttpServer())
        .put('/orders/order-123')
        .send(updateOrderDto)
        .expect(200);

      expect(mockOrderService.updateOrder).toHaveBeenCalledWith('order-123', updateOrderDto);
      expect(response.body).toHaveProperty('id');
    });

    it('debería retornar 400 si el DTO es inválido', async () => {
      const invalidDto = { status: 'INVALID_STATUS' };

      await request(app.getHttpServer()).put('/orders/order-123').send(invalidDto).expect(400);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('debería eliminar una orden', async () => {
      await request(app.getHttpServer()).delete('/orders/order-123').expect(204);

      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-123');
    });

    it('debería retornar 404 si la orden no existe para eliminar', async () => {
      mockOrderService.deleteOrder.mockRejectedValueOnce(new Error('Order not found'));

      await request(app.getHttpServer()).delete('/orders/non-existent').expect(404);
    });
  });
});