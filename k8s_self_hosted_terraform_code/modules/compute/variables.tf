
variable "network_id" {
  description = "VPC network ID"
  type        = string
}

variable "bastion_public_ip" {
  description = ""
  type        = string
}

variable "control_plane_subnet" {
  description = "Subnet ID for control plane nodes"
  type        = list(string)
}

variable "worker_subnet" {
  description = "Subnet ID for worker nodes"
  type        = string
}

variable "control_plane_regions" {
  type    = list(string)
}

variable "control_plane_zones" {
  description = "Zones for control plane nodes"
  type        = list(string)
  default     = ["us-west2-a", "us-west2-a", "us-west2-a"]
}

variable "worker_zones" {
  description = "Zones for worker nodes"
  type        = list(string)
  default     = ["us-west2-a", "us-west2-a"]
}
