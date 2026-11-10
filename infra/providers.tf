terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.46.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      Terraform   = "true"
    }
  }
}

# Configuración adicional para manejar perfiles de AWS si se proporcionan
variable "aws_profile" {
  description = "Perfil de AWS CLI a utilizar para la autenticación"
  type        = string
  default     = "default"
}

provider "aws" {
  alias   = "secondary"
  region  = var.secondary_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      Terraform   = "true"
    }
  }
}

# Validación de variables críticas para evitar errores de despliegue
locals {
  required_vars = {
    aws_region    = var.aws_region != "" ? true : false
    environment   = var.environment != "" ? true : false
    project_name  = var.project_name != "" ? true : false
  }

  validation_errors = [
    for var_name, is_set in local.required_vars : "La variable '${var_name}' es obligatoria y no puede estar vacía."
    if !is_set
  ]

  # Lanzar error si alguna variable crítica no está definida
  error_message = length(local.validation_errors) > 0 ? join("\n", local.validation_errors) : null
}

# Este bloque asegura que las validaciones se ejecuten al planificar/aplicar
resource "null_resource" "validate_variables" {
  triggers = {
    error_message = local.error_message
  }

  provisioner "local-exec" {
    command = "echo '${local.error_message}' && exit 1"
    when    = create
    on_failure = continue
  }
}