
output "vpc_id" {
  description = "ID of the created VPC"
  value       = google_compute_network.k8s_network.id
}

output "bastion_public_ip" {
  value = google_compute_address.bastion_static_ip.address
}


output "control_plane_subnet_id" {
  description = "ID of the control plane subnet"
  value       = google_compute_subnetwork.control_plane[*].id
}

output "worker_subnet_id" {
  description = "ID of the worker subnet"
  value       = google_compute_subnetwork.worker.id
}

output "control_plane_regions" {
  description = "Control plane regions for the instnace creation"
  value = var.control_plane_regions[*]
}