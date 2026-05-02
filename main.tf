provider "aws" {
  region = var.aws_region
}

# New State Bucket Resource
resource "aws_s3_bucket" "terraform_state" {
  bucket = "asay-tech-tfstate-pravin"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name
}

# EC2 Infrastructure for K3s
resource "aws_security_group" "asay_sg" {
  name        = "asay-tech-sg"
  description = "Allow SSH, HTTP and K8s NodePort"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0b4719417036cd852" # Ubuntu 22.04 LTS in ap-south-2
  instance_type = "t3.medium"
  vpc_security_group_ids = [aws_security_group.asay_sg.id]
  key_name      = "asay-tech-key" # Make sure this matches your SSH secret

  tags = {
    Name = "Asay-AppServer"
  }
}

resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "allow_public_access" {
  depends_on = [aws_s3_bucket_public_access_block.public_access]
  bucket     = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
      },
    ]
  })
}

output "website_url" {
  value = aws_s3_bucket_website_configuration.website_config.website_endpoint
}

output "server_ip" {
  value = aws_instance.app_server.public_ip
}