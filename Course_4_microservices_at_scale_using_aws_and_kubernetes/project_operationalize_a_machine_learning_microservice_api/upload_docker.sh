#!/usr/bin/env bash
# This file tags and uploads an image to Docker Hub

# Assumes that an image is built via `run_docker.sh`

# Step 1:
# Create dockerpath
# dockerpath=<your docker ID/path>
dockerpath=sagarnildass/project_kubernetes
# Step 2:
# Authenticate & tag
export DOCKER_ID_USER="sagarnildass"
docker login
docker tag project_kubernetes $DOCKER_ID_USER/project_kubernetes
docker push $DOCKER_ID_USER/project_kubernetes

# Step 3:
# Push image to a docker repository
docker push sagarnildass/project_kubernetes
