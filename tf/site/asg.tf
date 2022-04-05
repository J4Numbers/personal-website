resource "aws_launch_configuration" "website_asg_lc" {
  name                 = "${var.application_name}-asg-lc"
  image_id             = data.aws_ami.base_ami.id
  iam_instance_profile = aws_iam_instance_profile.website_ecs_instance_profile.name
  security_groups      = [aws_security_group.personal_website_sg.id]
  user_data            = data.template_file.user_data.rendered
  instance_type        = "t2.micro"
  key_name             = "ssh-key-aws-override"
}

resource "aws_autoscaling_group" "website_asg" {
  name                 = "${var.application_name}-asg"
  vpc_zone_identifier  = data.aws_subnets.root_vpc_subnets.ids
  launch_configuration = aws_launch_configuration.website_asg_lc.name

  desired_capacity = 1
  max_size         = 1
  min_size         = 1

  health_check_grace_period = 300
  health_check_type         = "EC2"
}
