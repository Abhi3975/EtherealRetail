# ─────────────────────────────────────────────
# Input Variables (AWS Academy Compatible)
# ─────────────────────────────────────────────

variable "aws_region" {
  description = "AWS region (Academy labs use us-east-1)"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for naming resources"
  type        = string
  default     = "ethereal-retail"
}

# ── AWS Academy LabRole ──
# Academy labs provide a pre-created LabRole — you CANNOT create custom IAM roles.
variable "lab_role_arn" {
  description = "ARN of the pre-existing LabRole in AWS Academy"
  type        = string
}

# ── Application Secrets ──

variable "mongo_uri" {
  description = "MongoDB Atlas connection string"
  type        = string
  sensitive   = true
  default     = ""
}

variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
  default     = ""
}

variable "cloudinary_cloud_name" {
  description = "Cloudinary cloud name"
  type        = string
  sensitive   = true
  default     = ""
}

variable "cloudinary_api_key" {
  description = "Cloudinary API key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "cloudinary_api_secret" {
  description = "Cloudinary API secret"
  type        = string
  sensitive   = true
  default     = ""
}

# ── Image Tags ──

variable "backend_image_tag" {
  description = "Docker image tag for backend"
  type        = string
  default     = "latest"
}

variable "frontend_image_tag" {
  description = "Docker image tag for frontend"
  type        = string
  default     = "latest"
}
