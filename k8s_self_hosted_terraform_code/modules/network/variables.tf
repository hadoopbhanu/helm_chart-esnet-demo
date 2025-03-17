
variable "network_name" {
  description = ""
  type        = string
  default     = "k8s-vpc"
}

variable "region" {
  description = ""
  type        = string
  default     = "us-west2"
}

variable "control_plane_regions" {
  type    = list(string)
  default = ["us-west2"]
}

variable "control_plane_subnets" {
  type    = list(string)
  default = ["10.0.1.0/24"] #, "10.0.2.0/24", "10.0.3.0/24"]
}