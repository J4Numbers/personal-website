resource "aws_ecs_cluster" "personal_website_cluster" {
  name = "${local.dev-env}-${var.application_name}"
}

resource "aws_ecs_task_definition" "personal_website_task" {
  family = "${var.application_name}-definition"

  container_definitions = jsonencode([
    {
      name: "${var.application_name}-service",
      image: "${data.aws_ecr_repository.website_registry.repository_url}:${var.deploy_version}",
      environment: [],
      secrets: [],
      logConfiguration: {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${var.application_name}/logs",
          "awslogs-region": "eu-west-2",
          "awslogs-stream-prefix": "ecs"
        }
      },
      cpu : 10,
      memory : 512,
      essential : true,
      portMappings : [
        {
          "containerPort": 8080,
          "hostPort": 8080
        }
      ]
    }
  ])

  network_mode             = "host"
  requires_compatibilities = ["EC2"]
  execution_role_arn       = aws_iam_role.website_ecs_task_executor.arn
}

resource "aws_ecs_service" "personal_website_image" {
  name                 = "${var.application_name}-service"
  cluster              = aws_ecs_cluster.personal_website_cluster.arn
  task_definition      = aws_ecs_task_definition.personal_website_task.family
  force_new_deployment = true

  desired_count = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.central_lb_targets.arn
    container_name   = var.application_name
    container_port   = var.application_port
  }
}
