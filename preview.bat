@echo off
cd /d "%~dp0"
title Karan Chopra - Animated Portfolio Website
cls

echo ========================================================
echo   Launching Karan Chopra - Animated Creative Portfolio
echo ========================================================
echo.

set "NODE_CMD="

where node >nul 2>nul
if %errorlevel% equ 0 (
    set "NODE_CMD=node"
) else (
    if exist "C:\Program Files\Adobe\Adobe Photoshop 2025\node.exe" (
        set "NODE_CMD=C:\Program Files\Adobe\Adobe Photoshop 2025\node.exe"
    ) else if exist "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe" (
        set "NODE_CMD=C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
    ) else if exist "C:\Program Files\nodejs\node.exe" (
        set "NODE_CMD=C:\Program Files\nodejs\node.exe"
    )
)

if defined NODE_CMD (
    echo [1/2] Starting local web server...
    echo [2/2] Opening http://127.0.0.1:3000 in your browser...
    echo.
    echo ========================================================
    echo   WEBSITE IS NOW RUNNING LIVE
    echo   Address: http://127.0.0.1:3000
    echo.
    echo   KEEP THIS WINDOW OPEN WHILE BROWSING!
    echo   (Minimizing is fine. Closing this window stops the server.)
    echo ========================================================
    echo.
    "%NODE_CMD%" server.js
) else (
    echo [INFO] Node not detected in standard paths. Opening index.html directly...
    start "" "index.html"
)
