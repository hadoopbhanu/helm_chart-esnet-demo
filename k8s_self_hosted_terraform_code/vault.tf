# Retrieve GCP Service Account Key from Vault
data "vault_kv_secret_v2" "gcp_key" {
  mount = "secret"
  name  = "GCP_key"
}
