// Definición de salidas de la configuración de infraestructura
// Expose los valores y ARNs necesarios para otros componentes

output "aws_region" {
  description = "Región de AWS configurada"
  value       = data.aws_region.current.name
}

output "account_id" {
  description = "ID de la cuenta de AWS"
  value       = data.aws_caller_identity.current.account_id
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla de DynamoDB de órdenes"
  value       = module.orders_dynamodb.table_name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla de DynamoDB de órdenes"
  value       = module.orders_dynamodb.table_arn
}

output "dynamodb_table_id" {
  description = "ID de la tabla de DynamoDB de órdenes"
  value       = module.orders_dynamodb.table_id
}

output "dynamodb_stream_arn" {
  description = "ARN del stream de DynamoDB (si está habilitado)"
  value       = module.orders_dynamodb.stream_arn
  sensitive   = false
}

output "dynamodb_endpoint" {
  description = "Endpoint de DynamoDB para la tabla de órdenes"
  value       = "https://dynamodb.${data.aws_region.current.name}.amazonaws.com"
}

output "app_storage_bucket_name" {
  description = "Nombre del bucket de S3 para almacenamiento de la app"
  value       = aws_s3_bucket.app_storage.id
}

output "app_storage_bucket_arn" {
  description = "ARN del bucket de S3 para almacenamiento de la app"
  value       = aws_s3_bucket.app_storage.arn
}

output "logs_bucket_name" {
  description = "Nombre del bucket de S3 para logs"
  value       = aws_s3_bucket.logs.id
}

output "logs_bucket_arn" {
  description = "ARN del bucket de S3 para logs"
  value       = aws_s3_bucket.logs.arn
}

output "app_security_group_id" {
  description = "ID del grupo de seguridad de la aplicación"
  value       = aws_security_group.app_sg.id
}

output "app_security_group_arn" {
  description = "ARN del grupo de seguridad de la aplicación"
  value       = aws_security_group.app_sg.arn
}

output "app_role_arn" {
  description = "ARN del rol IAM de la aplicación"
  value       = aws_iam_role.app_role.arn
}

output "app_role_name" {
  description = "Nombre del rol IAM de la aplicación"
  value       = aws_iam_role.app_role.name
}

output "dynamodb_policy_arn" {
  description = "ARN de la política de acceso a DynamoDB"
  value       = aws_iam_policy.dynamodb_access.arn
}

output "s3_policy_arn" {
  description = "ARN de la política de acceso a S3"
  value       = aws_iam_policy.s3_access.arn
}

output "vpc_id" {
  description = "ID de la VPC configurada"
  value       = var.vpc_id
}

output "environment" {
  description = "Entorno de despliegue"
  value       = var.environment
}

output "project_name" {
  description = "Nombre del proyecto"
  value       = var.project_name
}