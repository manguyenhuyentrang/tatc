@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Chua co Node.js tren may. Cai Node.js tai https://nodejs.org roi chay lai file nay.
  pause
  exit /b 1
)
node server.js 8080
pause
