# ExpenseTracker Setup Script for Windows

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "ExpenseTracker Setup" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✓ Node.js $nodeVersion detected" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
Write-Host ""

# Try bulk install first
Write-Host "Attempting bulk install..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠ Bulk install failed. Installing dependencies individually..." -ForegroundColor Yellow
    Write-Host ""
    
    # Core dependencies
    Write-Host "Installing core packages..." -ForegroundColor Cyan
    npm install next@16.1.6 react@19.2.3 react-dom@19.2.3
    npm install @prisma/client@^6.0.0
    npm install next-auth@^5.0.0-beta.25 @auth/prisma-adapter@^2.7.4
    npm install bcryptjs@^2.4.3
    npm install recharts@^2.15.0 date-fns@^4.1.0 zod@^3.24.1
    npm install lucide-react@^0.468.0
    npm install class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^2.6.0
    npm install next-themes@^0.4.4
    
    # Radix UI components
    Write-Host "Installing UI components..." -ForegroundColor Cyan
    npm install @radix-ui/react-dialog@^1.1.4
    npm install @radix-ui/react-dropdown-menu@^2.1.4
    npm install @radix-ui/react-label@^2.1.1
    npm install @radix-ui/react-select@^2.1.4
    npm install @radix-ui/react-slot@^1.1.1
    npm install @radix-ui/react-tabs@^1.1.2
    npm install @radix-ui/react-switch@^1.1.2
    npm install @radix-ui/react-popover@^1.1.4
    
    # Dev dependencies
    Write-Host "Installing dev dependencies..." -ForegroundColor Cyan
    npm install -D @types/bcryptjs@^2.4.6
    npm install -D prisma@^6.0.0
    
    Write-Host "✓ All dependencies installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Set up MongoDB Atlas:" -ForegroundColor Yellow
Write-Host "   - Create account at https://www.mongodb.com/cloud/atlas"
Write-Host "   - Create a free cluster"
Write-Host "   - Get your connection string"
Write-Host ""
Write-Host "2. Update .env.local with your MongoDB connection string"
Write-Host ""
Write-Host "3. Generate Prisma client:" -ForegroundColor Yellow
Write-Host "   npx prisma generate" -ForegroundColor White
Write-Host ""
Write-Host "4. Push database schema:" -ForegroundColor Yellow
Write-Host "   npx prisma db push" -ForegroundColor White
Write-Host ""
Write-Host "5. Start the development server:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Setup Complete! 🎉" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
