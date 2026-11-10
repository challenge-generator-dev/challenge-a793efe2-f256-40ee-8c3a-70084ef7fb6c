import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OrderItem } from '../../domain/entities/order.entity';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository, OnModuleInit {
  private readonly logger = new Logger(OrderRepositoryImpl.name);
  private docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(
    private readonly dynamoDBClient: DynamoDBClient,
  ) {
    this.tableName = process.env.DYNAMODB_TABLE_NAME || 'orders';
    this.logger.log(`Inicializando repositorio de órdenes con tabla: ${this.tableName}`);
  }

  onModuleInit(): void {
    this.docClient = DynamoDBDocumentClient.from(this.dynamoDBClient, {
      marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    });
    this.logger.debug('DocumentClient de DynamoDB inicializado correctamente');
  }

  private toDbItem(order: Order): Record<string, unknown> {
    return {
      id: order.id,
      customerId: order.customerId,
      status: order.status,
      items: order.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: order.totalAmount,
      createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : order.createdAt,
      updatedAt: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : order.updatedAt,
    };
  }

  private toOrder(item: Record<string, unknown>): Order | null {
    if (!item) return null;

    const items = Array.isArray(item.items) 
      ? item.items.map((i: Record<string, unknown>) => new OrderItem(
          i.productId as string,
          i.productName as string,
          Number(i.price),
          Number(i.quantity),
        ))
      : [];

    const order = new Order(
      item.id as string,
      item.customerId as string,
      items,
      item.status as OrderStatus,
    );

    if (item.createdAt) {
      order['createdAt'] = new Date(item.createdAt as string);
    }
    if (item.updatedAt) {
      order['updatedAt'] = new Date(item.updatedAt as string);
    }

    return order;
  }

  async create(order: Order): Promise<Order> {
    try {
      const command = new PutCommand({
        TableName: this.tableName,
        Item: this.toDbItem(order),
        ConditionExpression: 'attribute_not_exists(id)',
      });

      await this.docClient.send(command);
      this.logger.log(`Orden ${order.id} creada exitosamente en DynamoDB`);
      return order;
    } catch (error) {
      this.logger.error(`Error al crear orden ${order.id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const command = new ScanCommand({
        TableName: this.tableName,
      });

      const result = await this.docClient.send(command);
      const items = result.Items || [];
      this.logger.debug(`Recuperadas ${items.length} órdenes de DynamoDB`);
      return items.map(item => this.toOrder(item as Record<string, unknown>)).filter((o): o is Order => o !== null);
    } catch (error) {
      this.logger.error(`Error al recuperar todas las órdenes: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async findById(id: string): Promise<Order | null> {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: { id },
      });

      const result = await this.docClient.send(command);
      const order = this.toOrder(result.Item as Record<string, unknown>);
      
      if (!order) {
        this.logger.warn(`Orden con ID ${id} no encontrada en DynamoDB`);
      } else {
        this.logger.debug(`Orden ${id} recuperada exitosamente`);
      }
      
      return order;
    } catch (error) {
      this.logger.error(`Error al recuperar orden ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order> {
    try {
      const updateExpressions: string[] = [];
      const expressionAttributeValues: Record<string, unknown> = {};

      if (orderData.customerId !== undefined) {
        updateExpressions.push('customerId = :customerId');
        expressionAttributeValues[':customerId'] = orderData.customerId;
      }

      if (orderData.status !== undefined) {
        updateExpressions.push('#status = :status');
        expressionAttributeValues[':status'] = orderData.status;
      }

      if (orderData.items !== undefined) {
        updateExpressions.push('#items = :items');
        expressionAttributeValues[':items'] = orderData.items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        }));
      }

      updateExpressions.push('#updatedAt = :updatedAt');
      expressionAttributeValues[':updatedAt'] = new Date().toISOString();

      const command = new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: orderData.status !== undefined ? { '#status': 'status', '#items': 'items', '#updatedAt': 'updatedAt' } : { '#items': 'items', '#updatedAt': 'updatedAt' },
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      });

      const result = await this.docClient.send(command);
      const updatedOrder = this.toOrder(result.Attributes as Record<string, unknown>);
      
      if (!updatedOrder) {
        throw new Error('No se pudo recuperar la orden actualizada');
      }

      this.logger.log(`Orden ${id} actualizada exitosamente en DynamoDB`);
      return updatedOrder;
    } catch (error) {
      this.logger.error(`Error al actualizar orden ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const command = new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      });

      await this.docClient.send(command);
      this.logger.log(`Orden ${id} eliminada exitosamente de DynamoDB`);
    } catch (error) {
      this.logger.error(`Error al eliminar orden ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }
}