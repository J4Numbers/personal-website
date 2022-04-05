data "aws_iam_policy_document" "base_ec2_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["ec2.amazonaws.com"]
      type        = "Service"
    }
  }
}

data "aws_iam_policy_document" "base_ecs_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["ecs-tasks.amazonaws.com"]
      type        = "Service"
    }
  }
}

data "aws_ecr_repository" "website_registry" {
  name = "j4numbers/personal-website"
}

data "aws_ami" "base_ami" {
  owners = ["amazon"]

  most_recent = true

  filter {
    name   = "AMI name"
    values = ["amzn2-ami-ecs*"]
  }
}

data "template_file" "user_data" {
  template = file("${path.module}/assets/user_data.tmpl.bash")

  vars = {
    env              = local.dev-env
    application_name = var.application_name
  }
}

data "aws_vpc" "root_vpc" {
  count = 1

  filter {
    name   = "tag:Name"
    values = ["dev-vpc"]
  }
}

data "aws_subnet_ids" "root_vpc_subnets" {
  vpc_id = data.aws_vpc.root_vpc.id
}

data "aws_route53_zone" "hosted_zone" {
  name         = var.dns_hosted_zones[local.dev-env]
  private_zone = false
}

data "aws_subnet" "personal_website_subnet" {
  filter {
    name   = "tag:Name"
    values = [var.subnet[local.dev-env]]
  }
}
