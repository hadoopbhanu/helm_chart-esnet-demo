module "network" {
  source = "./modules/network"
}

module "compute" {
  source                = "./modules/compute"
  network_id            = module.network.vpc_id
  control_plane_subnet  = module.network.control_plane_subnet_id
  worker_subnet         = module.network.worker_subnet_id
  control_plane_regions = module.network.control_plane_regions
  bastion_public_ip     = module.network.bastion_public_ip
}


module "security_group" {
  source      = "./modules/security-group"
  vpc_network = module.network.vpc_id
}


module "loadbalancer" {
  source                  = "./modules/loadbalancer"
  control_plane_ips       = module.compute.control_plane_ips
  control_plane_zones     = module.compute.control_plane_zones
  control_plane_instances = module.compute.control_plane_instances
  worker_template         = module.compute.worker_instance_template
  worker_region           = var.worker_region
}

module "startupscripts" {
  source            = "./modules/scripts"
  bastion_static_ip = module.network.bastion_public_ip
}