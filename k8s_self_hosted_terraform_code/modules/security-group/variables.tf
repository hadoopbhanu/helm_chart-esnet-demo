variable "vpc_network" {
  description = "The VPC network to apply the firewall rules to"
  type        = string
}

variable "my_public_ip" {
  description = "My public IP address"
  type        = list(string)
  default     = ["104.185.138.149"]  # My public IP
}

variable "api_allowed_cidrs" {
  description = "CIDR blocks allowed to access the Kubernetes API server"
  type        = list(string)
  default     = ["0.0.0.0/32"]  # Adjust for security
}

variable "kubelet_allowed_cidrs" {
  description = "CIDR blocks allowed to access the Kubelet API"
  type        = list(string)
  default     = ["0.0.0.0/32"]  # Adjust for internal cluster CIDR
}

variable "nodeport_allowed_cidrs" {
  description = "CIDR blocks allowed to access NodePort services"
  type        = list(string)
  default     =   ["0.0.0.0/32"]  #["0.0.0.0/0"] Adjust for external access
}

variable "ssh_allowed_cidrs" {
  description = "CIDR blocks allowed to SSH into nodes"
  type        = list(string)
  default     = ["0.0.0.0/32"]  # Adjust for security
}

