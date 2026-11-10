import { Module, Logger } from '@nestjs/common';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { DynamoDbConfigModule } from './infrastructure/config/dynamodb.config';
import { getAwsConfig, toDynamoDBClientConfig } from './infrastructure/config/aws.config';
import { OrderRepository } from './domain/repositories/order.repository';
import { OrderService } from './application/services/order.service';

@Module({
  imports: [DynamoDbConfigModule],
  controllers: [OrderController],
  providers: [
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
    OrderService,
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    const awsConfig = getAwsConfig();
    const clientConfig = toDynamoDBClientConfig(awsConfig);
    const isLocal = awsConfig.endpoint !== undefined;
    
    this.logger.log(
      `AppModule initialized. Environment: ${isLocal ? 'local' : 'AWS'} | ` +
      `Region: ${awsConfig.region || 'us-east-1'} | ` +
      `Table: ${process.env.DYNAMODB_TABLE_NAME || 'orders'}`
    );
  }
}