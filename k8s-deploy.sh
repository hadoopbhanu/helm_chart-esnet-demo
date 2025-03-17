
#!/bin/bash

# Build and deploy all ESnet applications to Kubernetes
# Prerequisites: Docker, kubectl, and a Kubernetes cluster

# Build and push Docker images
for app in index_app network_app services_app infrastructure_app security_app about_app; do
  echo "Building $app..."
  cd $app
  docker build -t esnet-${app/_app/} .
  
  # Uncomment this if pushing to a registry
  # docker tag esnet-${app/_app/} yourdockerregistry/esnet-${app/_app/}:latest
  # docker push yourdockerregistry/esnet-${app/_app/}:latest
  
  cd ..
done

# Create Kubernetes namespace if it doesn't exist
kubectl get namespace esnet || kubectl create namespace esnet

# Apply Kubernetes manifests
for app in index network services infrastructure security about; do
  echo "Deploying $app to Kubernetes..."
  
  # Create deployment
  cat << EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: esnet-$app
  namespace: esnet
spec:
  replicas: 1
  selector:
    matchLabels:
      app: esnet-$app
  template:
    metadata:
      labels:
        app: esnet-$app
    spec:
      containers:
      - name: esnet-$app
        image: esnet-$app:latest
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
EOF

  # Create service
  cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: esnet-$app-service
  namespace: esnet
spec:
  selector:
    app: esnet-$app
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
EOF
done

# Create Ingress for path-based routing
cat << EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: esnet-ingress
  namespace: esnet
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /\$2
spec:
  rules:
  - http:
      paths:
      - path: /(/|\$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-index-service
            port:
              number: 80
      - path: /network(/|\$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-network-service
            port:
              number: 80
      - path: /services(/|\$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-services-service
            port:
              number: 80
      - path: /infrastructure(/|\$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-infrastructure-service
            port:
              number: 80
      - path: /security(/|\$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-security-service
            port:
              number: 80
      - path: /about(/|\$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-about-service
            port:
              number: 80
EOF

echo "Deployment complete. Check status with: kubectl get all -n esnet"
