@echo off
echo ================================================
echo   تشغيل الخادم المحلي لمتجر غريم
echo ================================================
echo.

REM التحقق من وجود Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [√] تم العثور على Python
    echo [•] جاري تشغيل الخادم المحلي...
    echo.
    echo ================================================
    echo   الخادم يعمل على: http://localhost:8000
    echo ================================================
    echo.
    echo   للوصول إلى صفحة المدير:
    echo   http://localhost:8000/auth.html
    echo.
    echo   للوصول إلى الموقع الرئيسي:
    echo   http://localhost:8000/index.html
    echo.
    echo   اضغط Ctrl+C لإيقاف الخادم
    echo ================================================
    echo.
    python -m http.server 8000
) else (
    echo [X] Python غير موجود!
    echo.
    echo الرجاء تثبيت Python أو استخدام Live Server في VS Code
    echo.
    pause
)
