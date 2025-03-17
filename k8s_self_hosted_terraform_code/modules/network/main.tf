resource "google_compute_network" "k8s_network" {
  name                    = var.network_name
  auto_create_subnetworks = false
  routing_mode            = "GLOBAL" # For optimized inter-region routing
}

resource "google_compute_address" "bastion_static_ip" {
  name         = "bastion-static-ip"
  region       = var.region
}

resource "google_compute_subnetwork" "control_plane" {
  count = length(var.control_plane_regions)
  name          = "control-plane-subnet-${count.index}"
  network       = google_compute_network.k8s_network.id
  ip_cidr_range = var.control_plane_subnets[count.index]
  region        = var.control_plane_regions[count.index]
}

resource "google_compute_subnetwork" "worker" {
  name          = "worker-subnet"
  network       = google_compute_network.k8s_network.id
  ip_cidr_range = "10.1.0.0/24"
  region        = var.region
}


## Cloud Router and NAT for Internet Connetivity

# Loop through all control plane regions
resource "google_compute_router" "control_plane_router" {
  for_each = toset(var.control_plane_regions)  # Iterate over all control plane regions
  name     = "router-control-plane-${each.value}"
  region   = each.value
  network  = google_compute_network.k8s_network.id
}

resource "google_compute_router_nat" "control_plane_nat" {
  for_each = google_compute_router.control_plane_router  # Match routers by region
  name     = "nat-control-plane-${each.key}"
  router   = each.value.name
  region   = each.key

  nat_ip_allocate_option = "AUTO_ONLY"  # Automatically allocate external IPs
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}

# Create Cloud Router & NAT for Worker Node Region
resource "google_compute_router" "worker_router" {
  name    = "router-worker-nodes"
  region  = var.region
  network = google_compute_network.k8s_network.id
}

/*
resource "google_compute_router_nat" "worker_nat" {
  name   = "nat-worker-nodes"
  router = google_compute_router.worker_router.name
  region = var.region

  nat_ip_allocate_option = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}

*/