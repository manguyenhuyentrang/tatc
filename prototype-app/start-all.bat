@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Chua co Node.js tren may. Cai Node.js tai https://nodejs.org roi chay lai file nay.
  pause
  exit /b 1
)
rem Mo 2 cua so: HTTP 8080 (xem nhanh, trang huong dan) va HTTPS 8443 (cai app). Giu ca 2 cua so trong luc xem.
start "TATC preview - HTTP 8080" cmd /k node server.js 8080
start "TATC preview - HTTPS 8443" cmd /k powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-https.ps1"
