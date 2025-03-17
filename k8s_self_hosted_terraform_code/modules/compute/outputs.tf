output "control_plane_ips" { 
    value = google_compute_instance.control_plane[*].network_interface[0].network_ip 
    }

output "control_plane_zones" {
  description = "Control plane zones for the LBs"
  value = var.control_plane_zones[*]
    }

output control_plane_instances {
    value = google_compute_instance.control_plane[*].id
}

output "worker_instance_template" {
  description = "The name of the worker instance template"
  value       = google_compute_instance_template.worker_template.self_link
}