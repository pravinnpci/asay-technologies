variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "ap-south-2"
}

variable "bucket_name" {
  description = "The name of the S3 bucket. Must be globally unique."
  default     = "asay-technologies-web-bucket"
}