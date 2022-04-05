variable "application_name" {
  description = "The name of the application"
  default     = "j4numbers-website"
}

variable "application_port" {
  description = "The open port of the application for all TCP requests"
  default     = 8080
}

variable "deploy_version" {
  description = "The version of the service to deploy"
  default     = "latest"
}

variable "dns_hosted_zones" {
  description = "A collection of all the hosted zones the application can be deployed on"
  type        = "map"
}

variable "subnet" {
  description = "The subnet collection that the applications will be deployed into"
  type        = "map"
}
