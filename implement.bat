@echo off
echo ==================================================
echo   Asay Technologies - Docker Automator
echo ==================================================
echo.
echo [1/4] Stopping existing containers to avoid conflicts...
docker-compose down
echo [2/4] Building and starting the container...
docker-compose up --build -d
echo [3/4] Waiting 10 seconds for Vite to initialize...
timeout /t 15 /nobreak
echo [4/4] Opening http://localhost:3000 ...
start http://localhost:3000
echo.
echo Done! You can view live logs by typing: docker-compose logs -f
pause