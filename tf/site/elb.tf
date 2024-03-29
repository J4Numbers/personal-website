resource "aws_acm_certificate" "central_lb_cert" {
  domain_name       = var.dns_hosted_zones[local.dev-env]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb" "central_load_balancer" {
  name               = "${local.dev-env}-${var.application_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.personal_website_sg.id]
  subnets            = data.aws_subnets.root_vpc_subnets.ids

  enable_deletion_protection = false
  enable_http2               = true
}

resource "aws_lb_target_group" "central_lb_targets" {
  name                 = "${local.dev-env}-${var.application_name}"
  port                 = var.application_port
  protocol             = "TCP"
  vpc_id               = data.aws_vpc.root_vpc.id
  deregistration_delay = 60

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 10
    port                = var.application_port
    protocol            = "TCP"
  }
}

resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.central_load_balancer.arn
  port              = 8080
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.central_lb_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.central_lb_targets.arn
  }
}
