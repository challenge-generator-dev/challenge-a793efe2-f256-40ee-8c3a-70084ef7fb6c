// Configuración principal de infraestructura AWS para el sistema de órdenes
// Este archivo define los recursos core necesarios para la aplicación

// Módulo de DynamoDB para almacenamiento de órdenes
module "orders_dynamodb" {
  source = "../modules/dynamodb"

  environment     = var.environment
  project_name    = var.project_name
  cost_center     = var.cost_center

  table_name      = "${var.project_name}-orders-${var.environment}"
  billing_mode    = var.dynamodb_billing_mode
  read_capacity   = var.dynamodb_read_capacity
  write_capacity  = var.dynamodb_write_capacity
  enable_stream   = var.dynamodb_enable_stream
  stream_view_type = "NEW_AND_OLD_IMAGES"

  // Configuración de atributos de la tabla
  hash_key  = "orderId"
  range_key = "customerId"

  // Índices secundarios globales para diferentes patrones de acceso
  global_secondary_indexes = var.dynamodb_gsi

  // Tags específicos para el recurso
  tags = merge(
    var.common_tags,
    {
      Description = "Tabla de órdenes del sistema de gestión"
      Tier        = "Production"
    }
  )
}

// Bucket de S3 para almacenamiento de artifacts y logs
resource "aws_s3_bucket" "app_storage" {
  bucket = "${var.project_name}-storage-${var.environment}-${data.aws_caller_identity.current.account_id}"

  tags = merge(
    var.common_tags,
    {
      Description = "Bucket de almacenamiento para la aplicación"
      Purpose     = "ApplicationStorage"
    }
  )
}

resource "aws_s3_bucket_versioning" "app_storage_versioning" {
  bucket = aws_s3_bucket.app_storage.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "app_storage_encryption" {
  bucket = aws_s3_bucket.app_storage.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

// Bucket para logs de la aplicación
resource "aws_s3_bucket" "logs" {
  bucket = "${var.project_name}-logs-${var.environment}-${data.aws_caller_identity.current.account_id}"

  lifecycle_rule {
    enabled = true

    expiration {
      days = var.log_retention_days
    }
  }

  tags = merge(
    var.common_tags,
    {
      Description = "Bucket para logs de la aplicación"
      Purpose     = "Logging"
    }
  )
}

// Grupo de seguridad para la aplicación
resource "aws_security_group" "app_sg" {
  name        = "${var.project_name}-sg-${var.environment}"
  description = "Grupo de seguridad para la aplicación de órdenes"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    description = "HTTPS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    description = "SSH from bastion"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.bastion_cidr]
  }

  egress {
    description = "Outbound to internet"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.common_tags,
    {
      Description = "Grupo de seguridad para la aplicación"
    }
  )
}

// Obtención de información de la cuenta actual
data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

// Política IAM para acceso a DynamoDB
resource "aws_iam_policy" "dynamodb_access" {
  name        = "${var.project_name}-dynamodb-access-${var.environment}"
  description = "Política de acceso a DynamoDB para el servicio de órdenes"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          module.orders_dynamodb.table_arn,
          "${module.orders_dynamodb.table_arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:GetItem",
          "dynamodb:ListTables"
        ]
        Resource = "*"
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Description = "Política de acceso a DynamoDB"
    }
  )
}

// Rol IAM para funciones lambda (si se usa)
resource "aws_iam_role" "app_role" {
  name = "${var.project_name}-app-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Description = "Rol IAM para la aplicación"
    }
  )
}

resource "aws_iam_role_policy_attachment" "app_role_dynamodb" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

resource "aws_iam_role_policy_attachment" "app_role_s3" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.s3_access.arn
}

// Política IAM para acceso a S3
resource "aws_iam_policy" "s3_access" {
  name        = "${var.project_name}-s3-access-${var.environment}"
  description = "Política de acceso a S3 para el servicio de órdenes"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.app_storage.arn,
          "${aws_s3_bucket.app_storage.arn}/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Description = "Política de acceso a S3"
    }
  )
}