
# Neural Network Visualization App

This is a standalone application that displays a mesmerizing neural network visualization.

## Features

- Interactive neural network visualization with glowing nodes and connections
- Real-time pulse animations simulating neural activity
- Adjustable settings for node count, connection distance, and animation speed
- Futuristic, neon design with a focus on green and blue glowing elements

## Getting Started

1. Install dependencies:
```
npm install
```

2. Run the development server:
```
npm run dev
```

3. Build for production:
```
npm run build
```

4. Docker build:
```
docker build -t neural-viz .
```

5. Run the Docker container:
```
docker run -p 8080:80 neural-viz
```

## Deployment

This app is designed to be deployed to the `/fun` ingress path in a Kubernetes cluster. You can update the k8s-deploy.sh script to include this app in your ESnet deployment.
