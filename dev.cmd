@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
call "C:\Program Files\nodejs\npx.cmd" vite --port 5173 --strictPort > "%~dp0dev.log" 2>&1
