resource "aws_cloudwatch_log_group" "ecs_website_log_group" {
  name              = "/ecs/${var.application_name}/logs"
  retention_in_days = 5
}
