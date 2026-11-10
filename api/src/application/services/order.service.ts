import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderResponseDto } from '../dtos/create-order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    this.logger.log(`Creating order for customer: ${createOrderDto.customerId}`);
    
    createOrderDto.validate();

    const order = new Order(
      createOrderDto.customerId,
      createOrderDto.items.map(
        (item) => new OrderItem(item.productId, item.productName, item.price, item.quantity)
      ),
      createOrderDto.status
    );

    const createdOrder = await this.orderRepository.create(order);
    this.logger.log(`Order created with id: ${createdOrder.id}`);
    
    return new OrderResponseDto(createdOrder);
  }

  async getOrders(): Promise<OrderResponseDto[]> {
    this.logger.log('Fetching all orders');
    
    const orders = await this.orderRepository.findAll();
    this.logger.log(`Found ${orders.length} orders`);
    
    return orders.map((order) => new OrderResponseDto(order));
  }

  async getOrderById(id: string): Promise<OrderResponseDto> {
    this.logger.log(`Fetching order with id: ${id}`);
    
    if (!id) {
      throw new BadRequestException('El ID de la orden es requerido');
    }

    const order = await this.orderRepository.findById(id);
    
    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    return new OrderResponseDto(order);
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderResponseDto> {
    this.logger.log(`Updating order with id: ${id}`);
    
    if (!id) {
      throw new BadRequestException('El ID de la orden es requerido');
    }

    updateOrderDto.validate();

    const existingOrder = await this.orderRepository.findById(id);
    
    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    const updateData: Partial<Order> = {};
    
    if (updateOrderDto.customerId) {
      updateData.customerId = updateOrderDto.customerId;
    }
    
    if (updateOrderDto.items) {
      updateData.items = updateOrderDto.items.map(
        (item) => new OrderItem(item.productId, item.productName, item.price, item.quantity)
      );
    }
    
    if (updateOrderDto.status) {
      updateData.status = updateOrderDto.status as any;
    }

    const updatedOrder = await this.orderRepository.update(id, updateData);
    this.logger.log(`Order ${id} updated successfully`);
    
    return new OrderResponseDto(updatedOrder);
  }

  async deleteOrder(id: string): Promise<void> {
    this.logger.log(`Deleting order with id: ${id}`);
    
    if (!id) {
      throw new BadRequestException('El ID de la orden es requerido');
    }

    const existingOrder = await this.orderRepository.findById(id);
    
    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    await this.orderRepository.delete(id);
    this.logger.log(`Order ${id} deleted successfully`);
  }
}