# Configuración específica para el entorno de desarrollo
# Este archivo define los recursos de infraestructura para el entorno dev

# Configuración del provider de AWS
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = "orders-management"
    }
  }

  # Configuración de retries para operaciones que pueden fallar temporalmente
  max_retries = 3
}

# Módulo de DynamoDB para el entorno de desarrollo
# Se reutiliza el módulo definido en modules/dynamodb
module "dynamodb_orders" {
  source = "../../modules/dynamodb"

  # Nombre y configuración de la tabla
  table_name        = var.table_name
  billing_mode      = var.billing_mode
  read_capacity     = var.read_capacity
  write_capacity    = var.write_capacity

  # Configuración de protección	enable_deletion_protection = var.enable_deletion_protection
  enable_point_in_time_recovery = var.enable_point_in_time_recovery

  # Configuración de índices
gsi_partition_key = var.gsi_partition_key
  gsi_sort_key      = var.gsi_sort_key

  # Configuración de TTL
  enable_ttl         = var.enable_ttl
  ttl_attribute_name = var.ttl_attribute_name
  ttl_days           = var.ttl_days

  # Etiquetado
  tags = var.tags

  # Dependencias externas (opcional)
  depends_on = []
}

# Recurso adicional: Bucket de S3 para logs de la aplicación
resource "aws_s3_bucket" "app_logs" {
  bucket = "orders-${var.environment}-logs-${data.aws_caller_identity.current.account_id}"

  tags = merge(var.tags, {
    Purpose = "application-logs"
  })
}

# Configuración de lifecycle para el bucket de logs
resource "aws_s3_bucket_lifecycle_configuration" "app_logs_lifecycle" {
  bucket = aws_s3_bucket.app_logs.id

  rule {
    id     = "expire-old-logs"
    status = "Enabled"

    expiration {
      days = 30
    }
  }
}

# Obtener información de la cuenta actual
data "aws_caller_identity" "current" {}

# Output: Nombre de la tabla DynamoDB
output "dynamodb_table_name" {
  description = "Nombre de la tabla de órdenes en DynamoDB"
  value       = module.dynamodb_orders.table_name
}

# Output: ARN de la tabla DynamoDB
output "dynamodb_table_arn" {
  description = "ARN de la tabla de órdenes"
  value       = module.dynamodb_orders.table_arn
}

# Output: Endpoint de la tabla DynamoDB
output "dynamodb_table_endpoint" {
  description = "Endpoint de la tabla para conexión"
  value       = module.dynamodb_orders.table_endpoint
}

# Output: Bucket de logs
output "logs_bucket_name" {
  description = "Nombre del bucket de logs"
  value       = aws_s3_bucket.app_logs.id
}

# Output: Información de la cuenta
output "account_id" {
  description = "ID de la cuenta de AWS"
  value       = data.aws_caller_identity.current.account_id
}

output "account_region" {
  description = "Región de AWS configurada"
  value       = var.aws_region
}