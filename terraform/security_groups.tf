# ─────────────────────────────────────────────
# Security Groups (using default VPC)
# ─────────────────────────────────────────────

# ── ALB Security Group ──
resource "aws_security_group" "alb" {
  name        = "${var.project_name}-alb-sg"
  description = "Allow HTTP inbound to ALB"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project_name}-alb-sg" }
}

# ── Frontend Security Group ──
resource "aws_security_group" "frontend" {
  name        = "${var.project_name}-frontend-sg"
  description = "Allow traffic from ALB to Frontend"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description     = "From ALB"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project_name}-frontend-sg" }
}

# ── Backend Security Group ──
resource "aws_security_group" "backend" {
  name        = "${var.project_name}-backend-sg"
  description = "Allow traffic from Frontend to Backend"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description     = "From Frontend"
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project_name}-backend-sg" }
}
