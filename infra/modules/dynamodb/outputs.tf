output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.name
}

output "table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.arn
}

output "table_id" {
  description = "ID único de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.id
}

output "table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB (si está habilitado)"
  value       = try(aws_dynamodb_table.orders.stream_arn, null)
}

output "table_stream_label" {
  description = "Etiqueta del stream de la tabla DynamoDB"
  value       = try(aws_dynamodb_table.orders.stream_label, null)
}

output "table_size_bytes" {
  description = "Tamaño de la tabla en bytes"
  value       = aws_dynamodb_table.orders.size_bytes
}

output "table_item_count" {
  description = "Número de elementos en la tabla"
  value       = aws_dynamodb_table.orders.item_count
}

output "table_status" {
  description = "Estado actual de la tabla (ACTIVE, CREATING, DELETING, UPDATING)"
  value       = aws_dynamodb_table.orders.status
}

output "read_policy_arn" {
  description = "ARN de la política de lectura (si se creó)"
  value       = try(aws_iam_policy.dynamodb_read_policy[0].arn, null)
}

output "write_policy_arn" {
  description = "ARN de la política de escritura (si se creó)"
  value       = try(aws_iam_policy.dynamodb_write_policy[0].arn, null)
}

output "full_access_policy_arn" {
  description = "ARN de la política de acceso completo (si se creó)"
  value       = try(aws_iam_policy.dynamodb_full_access_policy[0].arn, null)
}

output "replica_tables" {
  description = "Mapa de tablas réplica y sus ARNs"
  value       = { for k, v in aws_dynamodb_table_replica.replicas : k => v.arn }
}

output "read_capacity_alarm_arn" {
  description = "ARN de la alarma de capacidad de lectura"
  value       = try(aws_cloudwatch_metric_alarm.read_capacity_alarm[0].arn, null)
}

output "write_capacity_alarm_arn" {
  description = "ARN de la alarma de capacidad de escritura"
  value       = try(aws_cloudwatch_metric_alarm.write_capacity_alarm[0].arn, null)
}

output "global_secondary_indexes" {
  description = "Lista de índices secundarios globales"
  value = [
    for gsi in aws_dynamodb_table.orders.global_secondary_index : {
      name = gsi.name
      status = gsi.status
      arn = "${aws_dynamodb_table.orders.arn}/index/${gsi.name}"
    }
  ]
}

output "local_secondary_indexes" {
  description = "Lista de índices secundarios locales"
  value = [
    for lsi in aws_dynamodb_table.orders.local_secondary_index : {
      name = lsi.name
      arn = "${aws_dynamodb_table.orders.arn}/index/${lsi.name}"
    }
  ]
}

output "kms_key_arn" {
  description = "ARN de la clave KMS utilizada para el cifrado del lado del servidor"
  value       = var.kms_key_arn
}