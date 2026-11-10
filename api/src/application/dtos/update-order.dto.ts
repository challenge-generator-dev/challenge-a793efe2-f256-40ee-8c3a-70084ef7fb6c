import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderItemDto {
  @IsString()
  productId!: string;

  @IsString()
  productName!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  items?: UpdateOrderItemDto[];

  @IsOptional()
  @IsString()
  status?: string;

  validate(): void {
    if (!this.customerId && !this.items && !this.status) {
      throw new Error('Debe proporcionar al menos un campo para actualizar');
    }
    
    if (this.items && this.items.length === 0) {
      throw new Error('La orden debe tener al menos un ítem');
    }

    if (this.items) {
      for (const item of this.items) {
        if (!item.productId || !item.productName || item.price <= 0 || item.quantity <= 0) {
          throw new Error('Cada ítem debe tener productId, productName, price > 0 y quantity > 0');
        }
      }
    }
  }
}