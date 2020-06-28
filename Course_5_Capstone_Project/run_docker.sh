#!/usr/bin/env bash

## Complete the following steps to get Docker running locally

# Step 1:
# Build image and add a descriptive tag
docker build -t capstone-app-sagarnil .

# Step 2: 
# List docker images
docker images

# Step 3: 
# Run app
docker run -p 9080:9080 capstone-app-sagarnil
