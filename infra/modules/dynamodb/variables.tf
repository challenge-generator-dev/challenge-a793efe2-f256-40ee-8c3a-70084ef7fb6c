variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB"
  type        = string
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla"
  type        = string
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla"
  type        = string
  default     = null
}

variable "gsi" {
  description = "Lista de índices globales secundarios"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    read_capacity   = optional(number)
    write_capacity  = optional(number)
    projection_type = string
    non_key_attributes = optional(list(string))
  }))
  default = []
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetado"
  type        = string
}

variable "enable_stream" {
  description = "Habilitar stream en la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null

  validation {
    condition     = var.stream_view_type == null ? true : contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de vista del stream debe ser uno de: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES."
  }
}

variable "ttl_attribute" {
  description = "Nombre del atributo para TTL"
  type        = string
  default     = null
}

variable "tags" {
  description = "Etiquetas adicionales para la tabla"
  type        = map(string)
  default     = {}
}

# Validaciones adicionales para asegurar consistencia
locals {
  required_vars = {
    table_name   = var.table_name != "" ? true : false
    billing_mode = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    hash_key     = var.hash_key != "" ? true : false
  }

  validation_errors = [
    for var_name, is_valid in local.required_vars : "La variable '${var_name}' es inválida o no está definida."
    if !is_valid
  ]

  error_message = length(local.validation_errors) > 0 ? join("\n", local.validation_errors) : null
}