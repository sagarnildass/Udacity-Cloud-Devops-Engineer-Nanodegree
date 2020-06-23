#!/usr/bin/env bash

## Complete the following steps to get Docker running locally

# Step 1:
# Build image and add a descriptive tag
docker build --tag=project_kubernetes .

# Step 2: 
# List docker images
docker image ls

# Step 3: 
# Run flask app, exposed on host at port 8000
docker run -d -p 8000:5000 project_kubernetes
