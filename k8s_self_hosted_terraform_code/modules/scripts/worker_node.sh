#!/bin/bash

set -e  # Exit immediately if a command fails
#set -o pipefail  # Exit on errors in pipes

# Get the hostname
HOSTNAME=$(hostname)

# Get the private IP of the instance
PRIVATE_IP=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/ip)

# Define Control Plane 0 (First Control Plane Node)
CONTROL_PLANE_0="control-plane-0"  # Change this if your hostname is different

# Define Control Plane Endpoint (Use Private IP of first control plane node)
CONTROL_PLANE_ENDPOINT="$PRIVATE_IP:6443"

# Define Pod Network CIDR
POD_NETWORK_CIDR="10.244.0.0/16"

# Define GCP Secret Name
GCP_SECRET_NAME="kubeadm-join-command"

echo "[INFO] Updating and installing required packages..."
sudo apt-get update
sudo apt-get install -y curl software-properties-common apt-transport-https ca-certificates jq gpg 
# Add Kubernetes repo


echo "[INFO] Adding Kubernetes APT repository..."
sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --batch --yes --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg 
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Install kubeadm, kubelet, kubectl
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

# Disable swap (Kubernetes does not work with swap enabled)
echo "[INFO] Disabling swap..."
swapoff -a
sed -i '/ swap / s/^/#/' /etc/fstab

# Enable required kernel modules
echo "[INFO] Loading required kernel modules..."
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

modprobe overlay
modprobe br_netfilter

# Enable required sysctl settings
echo "[INFO] Configuring sysctl settings..."
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sysctl --system


# Install and configure containerd
echo "[INFO] Removing any conflicting packages..."
sudo apt-get remove -y docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc || true

sudo apt-get update
sudo apt-get install -y containerd
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
sudo sed -i 's|sandbox_image = .*|sandbox_image = "registry.k8s.io/pause:3.10"|' /etc/containerd/config.toml
sudo sed -i '/disabled_plugins/s/cri//' /etc/containerd/config.toml

sudo systemctl restart containerd
sudo systemctl enable containerd


# Pull required Kubernetes images
echo "[INFO] Pulling required Kubernetes images..."
kubeadm config images pull

# Ensure correct sandbox image is used
echo "[INFO] Pulling correct CRI sandbox image..."
ctr -n k8s.io images pull registry.k8s.io/pause:3.10


# Restart containerd
sudo systemctl restart containerd


# Verify installation
echo "[INFO] Verifying containerd installation..."
containerd --version



# If this is the FIRST control plane node, run kubeadm init
if [[ "$HOSTNAME" == "$CONTROL_PLANE_0" ]]; then
    echo "[INFO] Initializing Kubernetes on $HOSTNAME..."
    
    kubeadm init --control-plane-endpoint "$CONTROL_PLANE_ENDPOINT" --pod-network-cidr="$POD_NETWORK_CIDR" --upload-certs | tee /root/kubeadm-init.log

    # Extract join command
    JOIN_COMMAND=$(kubeadm token create --print-join-command)
    CERTIFICATE_KEY=$(kubeadm init phase upload-certs --upload-certs | tail -1)
    
    JOIN_COMMAND_WITH_CERT="$JOIN_COMMAND --control-plane --certificate-key $CERTIFICATE_KEY"

    echo "[INFO] Storing join command in GCP Secret Manager..."
    echo "$JOIN_COMMAND_WITH_CERT" > /root/kubeadm_join_cmd.sh

    
    #gcloud secrets create $GCP_SECRET_NAME --replication-policy="automatic" --data-file=/root/kubeadm_join_cmd.sh || \
    #gcloud secrets versions add $GCP_SECRET_NAME --data-file=/root/kubeadm_join_cmd.sh
    
    # Configure kubectl for root user
    echo "[INFO] Setting up kubectl access..."
    mkdir -p $HOME/.kube
    cp /etc/kubernetes/admin.conf $HOME/.kube/config
    chown $(id -u):$(id -g) $HOME/.kube/config
    export KUBECONFIG=$HOME/.kube/config

    curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
    chmod 700 get_helm.sh
    bash get_helm.sh

    echo "[INFO] Installing CNI (Flannel)..."
    # Needs manual creation of namespace to avoid helm error
        kubectl create ns kube-flannel
        kubectl label --overwrite ns kube-flannel pod-security.kubernetes.io/enforce=privileged

        helm repo add flannel https://flannel-io.github.io/flannel/
        helm install flannel --set podCidr="10.244.0.0/16" --namespace kube-flannel flannel/flannel
    #kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
    echo "✅ Control plane node setup complete! Other nodes can now join the cluster."
else
   
    echo "[INFO] Fetch join command from $CONTROL_PLANE_0..."
   
fi

echo "✅ Kubernetes setup completed on $HOSTNAME!"