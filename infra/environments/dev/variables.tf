variable "aws_region" {
  description = "Región de AWS para el entorno de desarrollo"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "order-management-dev"
}

variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "dev-orders"
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación para DynamoDB"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "dynamodb_gsi" {
  description = "Índices globales secundarios para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    projection_type = string
    non_key_attributes = optional(list(string))
  }))
  default = [
    {
      name            = "customer_id_index"
      hash_key        = "customer_id"
      range_key       = "order_date"
      projection_type = "INCLUDE"
      non_key_attributes = ["order_status", "total_amount"]
    },
    {
      name            = "order_status_index"
      hash_key        = "order_status"
      range_key       = "updated_at"
      projection_type = "KEYS_ONLY"
    }
  ]
}

variable "tags" {
  description = "Etiquetas para recursos en desarrollo"
  type        = map(string)
  default = {
    Environment = "dev"
    ManagedBy   = "Terraform"
    Owner       = "frontend-team"
  }
}

# Configuración específica para desarrollo
locals {
  dev_specific_vars = {
    enable_dynamodb_stream = true
    stream_view_type       = "NEW_AND_OLD_IMAGES"
    ttl_attribute          = "expiration_time"
  }

  # Validación de configuración específica de desarrollo
  is_pay_per_request = var.dynamodb_billing_mode == "PAY_PER_REQUEST"

  # Si el modo es PROVISIONED, asegurar capacidades mínimas
  read_capacity  = local.is_pay_per_request ? 0 : 5
  write_capacity = local.is_pay_per_request ? 0 : 5
}

# Outputs para ser usados en otros módulos o entornos
output "dynamodb_config" {
  description = "Configuración de DynamoDB para el entorno de desarrollo"
  value = {
    table_name      = var.dynamodb_table_name
    billing_mode    = var.dynamodb_billing_mode
    gsi             = var.dynamodb_gsi
    enable_stream   = local.dev_specific_vars.enable_dynamodb_stream
    stream_view_type = local.dev_specific_vars.stream_view_type
    ttl_attribute   = local.dev_specific_vars.ttl_attribute
    tags            = merge(var.tags, { Environment = var.environment })
  }
}