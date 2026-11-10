import { Order } from '../entities/order.entity';

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order | null>;
    update(id: string, order: Partial<Order>): Promise<Order>;
    delete(id: string): Promise<void>;
}