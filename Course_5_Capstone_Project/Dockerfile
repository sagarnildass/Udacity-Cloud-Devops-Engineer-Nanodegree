FROM node:12.13.1-stretch-slim

WORKDIR /bcrypt

COPY app/ /bcrypt/

RUN echo "[INFO]::[install-run-nmp]" && \
    npm install && \
    npm update && \
    npm run build

CMD ["/bin/bash", "-c", "npm run serve"]
