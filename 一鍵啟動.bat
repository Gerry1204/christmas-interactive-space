@echo off
chcp 65001 >nul
title Christmas Interactive Space Launcher
echo ==========================================
echo 🎄 正在啟動聖誕互動空間...
echo 🎅 Starting Christmas Interactive Space...
echo ==========================================

echo.
echo [1/2] 檢查並安裝套件 (Checking dependencies)...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 安裝失敗，請確認您已安裝 Node.js。
    pause
    exit /b
)

echo.
echo [2/2] 啟動網頁伺服器 (Starting Server)...
echo 🌐 請在瀏覽器開啟顯示的網址 (通常是 http://localhost:5173)
echo.

call npm run dev

pause
