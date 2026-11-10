import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../../domain/entities/order.entity';

class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty({ message: 'Customer ID is required' })
    customerId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];

    @IsEnum(OrderStatus)
    status?: OrderStatus;

    constructor(customerId: string, items: CreateOrderItemDto[], status?: OrderStatus) {
        this.customerId = customerId;
        this.items = items;
        this.status = status || OrderStatus.PENDING;
    }

    validate(): void {
        if (!this.customerId || this.customerId.trim() === '') {
            throw new Error('Customer ID is required');
        }
        if (!this.items || this.items.length === 0) {
            throw new Error('Order must have at least one item');
        }
        const totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        if (totalAmount <= 0) {
            throw new Error('Total amount must be greater than zero');
        }
    }
}

export class OrderResponseDto {
    id: string;
    customerId: string;
    items: OrderItemResponseDto[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    totalAmount: number;

    constructor(order: Order) {
        this.id = order.id;
        this.customerId = order.customerId;
        this.items = order.items.map(item => new OrderItemResponseDto(item));
        this.status = order.status;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
        this.totalAmount = order.totalAmount;
    }
}

class OrderItemResponseDto {
    productId: string;
    productName: string;
    price: number;
    quantity: number;

    constructor(item: OrderItem) {
        this.productId = item.productId;
        this.productName = item.productName;
        this.price = item.price;
        this.quantity = item.quantity;
    }
}

// Helper class to maintain consistency with domain
class OrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;

    constructor(productId: string, productName: string, price: number, quantity: number) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }
}