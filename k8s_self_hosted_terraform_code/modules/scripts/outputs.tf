output "startup_script" {
  value = templatefile("${path.module}/../scripts/bastion_node.sh", { bastion_ip = var.bastion_static_ip })
}