variable "control_plane_instances" {
    type        = list(string)
}

variable "control_plane_ips" {
    type        = list(string)
}


variable "control_plane_zones" {
  description = "Zones for control plane nodes"
  type        = list(string)    
    }

variable "worker_template" {
  description = "Template name for the Worker Nodes' MIG"
  type        = string 
    }

variable "worker_region" {
  description = "Template name for the Worker Nodes' MIG"
  type        = string 
    }

