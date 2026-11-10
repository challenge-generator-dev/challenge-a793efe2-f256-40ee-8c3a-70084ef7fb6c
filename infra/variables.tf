variable "aws_region" {
  description = "Región principal de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "secondary_region" {
  description = "Región secundaria de AWS para recursos de respaldo o multi-región"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser uno de: dev, staging, prod."
  }
}

variable "project_name" {
  description = "Nombre del proyecto, utilizado para etiquetar recursos"
  type        = string
  default     = "order-management"
}

variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"

  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.dynamodb_billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura provisionada para la tabla DynamoDB (solo aplicable si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura provisionada para la tabla DynamoDB (solo aplicable si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
  default     = "order_id"
}

variable "dynamodb_range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB"
  type        = string
  default     = "created_at"
}

variable "dynamodb_gsi" {
  description = "Lista de índices globales secundarios para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    read_capacity   = optional(number)
    write_capacity  = optional(number)
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
    }
  ]
}

variable "tags" {
  description = "Etiquetas adicionales para los recursos AWS"
  type        = map(string)
  default     = {}
}