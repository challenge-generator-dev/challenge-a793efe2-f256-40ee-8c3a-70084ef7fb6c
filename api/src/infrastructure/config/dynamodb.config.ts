import { Module, Global, Logger } from '@nestjs/common';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { OrderRepositoryImpl } from '../repositories/order.repository.impl';

export interface DynamoDBConfig {
  client: DynamoDBClient;
  tableName: string;
}

export type DynamoDbConfig = DynamoDBConfig;

@Global()
@Module({
  providers: [
    {
      provide: 'DYNAMODB_CLIENT',
      useFactory: (): DynamoDBClient => {
        const logger = new Logger('DynamoDBConfig');
        
        const config: DynamoDBClientConfig = {
          region: process.env.AWS_REGION || 'us-east-1',
        };

        const endpoint = process.env.DYNAMODB_ENDPOINT;
        if (endpoint) {
          logger.log(`Conectando a DynamoDB local en endpoint: ${endpoint}`);
          config.endpoint = endpoint;
          config.credentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
          };
        } else {
          logger.log(`Conectando a DynamoDB en región: ${config.region}`);
          
          if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
            config.credentials = {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            };
            
            if (process.env.AWS_SESSION_TOKEN) {
              config.credentials.sessionToken = process.env.AWS_SESSION_TOKEN;
            }
          }
        }

        const client = new DynamoDBClient(config);
        logger.debug('Cliente de DynamoDB configurado correctamente');
        
        return client;
      },
    },
    {
      provide: 'DYNAMODB_TABLE_NAME',
      useValue: process.env.DYNAMODB_TABLE_NAME || 'orders',
    },
    OrderRepositoryImpl,
  ],
  exports: [
    'DYNAMODB_CLIENT',
    'DYNAMODB_TABLE_NAME',
    OrderRepositoryImpl,
  ],
})
export class DynamoDbConfigModule {}