output "firewall_rules" {
  description = "List of all firewall rules created for Kubernetes security"
  value = {
    allow_k8s_api                    = google_compute_firewall.allow_k8s_api.name
    allow_ssh                         = google_compute_firewall.allow_ssh.name
  }
}