# Stage 1: Build & Dependency Resolution
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Only copy dependency files first to highly cache the install layer
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production Container
FROM node:20-alpine

# Set node environment securely
ENV NODE_ENV=production

# Running as a non-root user is a massive security flex
USER node
WORKDIR /usr/src/app

# Copy securely installed modules from builder
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 5000

# CMD avoids the PID 1 issues sometimes seen with npm start in docker
CMD ["node", "server.js"]
