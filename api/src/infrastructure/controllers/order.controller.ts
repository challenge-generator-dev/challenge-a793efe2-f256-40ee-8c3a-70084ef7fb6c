import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { OrderResponseDto } from '../../application/dtos/create-order.dto';
import { Order } from '../../domain/entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(OrderService)
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva orden', description: 'Crea una nueva orden en el sistema y la persiste en DynamoDB' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente', type: OrderResponseDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    try {
      const order = await this.orderService.createOrder(createOrderDto);
      return new OrderResponseDto(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al crear la orden',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes', description: 'Recupera todas las órdenes almacenadas en DynamoDB' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida exitosamente', type: [OrderResponseDto] })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getOrders(): Promise<OrderResponseDto[]> {
    try {
      const orders = await this.orderService.getOrders();
      return orders.map(order => new OrderResponseDto(order));
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al obtener las órdenes',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID', description: 'Recupera una orden específica usando su identificador único' })
  @ApiParam({ name: 'id', description: 'Identificador único de la orden', type: String })
  @ApiResponse({ status: 200, description: 'Orden encontrada', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getOrderById(@Param('id') id: string): Promise<OrderResponseDto> {
    try {
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }
      return new OrderResponseDto(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al obtener la orden',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una orden', description: 'Actualiza los datos de una orden existente en DynamoDB' })
  @ApiParam({ name: 'id', description: 'Identificador único de la orden', type: String })
  @ApiResponse({ status: 200, description: 'Orden actualizada exitosamente', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateOrderDto>,
  ): Promise<OrderResponseDto> {
    try {
      const order = await this.orderService.updateOrder(id, updateData);
      if (!order) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }
      return new OrderResponseDto(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al actualizar la orden',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una orden', description: 'Elimina una orden existente de DynamoDB' })
  @ApiParam({ name: 'id', description: 'Identificador único de la orden', type: String })
  @ApiResponse({ status: 204, description: 'Orden eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async deleteOrder(@Param('id') id: string): Promise<void> {
    try {
      const deleted = await this.orderService.deleteOrder(id);
      if (!deleted) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al eliminar la orden',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}