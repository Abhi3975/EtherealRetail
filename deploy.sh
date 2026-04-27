#!/usr/bin/env bash
# ─────────────────────────────────────────────
# EtherealRetail — Build, Push to ECR & Deploy
# Compatible with AWS Academy Learner Labs
# ─────────────────────────────────────────────
set -euo pipefail

# Ensure terraform is on PATH
export PATH="$HOME/.local/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TERRAFORM_DIR="${SCRIPT_DIR}/terraform"
IMAGE_TAG="${IMAGE_TAG:-latest}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

info()  { echo -e "${CYAN}▸ $1${NC}"; }
ok()    { echo -e "${GREEN}✔ $1${NC}"; }
fail()  { echo -e "${RED}✖ $1${NC}"; exit 1; }

# ── Pre-flight checks ──
command -v aws       >/dev/null 2>&1 || fail "AWS CLI not found. Install: brew install awscli"
command -v docker    >/dev/null 2>&1 || fail "Docker not found. Install Docker Desktop."
command -v terraform >/dev/null 2>&1 || fail "Terraform not found. Install it first."

# ── Step 1: Terraform Init ──
info "Initializing Terraform..."
cd "${TERRAFORM_DIR}"
terraform init -input=false
ok "Terraform initialized"

# ── Step 2: Create ECR repos first ──
info "Ensuring ECR repositories exist..."
terraform apply \
  -target=aws_ecr_repository.backend \
  -target=aws_ecr_repository.frontend \
  -target=aws_ecr_lifecycle_policy.backend \
  -target=aws_ecr_lifecycle_policy.frontend \
  -auto-approve -input=false
ok "ECR repositories ready"

# ── Step 3: Get ECR repo URLs & AWS info ──
BACKEND_REPO=$(terraform output -raw ecr_backend_url)
FRONTEND_REPO=$(terraform output -raw ecr_frontend_url)
AWS_REGION=$(grep 'aws_region' terraform.tfvars | head -1 | sed 's/.*= *"\(.*\)"/\1/')
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

info "Backend ECR:  ${BACKEND_REPO}"
info "Frontend ECR: ${FRONTEND_REPO}"

# ── Step 4: Docker login to ECR ──
info "Authenticating Docker with ECR..."
aws ecr get-login-password --region "${AWS_REGION}" | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
ok "Docker authenticated with ECR"

# ── Step 5: Build & push backend ──
info "Building backend image..."
docker build --platform linux/amd64 -t "${BACKEND_REPO}:${IMAGE_TAG}" "${SCRIPT_DIR}/backend"
ok "Backend image built"

info "Pushing backend image..."
docker push "${BACKEND_REPO}:${IMAGE_TAG}"
ok "Backend image pushed"

# ── Step 6: Build & push frontend ──
info "Building frontend image..."
docker build --platform linux/amd64 -t "${FRONTEND_REPO}:${IMAGE_TAG}" "${SCRIPT_DIR}/frontend"
ok "Frontend image built"

info "Pushing frontend image..."
docker push "${FRONTEND_REPO}:${IMAGE_TAG}"
ok "Frontend image pushed"

# ── Step 7: Full Terraform apply ──
info "Deploying full infrastructure..."
terraform apply -auto-approve -input=false \
  -var="backend_image_tag=${IMAGE_TAG}" \
  -var="frontend_image_tag=${IMAGE_TAG}"

ok "Deployment complete!"

echo ""
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}  EtherealRetail is live!${NC}"
echo -e "${GREEN}  URL: $(terraform output -raw alb_dns_name)${NC}"
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
