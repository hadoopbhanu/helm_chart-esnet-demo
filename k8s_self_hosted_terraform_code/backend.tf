terraform {
  backend "gcs" {
    bucket = "terraform-state-bucket_demo" 
    prefix = "terraform/state"             
  }
}
