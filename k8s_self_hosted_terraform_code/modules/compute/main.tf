
resource "google_compute_instance" "control_plane" {
  count        = 1
  name         = "control-plane-${count.index}"
  machine_type = "n2-standard-4"
  zone         = var.control_plane_zones[count.index]
  boot_disk {
    initialize_params { 
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
      size = 30 
     }
  }
  service_account {
    email  = "k8s-control-plane-sa@sillygully.iam.gserviceaccount.com"
    scopes = ["cloud-platform"]
  }
  network_interface {
    network    = var.network_id
    subnetwork = var.control_plane_subnet[count.index]
  }
  tags = ["control-plane"]  # Assgn firewall tag
  metadata = {
    ssh-keys = "hadoopbhanu:${file("/Users/bhanukoduri/gcp/CI_CD_Demo2025/.ssh/id_rsa.pub")}"  # My public key
    startup-script = file("${path.module}/../scripts/control-plane.sh")
  }
}

resource "google_compute_instance_template" "worker_template" {
  name_prefix  = "worker-node-template-k8-demo"
  machine_type = "e2-standard-2"

  disk {
    boot         = true
    auto_delete  = true
    source_image = "ubuntu-os-cloud/ubuntu-2204-lts"  # Use source_image instead of initialize_params
    disk_size_gb = 30
  }
  network_interface {
    network    = var.network_id
    subnetwork = var.worker_subnet
  }
  tags = ["worker-node"]  # firewall tag
  metadata = {
    ssh-keys = "hadoopbhanu:${file("/Users/bhanukoduri/gcp/CI_CD_Demo2025/.ssh/id_rsa.pub")}"  # My public key
    startup-script = file("${path.module}/../scripts/worker_node.sh")
  }
}


# Jump Node, LB, Ansible Tower

resource "google_compute_instance" "bastion" {
  name         = "bastion-host"
  machine_type = "n2-standard-4"  
  zone         = var.worker_zones[0]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
      size  = 10
    }
  }
  network_interface {
    network    = var.network_id
    subnetwork = var.worker_subnet  # Use a public subnet
    access_config {
      nat_ip = var.bastion_public_ip  # ✅ Assign the static IP
    }
  }
  tags = ["bastion-node"]  # firewall tag
  metadata = {
    ssh-keys = "hadoopbhanu:${file("/Users/bhanukoduri/gcp/CI_CD_Demo2025/.ssh/id_rsa.pub")}"  # My public key
    startup-script = file("${path.module}/../scripts/bastion_node.sh")
  }
}