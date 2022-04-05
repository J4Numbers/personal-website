provider "aws" {
  region = "eu-west-2"

  default_tags {
    tags = {
      Name        = var.application_name
      Application = var.application_name
      Environment = local.dev-env
    }
  }
}

terraform {
  required_version = "1.1.0"

  backend "s3" {
    key     = "personal-website.tfstate"
    region  = "eu-west-2"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.0.0"
    }
  }
}
