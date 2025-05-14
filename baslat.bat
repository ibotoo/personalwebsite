@echo off
echo Site baslatiliyor...
echo.

REM pnpm yoksa kur
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo pnpm kuruluyor...
    npm install -g pnpm
)

REM Bağımlılıkları yükle
echo Bagimliliklar yukleniyor...
call pnpm install

REM Siteyi başlat
echo Site baslatiliyor...
call pnpm dev

pause 