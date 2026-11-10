terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.46"
    }
  }

  backend "s3" {
    bucket = "terraform-state-bucket-${var.environment}"
    key    = "infra/terraform.tfstate"
    region = var.aws_region
  }
}

// Configuración del provider AWS con alias para múltiples regiones si es necesario
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = var.project_name
      CostCenter  = var.cost_center
    }
  }

  skip_credentials_validation = var.skip_credentials_validation
  skip_requesting_account_id  = var.skip_requesting_account_id
  skip_metadata_api_check     = var.skip_metadata_api_check
}

// Provider secundario para region alternativa (replicación)
provider "aws" {
  alias  = "secondary"
  region = var.secondary_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = var.project_name
      CostCenter  = var.cost_center
    }
  }
}