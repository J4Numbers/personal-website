resource "aws_iam_role" "website_ecs_task_executor" {
  name        = "${var.application_name}-ecs-executor"
  description = "A startup executor for ECS containers"

  assume_role_policy = data.aws_iam_policy_document.base_ecs_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_executor_default" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  role       = aws_iam_role.website_ecs_task_executor.name
}

resource "aws_iam_role_policy_attachment" "ssm_read_only_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
  role       = aws_iam_role.website_ecs_task_executor.name
}

resource "aws_iam_role" "website_base_ec2_asg" {
  name        = "${var.application_name}-base-ecs-agent"
  description = "IAM role for ECS ASG"

  assume_role_policy = data.aws_iam_policy_document.base_ec2_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_agent" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
  role       = aws_iam_role.website_base_ec2_asg.name
}

resource "aws_iam_instance_profile" "website_ecs_instance_profile" {
  name = "${var.application_name}-ecs-instance-profile"
  role = aws_iam_role.website_base_ec2_asg.name
}
