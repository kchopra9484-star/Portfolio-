@echo off
cd /d "%~dp0"
title Push Portfolio to GitHub

echo ========================================================
echo   Pushing Karan Chopra Portfolio to GitHub
echo   Repository: https://github.com/kchopra9484-star/KARAN-CHOPRA-.git
echo ========================================================
echo.

set "GIT_CMD=%LOCALAPPDATA%\MinGit\cmd\git.exe"
set "GH_CMD=%LOCALAPPDATA%\gh\bin\gh.exe"

if not exist "%GIT_CMD%" (
    where git >nul 2>nul
    if %errorlevel% equ 0 (
        set "GIT_CMD=git"
    ) else (
        echo [ERROR] Git was not found.
        pause
        exit /b 1
    )
)

echo [1/3] Checking Git Status...
"%GIT_CMD%" status

echo.
echo [2/3] Adding any modified files and committing...
"%GIT_CMD%" add -A
"%GIT_CMD%" commit -m "update: portfolio assets and optimizations" 2>nul

echo.
echo [3/3] Pushing to GitHub (main branch)...
"%GIT_CMD%" push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] All files pushed to GitHub successfully!
    echo   URL: https://github.com/kchopra9484-star/KARAN-CHOPRA-.git
    echo ========================================================
) else (
    echo.
    echo [INFO] Authentication needed. Opening GitHub Login...
    if exist "%GH_CMD%" (
        "%GH_CMD%" auth login -h github.com -p https -w
        "%GH_CMD%" auth setup-git
        echo Retrying push...
        "%GIT_CMD%" push -u origin main
    )
)

echo.
pause
