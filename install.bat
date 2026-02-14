@echo off
echo ===================================
echo ExpenseTracker - Dependency Installation
echo ===================================
echo.

echo Installing core packages...
call npm install next@16.1.6 react@19.2.3 react-dom@19.2.3
if %errorlevel% neq 0 exit /b %errorlevel%

echo Installing database and auth packages...
call npm install @prisma/client@^6.0.0 next-auth@^5.0.0-beta.25 @auth/prisma-adapter@^2.7.4 bcryptjs@^2.4.3
if %errorlevel% neq 0 exit /b %errorlevel%

echo Installing utility packages...
call npm install recharts@^2.15.0 date-fns@^4.1.0 zod@^3.24.1 lucide-react@^0.468.0
if %errorlevel% neq 0 exit /b %errorlevel%

call npm install class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^2.6.0 next-themes@^0.4.4
if %errorlevel% neq 0 exit /b %errorlevel%

echo Installing UI components...
call npm install @radix-ui/react-dialog@^1.1.4 @radix-ui/react-dropdown-menu@^2.1.4 @radix-ui/react-label@^2.1.1
if %errorlevel% neq 0 exit /b %errorlevel%

call npm install @radix-ui/react-select@^2.1.4 @radix-ui/react-slot@^1.1.1 @radix-ui/react-tabs@^1.1.2
if %errorlevel% neq 0 exit /b %errorlevel%

call npm install @radix-ui/react-switch@^1.1.2 @radix-ui/react-popover@^1.1.4
if %errorlevel% neq 0 exit /b %errorlevel%

echo Installing dev dependencies...
call npm install -D @types/bcryptjs@^2.4.6 prisma@^6.0.0
if %errorlevel% neq 0 exit /b %errorlevel%

echo.
echo ===================================
echo Installation Complete!
echo ===================================
echo.
echo Next steps:
echo 1. npx prisma generate
echo 2. npx prisma db push
echo 3. npm run dev
echo.
