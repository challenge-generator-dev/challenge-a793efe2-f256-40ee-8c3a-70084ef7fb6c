import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

export interface AwsConfig {
  region: string;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  endpoint?: string;
  maxAttempts?: number;
}

export type AWSConfig = AwsConfig;

export function getAwsConfig(): AwsConfig {
  const config: AwsConfig = {
    region: process.env.AWS_REGION || 'us-east-1',
    maxAttempts: parseInt(process.env.AWS_MAX_ATTEMPTS || '3', 10),
  };

  if (process.env.AWS_ENDPOINT) {
    config.endpoint = process.env.AWS_ENDPOINT;
  }

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }

  return config;
}

export function toDynamoDBClientConfig(config: AwsConfig): DynamoDBClientConfig {
  const clientConfig: DynamoDBClientConfig = {
    region: config.region,
    maxAttempts: config.maxAttempts,
  };

  if (config.endpoint) {
    clientConfig.endpoint = config.endpoint;
  }

  if (config.credentials) {
    clientConfig.credentials = config.credentials;
  }

  return clientConfig;
}

export function getDynamoDBTableName(): string {
  const tableName = process.env.DYNAMODB_TABLE_NAME;
  if (!tableName) {
    throw new Error('DYNAMODB_TABLE_NAME environment variable is not set');
  }
  return tableName;
}

export function isLocalEnvironment(): boolean {
  return !!process.env.AWS_ENDPOINT || process.env.NODE_ENV === 'development';
}