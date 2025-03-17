#!/bin/bash
set -e

echo "Installing NGINX..."
sudo apt update -y
sudo apt install -y nginx

echo "Configuring NGINX..."
cat <<EOF | sudo tee /etc/nginx/sites-available/esnet
upstream k8s_nodes {
    server 10.1.0.3:32080;
    server 10.1.0.4:32080;
    #server 10.1.0.5:32080;
    #server 10.1.0.6:32080;
    #server 10.1.0.7:32080;
}
server {
    listen 80;
    server_name 35.236.79.185;

    location / {
        proxy_pass http://k8s_nodes;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

EOF

sudo ln -s /etc/nginx/sites-available/kubeinvaders /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "NGINX running on ${bastion_ip}"