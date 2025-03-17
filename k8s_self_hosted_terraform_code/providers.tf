terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.24.0"
    }
    vault = {
      source  = "hashicorp/vault"
      version = "~> 3.20.0"
    }
  }
}

# Google Cloud Provider
provider "google" {
  project     = var.project_id
  region      = var.worker_region
  credentials = data.vault_kv_secret_v2.gcp_key.data["key"]
}

# Vault Provider
provider "vault" {
  address = "http://127.0.0.1:8200"
}
