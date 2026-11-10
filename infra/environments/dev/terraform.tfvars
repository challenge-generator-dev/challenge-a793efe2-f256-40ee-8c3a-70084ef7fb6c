# Variables de configuración para el entorno de desarrollo
# Estas variables personalizan la infraestructura para el entorno dev

# Configuración regional y de entorno
aws_region     = "us-east-1"
environment    = "dev"

# Configuración de la tabla DynamoDB
table_name               = "orders-dev"
billing_mode             = "PAY_PER_REQUEST"
read_capacity            = 5
write_capacity           = 5
enable_deletion_protection = false

# Configuración de redundancia y disponibilidad
enable_point_in_time_recovery = false

# Configuración de índices secundarios
gsi_partition_key = "customerId"
gsi_sort_key      = "orderDate"

# Configuración de TTL para limpieza automática
enable_ttl         = true
ttl_attribute_name = "expirationTime"
ttl_days           = 90

# Etiquetado de recursos
tags = {
  Environment = "dev"
  ManagedBy   = "terraform"
  Project     = "orders-management"
  CostCenter  = "engineering"
  Owner       = "platform-team"
}