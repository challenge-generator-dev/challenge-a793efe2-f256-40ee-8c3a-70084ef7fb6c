resource "aws_dynamodb_table" "orders" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.partition_key
  range_key      = var.sort_key
  stream_enabled = var.enable_streams
  stream_view_type = var.enable_streams ? "NEW_AND_OLD_IMAGES" : null

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = try(global_secondary_index.value.range_key, null)
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = try(global_secondary_index.value.read_capacity, null)
      write_capacity  = try(global_secondary_index.value.write_capacity, null)
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.local_secondary_indexes
    content {
      name       = local_secondary_index.value.name
      range_key  = local_secondary_index.value.range_key
      projection_type = "ALL"
    }
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  ttl {
    enabled        = var.enable_ttl
    attribute_name = var.ttl_attribute
  }

  tags = merge(
    var.common_tags,
    map(
      "Name",
      var.table_name,
      "Environment",
      var.environment,
      "ManagedBy",
      "terraform",
      "Project",
      var.project_name
    )
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_dynamodb_table_replica" "replicas" {
  for_each = var.replica_regions

  provider           = aws.region
  table_name         = aws_dynamodb_table.orders.name
  kms_key_arn        = each.value.kms_key_arn
  region             = each.value.region
  point_in_time_recovery = each.value.point_in_time_recovery
}

resource "aws_iam_policy" "dynamodb_read_policy" {
  count = var.create_read_policy ? 1 : 0

  name        = "${var.table_name}-read-policy"
  description = "Política de lectura para la tabla DynamoDB ${var.table_name}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:BatchGetItem"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-read-policy",
      "Environment",
      var.environment
    )
  )
}

resource "aws_iam_policy" "dynamodb_write_policy" {
  count = var.create_write_policy ? 1 : 0

  name        = "${var.table_name}-write-policy"
  description = "Política de escritura para la tabla DynamoDB ${var.table_name}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:BatchWriteItem"
        ]
        Resource = aws_dynamodb_table.orders.arn
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-write-policy",
      "Environment",
      var.environment
    )
  )
}

resource "aws_iam_policy" "dynamodb_full_access_policy" {
  count = var.create_full_access_policy ? 1 : 0

  name        = "${var.table_name}-full-access-policy"
  description = "Política de acceso completo para la tabla DynamoDB ${var.table_name}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:*"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-full-access-policy",
      "Environment",
      var.environment
    )
  )
}

resource "aws_cloudwatch_metric_alarm" "read_capacity_alarm" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-read-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedReadCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.read_capacity_alarm_threshold
  alarm_description   = "Alarma de capacidad de lectura para ${var.table_name}"
  dimensions = {
    TableName = aws_dynamodb_table.orders.name
  }
  alarm_actions = var.alarm_actions
  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-read-capacity-alarm",
      "Environment",
      var.environment
    )
  )
}

resource "aws_cloudwatch_metric_alarm" "write_capacity_alarm" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-write-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedWriteCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.write_capacity_alarm_threshold
  alarm_description   = "Alarma de capacidad de escritura para ${var.table_name}"
  dimensions = {
    TableName = aws_dynamodb_table.orders.name
  }
  alarm_actions = var.alarm_actions
  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-write-capacity-alarm",
      "Environment",
      var.environment
    )
  )
}