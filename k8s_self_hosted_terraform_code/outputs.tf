/*
output "k8s_control_plane_ips" { value = module.compute.control_plane_ips }
output "k8s_worker_ips" { value = module.compute.worker_ips }
output "firewall_rules" { value = module.security_group.firewall_rules }
output "loadbalancer_ip" { value = module.loadbalancer.loadbalancer_ip }

*/

output "firewall_rules" {
  description = "Firewall rules from security-group module"
  value       = module.security_group.firewall_rules
}