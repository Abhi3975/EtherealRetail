# ─────────────────────────────────────────────
# ECS Cluster, Task Definitions, Services
# (AWS Academy — uses LabRole, public subnets, no Cloud Map)
# ─────────────────────────────────────────────

# ── ECS Cluster ──
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"
  tags = { Name = "${var.project_name}-cluster" }
}

# ── CloudWatch Log Groups ──
resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${var.project_name}/backend"
  retention_in_days = 7
  tags              = { Name = "${var.project_name}-backend-logs" }
}

resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/${var.project_name}/frontend"
  retention_in_days = 7
  tags              = { Name = "${var.project_name}-frontend-logs" }
}

# ── Cloud Map: Private DNS for service discovery ──
resource "aws_service_discovery_private_dns_namespace" "main" {
  name        = "ethereal.local"
  description = "Private DNS for EtherealRetail ECS services"
  vpc         = data.aws_vpc.default.id

  tags = { Name = "${var.project_name}-namespace" }
}

resource "aws_service_discovery_service" "backend" {
  name = "backend"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.main.id

    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 1
  }
}

# ─────────────────────────────────────────────
# Backend Task Definition & Service
# ─────────────────────────────────────────────

resource "aws_ecs_task_definition" "backend" {
  family                   = "${var.project_name}-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.lab_role_arn
  task_role_arn            = var.lab_role_arn

  container_definitions = jsonencode([{
    name      = "backend"
    image     = "${aws_ecr_repository.backend.repository_url}:${var.backend_image_tag}"
    essential = true

    portMappings = [{
      containerPort = 5000
      protocol      = "tcp"
    }]

    environment = [
      { name = "NODE_ENV", value = "production" },
      { name = "PORT", value = "5000" },
      { name = "MONGO_URI", value = var.mongo_uri },
      { name = "JWT_SECRET", value = var.jwt_secret },
      { name = "CLOUDINARY_CLOUD_NAME", value = var.cloudinary_cloud_name },
      { name = "CLOUDINARY_API_KEY", value = var.cloudinary_api_key },
      { name = "CLOUDINARY_API_SECRET", value = var.cloudinary_api_secret },
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.backend.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "backend"
      }
    }

    healthCheck = {
      command     = ["CMD-SHELL", "wget -qO- http://localhost:5000/api/ping || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 15
    }
  }])

  tags = { Name = "${var.project_name}-backend-task" }
}

resource "aws_ecs_service" "backend" {
  name            = "${var.project_name}-backend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.backend.id]
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.backend.arn
  }

  tags = { Name = "${var.project_name}-backend-service" }
}

# ─────────────────────────────────────────────
# Frontend Task Definition & Service
# ─────────────────────────────────────────────

resource "aws_ecs_task_definition" "frontend" {
  family                   = "${var.project_name}-frontend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.lab_role_arn
  task_role_arn            = var.lab_role_arn

  container_definitions = jsonencode([{
    name      = "frontend"
    image     = "${aws_ecr_repository.frontend.repository_url}:${var.frontend_image_tag}"
    essential = true

    portMappings = [{
      containerPort = 80
      protocol      = "tcp"
    }]

    environment = [
      {
        name  = "BACKEND_URL"
        value = "http://backend.ethereal.local:5000"
      }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.frontend.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "frontend"
      }
    }

    healthCheck = {
      command     = ["CMD-SHELL", "wget -qO- http://localhost:80/ || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 10
    }
  }])

  tags = { Name = "${var.project_name}-frontend-task" }
}

resource "aws_ecs_service" "frontend" {
  name            = "${var.project_name}-frontend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.frontend.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend.arn
    container_name   = "frontend"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.http, aws_ecs_service.backend]

  tags = { Name = "${var.project_name}-frontend-service" }
}
