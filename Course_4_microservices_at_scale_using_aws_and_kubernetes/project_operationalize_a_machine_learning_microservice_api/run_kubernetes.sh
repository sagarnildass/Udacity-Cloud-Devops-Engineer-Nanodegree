#!/usr/bin/env bash

# This tags and uploads an image to Docker Hub

# Step 1:
# This is your Docker ID/path
dockerpath=sagarnildass/project_kubernetes
# Step 2
# Run the Docker Hub container with kubernetes
kubectl run udacity-project4 --image=sagarnildass/project_kubernetes --port=5000

# Step 3:
# List kubernetes pods
kubectl get pods

# Step 4:
# Forward the container port to a host
echo "sleeping for 10 seconds while waiting for pod to come up"
sleep 10
kubectl port-forward udacity-project4 8081:5000 
kubectl logs --selector app=udacity-project4
