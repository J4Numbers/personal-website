resource "aws_security_group" "personal_website_sg" {
  name        = "${var.application_name}-${local.dev-env}-sg"
  description = "Security group settings for ${var.application_name}"
  vpc_id      = data.aws_vpc.root_vpc.id
}

resource "aws_security_group_rule" "standard_traffic" {
  type        = "ingress"
  from_port   = var.application_port
  to_port     = var.application_port
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = aws_security_group.personal_website_sg.id
}

resource "aws_security_group_rule" "outgoing_traffic" {
  type        = "egress"
  from_port   = 0
  to_port     = 65535
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = aws_security_group.personal_website_sg.id
}
