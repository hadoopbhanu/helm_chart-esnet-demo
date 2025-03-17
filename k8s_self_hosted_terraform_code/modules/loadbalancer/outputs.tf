/*
output "control_plane_lb_ip" {
  description = "Global IP of the control plane load balancer"
  value       = google_compute_global_address.control_plane_lb_ip.address
}

output "load_balancer_name" {
  description = "The name of the Load Balancer"
  value       = google_compute_backend_service.control_plane_lb.name
}

output "backend_service_name" {
  description = "The name of the backend service handling control plane traffic"
  value       = google_compute_backend_service.control_plane_lb.name
}

/*output "forwarding_rule_name" {
  description = "The name of the forwarding rule"
  value       = google_compute_global_forwarding_rule.control_plane_fwd_rule.name
}

output "backend_instance_groups" {
  description = "List of instance groups assigned to the Load Balancer"
  value       = [for group in google_compute_instance_group.control_plane_group : group.self_link]
}
*/