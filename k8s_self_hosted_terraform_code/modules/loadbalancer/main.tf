/*
resource "google_compute_global_address" "control_plane_lb_ip" {
  name = "control-plane-lb-ip"
}

resource "google_compute_instance_group" "control_plane_group" {
  for_each = toset(var.control_plane_zones)  # One UIG per zone

  name = "control-plane-group-${each.value}"
  zone = each.value  # Assign the UIG to the correct zone

  instances = [
    for idx in range(length(var.control_plane_instances)) : var.control_plane_instances[idx]
    if var.control_plane_zones[idx] == each.value  # Only include instances in the same zone as this UIG
  ]

  named_port {
    name = "k8s-api"
    port = 6443
  }
}

resource "google_compute_health_check" "control_plane_hc" {
  name                = "control-plane-hc"
  check_interval_sec  = 5
  timeout_sec         = 5

  tcp_health_check {
    port = 6443 # Adjust this to match your Kubernetes API server port or other relevant port
  }
}

resource "google_compute_backend_service" "control_plane_lb" {
  name     = "control-plane-lb"
  protocol = "TCP"

  dynamic "backend" {
    for_each = google_compute_instance_group.control_plane_group
    content {
      group = backend.value.self_link  
    }
  }
    health_checks = [google_compute_health_check.control_plane_hc.self_link] 
    depends_on = [google_compute_instance_group.control_plane_group]
}

*/

# Managed Instance Group (MIG) creation for the K8s Worker Nodes

data "google_compute_zones" "available_zones" {
  region = var.worker_region  # Retrieves all zones in this region
}

resource "google_compute_region_instance_group_manager" "worker_mig" {
  name               = "worker-node-group"
  base_instance_name = "worker-node"
  region             = var.worker_region  # Example: "us-central1"


  distribution_policy_zones = data.google_compute_zones.available_zones.names  # Spreads across the zones

version {
    instance_template = var.worker_template
  }

  target_size = 4  # ✅ Starts with 2 worker nodes

named_port {
    name = "k8s-worker"
    port = 83 #10250  # Kubelet API port
  }
/*
auto_healing_policies {
    health_check      = google_compute_health_check.worker_health.self_link
    initial_delay_sec = 300
  }
  */
}

resource "google_compute_health_check" "worker_health" {
  name                = "worker-node-hc"
  check_interval_sec  = 5
  timeout_sec         = 5

  tcp_health_check {
    port = 83 #10250  # Adjust this to match your Kubernetes API server port or other relevant port
  }
}

/*
resource "google_compute_region_autoscaler" "worker_autoscaler" {
  name   = "worker-autoscaler"
  target = google_compute_region_instance_group_manager.worker_mig.self_link

  autoscaling_policy {
    min_replicas    = 2   # Starts with 2 nodes (same as target_size)
    max_replicas    = 5   # Can scale up to 5 worker nodes
    cooldown_period = 60  # 60 seconds before scaling again

    cpu_utilization {
      target = 0.85  # Scale up if CPU usage > 60%
    }
  }
}
*/