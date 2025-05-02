# 1) Use the slim variant so we can install CA certs
FROM node:18-slim

# 2) Install up-to-date root certificates and OpenSSL
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      ca-certificates \
      openssl \
 && rm -rf /var/lib/apt/lists/*

# 3) Set your workdir
WORKDIR /usr/src/app

# 4) Copy only your manifests for a clean dependency layer
COPY package*.json ./

# 5) Clear any stale cache & install
RUN npm cache clean --force \
 && npm ci 

# 6) Copy the rest of your source
COPY . .

# 7) Build Next.js
RUN npm run build

# 8) Expose and run
EXPOSE 3000
CMD ["npm", "run", "start"]
    