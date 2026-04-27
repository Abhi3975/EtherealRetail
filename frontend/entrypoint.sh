#!/bin/sh
set -e

# Default backend URL for Docker Compose; overridden via ECS task env
BACKEND_URL="${BACKEND_URL:-http://backend:5000}"
export BACKEND_URL

# Substitute ONLY $BACKEND_URL (leave nginx variables like $host, $uri untouched)
envsubst '${BACKEND_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

echo "✔ Nginx configured → proxying /api/ to ${BACKEND_URL}"

exec nginx -g 'daemon off;'
