@echo off
cd /d "%~dp0"
title Push Portfolio to GitHub — Git Credential Manager
cls

echo ========================================================
echo   Pushing Karan Chopra Portfolio to GitHub
echo   Repository: https://github.com/kchopra9484-star/KARAN-CHOPRA-.git
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\MinGit\cmd;%LOCALAPPDATA%\GitCredentialManager;%PATH%"

echo [1/3] Adding and committing all files...
git add -A
git commit -m "feat: complete animated graphic design portfolio (11 slides + 360 video)" 2>nul

echo [2/3] Verifying remote origin...
git remote set-url origin https://github.com/kchopra9484-star/KARAN-CHOPRA-.git 2>nul

echo.
echo [3/3] Pushing to GitHub (main branch)...
echo.
echo -> Git Credential Manager is now connecting to GitHub...
echo -> If a browser tab opens, click 'Sign in with your browser' / 'Authorize'.
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] ALL FILES PUSHED TO GITHUB SUCCESSFULLY!
    echo   Repository: https://github.com/kchopra9484-star/KARAN-CHOPRA-
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   [INFO] Push was not completed.
    echo.
    echo   If you prefer using a Personal Access Token (PAT):
    echo   1. Go to: https://github.com/settings/tokens
    echo   2. Generate a token with 'repo' scope
    echo   3. Run: git push https://YOUR_TOKEN@github.com/kchopra9484-star/KARAN-CHOPRA-.git main
    echo ========================================================
)

echo.
pause
