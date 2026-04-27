# ── Stage 1: Build the React + Vite app ──
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Serve with Nginx ──
FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy the nginx config TEMPLATE (envsubst will fill BACKEND_URL at runtime)
COPY --from=builder /app/nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the entrypoint script
COPY --from=builder /app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy built static assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Default backend URL (Docker Compose); overridden via ECS task definition env
ENV BACKEND_URL=http://backend:5000

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["/entrypoint.sh"]
