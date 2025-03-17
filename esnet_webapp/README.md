
# ESnet Modular Applications

This project has been modularized into separate, self-contained applications for each section:

- `index_app` - The main landing page
- `network_app` - Network infrastructure section
- `services_app` - Services section
- `infrastructure_app` - Infrastructure section
- `security_app` - Security section
- `about_app` - About section

## Creating the Modular Apps

Run the following command to generate all the modular applications:

```
node create_modular_apps.js
```

## Building Individual Applications

Each application can be built and deployed independently. Navigate to any app directory and:

1. Install dependencies:
```
cd network_app
npm install
```

2. Run in development mode:
```
npm run dev
```

3. Build for production:
```
npm run build
```

4. Deploy using Docker:
```
docker build -t esnet-network .
docker run -p 8080:80 esnet-network
```

## Kubernetes Deployment

Each application can be deployed as a separate pod in Kubernetes. Sample deployment files are included in each app directory.

Example Kubernetes deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: esnet-network
spec:
  replicas: 2
  selector:
    matchLabels:
      app: esnet-network
  template:
    metadata:
      labels:
        app: esnet-network
    spec:
      containers:
      - name: esnet-network
        image: esnet-network:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: esnet-network-service
spec:
  selector:
    app: esnet-network
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
```

## Path-Based Routing in Kubernetes

To set up path-based routing in Kubernetes, you can use an Ingress controller:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: esnet-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
  - host: esnet.example.com
    http:
      paths:
      - path: /(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-index-service
            port:
              number: 80
      - path: /network(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-network-service
            port:
              number: 80
      - path: /services(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-services-service
            port:
              number: 80
      - path: /infrastructure(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-infrastructure-service
            port:
              number: 80
      - path: /security(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-security-service
            port:
              number: 80
      - path: /about(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: esnet-about-service
            port:
              number: 80
```
