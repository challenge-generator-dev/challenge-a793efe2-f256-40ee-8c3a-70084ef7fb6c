import { v4 as uuidv4 } from 'uuid';

export class Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    totalAmount: number;

    constructor(
        customerId: string,
        items: OrderItem[],
        status: OrderStatus = OrderStatus.PENDING,
        id: string = uuidv4(),
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalAmount = this.calculateTotalAmount();
    }

    updateStatus(newStatus: OrderStatus): void {
        this.status = newStatus;
        this.updatedAt = new Date();
    }

    addItem(item: OrderItem): void {
        this.items.push(item);
        this.totalAmount = this.calculateTotalAmount();
        this.updatedAt = new Date();
    }

    removeItem(productId: string): void {
        this.items = this.items.filter(item => item.productId !== productId);
        this.totalAmount = this.calculateTotalAmount();
        this.updatedAt = new Date();
    }

    private calculateTotalAmount(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    validate(): void {
        if (!this.customerId || this.customerId.trim() === '') {
            throw new Error('Customer ID is required');
        }
        if (!this.items || this.items.length === 0) {
            throw new Error('Order must have at least one item');
        }
        if (this.totalAmount <= 0) {
            throw new Error('Total amount must be greater than zero');
        }
    }
}

export class OrderItem {
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

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}