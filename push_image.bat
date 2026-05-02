@echo off
echo ==================================================
echo   Asay Technologies - Docker Push Tool
echo ==================================================
echo.
set /p DOCKER_USER="Enter your Docker Hub username: "
set IMAGE_NAME=asay-tech

echo.
echo [1/3] Logging into Docker Hub...
docker login

echo [2/3] Building and tagging image as %DOCKER_USER%/%IMAGE_NAME%:latest...
docker build -t %DOCKER_USER%/%IMAGE_NAME%:latest .

echo [3/3] Pushing image to web registry...
docker push %DOCKER_USER%/%IMAGE_NAME%:latest

echo.
echo Successfully pushed to: https://hub.docker.com/r/%DOCKER_USER%/%IMAGE_NAME%
pause