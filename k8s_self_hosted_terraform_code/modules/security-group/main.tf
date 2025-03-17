resource "google_compute_firewall" "allow_internal_k8s" {
  name    = "allow-internal-k8s"
  network = var.vpc_network

  allow {
    protocol = "tcp"
    ports    = ["0-65535"]  # Open all TCP ports between nodes
  }

  allow {
    protocol = "udp"
    ports    = ["0-65535"]  # Open all UDP ports between nodes
  }

  source_tags = ["control-plane", "worker-node"]
  target_tags = ["control-plane", "worker-node"]

  direction = "INGRESS"
}

resource "google_compute_firewall" "allow_k8s_api" {
  name    = "allow-k8s-api"
  network = var.vpc_network

  allow {
    protocol = "tcp"
    ports    = ["6443"]  # Kubernetes API Server
  }

  direction   = "INGRESS"
  source_ranges = concat(var.api_allowed_cidrs, var.my_public_ip)
  target_tags   = ["control-plane"]
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh"
  network = var.vpc_network

  allow {
    protocol = "tcp"
    ports    = ["22"]  # SSH Access
  }

  direction   = "INGRESS"
  source_ranges = concat(var.ssh_allowed_cidrs, var.my_public_ip)
  source_tags = ["bastion-node"]
  target_tags   = ["control-plane", "worker-node", "bastion-node"]

}

resource "google_compute_firewall" "allow_outbound_k8s" {
  name    = "allow-outbound-k8s"
  network = var.vpc_network

  allow {
    protocol = "tcp"
    ports    = ["80", "443", "123"]  # HTTP, HTTPS, NTP
  }

  allow {
    protocol = "udp"
    ports    = ["53"]  # DNS
  }

  direction   = "EGRESS"
  destination_ranges = ["0.0.0.0/0"]
  target_tags = ["control-plane", "worker-node", "bastion-node"]
}

resource "google_compute_firewall" "allow_nodeport_32080" {
  name    = "allow-nodeport-32080"
  network = var.vpc_network

  allow {
    protocol = "tcp"
    ports    = ["32080", "32443", "32081", "42453"]  # Only this port is open to the internet
  }

  source_ranges = ["0.0.0.0/0", "35.235.65.68", "130.211.0.0/22", "35.191.0.0/16"] # Health Check CIDR "130.211.0.0/22", "35.191.0.0/16"
  target_tags   = ["worker-node"]
  direction     = "INGRESS"
}